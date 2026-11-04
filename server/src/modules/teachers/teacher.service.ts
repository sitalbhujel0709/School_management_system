import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from "../../database/connection";
import {
  AssignSubjectsToTeacherInput,
  CreateTeacherInput,
} from "./teacher.validator";

export interface TeacherSubjectRow {
  id: string;
  full_name: string;
  email: string;
  date_of_Birth: string;
  address: string;
  subject_name: string;
  subject_code: string;
}

export class TeacherService {
  static async createTeacherProfile(
    data: CreateTeacherInput,
    tenantCode: string,
  ) {
    const { full_name, email, password, date_of_Birth, address } = data;

    const teacherProfileTable = `teacher_profiles_${tenantCode}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newTeacher = await sequelize.query(
      `
      INSERT INTO public."${teacherProfileTable}" (full_name, email, password, "date_of_Birth", address)
      VALUES (?, ?, ?, ?, ?)
      RETURNING *;
    
      `,
      {
        type: QueryTypes.SELECT,
        replacements: [
          full_name,
          email,
          hashedPassword,
          date_of_Birth,
          address,
        ],
      },
    );
    return newTeacher[0];
  }

  static async assignSubjectsToTeacher(
    teacher_id: string,
    data: AssignSubjectsToTeacherInput,
    tenantCode: string,
  ) {
    const { subject_ids } = data;
    const subject_teacherTable = `subject_teachers_${tenantCode}`;

    const validTeacher = await sequelize.query(
      `
      SELECT * FROM public."teacher_profiles_${tenantCode}" WHERE id = ?
      `,
      {
        type: QueryTypes.SELECT,
        replacements: [teacher_id],
      },
    );
    if (validTeacher.length === 0) {
      throw new Error("Teacher not found");
    }
    const validSubjects = await sequelize.query<{
      valid_count: string;
    }>(
      `
      SELECT COUNT(DISTINCT id) AS valid_count 
      FROM public."subjects_${tenantCode}"
      WHERE id =  ANY (
        ARRAY[?]::uuid[]
      )

      `,
      {
        type: QueryTypes.SELECT,
        replacements: [subject_ids],
      },
    );
    if (subject_ids.length !== Number(validSubjects[0].valid_count)) {
      throw new Error("One or more subjects not found");
    }

    const placeholders = subject_ids.map(() => "?").join(", ");

    const assignedSubjects = await sequelize.query<TeacherSubjectRow>(
      `
    INSERT INTO public."${subject_teacherTable}"
      (teacher_id, subject_id)
    SELECT
      ?::uuid,
      unnest(ARRAY[${placeholders}]::uuid[])
    ON CONFLICT (teacher_id, subject_id)
    DO NOTHING
    RETURNING *;
  `,
      {
        replacements: [teacher_id, ...subject_ids],
        type: QueryTypes.SELECT,
      },
    );
    return assignedSubjects;
  }

  static async getAllTeachers(tenantCode: string) {
    const teacherProfileTable = `teacher_profiles_${tenantCode}`;
    const teachers:TeacherSubjectRow[] = await sequelize.query(`SELECT t.id, t.full_name, t.email, t."date_of_Birth", t.address,s.subject_name,s.subject_code FROM public."${teacherProfileTable}" AS t
      LEFT JOIN public."subject_teachers_${tenantCode}" AS st ON t.id = st.teacher_id
      LEFT JOIN public."subjects_${tenantCode}" AS s ON st.subject_id = s.id
      `,{
      type: QueryTypes.SELECT,
    })
    return teachers;
  }
}

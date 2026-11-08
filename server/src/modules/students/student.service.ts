import { QueryTypes } from "sequelize";
import { sequelize } from "../../database/connection";
import { CreateStudentInput } from "./student.validator";
import bcrypt from "bcrypt";

export class StudentService {
  static async createStudentProfile(
    data: CreateStudentInput,
    tenantCode: string,
  ) {
    const { full_name, email, date_of_Birth, address } = data;

    const password = full_name.split(" ")[0] + "1234";

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = await sequelize.query(
      `
      INSERT INTO public."student_profiles_${tenantCode}" (full_name, email, password, "date_of_Birth", address)
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
    return newStudent[0];
  }
  static async assignStudentToClass(
    studentId: string,
    classId: string,
    tenantCode: string,
  ) {
    const validStudent = await sequelize.query(
      `
      SELECT * FROM public."student_profiles_${tenantCode}" WHERE id = ?;
    `,
      {
        type: QueryTypes.SELECT,
        replacements: [studentId],
      },
    );
    if (validStudent.length === 0) {
      throw new Error("Student not found");
    }
    const validClass = await sequelize.query(
      `
      SELECT * FROM public."classes_${tenantCode}" WHERE id = ?;
    `,
      {
        type: QueryTypes.SELECT,
        replacements: [classId],
      },
    );
    if (validClass.length === 0) {
      throw new Error("Class not found");
    }
    const assignedStudent = await sequelize.query(
      `
      INSERT INTO public."students_${tenantCode}" (student_id, class_id)
      VALUES (?, ?)
      RETURNING *;

      `,
      { type: QueryTypes.SELECT, replacements: [studentId, classId] },
    );
    return assignedStudent[0];
  }
  static async getAllStudents(tenantCode: string) {
    const studentsProfilesTable = `student_profiles_${tenantCode}`;
    const studentsTable = `students_${tenantCode}`;
    const classesTable = `classes_${tenantCode}`;
    const allStudents = await sequelize.query(
      `
      SELECT 
        sp.id AS student_id,
        sp.full_name AS student_full_name,
        sp.email AS student_email,
        sp."date_of_Birth" AS student_date_of_birth,
        sp.address AS student_address,
        c.class_name AS class_name

      FROM public."${studentsProfilesTable}" AS sp
      LEFT JOIN public."${studentsTable}" AS s ON sp.id = s.student_id
      LEFT JOIN public."${classesTable}" AS c ON s.class_id = c.id
      ORDER BY sp.full_name ASC;
      `,
      {
        type: QueryTypes.SELECT,
      },
    );
    return allStudents;
  }
  static async getStudentDetailsById(studentId: string, tenantCode: string) {
    const studentsProfilesTable = `student_profiles_${tenantCode}`;
    const studentsTable = `students_${tenantCode}`;
    const classesTable = `classes_${tenantCode}`;

    const studentDetails = await sequelize.query(
      `
      SELECT 
        sp.id AS student_id,
        sp.full_name AS student_full_name,
        sp.email AS student_email,
        sp."date_of_Birth" AS student_date_of_birth,
        sp.address AS student_address,
        c.class_name AS class_name
      FROM public."${studentsProfilesTable}" AS sp
      LEFT JOIN public."${studentsTable}" AS s ON sp.id = s.student_id
      LEFT JOIN public."${classesTable}" AS c ON s.class_id = c.id
      WHERE sp.id = ?
      `,
      {
        type: QueryTypes.SELECT,
        replacements: [studentId],
      },
    );
    return studentDetails[0];
  }
}

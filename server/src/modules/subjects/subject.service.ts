import { QueryTypes } from "sequelize";
import { sequelize } from "../../database/connection";
import { CreateSubjectInput } from "./subject.validator";

export class SubjectService {
  static async createSubject(
    subjectData: CreateSubjectInput,
    tenantCode: string,
  ) {
    const { subject_name, subject_code, credit_hours, class_id } = subjectData;
    const newSubject = await sequelize.query(
      `
      INSERT INTO public."subjects_${tenantCode}" (subject_name, subject_code, credit_hours, class_id)
      VALUES (?, ?, ?, ?)
      RETURNING *;   
      `,
      {
        type: QueryTypes.SELECT,
        replacements: [subject_name, subject_code, credit_hours, class_id],
      },
    );
    return newSubject[0];
  }

  static async getSubjectsByClass(classId: string, tenantCode: string) {
    const subjects = await sequelize.query(
      `
      
      SELECT * FROM public."subjects_${tenantCode}" WHERE class_id = ?;`,
      {
        type: QueryTypes.SELECT,
        replacements: [classId],
      },
    );
    return subjects;
  }

  static async getAllSubjects(tenantCode: string) {
    const subjectsTable = `subjects_${tenantCode}`;
    const classesTable = `classes_${tenantCode}`;
    const subjects = await sequelize.query(
      `
       SELECT s.id, s.subject_name, s.subject_code, s.credit_hours, c.class_name
       FROM public."${subjectsTable}" s
       JOIN public."${classesTable}" c ON s.class_id = c.id;
      `
      ,{
      type: QueryTypes.SELECT,

    })
    return subjects;
  }
}

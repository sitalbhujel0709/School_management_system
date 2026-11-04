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
}

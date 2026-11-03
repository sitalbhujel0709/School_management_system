import { QueryTypes } from "sequelize";
import { sequelize } from "../../database/connection";
import { CreateStudentInput } from "./student.validator";
import bcrypt from "bcrypt";

export class StudentService {
  static async createStudentProfile(
    data: CreateStudentInput,
    tenantCode: string,
  ) {
    const { full_name, email, password, date_of_Birth, address } = data;

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
}

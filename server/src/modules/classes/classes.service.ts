import { QueryTypes } from "sequelize";
import { sequelize } from "../../database/connection";
import { CreateClassInput } from "./classes.validator";
interface CreatedClass {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  class_name: string;
  class_level: number;
  capacity: number;
  seats_available: number;
}

export class ClassesService {
  static async CreateClass(data: CreateClassInput, tenantCode: string) {
    const { className, classLevel, capacity, seatsAvailable } = data;
    const newClass = await sequelize.query<CreatedClass>(
      `
      INSERT INTO public."classes_${tenantCode}" (class_name, "class_level", capacity, "seats_available")
      VALUES (?, ?, ?, ?)
      RETURNING *;
      `,
      {
        type: QueryTypes.SELECT,
        replacements: [className, classLevel, capacity, seatsAvailable],
      },
    );
    console.log(newClass);
    return newClass[0];
  }
  static async getClassesDetails({ tenantCode }: { tenantCode: string }) {
    const classesDetails = await sequelize.query(
      `
      SELECT c.id, c.class_name , c.class_level , c.capacity, c.seats_available , COUNT(s.id) as total_students
      FROM public."classes_${tenantCode}" AS c
      LEFT JOIN public."students_${tenantCode}" AS s ON c.id = s.class_id
      GROUP BY c.class_name, c.class_level, c.capacity, c.seats_available, c.id
      ORDER BY c.class_level ASC
      `,
      {
        type: QueryTypes.SELECT,
      },
    );
    return classesDetails;
  }
  static async getClassesDetailsById({
    tenantCode,
    classId,
  }: {
    tenantCode: string;
    classId: string;
  }) {
    const response = await sequelize.query(
      `
      SELECT
    c.id,
    c.class_name,
    c.class_level,
    c.capacity,
    c.seats_available,
    COUNT(s.id) AS total_students,
    COALESCE(
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'student_id', sp.id,
                'student_full_name', sp.full_name,
                'student_email', sp.email,
                'student_address', sp.address
            )
        ) FILTER (WHERE sp.id IS NOT NULL),
        '[]'::json
    ) AS students

FROM public."classes_${tenantCode}" AS c

LEFT JOIN public."students_${tenantCode}" AS s
    ON c.id = s.class_id

LEFT JOIN public."student_profiles_${tenantCode}" AS sp
    ON s.student_id = sp.id

WHERE c.id = ?

GROUP BY c.id;
      `,
      {
        type: QueryTypes.SELECT,
        replacements: [classId],
      },
    );
    // const classDetails = Object.values(
    //   response.reduce((acc, item) => {
    //     const key = item.class_name;
    //     if (!acc[key]) {
    //       acc[key] = {
    //         id: item.id,
    //         class_name: item.class_name,
    //         class_level: item.class_level,
    //         capacity: item.capacity,
    //         seats_available: item.seats_available,
    //         students: [],
    //       };
    //     }
    //     if (item.student_id) {
    //       acc[key].students.push({
    //         id: item.student_id,
    //         full_name: item.student_full_name,
    //         email: item.student_email,
    //         address: item.student_address,
    //       });
    //     }
    //     return acc;
    //   }, {}),
    // );
    return response;
  }
}

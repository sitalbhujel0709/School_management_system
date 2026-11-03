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
  static async CreateClass(data:CreateClassInput,tenantCode:string){
    const {className,classLevel,capacity,seatsAvailable} = data;
    const newClass = await sequelize.query<CreatedClass>(
      `
      INSERT INTO public."classes_${tenantCode}" (class_name, "class_level", capacity, "seats_available")
      VALUES (?, ?, ?, ?)
      RETURNING *;
      `,{
        type: QueryTypes.SELECT,
        replacements:[className,classLevel,capacity,seatsAvailable]
      }
    )
    console.log(newClass);
    return newClass[0];
  }
  static async getClassesDetails({tenantCode}:{tenantCode:string}){
    const classesDetails = await sequelize.query(`
      SELECT c.id, c.class_name, c.class_level, c.capacity, c.seats_available, COUNT(s.id) As total_students
      FROM public."classes_${tenantCode}" AS c
      LEFT JOIN public."students_${tenantCode}" AS s ON c.id = s.class_id
      GROUP BY c.class_name, c.class_level, c.capacity, c.seats_available, c.id
      ORDER BY c.class_level ASC
      `,{
      type: QueryTypes.SELECT
    })
    return classesDetails;
  }
}
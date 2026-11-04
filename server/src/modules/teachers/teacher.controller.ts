import type { Request, Response } from "express";
import { TeacherService, TeacherSubjectRow } from "./teacher.service";

interface Teacher {
  id: string;
  full_name: string;
  email: string;
  date_of_Birth: string;
  address: string;
  subject_name: string;
  subject_code: string;
}
interface TeacherWithSubjects extends Omit<
  Teacher,
  "subject_name" | "subject_code"
> {
  subjects: {
    subject_name: string;
    subject_code: string;
  }[];
}

export class TeacherController {
  static async createTeacherProfile(req: Request, res: Response) {
    const tenantCode = req.user?.tenant?.tenantCode;
    if (!tenantCode) {
      return res.status(400).json({ message: "Tenant code is missing" });
    }
    const teacherData = req.body;
    const newTeacher = await TeacherService.createTeacherProfile(
      teacherData,
      tenantCode,
    );
    return res.status(201).json({
      message: "Teacher profile created successfully",
      data: newTeacher,
    });
  }
  static async assignSubjectsToTeacher(req: Request, res: Response) {
    const tenantCode = req.user?.tenant?.tenantCode;
    const { teacherId } = req.params;
    if (!tenantCode) {
      return res.status(400).json({ message: "Tenant code is missing" });
    }
    const { subject_ids } = req.body;

    const result = await TeacherService.assignSubjectsToTeacher(
      teacherId as string,
      { subject_ids },
      tenantCode,
    );
    return res.status(201).json({
      message: "Subjects assigned to teacher successfully",
      data: result,
    });
  }

  static async getAllTeachers(req: Request, res: Response) {
    const tenantCode = req.user?.tenant?.tenantCode;
    if (!tenantCode) {
      return res.status(400).json({ message: "Tenant code is missing" });
    }
    const teachers: Teacher[] = await TeacherService.getAllTeachers(tenantCode);

    const teacherMap = teachers.reduce<Map<string, TeacherWithSubjects>>(
      (map, item) => {
        let teacher = map.get(item.id);

        if (!teacher) {
          teacher = {
            id: item.id,
            full_name: item.full_name,
            email: item.email,
            date_of_Birth: item.date_of_Birth,
            address: item.address,
            subjects: [],
          };

          map.set(item.id, teacher);
        }

        teacher.subjects.push({
          subject_name: item.subject_name,
          subject_code: item.subject_code,
        });

        return map;
      },
      new Map<string, TeacherWithSubjects>(),
    );
    const responseData = Array.from(teacherMap.values());
    return res.status(200).json({
      message: "Teachers retrieved successfully",
      data: Array.from(responseData),
    });
  }
}

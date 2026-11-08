import type {Request, Response} from "express";
import { StudentService } from "./student.service";

export class StudentController {
  static async createStudent(req: Request, res: Response){
    const tenantCode = req.user?.tenant?.tenantCode;
    if(!tenantCode){
      return res.status(400).json({
        message: "Tenant code not found"
      });
    }
    const studentData = req.body;
    const studentProfile = await StudentService.createStudentProfile(studentData, tenantCode);
    return res.status(201).json({
      message: "Student profile created successfully",
      data: studentProfile
    });
  }
  static async assignStudentToClass(req: Request, res: Response){
    const tenantCode = req.user?.tenant?.tenantCode;
    if(!tenantCode){
      return res.status(400).json({
        message: "Tenant code not found"
      });
    }
    const studentId = req.params.studentId as string;
    const { classId } = req.body;
    const assignedStudent = await StudentService.assignStudentToClass(studentId, classId, tenantCode);
    return res.status(200).json({
      message: "Student assigned to class successfully",
      data: assignedStudent
    });
  }

  static async getAllStudents(req:Request,res:Response){
    const tenantCode = req.user?.tenant?.tenantCode;
    if(!tenantCode){
      return res.status(400).json({
        message: "Tenant code not found"
      });
    }
    const students = await StudentService.getAllStudents(tenantCode);
    return res.status(200).json({
      message: "Students fetched successfully",
      data: students
    });
  }

  static async getStudentById(req:Request,res:Response){
    const tenantCode = req.user?.tenant?.tenantCode;
    if(!tenantCode){
      return res.status(400).json({
        message: "Tenant code not found"
      });
    }
    const studentId = req.params.studentId as string;
    const studentDetails = await StudentService.getStudentDetailsById(studentId, tenantCode);
    return res.status(200).json({
      message: "Student details fetched successfully",
      data: studentDetails
    });
  }
}
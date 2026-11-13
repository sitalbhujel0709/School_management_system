import type { Request, Response } from "express";
import { AttendanceService } from "./attendance.service";

export class AttendanceController {
  static async createClassAttendance(req:Request,res:Response){
    const tenantCode = req.user?.tenant?.tenantCode!;
    const classId = req.params.classId as string;

    const { attendanceSession, attendanceRecords } = await AttendanceService.createClassAttendance(tenantCode,classId,req.body);
    return res.status(201).json({
      message:"Attendance created successfully",
      data: { attendanceSession, attendanceRecords }
    })
  }
}
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

  static async getClassTodaysAttendance(req:Request,res:Response){
    const tenantCode = req.user?.tenant?.tenantCode!;
    const classId = req.params.classId as string;
    const attendanceSessions = await AttendanceService.getClassTodaysAttendance(tenantCode,classId);
    return res.status(200).json({
      message:"Attendance fetched successfully",
      data: attendanceSessions
    })
  }

  static async getClassTodaysAttendanceSession(req:Request,res:Response){
    const tenantCode = req.user?.tenant?.tenantCode!;
    const classId = req.params.classId as string;
    const attendanceSessions = await AttendanceService.getClassTodaysAttendanceSession(tenantCode,classId);
    console.log("Attendance Sessions from Service:", attendanceSessions);
    return res.status(200).json({
      message:"Attendance fetched successfully",
      data: attendanceSessions
    })
  }
}
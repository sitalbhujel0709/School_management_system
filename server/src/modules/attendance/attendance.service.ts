import { DataTypes, QueryTypes } from "sequelize";
import { sequelize } from "../../database/connection";

export class AttendanceService {
  static async createClassAttendance(
    tenantCode: string,
    classId: string,
    attendanceData: any,
  ) {
    const attendanceSessionTable = `attendance_sessions_${tenantCode}`;
    const attendanceTable = `student_attendance_${tenantCode}`;

    const [existingSession] = await sequelize.query(
      `
      
      SELECT * FROM public."${attendanceSessionTable}"
      WHERE session_date = '${new Date(attendanceData.date).toISOString()}' AND class_id = '${classId}'

      `,
      {
        type: QueryTypes.SELECT,
      },
    );
    if (existingSession) {
      throw new Error(
        "Attendance session already exists for this date and class",
      );
    }

    const attendance = await sequelize.transaction(async (transaction) => {
      const attendanceSession = await sequelize.query(
        `
        INSERT INTO public."attendance_sessions_${tenantCode}" (class_id, session_date)
        VALUES ('${classId}', '${new Date(attendanceData.date).toISOString()}')
        RETURNING *;
        `,
        {
          type: QueryTypes.SELECT,
          transaction,
        },
      );
      const attendanceSessionId = (attendanceSession[0] as any).id;

      const attendanceRecords = await sequelize.query(`
        INSERT INTO public."student_attendance_${tenantCode}" (attendance_session_id, student_id, status)
        VALUES ${attendanceData.students.map((student: any) => `('${attendanceSessionId}', '${student.studentId}', '${student.status}')`).join(', ')}
        RETURNING *;
        `,{
        type: QueryTypes.SELECT,
        transaction,
      })
      return { attendanceSession, attendanceRecords };
    });
    return attendance;
  }
}

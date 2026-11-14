import { DataTypes, QueryTypes } from "sequelize";
import { sequelize } from "../../database/connection";

interface AttendanceSession {
  id: string;
  class_id: string;
  session_date:string;
}

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

  static async getClassTodaysAttendanceSession(tenantCode: string, classId: string) {
    const attendanceSessionTable = `attendance_sessions_${tenantCode}`;
    const attendanceSession  =  await sequelize.query(`
      SELECT * FROM public."${attendanceSessionTable}" AS s
      WHERE s.class_id = ? AND s.session_date = ?
    `,{
      type: QueryTypes.SELECT,
      replacements: [classId, new Date().toISOString().split('T')[0]]
    })

    return attendanceSession;
  }

  static async getClassTodaysAttendance(tenantCode: string, classId: string) {
    const attendanceSessionTable = `attendance_sessions_${tenantCode}`;
    const attendanceTable = `student_attendance_${tenantCode}`;

    const attendanceSessions: AttendanceSession[] = await sequelize.query(`
      SELECT s.session_date AS session_date , JSON_AGG(JSON_BUILD_OBJECT('class_id', s.class_id, 'class_name', c.class_name)) AS class_info  FROM public."${attendanceSessionTable}" AS s
      LEFT JOIN public."${attendanceTable}" AS a ON s.id = a.attendance_session_id
      LEFT JOIN public."classes_${tenantCode}" AS c ON s.class_id = c.id
      WHERE s.class_id = ? AND s.session_date = ?
      GROUP BY s.session_date
      `,{
      type: QueryTypes.SELECT,
      replacements: [classId, new Date().toISOString().split('T')[0]] 
    })
    const attendanceRecords = await sequelize.query(`
      SELECT
        c.class_name as class_name,
        st.full_name as student_name,
        a.status as status,
        s.session_date as session_date

      FROM public."${attendanceSessionTable}" AS s

      LEFT JOIN public."${attendanceTable}" AS a ON s.id = a.attendance_session_id
      LEFT JOIN public."student_profiles_${tenantCode}" AS st ON a.student_id = st.id
      LEFT JOIN public."classes_${tenantCode}" AS c ON s.class_id = c.id
      WHERE s.class_id = ? AND s.session_date = ?

      `,{
        type: QueryTypes.SELECT,
        replacements: [classId, new Date().toISOString().split('T')[0]]
      })
    return { attendanceSessions, attendanceRecords };
  }
}


export interface AttendanceState{
  attendanceSession: AttendanceSession | null;
  attendanceRecords: StudentAttendance[];
  loading: boolean;
  error: string | null;
}

export interface AttendanceSession {
  id: string;
  class_id: string;
  session_date:string;
}

export interface StudentAttendance {
  id: string;
  attendance_session_id: string;
  student_id: string;
  status: string;
}
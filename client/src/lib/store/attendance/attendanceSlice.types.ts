
export interface AttendanceState{
  attendanceSession: AttendanceSession | null;
  attendanceRecords: StudentAttendance[];
  isAttendanceTaken: boolean;
  loading: boolean;
  error: string | null;
}

export interface AttendanceSession {
  id: string;
  class_id: string;
  session_date:string;
}

export interface StudentAttendance {
  student_id: string;
  student_name: string;
  student_email: string;
  class_name: string;
  status: string;
}

export interface CreateAttendanceInput {
  date: string;
  students: {
    studentId: string;
    status: string;
  }[];
} 
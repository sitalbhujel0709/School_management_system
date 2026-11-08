export interface IStudent {
  student_id: string;
  student_full_name: string;
  student_email: string;
  student_date_of_birth: string;
  student_address: string;
  class_name: string | null;
}

interface ISelectedStudentDetails {
  student_id: string;
  student_full_name: string;
  student_email: string;
  student_date_of_birth: string;
  student_address: string;
  class_name: string | null;
}
export interface CreateStudentInput {
  full_name: string;
  email: string;
  date_of_Birth: string;
  address: string;
}

export interface StudentState {
  students: IStudent[];
  loading: boolean;
  error: string | null;
  selectedStudentDetails?: ISelectedStudentDetails | null;
}
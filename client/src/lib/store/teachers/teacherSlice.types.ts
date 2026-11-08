export interface Subject {
  subject_name: string;
  subject_code: string;
}
export interface Teacher {

  id : string;
  full_name: string;
  email: string;
  date_of_Birth: string;
  address: string;
  subjects?: Subject[];
}

export interface TeacherState {
  teachers: Teacher[];
  loading: boolean;
  error: string | null;
}

export interface CreateTeacherInput {
  full_name: string;
  email: string;
  date_of_Birth: string;
  address: string;
}
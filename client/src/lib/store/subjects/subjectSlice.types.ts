
export interface Subject {
  id: string;
  subject_name: string;
  subject_code: string;
  credit_hours: number;
  class_name: string;
}

export interface SubjectState {
  subjects: Subject[];
  loading: boolean;
  error: string | null;
}

export interface CreateSubjectInput {
  subject_name: string;
  subject_code: string;
  credit_hours: number;
  class_id: string;
}
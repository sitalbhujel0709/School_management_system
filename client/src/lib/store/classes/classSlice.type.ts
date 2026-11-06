
export interface IClass {
  id: string;
  class_name: string;
  class_level: string | number;
  capacity: number;
  seats_available: number;
  total_students: string | number;
}

export interface IStudent {
  "student_id": string;
  "full_name": string;
  "email": string;
  "date_of_birth": string;
  "address": string;
}

export interface ISelecetedClassDetails extends IClass {
  students: IStudent[];
}
export interface ClassState {
  classes: IClass[];
  loading: boolean;
  error: string | null;
  selectedClassDetails?: ISelecetedClassDetails | null;  
}

export interface CreateClassInput {
  className: string;
  classLevel: string | number;
  capacity: number;
  seatsAvailable: number | string;
}
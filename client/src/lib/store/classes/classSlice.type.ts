
export interface IClass {
  id: string;
  class_name: string;
  class_level: string | number;
  capacity: number;
  seats_available: number;
  total_students: string | number;
}

export interface ClassState {
  classes: IClass[];
  loading: boolean;
  error: string | null;
}

export interface CreateClassInput {
  className: string;
  classLevel: string | number;
  capacity: number;
  seatsAvailable: number | string;
}
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateStudentInput,
  IStudent,
  StudentState,
} from "./studentSlice.types";
import { AppDispatch } from "../store";
import API_INSTANCE from "@/lib/axios/axios";

const initialState:StudentState = {
  students: [],
  loading: false,
  error: null,
  selectedStudentDetails: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setLoading: (state: StudentState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: StudentState, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setStudents: (state: StudentState, action: PayloadAction<IStudent[]>) => {
      state.students = action.payload;
    },
    setSelectedStudentDetails: (
      state: StudentState,
      action: PayloadAction<IStudent | null>,
    ) => {
      state.selectedStudentDetails = action.payload;
    },
  },
});

export const { setLoading, setError, setStudents, setSelectedStudentDetails } =
  studentSlice.actions;
export default studentSlice.reducer;

export function createStudent(studentData: CreateStudentInput) {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setLoading(true));
      const response = await API_INSTANCE.post("/students", studentData);
      dispatch(getAllStudents());
      dispatch(setError(null));
      return { success: true };
    } catch (error: any) {
      dispatch(
        setError(error.message || "An error occured while creating student"),
      );
      return { success: false };
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function getAllStudents() {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setLoading(true));
      const response = await API_INSTANCE.get("/students");
      console.log("Response from API:", response.data);
      dispatch(setStudents(response.data.data));
      dispatch(setError(null));
      return { success: true };
    } catch (error: any) {
      dispatch(
        setError(error.message || "An error occured while fetching students"),
      );
      return { success: false };
    } finally {
      dispatch(setLoading(false));
    }
  };
}

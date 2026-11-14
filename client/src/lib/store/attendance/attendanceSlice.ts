import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AttendanceSession,
  AttendanceState,
  StudentAttendance,
} from "./attendanceSlice.types";
import { AppDispatch } from "../store";
import API_INSTANCE from "@/lib/axios/axios";

const initialState: AttendanceState = {
  attendanceSession: null,
  loading: false,
  error: null,
  attendanceRecords: [],
};

const AttendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setError: (
      state: AttendanceState,
      action: PayloadAction<string | null>,
    ) => {
      state.error = action.payload;
    },
    setLoading: (state: AttendanceState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAttendanceSession: (
      state: AttendanceState,
      action: PayloadAction<AttendanceSession | null>,
    ) => {
      state.attendanceSession = action.payload;
    },
    setAttendanceRecords: (
      state: AttendanceState,
      action: PayloadAction<StudentAttendance[]>,
    ) => {
      state.attendanceRecords = action.payload;
    },
  },
});

export const {
  setError,
  setLoading,
  setAttendanceSession,
  setAttendanceRecords,
} = AttendanceSlice.actions;
export default AttendanceSlice.reducer;

export const getAttendanceSession = (classId: string) => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setLoading(true));
      const response = await API_INSTANCE.get(`/attendance/${classId}/session`);
      console.log(response.data)
      const attendanceSession: AttendanceSession = response.data.data;
      console.log("Attendance Session from API:", attendanceSession);
      dispatch(setAttendanceSession(attendanceSession));
      dispatch(setError(null));
      return {
        success: true,
        data: attendanceSession,
      };
    } catch (error: any) {
      dispatch(setError(error.message || "Something went wrong"));
      return {
        success: false,
      };
    } finally {
      dispatch(setLoading(false));
    }
  };
};

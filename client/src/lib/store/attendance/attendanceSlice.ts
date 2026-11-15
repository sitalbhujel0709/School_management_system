import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AttendanceSession,
  AttendanceState,
  CreateAttendanceInput,
  StudentAttendance,
} from "./attendanceSlice.types";
import { AppDispatch } from "../store";
import API_INSTANCE from "@/lib/axios/axios";

const initialState: AttendanceState = {
  attendanceSession: null,
  loading: false,
  error: null,
  isAttendanceTaken: false,
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
    setIsAttendanceTaken: (
      state: AttendanceState,
      action: PayloadAction<boolean>,
    ) => {
      state.isAttendanceTaken = action.payload;
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
  setIsAttendanceTaken,
} = AttendanceSlice.actions;
export default AttendanceSlice.reducer;

export const getAttendanceSession = (classId: string) => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setLoading(true));
      const response = await API_INSTANCE.get(`/attendance/${classId}/session`);
      console.log(response.data);
      const attendanceSession = response.data.data;
      console.log("Attendance Session from API:", attendanceSession);
      dispatch(setAttendanceSession(attendanceSession[0] || null));
      dispatch(setIsAttendanceTaken(attendanceSession.length > 0));
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

export const createAttendance = (
  classId: string,
  attendanceData: CreateAttendanceInput,
) => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setLoading(true));
      const response = await API_INSTANCE.post(
        `/attendance/${classId}`,
        attendanceData,
      );
      const { attendanceSession, attendanceRecords } = response.data.data;
      dispatch(setAttendanceSession(attendanceSession));
      dispatch(setAttendanceRecords(attendanceRecords));
      dispatch(setError(null));
      return {
        success: true,
        data: response.data,
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

export const getAttendanceRecords = (classId: string) => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setLoading(true));
      const response = await API_INSTANCE.get(`/attendance/${classId}`);
      const { attendanceRecords } = response.data.data;
      dispatch(setAttendanceRecords(attendanceRecords));
      dispatch(setError(null));
      return {
        success: true,
        data: attendanceRecords,
      };
      
    } catch (error:any) {
      dispatch(setError(error.message || "Something went wrong"));
      return {
        success: false,
      };
    } finally {
      dispatch(setLoading(false));
    }
  }
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateTeacherInput, Teacher, TeacherState } from "./teacherSlice.types";
import { AppDispatch } from "../store";
import API_INSTANCE from "@/lib/axios/axios";

const initialState:TeacherState = {
  teachers: [],
  loading: false,
  error: null,
  selectedTeacher: null,
}

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers:{
    setLoading: (state: TeacherState, action:PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: TeacherState, action:PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTeachers: (state: TeacherState, action:PayloadAction<Teacher[]>) => {
      state.teachers = action.payload;
    },

    setSelectedTeacher: (state: TeacherState, action:PayloadAction<Teacher | null>) => {
      state.selectedTeacher = action.payload;
    }

  }

})

export const { setLoading, setError, setTeachers, setSelectedTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;

export function getAllTeachers() {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setLoading(true));
      const response = await API_INSTANCE.get("/teachers");
      dispatch(setTeachers(response.data.data));
      return {success:true}
      
    } catch (error:any) {
      dispatch(setError( error.message || "Failed to fetch teachers" ));
      return {success:false}
    } finally {
      dispatch(setLoading(false));
     }
  }
}

export const createTeacher = (teacherData:CreateTeacherInput) => {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setLoading(true));
      const response = await API_INSTANCE.post("/teachers", teacherData);
      dispatch(getAllTeachers());
      dispatch(setError(null));
      return {success:true}
    } catch (error:any) {
      dispatch(setError( error.message || "Failed to create teacher" ));
      return {success:false}
    } finally {
      dispatch(setLoading(false));
    }
  }
}

export const getTeacherById = (teacherId:string) => {
  return async function(dispatch:AppDispatch){
    try {
      dispatch(setLoading(true));
      const response = await API_INSTANCE.get(`/teachers/${teacherId}`);
      console.log("response.data.data",response.data.data);
      dispatch(setError(null));
      dispatch(setSelectedTeacher(response.data.data)); 
      return {success:true, data: response.data.data};
    } catch (error:any) {
      dispatch(setError( error.message || "Failed to fetch teacher" ));
      return {success:false}
    } finally {
      dispatch(setLoading(false));
    }
  }
}
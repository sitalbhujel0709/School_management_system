import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateSubjectInput, Subject, SubjectState } from "./subjectSlice.types";
import { AppDispatch } from "../store";
import API_INSTANCE from "@/lib/axios/axios";

const initialState:SubjectState = {
  subjects: [],
  loading: false,
  error: null
}

const subjectSlice = createSlice({
  name: "subjects",
  initialState: initialState,
  reducers:{
    setSubjects(state:SubjectState, action:PayloadAction<Subject[]>){
      state.subjects = action.payload;
    },
    setLoading(state:SubjectState, action:PayloadAction<boolean>){
      state.loading = action.payload;
    },
    setError(state:SubjectState, action:PayloadAction<string | null>){
      state.error = action.payload;
    }
  }
})

export const {setSubjects, setLoading, setError} = subjectSlice.actions;
export default subjectSlice.reducer;

export const getAllSubjects = function(){
  return async function(dispatch:AppDispatch){
    try {
      dispatch(setLoading(true));
      const response = await API_INSTANCE.get("/subjects");
      dispatch(setSubjects(response.data.data));
      return {success:true}
    } catch (error:any) {
      dispatch(setError(error.message || "Failed to fetch subjects"));
      return {success:false}
    } finally {
      dispatch(setLoading(false));
    }
  }
}

export const createSubject = function(subjectData: CreateSubjectInput){
  return async function(dispatch:AppDispatch){
    try {
      dispatch(setLoading(true))
      const response = await API_INSTANCE.post("/subjects", subjectData);
      dispatch(getAllSubjects());
      return {success:true}
    } catch (error:any) {
      dispatch(setError(error.message || "Failed to create subject"));
      return {success:false}
    } finally {
      dispatch(setLoading(false));
    }
  }
}
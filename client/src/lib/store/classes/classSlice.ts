import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IClass, ClassState, CreateClassInput } from "./classSlice.type";
import { AppDispatch } from "../store";
import API_INSTANCE from "@/lib/axios/axios";

const initialState: ClassState = {
  classes: [],
  loading: false,
  error: null,
};
const classSlice = createSlice({
  name: "class",
  initialState: initialState,
  reducers: {
    setLoading: (state: ClassState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: ClassState, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setClasses: (state: ClassState, action: PayloadAction<IClass[]>) => {
      state.classes = action.payload;
    },
    setClassOnly: (state: ClassState, action: PayloadAction<IClass>) => {
      state.classes = [...state.classes, action.payload];
    }
  },
});

export const { setLoading, setError, setClasses } = classSlice.actions;
export default classSlice.reducer;

export function getAllClasses() {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setLoading(true));
      const response = await API_INSTANCE.get("/classes");
      console.log("Response from API:", response.data);
      dispatch(setClasses(response.data.data));
    } catch (error: any) {
      dispatch(setError(error.message || "An error occurred while fetching classes"));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function createClass(classData:CreateClassInput) {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setLoading(true));
      const response = await API_INSTANCE.post("/classes", classData);
      console.log("Response from api:", response.data)
      dispatch(getAllClasses());
      dispatch(setError(null));
      return {success:true}

    } catch (error: any) {
      dispatch(setError(error.message || 'An error occured while creating class'))
      return {success:false}
    } finally {
      dispatch(setLoading(false))
    }
  }
}


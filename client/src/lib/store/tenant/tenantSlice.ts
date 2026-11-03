import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tenant, TenantState } from "./tenantSlice.types";
import { AppDispatch } from "../store";
import API_INSTANCE from "@/lib/axios/axios";

const initialState: TenantState= {
  tenant: null,
  isLoading: false,
  error: null,
}

const tenantSlice = createSlice({
  name: "tenant",
  initialState: initialState,
  reducers: {
    setTenant: (state:TenantState, action:PayloadAction<Tenant | null>) => {
      state.tenant = action.payload;
    },
    setIsLoading: (state:TenantState, action:PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state:TenantState, action:PayloadAction<string | null>) => {
      state.error = action.payload;
    }

  }
})

export const { setTenant, setIsLoading, setError } = tenantSlice.actions;
export default tenantSlice.reducer;

export const setupTenant = ()=>{
  return async (dispatch:AppDispatch)=>{
    try {
      dispatch(setIsLoading(true));
      const response = await API_INSTANCE.post("/tenant/setup");
      dispatch(setTenant(response.data.data));
      return {success:true}
    } catch (error:any) {
      console.error("Error setting up tenant:", error);
      dispatch(setError(error.message ||"Failed to setup tenant"));
      return {success:false}
    } finally {
      dispatch(setIsLoading(false));
    }
  }
}

export const getTenantByOwner = ()=>{
  return async (dispatch:AppDispatch)=>{
    try {
      dispatch(setIsLoading(true));
      const response = await API_INSTANCE.get("/tenant");
      dispatch(setTenant(response.data.data));
      return {success:true}
    } catch (error: any) {
      dispatch(setError(error.message ||"Failed to fetch tenant"));
      return {success:false}
    } finally {
      dispatch(setIsLoading(false));
    }
  }
}
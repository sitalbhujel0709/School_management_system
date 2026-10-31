import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginCredentials, RegisterCredentials, User } from "./authSlice.types";
import { AppDispatch } from "../store";
import API_INSTANCE from "@/lib/axios/axios";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setLoading: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUser: (state: AuthState, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setError: (state: AuthState, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setUser, setError } = authSlice.actions;
export default authSlice.reducer;

export const loginUser = (loginCredentials: LoginCredentials) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      await API_INSTANCE.post("/users/login", loginCredentials);
      const response = await API_INSTANCE.get("/users/me");
      const user:User= response.data.data;
      dispatch(setUser(user));
      dispatch(setError(null));
      return { success: true};
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoading(true);
      await API_INSTANCE.post("/users/logout");
      dispatch(setUser(null));
      dispatch(setError(null));
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      }
    } finally {
      dispatch(setLoading(false));
    }
  }
}

export const registerUser = (userData:RegisterCredentials)=>{
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      await API_INSTANCE.post("/users/register", userData);
      dispatch(setError(null));
      return { success: true};
    } catch (error: any) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      }
    } finally {
      dispatch(setLoading(false));
    }
  }
}

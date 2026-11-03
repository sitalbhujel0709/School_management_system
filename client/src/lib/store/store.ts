import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice"
import tenantReducer from "./tenant/tenantSlice"

const store = configureStore({
  reducer:{
    auth:authReducer,
    tenant: tenantReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
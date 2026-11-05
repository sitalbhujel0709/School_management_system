import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice"
import tenantReducer from "./tenant/tenantSlice"
import classReducer from "./classes/classSlice"

const store = configureStore({
  reducer:{
    auth:authReducer,
    tenant: tenantReducer,
    classes: classReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
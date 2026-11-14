import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice"
import tenantReducer from "./tenant/tenantSlice"
import classReducer from "./classes/classSlice"
import studentReducer from "./students/studentSlice"
import teacherReducer from "./teachers/teacherSlice"
import subjectReducer from "./subjects/subjectSlice"
import attendanceReducer from "./attendance/attendanceSlice"

const store = configureStore({
  reducer:{
    auth:authReducer,
    tenant: tenantReducer,
    classes: classReducer,
    students: studentReducer,
    teachers: teacherReducer,
    subjects: subjectReducer,
    attendance: attendanceReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
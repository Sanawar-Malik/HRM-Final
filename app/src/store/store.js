import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userAuthapi } from "../services/userAuthApi";
import authReducer from "../featuers/authSlice";
import userReducer from "../featuers/userSlice.js";
import roleReducer from "../featuers/roleSlice";
// import employeeDetail from "../services/employeeSlice";
import departmentDetail from "../services/departmentSlice";
import projectDetail from "../services/projectSlice";
import salaryDetail from "../services/salarySlice";
import attendanceReducer from "../services/attendanceSlice";
import employeeDetail from "../services/employeeSlice";
export const store = configureStore({
  reducer: {
    // app: employeeDetail,
    employee: employeeDetail,
    dep: departmentDetail,
    project: projectDetail,
    salary: salaryDetail,
    [userAuthapi.reducerPath]: userAuthapi.reducer,

    auth: authReducer,
    user: userReducer,
    role: roleReducer,
    // employee: employeeReucer,
    attendance: attendanceReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthapi.middleware),


});
setupListeners(store.dispatch)

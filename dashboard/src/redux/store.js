import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import customerReducer from "../redux/features/customer/customerSlice";
import filterReducer from "../redux/features/customer/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    filter: filterReducer,
  },
});

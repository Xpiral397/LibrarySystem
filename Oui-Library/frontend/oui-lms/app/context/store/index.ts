import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // Optionally, you can provide middleware or other options here
});

export default store;

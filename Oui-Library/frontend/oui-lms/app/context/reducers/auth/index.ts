import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { save } from "../../clientStorage/save";

// Define the initial state interface
interface AuthState {
  meta: {
    matric_number: string;
  };
  user: User;
  verified: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

interface User {
  verified: boolean;
  isAdmin: boolean | null;
  username: string | null;
  matric: string | null;
  email: string | null;
  department: string | null;
  level: string | null;
  faculty: string | null;
  name: string | null;
  id: string | null;
  mobile: string | null;
}
// Define the initial state
const initialState: AuthState = {
  user: {
    isAdmin: false,
    username: null,
    matric: null,
    email: null,
    department: null,
    level: null,
    faculty: null,
    name: null,
    id: null,
    mobile: null,
    verified: false,
  },
  meta: {
    matric_number: "",
  },
  verified: false,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    verify(state, action: PayloadAction<{ verified: boolean }>) {
      state.verified = action.payload.verified;
    },
    signupData(state, action: PayloadAction<{ matric_number: string }>) {
      state.meta.matric_number = action.payload.matric_number;
      save<AuthState>("auth", state, "OTP sent successfuly");
    },
    login(
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>
    ) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      save<AuthState>("auth", state, "User Login Succesfuly", "login");
    },
    logout(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

// Export the generated actions and the reducer
export const { login, logout, signupData } = authSlice.actions;
export default authSlice.reducer;

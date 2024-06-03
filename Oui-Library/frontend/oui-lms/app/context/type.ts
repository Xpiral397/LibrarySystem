export interface User {
  name: string | null;
  email: string | null;
  department: string | null;
  faculty: string | null;
  gender: string | null;
  number: string | null;
  expected_year_of_graduation: string | null;
  password: string | null;
  matric_number: string | null;
  full_name: string | null;
  otp: number;
  has_confirm_otp: boolean;
  otp_expiration_time: number;
  is_staff: boolean;
  is_active: boolean;
}

export interface AuthMeta {
  matric_number: string | null;
}

export interface AuthData {
  user: User;
  meta: AuthMeta;
  verified: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface InitialData {
  auth: AuthData;
}

const initialData: InitialData = {
  auth: {
    user: {
      name: "",
      email: "",
      department: "",
      faculty: "",
      gender: "",
      number: "",
      expected_year_of_graduation: "",
      password: "",
      matric_number: "",
      full_name: "",
      otp: 0,
      has_confirm_otp: false,
      otp_expiration_time: 0,
      is_staff: false,
      is_active: false,
    },
    meta: {
      matric_number: "",
    },
    verified: false,
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
  },
};

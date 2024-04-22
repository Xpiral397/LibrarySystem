import { toast } from "react-toastify";
import { InitialData } from "../type";

export const initialData = {
  auth: {
    user: {
      name: null,
      email: null,
      department: null,
      faculty: null,
      gender: null,
      number: null,
      expected_year_of_graduation: null,
      password: null,
      matric_number: null,
      full_name: null,
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
export function loadData(): InitialData {
  const loadedData =
    JSON.parse(localStorage.getItem("current_data") ?? "null") ?? initialData;

  return loadedData;
}
export function save<T>(
  slicer: "auth",
  data: T,
  userDisplay?: string,
  type: string = "register"
) {
  const loadedData = loadData();
  loadedData[slicer] = data;
  localStorage.setItem("current_data", JSON.stringify(loadedData));
  toast(
    (userDisplay || (userDisplay == "" && null)) ?? "User information saved",
    {
      position: "top-right",
      type: "success",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
  );
  // console.log(loadedData);
}

export function saveAll(data: any) {
  // const current_user = JSON.parse(localStorage.getItem('current_user')??'null')??initialData
  localStorage.setItem("data-token", JSON.stringify(data));
}

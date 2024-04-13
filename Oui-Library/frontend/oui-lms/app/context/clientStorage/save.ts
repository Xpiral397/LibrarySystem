import { toast } from "react-toastify";

export const initialData = {
  auth: {
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
  },
};

export function save<T>(
  slicer: "auth",
  data: T,
  userDisplay?: string,
  type: string = "register"
) {
  function loadData() {
    const loadedData =
      JSON.parse(localStorage.getItem("current_data") ?? "null") ?? initialData;
    if (type === "register")
      toast("OTP sent successfully", {
        position: "top-right",
        type: "success",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    return loadedData;
  }
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

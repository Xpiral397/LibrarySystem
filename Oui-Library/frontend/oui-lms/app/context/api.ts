import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import store from "./store"; // Assuming you have access to your Redux store here
import { login, logout } from "./reducers/auth";

const api = axios.create({
  baseURL: "http://127.0.01:8000/", // Your API base URL
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `JWT ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: any) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !(originalRequest as any)?._retry
    ) {
      originalRequest._retry = true;
      try {
        // Perform token refresh
        const response = await api.post("/refresh_token", {
          refreshToken: store.getState().auth.refreshToken,
        });
        const { accessToken } = response.data;
        store.dispatch(
          login({
            user: store.getState().auth.user,
            accessToken,
            refreshToken: store.getState().auth.refreshToken,
          })
        );
        // Retry original request with new access token
        return api(originalRequest as InternalAxiosRequestConfig);
      } catch (refreshError) {
        // Refresh token expired, logout user
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

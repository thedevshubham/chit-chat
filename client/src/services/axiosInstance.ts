import axios, { AxiosInstance } from "axios";
import { getTokenFromCookie, logout } from "../components/utils";

const apiConfig: any = {
  baseURL: "http://localhost:4000",
};

const api: AxiosInstance = axios.create(apiConfig);

api.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookie();
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      logout();
    }
  }
);

export default api;

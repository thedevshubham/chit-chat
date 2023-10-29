import { API_URL } from "../components/apiUrls";
import api from "./axiosInstance";

const authService = {
  signup: async (userData: any) => {
    try {
      const response = await api.post(API_URL.SIGNUP, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  login: async (userData: any) => {
    try {
      const response = await api.post(API_URL.LOGIN, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;

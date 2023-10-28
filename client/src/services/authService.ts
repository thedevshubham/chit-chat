import api from "./axiosInstance";

const authService = {
  signup: async (userData: any) => {
    try {
      const response = await api.post("/api/signup", userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  login: async (userData: any) => {
    try {
      const response = await api.post("/api/login", userData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;

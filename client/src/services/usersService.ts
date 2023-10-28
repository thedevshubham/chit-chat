import api from "./axiosInstance";

const usersService = {
  getUsers: async () => {
    try {
      const response = await api.get("/api/users");
      return response;
    } catch (error) {
      throw error;
    }
  },
  addUser: async (userEmail: any) => {
    try {
      const response = await api.post("/api/add-user", userEmail);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default usersService;

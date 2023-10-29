import { API_URL } from "../components/apiUrls";
import api from "./axiosInstance";

const usersService = {
  getUsers: async () => {
    try {
      const response = await api.get(API_URL.LIST_CHAT_USERS);
      return response;
    } catch (error) {
      throw error;
    }
  },
  addUser: async (userEmail: any) => {
    try {
      const response = await api.post(API_URL.ADD_USER_TO_CHAT, userEmail);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default usersService;

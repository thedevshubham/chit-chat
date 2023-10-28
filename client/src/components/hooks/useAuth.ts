import { LOCAL_STORAGE } from "../storageConfig";
import { getFromLocalStorage, getTokenFromCookie } from "../utils";

const useAuth = () => {
  const token = getTokenFromCookie();
  const userDetails = getFromLocalStorage(LOCAL_STORAGE.USER_DETAILS);

  return token && userDetails;
};

export default useAuth;

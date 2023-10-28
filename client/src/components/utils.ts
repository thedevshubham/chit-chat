import { socketReadyPromise } from "../socket.io";

export const initSocketConnection = async (id: any) => {
  try {
    const socket = await socketReadyPromise;

    socket.emit("join_room", { id });
    socket.emit("online", id);
  } catch (error) {
    console.error("Socket connection error:", error);
  }
};

export const setTokenInCookie = (token: any) => {
  document.cookie = `token=${token}; Secure; SameSite=Strict; Path=/`;
};

export const getTokenFromCookie = () => {
  const cookies = document.cookie.split("; ");

  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
  if (tokenCookie) {
    return tokenCookie.split("=")[1];
  }
  return null;
};

export const clearTokenInCookie = () => {
  document.cookie =
    "token=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Strict; Path=/";
};

export const setInLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);

  if (item) {
    return JSON.parse(item);
  } else {
    return null;
  }
};

export const clearFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const removeFromLocalStorage = () => {
  localStorage.clear();
};

export const logout = () => {
  clearTokenInCookie();
  removeFromLocalStorage();
  window.location.pathname = "/login";
};

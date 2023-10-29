import io from "socket.io-client";
import { baseURL } from "./components/utils";

const socket = io(baseURL); // Replace with your server URL

const socketReadyPromise = new Promise((resolve) => {
  socket.on("connect", () => {
    console.log("Socket connected");
    resolve(socket);
  });
});

export default socket;

export { socketReadyPromise };

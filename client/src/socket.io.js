import io from "socket.io-client";

const socket = io("http://localhost:4000"); // Replace with your server URL

const socketReadyPromise = new Promise((resolve) => {
  socket.on("connect", () => {
    console.log("Socket connected");
    resolve(socket);
  });
});

export default socket;

export { socketReadyPromise };

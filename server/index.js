const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io"); // Add this
const port = process.env.PORT || 4001;

const secretKey = "njfui-38729-eiw34-024hfe";

const users = [];
const messageHistory = {};
const socketIdToUserId = new Map();
const onlineUsers = new Set();

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Listen for when the client connects via socket.io-client
io.on("connection", (socket) => {
  socket.on("join_room", ({ id }) => {
    socket.join(id);
  });

  // When a user connects
  socket.on("online", (userId) => {
    socketIdToUserId.set(socket.id, userId); // Map socket ID to user ID
    onlineUsers.add(userId); // Add user to the online list
    io.emit("onlineUsers", Array.from(onlineUsers)); // Emit the updated list to all clients
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    const userId = socketIdToUserId.get(socket.id);
    if (userId) {
      socketIdToUserId.delete(socket.id); // Remove the mapping
      onlineUsers.delete(userId); // Remove the user from the online list
      io.emit("onlineUsers", Array.from(onlineUsers)); // Emit the updated list to all clients
    }
  });

  // Send and receive messages.
  socket.on("send_msg", (payload) => {
    const { senderId, receiverId, message, isUserMessage, userDetails, time } =
      payload;

    socket.to(receiverId).emit("receive_msg", payload);

    // store message history
    messageHistory[senderId][receiverId].push(payload);
    messageHistory[receiverId][senderId].push(payload);

    console.log(messageHistory, "SEND messages", senderId, receiverId);
  });

  socket.on("all_messages", ({ senderId, receiverId }) => {
    const messages = messageHistory[senderId] || [];
    console.log(messageHistory, "ALL messages", messages);
    socket.emit("all_messages", { senderId, messages });
  });

  socket.on("user_typing", ({ senderId, receiverId }) => {
    console.log("callingggg", senderId, receiverId);
    socket.to(receiverId).emit("user_typing", { senderId, receiverId });
  });

  socket.on("user_stopped_typing", ({ senderId, receiverId }) => {
    socket.to(receiverId).emit("user_stopped_typing", { senderId, receiverId });
  });
});

//signup
app.post("/api/signup", (req, res) => {
  const { firstName, lastName, gender, email, password } = req.body;

  if (!firstName || !lastName || !gender || !email || !password) {
    return res.status(400).send("Invalid request");
  }

  // Check if the user already exists
  if (users.some((user) => user.email === email)) {
    return res.status(409).send("User already exists");
  }

  // Create a new user
  let newUser = {
    id: generateUniqueId(),
    firstName,
    lastName,
    gender,
    email,
    password,
  };

  users.push(newUser);

  // Generate and send a JWT token upon successful registration
  const token = jwt.sign({ email: newUser.email }, secretKey, {
    expiresIn: "8h",
  });

  res.status(201).json({
    message: "User registered successfully",
    token,
    expiresIn: "8h",
    user: { firstName, lastName, gender, email, id: newUser.id },
  });
});

//login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Invalid credentials");
  }

  const user = users.find((u) => {
    return u.email === email && u.password === password;
  });

  if (user) {
    // Generate and send a JWT token upon successful login
    const token = jwt.sign({ email: user.email }, secretKey, {
      expiresIn: "8h",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      token,
      expiresIn: "8h",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        email: user.email,
        id: user.id,
      },
    });
  }

  res.status(404).send("User not found");
});

// Protect API routes with authentication middleware
app.use((req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
});

//get users
app.get("/api/users", (req, res) => {
  // Filter out the currently logged-in user from the users array
  const loggedInUser = users.find((user) => user.email === req.user.email);

  const senders = messageHistory[loggedInUser.id];

  if (!senders) {
    res.json({ users: [] });
  } else {
    let otherUsers = users.filter((user) => senders[user.id]);

    for (let idx = 0; idx < otherUsers.length; idx++) {
      otherUsers[idx]["password"] = undefined;
    }

    res.json({ users: otherUsers });
  }
});

//login
app.post("/api/add-user", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Invalid request");
  }

  const user = users.find((u) => u.email === email);

  const loggedInUser = users.find((user) => user.email === req.user.email);

  if (!loggedInUser) {
    return res.status(404).send("Logged in user not found");
  }

  if (!user) {
    return res.status(404).send("User not found");
  }

  if (email === loggedInUser.email) {
    return res.status(400).send("Cannot use admin as a user");
  }

  const newUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    email: user.email,
    id: user.id,
  };

  const userForReceiver = {
    firstName: loggedInUser.firstName,
    lastName: loggedInUser.lastName,
    gender: loggedInUser.gender,
    email: loggedInUser.email,
    id: loggedInUser.id,
  };

  const senderId = loggedInUser.id;
  const receiverId = user.id;

  if (messageHistory[senderId]?.[receiverId]) {
    return res.status(400).send("User already exist in your chat");
  }

  // Store message history
  if (messageHistory[senderId]) {
    messageHistory[senderId][receiverId] = [];
  } else {
    messageHistory[senderId] = {};
    messageHistory[senderId][receiverId] = [];
  }

  if (messageHistory[receiverId]) {
    messageHistory[receiverId][senderId] = [];
  } else {
    messageHistory[receiverId] = {};
    messageHistory[receiverId][senderId] = [];
  }

  // Emit a socket event here
  io.to(receiverId).emit("user-added", {
    senderId,
    receiverId,
    user: userForReceiver,
  });

  return res.status(200).json({
    message: "User added in successfully",
    user: newUser,
  });
});

server.listen(port, () => `Server is running on port ${port}`);

// methods
const generateUniqueId = () => {
  return "kweur" + Math.floor(Math.random() * 10000);
};

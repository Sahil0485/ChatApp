const express = require("express");
const app = express();
require("dotenv").config();
require("./config/database.js");
const userRoute = require("./routes/userRoute.js");
const messageRoute = require("./routes/messageRoute.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT;

// Creatin Socket for live chating
const { Server } = require("socket.io");
const { createServer } = require("http");
const server = createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsOption));

// Creating socket connection
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// All routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

//Creating Socket
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != undefined) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

//If socket is not in use change server.listen to app.listen
server.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});

// socket.js
const { Server } = require("socket.io");
// const { createServer } = require("http");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== undefined) {
      userSocketMap[userId] = socket.id;
      socket.data.userId = userId; // Store userId in socket's data
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
      const userId = socket.data.userId;
      if (userId) {
        delete userSocketMap[userId];
      }
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
};

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId -> socketId}

const getIo = () => io;

module.exports = { initSocket, getReceiverSocketId, getIo };

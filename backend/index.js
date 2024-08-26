const express = require("express");
const app = express();
require("dotenv").config();
require("./config/database.js");
const userRoute = require("./routes/userRoute.js");
const messageRoute = require("./routes/messageRoute.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 8080; // Add default port

// Import socket handling
const { initSocket } = require("./socket.js");
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

// Initialize Socket.IO
initSocket(server);

// All routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Start the server
server.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});

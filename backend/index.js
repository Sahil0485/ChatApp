const express = require("express");
const app = express();
require("dotenv").config();
require("./config/database.js");
const userRoute = require("./routes/userRoute.js");
const messageRoute = require("./routes/messageRoute.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOption));

// All routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});

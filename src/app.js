const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./Config/database");
const cookieParser = require("cookie-parser");

const authRouter = require("../src/routes/auth");
const profileRouter = require("../src/routes/profile");
const requestRouter = require("../src/routes/request");
const UserRouter = require("../src/routes/user");

//middleware
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", UserRouter);

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });

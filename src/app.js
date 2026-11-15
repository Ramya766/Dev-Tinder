const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./Config/database");
const User = require("./models/user");
const {userAuth } = require("./middlewares/auth");
//authentication
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

//password hashing
const bcrypt = require("bcrypt");

//middleware
const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();

    res.send("User registered successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = user.validatePassword(password);
    if (isPasswordValid) {
      //create a jwt token
      const token = await user.getJWT();
      console.log(token);
      //add the token to the cookie and send it to the user
      res.cookie("token", token);
      res.send("Login successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.get("/profile",userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});


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

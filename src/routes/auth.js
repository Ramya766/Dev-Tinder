const express = require('express');
const authRouter = express.Router();

const User = require("../models/user");
//authentication
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

//password hashing
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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

authRouter.post("/logout",async(req,res)=>{
    res.clearCookie("token",null,{expires:new Date(Date.now())});
    res.send("Logout successful");
})



module.exports = authRouter;
const express = require("express");
const connectDB = require("./Config/database");
const User=require("./models/user");
const app = express();
app.post("/signup",async (req,res)=>{
  const user=new User({
    firstName:"Ram",
    lastName:"S",
    emailId:"ram123@gmail.com",
    password:"ram@123"
  })
  await user.save();
  res.send("User created successfully");

})
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


  
const express = require("express");
const connectDB = require("./Config/database");
const User = require("./models/user");
const app = express();
app.use(express.json());
app.get("/user", async (req, res) => {
  try {
    const users = await User.findOne({ emailId: req.body.emailId });
    if (!users) {
      res.status(404).send("User not found!!");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went worng!!");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went worng!!");
  }
});
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("Error saving data" + err.message);
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

const express = require("express");
const app = express();
app.get("/user", (req, res) => {
  //throw new Error("djbjld;fkn ls"); //creating error for testing
  res.send("User Data!!");
});
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Internal Server Error: ");
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

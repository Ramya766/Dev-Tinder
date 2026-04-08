const express = require("express");
const app = express();
//authorize logic for all admin requests
const auth=require("./middlewares/auth");
app.use("/admin",auth);
app.get("/admin/getData", (req, res) => {
  res.send("All User Data");
});
app.get("/admin/delete", (req, res) => {
  res.send("User Deleted!!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

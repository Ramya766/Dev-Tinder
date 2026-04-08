const express = require("express");
const app = express();
//authorize logic for all admin requests
app.use("/admin", (req, res, next) => {
  console.log("Auth called!!");
  const token = "xyz123";
  const auth = token === "xyz123";
  if (!auth) {
    res.status(401).send("Unauthorized user!");
  } else {
    next();
  }
});
app.get("/admin/getData", (req, res) => {
  res.send("All User Data");
});
app.get("/admin/delete", (req, res) => {
  res.send("User Deleted!!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

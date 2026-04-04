const express = require("express");
const app = express();
//request handlers
app.get("/user/:userID/:name",(req,res)=>{
  console.log(req.params);
  res.send("Hello user!!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});



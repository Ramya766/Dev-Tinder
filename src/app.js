const express = require("express");
const app = express();
//request handlers
app.get("/user",(req,res)=>{
  res.send("Hello user!!");
});
app.post("/user",(req,res)=>{
  res.send("User Data saved to DB successfully!!");
})
app.delete("/user",(req,res)=>{
  res.send("Data deleted successfully!!");
})
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});



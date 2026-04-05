const express = require("express");
const app = express();

app.use("/user",[(req,res,next)=>{
  const response="Ram"; //doubt
  console.log("response1");
  
  next();
  res.send(response);
},(req,res)=>{
  console.log("response2");
  res.send("response2");
 
}]);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});



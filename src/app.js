const express=require('express');
const app=express();
//request handlers
app.use("/Hey",(req,res)=>{
    res.send("Hey Hii I'm the Server!!");
});
app.use("/test",(req,res)=>{
    res.send("Deep Divee!!");
});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});


//Created My First Server Hurrry!!

const mongoose =require('mongoose');
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://ramya766_db_user:NYe62QPJzNJ2yu8i@devtinder-db.o9xfcp5.mongodb.net/");
};
connectDB().then(()=>{
    console.log("Database connected successfully");
})
.catch((err)=>{
    console.log("Database connection failed",err);
})
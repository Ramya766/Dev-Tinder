const mongoose = require("mongoose"); //to get mongoose 
const connectDB = async () => {
  await mongoose.connect("mongodb+srv://ramya766_db_user:thamizh%402003@devtinderdb.d5rrvcc.mongodb.net/devtinderdb");
}; //this mongoose connect returns us a promise


module.exports = connectDB;



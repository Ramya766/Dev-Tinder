const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ramya766_db_user:NYe62QPJzNJ2yu8i@devtinder-db.wk6yuyz.mongodb.net/devTinder"
  );
};

module.exports = connectDB;



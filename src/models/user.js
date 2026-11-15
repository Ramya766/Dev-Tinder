const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

userSchema.methods.getJWT = async function () {
  //arrow fn cannot be used here
  const user = this;
  const token = await jwt.sign({ id: user._id }, "RAMYA$$BILLINOR",{expiresIn: "7d"});
  return token;
}


userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
  return isPasswordValid;
}



//const Usermodel = mongoose.model("User",userSchema);
//module.exports=UserModel; or

module.exports=mongoose.model("User",userSchema);

//to create a model we do mongoose.model(schema name ,schema)

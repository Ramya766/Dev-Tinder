const express = require('express');
const profileRouter = express.Router();

const {userAuth } = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");

profileRouter.get("/profile/view",userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/edit",userAuth, async(req,res)=>{
  try{
    if(!validateEditProfileData(req)){
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((field)=>{
      loggedInUser[field] = req.body[field];
    });

    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });

  }catch(err){
    res.status(400).send("Error: " + err.message);
  }
})

//Forgotpassword API



module.exports = profileRouter;
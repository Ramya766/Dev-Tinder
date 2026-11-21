const express = require('express');
const mongoose = require('mongoose');
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored","intrested"];
        if(!allowedStatus.includes(status)){
            return re.status(400).json({message:"Invalid status type: "+status});
        }

        //check if toUser exist in our DB
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message:"User not found!"});
        }

        //duplicate Connection request check 

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId, toUserId:fromUserId},
            ],
        });

        if(existingConnectionRequest){
            return res.status(400).send({message:"Connection Request Already Exists!!"});
        }



        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();
        res.json({
            message: req.user.firstName+" is "+ status +" in "+ toUser.firstName,
            data,
        })



    }catch(err){
        res.status(400).send("Error: "+err.message);
    }
});

//for accepted or rejected connection request
requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const {status,requestId} = req.params;

        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status type: "+status});
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status :"intrested",
        });
        if(!connectionRequest){
            return res.status(404).json({message:"Connection Request Not Found!!"});
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({message:"Connection Request "+status,data});

    }catch(err){
        return res.status(400).send("Error: "+err.message);
    }
})



module.exports = requestRouter;
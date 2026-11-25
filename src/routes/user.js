const express = require("express");
const UserRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const SAFEDATA = "firstName lastName photoUrl age gender about skills";
const ConnectionRequest = require("../models/connectionRequest");
UserRouter.get("/user/request/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionrequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "intrested",
    }).populate("fromUserId", SAFEDATA);
    //another way of writing using array when write wit string use space
    //.populate("fromUserId",["firstName","lastName"]);
    res.json({
      message: "Connection Requests Recieved",
      data: connectionrequest,
    });
  } catch (err) {
    return res.status(400).json({ message: "Error: " + err.message });
  }
});

UserRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId", SAFEDATA);
    const data = connectionRequests.map((row) => row.fromUserId);
    res.json({data});
  } catch (err) {
    return res.status(400).json({ message: "Error: " + err.message });
  }
});
module.exports = UserRouter;

const mongoose = require('mongoose');

const ConnectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
        //whyy??
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","intrested","accepted","rejected"],
            message:`{VALUE} is not a valid status type`
        }
    },
},    {timestamps:true}
);

ConnectionRequestSchema.index({fromUserId:1,toUserId:1});

ConnectionRequestSchema.pre("save",function(next){
    const connectionRequest = this; //don't know whyy
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot Send Connection request to YourSelf!!");
    }
    //next();
});

const ConnectionRequestModel = new mongoose.model("ConnectionRequest",ConnectionRequestSchema);

module.exports = ConnectionRequestModel;
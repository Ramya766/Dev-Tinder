const mongoose = require('mongoose');

const ConnectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
        //whyy??
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
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

const ConnectionRequestModel = new mongoose.model("ConnectionRequest",ConnectionRequestSchema);

module.exports = ConnectionRequestModel;
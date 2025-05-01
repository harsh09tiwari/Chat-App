import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    senderId: {
        type : String,
        required : true,
    },
    receiverId: {
        type : String,
        required : true,
    },
    status: {
        type : String,
        enum : ["pending", "accepted", "rejected"],
        default : "pending",
    },
});

const FriendRequest = mongoose.model("FriendRequest", requestSchema);

export default FriendRequest;
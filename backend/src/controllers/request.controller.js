import { User } from "../models/user.model";
import { FriendRequest } from "../models/request.model.js";


//   for searching the user
export const searchUser = async (req, res) => {
   try {
    const {email} = req.query
    const currentUser = req.User

    if(!email){
        return res.status(400).json({message: "Email is Required"})
    }
    const user = await User.findOne({
        email: email.toLowerCase(),
        _id: {$ne: currentUser._id} //   Excluding the current User.   $ne stands for not equal
    }).select("-password")  //  select everything accept passoword

    if (!user) {
        return res.status(400).json({message: "User not found"})
    }

    //   Check if already friends
    const isAlreadyFriend = currentUser.friends.includes(user._id);   

    const existingRequest = await FriendRequest.findOne({
        $or : [
            { senderId : currentUser._id, receiverId: user._id },
            { senderId : user._id, receiverId : currentUser._id }
        ]
    })

    res.json({
        user: {
            _id : user._id,
            email : user.email,
            fullname : user.fullName,
            profilePic : user.profilePic
        },

        isAlreadyFriend,

        requestStatus: existingRequest ? existingRequest.status : null,
        canSendRequest: !isAlreadyFriend && !existingRequest 
    })

   } catch (error) {
    console.log("Error in searchUser controller: ", error.message);
    res.status(500).json({message: "Intenal Server Error"})
   } 
}



// Send friend request 

export const sendFriendRequest = async (req, res) => {
    try {
        const {receiverEmail} = req.body;
        const senderId = req.user._id;

        // Find friend
        const receiver = await User.findOne({email : receiverEmail.toLowerCase()})

        if (!receiver) {
            return res.statu(400).json({message : "User not found"})
        }

        // Check if sending request to self
        if (senderId.toString() === receiver._id.toString()) {
            return res.status(400).json({message : "Cannot send friend request to yourself"})
        }

        // check if already friends
        const sender = await User.findById(senderId)
        if (sender.friends.includes(receiver._id)) {
            return res.status(400).json({message : "Already friends with this user"})
        }

        // check if the request is already exitst
        const existingRequest  = await FriendRequest.findOne({
            $or : [
                {sender : senderId, receiver : receiver._id},
                {sender : receiver._id, receiver : senderId}
            ]
        })    //   $or is like logical OR opearator
        if (existingRequest) {
            if (existingRequest.status === "pending") {
                return res.status(400).json({ error: "Friend request already sent" });
            } else if (existingRequest.status === "declined") {
                // Allow resending if previously declined
                existingRequest.status = "pending";
                existingRequest.sender = senderId;
                existingRequest.receiver = receiver._id;
                await existingRequest.save();
            }
        }

        // Creating Friend Request
        const friendRequest = new FriendRequest({
            sender : senderId,
            receiver : receiver._id
        })

        await friendRequest.save();   // saving the request to database

        //  Emit socket event for real time communication\
        const io = req.app.get("io")
        if (io) {
            io.to(receiver._id.toString()).emit("friend_request_received", {
                request: {
                    _id: existingRequest?._id || friendRequest._id,
                    sender: {
                        _id: sender._id,
                        fullName: sender.fullName,
                        email: sender.email,
                        profilePic: sender.profilePic
                    },
                    createdAt: existingRequest?.createdAt || friendRequest.createdAt
                }
            });
        }

        res.status(200).json({ message: "Friend request sent successfully" });

    } catch (error) {
        console.log("Eroor in sendFriendRequest controller", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}




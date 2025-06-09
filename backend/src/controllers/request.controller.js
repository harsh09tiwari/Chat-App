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
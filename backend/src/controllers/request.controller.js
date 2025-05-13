import {FriendRequest} from '../models/request.model.js';
import { User } from '../models/user.model.js';


//   sending the friend request

const sendRequest = async (req, res) => {
    try {
        const senderId = req.user._id //  //  getting the senderId from the token
        const {receiverId} = req.body

        if (senderId === receiverId) {
            return res.status(400).json({message : "You cannot send request to yourself."})
        }

        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({message : "Receiver not found."})
        }

        const existingRequest = await FriendRequest.findOne({
           $or: [
            {senderId : senderId, receiverId: receiverId},
            {receiverId : senderId, senderId: receiverId},
           ],
           status: {$in: ["pending", "accepted"]}
        }) 
         if (existingRequest) {
            return res.status(400).json({message : "Request already sent or accepted."})
         }

         const newFriendRequest = new FriendRequest({
            senderId,
            receiverId,
         })
         await newFriendRequest.save()
         return res.status(201).json({message: "Friend request sent successfully.", request: newFriendRequest})

    } catch (error) {
        console.log("Error in sendRequest controller: ", error.message);
        return res.status(500).json({message : "Internal Server Error"})   
    }
}




//   accepting the friend request

const acceptRequest = async (req, res) => {
    try {
        const loggedInUserId = req.user._id   //   or receiverId
        const {requestId} = req.params

        const request = await FriendRequest.findById(requestId)
        if (!request || request.status !== "pending") {
            return res.status(404).json({message : "Request not found or already handled."})
        }
        
        request.status = "accepted"
        await request.save()
        return res.status(200).json({message: "Friend request accepted successfully.", request})

    } catch (error) {
        console.log("Error in acceptRequest controller: ", error.message);
        return res.status(500).json({message : "Internal Server Error"})   
    }
}


const rejectRequest = async (req, res) => {
    try {
        const loggedInUserId = req.user._id   //   or receiverId
        const {requestId} = req.params 

        const request = await FriendRequest.findById(requestId)

        if (!request || request.status !== "pending") {
            return res.status(404).json({message : "Request not found or already handled."})

        }

        request.status = "rejected"
        await request.save()

        res.status(200).json({message : "Friend request rejected successfully.", request})
    } catch (error) {
        console.log("Error in rejectRequest controller:", error.message);
        res.status(500).json({message : "Internal Server Error"})
    }
}
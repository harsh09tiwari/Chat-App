import {FriendRequest} from '../models/request.model.js';
import { User } from '../models/user.model.js';


//   sending the friend request

const sendRequest = async (req, res) => {
    try {
        const senderId = req.user._id //  getting the senderId from the token
        const {receiverId} = req.body  // getting the receiverId from the request body

        if (senderId === receiverId) {
            return res.status(400).json({message : "You cannot send request to yourself."})
        }

        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({message : "Receiver not found."})
        }

        const existingRequest = await FriendRequest.findOne({  // checking if the request already exists
           $or: [
            {senderId : senderId, receiverId: receiverId},
            {receiverId : senderId, senderId: receiverId},
           ],  // checking both directions as a user can send request to another user and vice versa
           status: {$in: ["pending", "accepted"]}
        }) 

        if (existingRequest) {   
           return res.status(400).json({message : "Request already sent or accepted."}) 
        }

        const newFriendRequest = new FriendRequest({   
           senderId,
           receiverId,
        })   // creating a new friend request

        //   saving the new friend request
        
        await newFriendRequest.save()
        return res.status(201).json({message: "Friend request sent successfully.", request: newFriendRequest})
    }
    catch (error) {
        console.log("Error in sendRequest controller: ", error.message);
        return res.status(500).json({message : "Internal Server Error"})   
    }
}




//   accepting the friend request

const acceptRequest = async (req, res) => {
    try {
        const loggedInUserId = req.user._id   //   or receiverId
        const {requestId} = req.params   // getting the requestId from the request params

        const request = await FriendRequest.findById(requestId)
        if (!request || request.status !== "pending") {
            return res.status(404).json({message : "Request not found or already handled."})
        }
        
        request.status = "accepted"   // updating the status of the request to accepted
        // updating the sender and receiver's friends list may needed
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

const getFriendRequests = async (req, res) => {
    try {
        const userId = req.user._id; // Get the logged-in user's ID from the token

        const accpetedRequests = await FriendRequest.find({
            $or: [  // find requests where the user is either the sender or receiver
                { senderId: userId },
                { receiverId : userId }
            ],
            status: "accepted"  // only get the accepted requests
        }).populate("senderId receiverId", "email name")  // populate the sender and receiver fields with their email and name

        //  extract friend info (exclude the logged-in user from the list)
        const friends = acceptedRequests.map(req => {
            const friend =
                req.senderId._id.toString() === userId.toString() ? req.receiverId : req.senderId;

            return friend;
        })

        
    } catch (error) {
        console.log("Error in getFriendRequests controller:", error.message);
        res.status(500).json({message : "Internal Server Error"})
    }
}

export {
    sendRequest,
    acceptRequest,
    rejectRequest,
    getFriendRequests
}
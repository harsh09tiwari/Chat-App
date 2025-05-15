import cloudinary from "../lib/cloudinary.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";


export const getUsersForSidebar = async(req, res) => { 
 try {
    const loggedInUserId = req.user._id  

    //   {_id:{$ne:loggedInUserId}}     this is telling moongose to find all the user except the loggedIn user. =>  the current user  
    const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")

    res.status(200).json(filteredUsers)
 } catch (error) {
    console.log("Error in getUserForSidebar controller: ", error.message);
    return res.status(500).json({message : "Internal Server Error"})
 }   
}

//    getting the messages between the users
export const getUserMessages = async (req, res) => {
    try {
        const {id:userToChatId} =req.params     //   id   =>  bcoz we named it :id  in route
        const myId = req.user._id

        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getUserMessage controller: ", error.message);
        return res.status(500).json({message : "Internal Server Error"})
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {text, image, video} = req.body
        const {id:  receiverId} = req.params    ///   renaming the id to receiverId
        const senderId = req.user._id


//   creating the url for image and video
        let imageUrl;
        if (image) {
            //   if user is giving the image upload it to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl =  uploadResponse.secure_url    //     giving url to iamgeUrl
        }

        let videoUrl;
        if (video) {
            const uploadResponse =await cloudinary.uploader.upload(video, {
                resource_type: "video"
            })
            videoUrl = uploadResponse.secure_url
        }


//   creating the new message
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image : imageUrl,
            video : videoUrl,
        })

        await newMessage.save();      //   saving the message to the database



        return res.status(200).json(newMessage)

    } catch (error) {
        console.log("Error in getUserMessage controller: ", error.message);
        return res.status(500).json({message : "Internal Server Error"})
    }
}
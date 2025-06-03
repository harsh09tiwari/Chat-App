import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true
        },
        fullName : {
            type : String,
            required : true,
        },
        password : {
            type : String,
            required : true,
            minlength : 6,
        },
        profilePic : {
            type : String,
            default : "",
        },
        friends: [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",

        }]
    },{timestamps : true}
)

export const User = mongoose.model("User", userSchema)
//   to able to signUp, login, logout a user we need a database.
import { generateToken } from "../lib/utils.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"


//   FOR SIGN UP A USER.
export const signUp = async (req, res)=> {
    const {email, fullName, password} = req.body
    try {
        if (!email || !fullName || !password) {
            return res.status(400).json({message: "Please provide all details"})
        }
        
        if (password.length < 6) {
            return res.status(400).json({message : "Password must be of at least 6 character"});
        }

        const user = await User.findOne({email})
        if (user) {
            return res.status(400).json({message : "Email already exists"})
        }
        
        //   hash password
        const salt = await bcrypt.genSalt(10)  //The name "salt" is just a convention that reflects the cryptographic concept. And "genSalt()" is a bcrypt library method name. 
        const hashedPassword = await bcrypt.hash(password,salt)   //   adding the random value to the password
        const newUser = await User.create({
            fullName,    // since both are same so can be written as single fullName : fullName,
            email,       // same goes for this   email : email,
            password : hashedPassword
        })
        
        if (newUser) {
            // generate jwt token here
            generateToken(newUser._id, res)
            await newUser.save();
            
            // console.log("here1");
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({message : "Invalid user data"})
        }
        
    } catch (error) {
        console.log("Error in signUp controller", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}



//  FOR LOGING IN A USER
export const login = async (req, res)=> {
    const {email, password} = req.body
    
    try {
        if(!email || !password){
            return res(400).json({message : "pleses provide all details"})
        }
    
        const user = await User.findOne({email})
        if (!user) {
            return res(401).json({message: "Invalid credentials"})
        }
    
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res(401).json({message : "Invalid credentials"})
        }

        generateToken(user._id, res)
        
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })

    } catch (error) {
        console.log("Enter in login Controller", error.message);
        res.status(500).json({message : "Internal Server Error"})
    }
};



//  FOR LOGOUT A USER
export const logout = (req, res)=> {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message: "Logged Out Successfully"})
    } catch (error) {
        console.log("Enter in logout Controller", error.message);
        res.status(500).json({message : "Internal Server Error"})  
    }
}

export const deleteUser = (req, res)=> {
    res.send("s route")
}
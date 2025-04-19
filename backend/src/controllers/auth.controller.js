//   to able to signUp, login, logout a user we need a database.
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signUp = async (req, res)=> {
    const {email, fullName, password} = req.body
    try {
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

        const newUser = ({
            fullName,    // since both are same so can be written as single  fullName : fullName,
            email,       // same goes for this   email : email,
            password : hashedPassword
        })
    
        if (newUser) {
            
        } else {
            res.status(400).json({message : "Invalid user data"})
        }
        
    } catch (error) {
        
    }
}

export const login = (req, res)=> {
    res.send("signUp route")
}

export const logout = (req, res)=> {
    res.send("s route")
}
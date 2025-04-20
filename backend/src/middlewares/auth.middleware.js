import jwt from 'jsonwebtoken'    ///   for validating the token
import {User} from '../models/user.model.js'   //  for finding the user in db

const protectRoute = async(req, res, next) => {
    try {
//   cookies se token lene ke liye index.js me cookie-parser import karte hai        
        const token = req.cookies.jwt;    ///   searching for token
        
        if (!token) {
            return res.status(401).json({message : "Unauthorized => Token missing"})
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedToken) {
            return res.status(401).json({message : "Unauthorized => Invalid Token"})
        }

        const user = await User.findById(decodedToken.userId).select("-password")

        if (!user) {
            return res.status(401).json({message : "User not found"})
        }

        req.user = user;     //   adding user field to the req
        next();        //   calling upadteProfile  =>  check in route

    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        return res.status(500).json({message : "Internal Server Error"})
    }
}

export default protectRoute;










// authentication middleware step-by-step. This middleware will:

// ✅ Check if a valid JWT token is present in the cookies
// ✅ Verify the token
// ✅ Find the user from DB and attach it to req.user
// ✅ Call next() to let the request go to the protected route
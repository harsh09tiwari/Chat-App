import express from "express"   //  for using the import and export change the type in package.json to "module" from common.js
import authRoutes from "./routes/auth.route.js";    //  route for user authentication
import messageRoutes from "./routes/message.route.js"   //   route for message

import dotenv from "dotenv"

import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from 'cors'; //  for using cors in express

import { server, app } from "./lib/socket.js";


dotenv.config()

const PORT = process.env.PORT

app.use(express.json({ limit: '50mb' })); // for JSON payloads
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // for URL-encoded payloads

app.use(cookieParser());
app.use(express.json());
app.use(cors({ 
    origin : "http://localhost:5173",   //  //  origin of the frontend app
    credentials : true,   //  //  allow credentials to be sent with the request
}))  

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)




server.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
    connectDB()
})
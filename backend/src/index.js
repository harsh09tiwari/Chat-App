import express from "express"   //  for using the import and export change the type in package.json to "module" from common.js
import authRoutes from "./routes/auth.route.js";    //  route for user authentication
import messageRoutes from "./routes/message.route.js"   //   route for message

import dotenv from "dotenv"

import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from 'cors'; //  for using cors in express

import { server, app } from "./lib/socket.js";

import path from "path"; //  for using path module in express


dotenv.config()

const PORT = process.env.PORT
const __dirname = path.resolve(); //  for getting the current directory name

app.use(express.json({ limit: '50mb' })); // for JSON payloads
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // for URL-encoded payloads

app.use(cookieParser());
app.use(cors({ 
    origin : "http://localhost:5173",   //  //  origin of the frontend app
    credentials : true,   //  //  allow credentials to be sent with the request
}))  

// API routes - these should come BEFORE the wildcard route
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist"))); //  for serving the frontend files in production
    
    // Catch-all handler: send back React's index.html file for non-API routes
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
} else {
    // Development route to handle non-existent routes
    app.use("*", (req, res) => {
        res.status(404).json({ message: 'Route not found' });
    });
}

server.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
    connectDB()
})
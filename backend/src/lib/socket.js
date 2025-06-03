import {Server} from "socket.io"
import http from "http";
import express from "express";



const app = express();

const server = http.createServer(app);

// Middleware to parse JSON requests
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
})

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];  //  This function is used to get the socket ID of the receiver user for sending messages 
}

//  used to store online users
const userSocketMap = {};  //   {userId: socketId}   =>  key : value    userId from database and socketId from io connection
  
io.on("connection", (socket)=>{
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId    // getting userId from the query parameter sent from the client side
    if (userId) {  // checking if userId is present
        userSocketMap[userId] = socket.id   //   mapping a user ID to their unique Socket.IO connection ID for storing it in userSocketMap


        //  io.emit() is used to send events to all connected clients
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    }

    socket.on("disconnect", ()=>{
        console.log("A user disconnect", socket.id);  
        delete userSocketMap[userId];
         io.emit("getOnlineUsers", Object.keys(userSocketMap))
    });
})

export  {io, server, app};
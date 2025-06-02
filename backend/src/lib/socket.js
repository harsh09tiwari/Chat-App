import {Server} from "socket.io"
import http from "http";
import express from "express";
import { log } from "console";


const app = express();

const server = http.createServer(app);

// Middleware to parse JSON requests
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
})

io.on("connection", (socket)=>{
    console.log("A user connected", socket.id);

    socket.on("disconnect", ()=>{
        console.log("A user disconnect", socket.id);  
    });
})

export  {io, server, app};
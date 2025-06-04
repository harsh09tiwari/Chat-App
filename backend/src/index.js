import express from "express"
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from 'cors';
import { server, app } from "./lib/socket.js";
import path from "path";

dotenv.config()

const PORT = process.env.PORT
const __dirname = path.resolve();

// Basic middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(cors({ 
    origin : "http://localhost:5173",
    credentials : true,
}));

// Test basic route first
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working' });
});

// Add API routes one by one to identify which one causes the issue
console.log('Adding auth routes...');
app.use("/api/auth", authRoutes);

console.log('Adding message routes...');
app.use("/api/messages", messageRoutes);

// Only add production routes if we're in production
if (process.env.NODE_ENV === "production") {
    console.log('Adding production static files...');
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
}

// Simple fallback without any wildcards
app.use((req, res) => {
    if (process.env.NODE_ENV === "production" && !req.path.startsWith('/api')) {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    } else {
        res.status(404).json({ message: 'Route not found', path: req.path });
    }
});

server.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
    connectDB()
})
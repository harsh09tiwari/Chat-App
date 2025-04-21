import express from "express"   //  for using the import and export change the type in package.json to "module" from common.js
import authRoutes from "./routes/auth.route.js";    //  route for user authentication
import messageRoutes from "./routes/message.route.js"   //   route for message
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"

dotenv.config()
const app = express();

const PORT = process.env.PORT

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
    connectDB()
})
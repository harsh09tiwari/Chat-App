import express from "express"   //  for using the import and export change the type in package.json to "module" from common.js
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"

dotenv.config()
const app = express();

const PORT = process.env.PORT

app.use(express.json());

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
    connectDB()
})
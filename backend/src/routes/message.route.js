import express from "express"
import protectRoute from "../middlewares/auth.middleware.js";
import { getUsersForSidebar } from "../controllers/message.controller.js";
import { getUserMessages } from "../controllers/message.controller.js";
import { sendMessage } from "../controllers/message.controller.js";



const router = express.Router()

router.get("/users", protectRoute, getUsersForSidebar)
router.get("/:id", protectRoute, getUserMessages)

router.post("/send/:id", protectRoute, sendMessage);    //  endpoint for sending messages

export default router;
import express from "express"
import { login, logout, signUp, deleteUser, updateProfile, checkAuth } from "../controllers/auth.controller.js"
import protectRoute from "../middlewares/auth.middleware.js"


const router = express.Router()

//     AUTHENTICATION CONTROLLER
router.post("/signUp", signUp)
router.post("/login", login)
router.post("/logout", protectRoute, logout)
router.post("/delete", protectRoute, deleteUser)

router.put("/update-profile", protectRoute, updateProfile)

router.get("/check", protectRoute, checkAuth)

export default router
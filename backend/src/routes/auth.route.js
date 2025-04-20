import express from "express"
import { login, logout, signUp, deleteUser } from "../controllers/auth.controller.js"


const router = express.Router()

//     AUTHENTICATION CONTROLLER
router.post("/signUp", signUp)
router.post("/login", login)
router.post("/logout", logout)
router.post("/delete", deleteUser)


export default router
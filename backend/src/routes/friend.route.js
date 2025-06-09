import express from "express";
import User from "../models/user.model.js";
import FriendRequest from "../models/request.model.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = express.Router();


router.get("/send-request", protectRoute, )

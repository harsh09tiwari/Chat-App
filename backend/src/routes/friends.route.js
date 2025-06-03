import express from "express";
import protectRoute from "../middlewares/auth.middleware.js";
import {
  sendRequest,
  acceptRequest,
  rejectRequest,
  getFriendRequests,
} from "../controllers/request.controller.js";

const router = express.Router();

router.post("/send", protectRoute, sendRequest);
router.post("/accept/:requestId", protectRoute, acceptRequest);
router.post("/reject/:requestId", protectRoute, rejectRequest);
router.get("/list", protectRoute, getFriendRequests);


export default router;

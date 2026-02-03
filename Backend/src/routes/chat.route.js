import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getChats, getOrCreateChat } from "../controllers/chat.controller.js";

const router = Router();

router.get("/", protectRoute, getChats );
router.post("/with/:participant", protectRoute, getOrCreateChat );

export default router;
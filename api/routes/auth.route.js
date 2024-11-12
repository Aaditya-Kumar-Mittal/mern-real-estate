import express from "express";
import { signin, signup, google } from "../controllers/auth.controller.js";

const router = express.Router();

// Correct endpoint paths
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);

export default router;
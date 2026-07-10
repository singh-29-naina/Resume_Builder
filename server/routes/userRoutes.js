import express from "express";

import {
    registerUser,
    loginUser,
    getUserBYId,
    getUserResumes
} from "../controllers/userController.js";

import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/data", protect, getUserBYId);

router.get("/resumes", protect, getUserResumes);

export default router;
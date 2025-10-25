import express from "express";
import { checkLogin, login, logOut, signUp, updateProfile } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.post("/logout", logOut);

router.put("/update-profile",protectedRoute, updateProfile);

router.get('/check',protectedRoute,checkLogin)

export default router;

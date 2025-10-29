import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUserForSideBar,
  sendMessage,
  editMessage,
  deleteMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectedRoute, getUserForSideBar);
router.get("/:id", protectedRoute, getMessages);
router.post("/send/:id", protectedRoute, sendMessage);
router.put("/edit/:id", protectedRoute, editMessage);
router.delete("/delete/:id", protectedRoute, deleteMessage);

export default router;
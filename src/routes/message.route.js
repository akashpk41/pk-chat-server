import express from "express";
import {
  deleteMessage,
  editMessage,
  getMessages,
  getUserForSideBar,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", protectedRoute, getUserForSideBar);
router.get("/:id", protectedRoute, getMessages);
router.post("/send/:id", protectedRoute, sendMessage);
router.put("/edit/:id", protectedRoute, editMessage);
router.delete("/delete/:id", protectedRoute, deleteMessage);

export default router;

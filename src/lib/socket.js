import { Server } from "socket.io";
import express from "express";
import http from "http";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// store online users
const userSocketMap = {};

// store typing status
const typingUsers = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // send events to all the connected users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle typing events
  socket.on("typing", ({ senderId, receiverId }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userTyping", { userId: senderId });
    }
  });

  socket.on("stopTyping", ({ senderId, receiverId }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userStopTyping", { userId: senderId });
    }
  });

  // Handle message seen events
  socket.on("messageSeen", async ({ senderId, receiverId, messageIds }) => {
    console.log("🔔 Received messageSeen event:", { senderId, receiverId, messageIds });

    try {
      // Update messages in database
      const result = await import("../models/message.model.js").then(({ default: Message }) => {
        return Message.updateMany(
          {
            _id: { $in: messageIds },
            receiverId: receiverId,
            seen: false
          },
          {
            seen: true,
            seenAt: new Date()
          }
        );
      });

      console.log("✅ Database updated:", result.modifiedCount, "messages");

      // Notify sender
      const senderSocketId = getReceiverSocketId(senderId);
      console.log("📤 Sending to sender:", senderId, "socketId:", senderSocketId);

      if (senderSocketId) {
        io.to(senderSocketId).emit("messageSeenUpdate", {
          userId: receiverId,
          messageIds
        });
        console.log("✅ messageSeenUpdate emitted to sender");
      } else {
        console.log("⚠️ Sender not online");
      }
    } catch (error) {
      console.error("❌ Error marking messages as seen:", error);
    }
  });

  // Handle chat opened (mark all messages as seen)
  socket.on("chatOpened", async ({ userId, otherUserId }) => {
    try {
      // Mark all messages from otherUser to userId as seen
      await import("../models/message.model.js").then(({ default: Message }) => {
        return Message.updateMany(
          {
            senderId: otherUserId,
            receiverId: userId,
            seen: false
          },
          {
            seen: true,
            seenAt: new Date()
          }
        );
      });

      // Notify the other user
      const otherUserSocketId = getReceiverSocketId(otherUserId);
      if (otherUserSocketId) {
        io.to(otherUserSocketId).emit("chatOpenedBy", { userId });
      }
    } catch (error) {
      console.error("Error in chat opened:", error);
    }
  });

  socket.on("disconnect", async () => {
    // add last seen to the user
    try {
      await User.findByIdAndUpdate(userId, {
        lastSeen: new Date(),
      });
    } catch (error) {
      console.error("Error updating lastSeen:", error);
    }

    delete userSocketMap[userId];
    delete typingUsers[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
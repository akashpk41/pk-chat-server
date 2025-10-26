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

io.on("connection", (socket) => {
  // console.log(`A User Connected`, socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  //  send events to all the connected users;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));



  socket.on("disconnect", async () => {
    // console.log(`A User Disconnected`, socket.id);

    // add last seen to the user
    try {
      await User.findByIdAndUpdate(userId, {
        lastSeen: new Date(),
      });
    } catch (error) {
      console.error("Error updating lastSeen:", error);
    }

    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };

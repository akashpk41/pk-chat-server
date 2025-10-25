import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.model";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: "Unauthorized - No Token Provided!" });
    }

    const decoded = jwt.verify(token, process.env.NODE_ENV);
    if (!decoded) {
      res.status(401).json({ message: "Unauthorized - Invalid!" });
    }

    const user = await User.findById(decode.userId).select("-password");

    req.user = user;
    next();
  } catch (err) {
    console.log("error in Auth Middleware", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

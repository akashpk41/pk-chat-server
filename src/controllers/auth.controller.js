import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateToken } from "../lib/generateToken.js";

export const signUp = async (req, res) => {
  const { email, fullName, password } = req.body;

  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }

    // validate password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password Must Be At Least 6 Characters" });
    }

    // check unique user
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email Already Exists!" });
    }

    // hash the user password before save to the database

    const hashedPassword = await bcrypt.hash(password, 10);

    // now save to the database
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        message: "Registration Successfully!",
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (err) {
    console.log(`Error In Signup Controller ${err.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  res.send("Login");
};

export const logOut = async (req, res) => {
  res.send("Log OUt");
};

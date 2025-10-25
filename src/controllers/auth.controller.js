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

      res.status(200).json({
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
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }

    // check is the user existence
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credential" });
    }
    // check the correct password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid Credential" });
    }

    // update lastLogin timestamp
    user.lastLogin = new Date();
    await user.save();

    // jwt token
    generateToken(user._id, res);
    res.status(200).json({
      message: "Login Successfully!",
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      lastLogin: user.lastLogin
    });
  } catch (err) {
    console.log("error in Login Controller", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logOut = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Successfully!" });
  } catch (err) {
    console.log("error in Logout Controller", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const updateProfile = async(req,res) => {
  res.send('profile update')
}

import User from "../models/user.model.js";

export const signUp = async (req, res) => {
  const { email, fullName, password } = req.body;

  try {
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




  } catch (err) {}
};

export const login = async (req, res) => {
  res.send("Login");
};

export const logOut = async (req, res) => {
  res.send("Log OUt");
};

import User from "../Models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "Lax",
};

const signUp = async (req, res) => {
  try {
    const { channelName, userName, about, profilePic, password } = req.body;
    const isExit = await User.findOne({ userName });
    if (isExit) {
      res
        .status(400)
        .json({
          error: "Username already exist.Please try with other username",
        });
    } else {
      let updatedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        channelName,
        userName,
        about,
        profilePic,
        password: updatedPassword,
      });
      await user.save();
      res
        .status(201)
        .json({
          message: "User registered successfully",
          success: "yes",
          data: user,
        });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
const signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id }, "Its_my_secret_key");
      res.cookie("token", token, cookieOptions);
      console.log(token);
      res.status(200).json({
        message: "Logged In Successfully",
        success: "true",
        token,
        user,
      });
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const logout = async (req, res) => {
  res
    .clearCookie("token", cookieOptions)
    .json({ message: "Logged out successfully" });
};
export default { signUp, signIn, logout };

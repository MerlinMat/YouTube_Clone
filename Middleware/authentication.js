import jwt from "jsonwebtoken";
import User from "../Models/user.js";

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "authorization denied" });
  } else {
    try {
      const decode = jwt.verify(token, "Its_my_secret_key");
      req.user = await User.findById(decode.userId).select("-password");
      next();
    } catch (err) {
      res.status(401).json({ error: "Token is not valid" });
    }
  }
};
export default auth;

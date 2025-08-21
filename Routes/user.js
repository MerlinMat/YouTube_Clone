import express from "express";
import userController from "../Controllers/user.js";

const router = express.Router();
router.post("/signup", userController.signUp);
router.post("/login", userController.signIn);
router.post("/logout", userController.logout);
export default router;

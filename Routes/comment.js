import express from "express";
import CommentController from "../Controllers/comment.js";
import auth from "../Middleware/authentication.js";

const router = express.Router();

router.post("/comment", auth, CommentController.addComment);
router.get("/comment/:videoId", CommentController.getCommentByVideoId);

export default router;

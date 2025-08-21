import express from "express";
import videoController from "../Controllers/video.js";
import auth from "../Middleware/authentication.js";

const router = express.Router();

router.post("/video", auth, videoController.uploadVideo);
router.get("/allVideo", videoController.getAllVideo);
router.get("/getVideoById/:id", videoController.getVideoById);
router.get("/:userId/channel", videoController.getAllVideoByUserID);
export default router;

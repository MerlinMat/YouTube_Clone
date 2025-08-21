import Video from "../Models/video.js";
import User from "../Models/user.js";
import mongoose from "mongoose";

const uploadVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      videoLink,
      like,
      dislike,
      videoType,
      thumbnail,
    } = req.body;
    console.log(req.body);

    const videoUpload = new Video({
      user: req.user._id,
      title,
      description,
      videoLink,
      like,
      dislike,
      videoType,
      thumbnail,
    });
    await videoUpload.save();

    res.status(201).json({ success: true, videoUpload });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllVideo = async (req, res) => {
  try {
    const videos = await Video.find().populate(
      "user",
      "channelName profilePic  userName createdAt"
    );
    res.status(200).json({ success: true, videos: videos });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getVideoById = async (req, res) => {
  try {
    let { id } = req.params;
    const video = await Video.findById(id).populate(
      "user",
      "channelName profilePic userName createdAt"
    );
    res.status(200).json({ success: true, video: video });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getAllVideoByUserID = async (req, res) => {
  try {
    const { userId } = req.params;
    
     // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID format"
      });
    }

    // Get videos with populated user data
    const videos = await Video.find({ user: userId })
      .populate("user", "channelName profilePic userName about createdAt")
      .sort({ createdAt: -1 });

    if (!videos || videos.length === 0) {
      // Still return user info even if no videos
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        user: {
          channelName: user.channelName,
          profilePic: user.profilePic,
          userName: user.userName,
          about: user.about,
          joinedDate: user.createdAt
        },
        videos: [],
        videoCount: 0
      });
    }

    res.status(200).json({
      success: true,
      user: {
        channelName: videos[0].user.channelName,
        profilePic: videos[0].user.profilePic,
        userName: videos[0].user.userName,
        about: videos[0].user.about,
        joinedDate: videos[0].user.createdAt
      },
      videos: videos.map(video => ({
        _id: video._id,
        title: video.title,
        thumbnail: video.thumbnail,
        createdAt: video.createdAt,
        views: video.views || 0
      })),
      videoCount: videos.length
    });

  } catch (err) {
    console.error("Error in getAllVideoByUserID:", err);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};
export default {uploadVideo,getAllVideo ,getVideoById ,getAllVideoByUserID}

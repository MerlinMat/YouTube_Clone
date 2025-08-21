import Comment from "../Models/comment.js";

const addComment = async (req, res) => {
  try {
    let { video, message } = req.body;
    const comment = new Comment({ user: req.user._id, video, message });
    await comment.save();

    res.status(201).json({
      message: "success",
      comment,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getCommentByVideoId = async (req, res) => {
  try {
    let { videoId } = req.params;
    const comments = await Comment.find({ video: videoId }).populate(
      "user",
      "channelName profilePic userName createdAt").sort({ createdAt: -1 });;

    res.status(200).json({
      message: "success",
      comments,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export default { addComment, getCommentByVideoId };

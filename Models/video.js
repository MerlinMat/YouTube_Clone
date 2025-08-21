import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    videoLink: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    videoType: {
      type: String,
      dafault: "All",
    },
    like: {
      type: Number,
      dafault: 0,
    },
    dislike: {
      type: Number,
      dafault: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("video", videoSchema);

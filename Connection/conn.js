import mongoose from "mongoose";

//youtubeBackend
mongoose
  .connect("mongodb://127.0.0.1:27017/youtubeBackend")
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.log(err);
  });

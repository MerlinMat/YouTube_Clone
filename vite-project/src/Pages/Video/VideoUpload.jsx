import React, { useState, useEffect } from "react";
import { FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function VideoUpload() {
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    videoLink: "",
    thumbnail: "",
    videoType: "",
  });
  const [uploadProgress, setUploadProgress] = useState({
    thumbnail: 0,
    video: 0,
    uploading: false,
  });
  const navigate = useNavigate();
  const handleOnChangeInput = (event, name) => {
    setInputField({
      ...inputField,
      [name]: event.target.value,
    });
  };
  const uploadImage = async (e, type) => {
    console.log("loading");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    //  youtube-clone
    data.append("upload_preset", "youtube-clone");
    try {
      setUploadProgress((prev) => ({ ...prev, [type]: 0, uploading: true }));
      // cloudName="dv9do2w7g";
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dv9do2w7g/${type}/upload`,
        data,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress((prev) => ({
              ...prev,
              [type]: percentCompleted,
            }));
          },
        }
      );
      const url = response.data.url;
      let val = type === "image" ? "thumbnail" : "videoLink";

      setInputField({
        ...inputField,
        [val]: url,
      });
      // Complete progress
      setUploadProgress((prev) => ({ ...prev, [type]: 100 }));

      // Reset progress after 2 seconds
      setTimeout(() => {
        setUploadProgress((prev) => ({ ...prev, [type]: 0, uploading: false }));
      }, 2000);
    } catch (err) {
      console.log(err);
      setUploadProgress((prev) => ({ ...prev, [type]: 0, uploading: false }));
      alert(`Failed to upload ${type}. Please try again.`);
    }
  };

  useEffect(() => {
    let isLogin = localStorage.getItem("userId");
    if (isLogin === null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    console.log("Updated inputField:", inputField);
  }, [inputField]);

  const handleSubmitFunc = async () => {
    // Check if both thumbnail and video are uploaded
    if (!inputField.thumbnail) {
      alert("Please upload a thumbnail first");
      return;
    }
    if (!inputField.videoLink) {
      alert("Please upload a video first");
      return;
    }

    setUploadProgress((prev) => ({ ...prev, uploading: true }));

    try {
      await axios.post("http://localhost:4000/api/video", inputField, {
        withCredentials: true,
      });

      alert("Video uploaded successfully!");
      navigate("/");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload video. Please try again.");
    } finally {
      setUploadProgress((prev) => ({ ...prev, uploading: false }));
    }
  };

  const isFormValid =
    inputField.thumbnail && inputField.videoLink && inputField.title;

  return (
    <div className="pt-14 w-full flex flex-col items-center h-[92vh] font-oswald font-optical-sizing: auto font-normal not-italic bg-black">
      {/* uploadbox */}
      <div className="w-1/2 rounded mt-5 shadow-[0.5px_0.5px_8px_rgba(255,255,255,1)] p-6">
        <div className="flex w-full justify-center items-center text-2xl text-white">
          <FaYoutube className="text-red-500 text-[54px]" />
          Upload Video
        </div>
        {/* upload form */}
        <div className="flex flex-col gap-5 items-center pt-7">
          <input
            type="text"
            onChange={(e) => {
              handleOnChangeInput(e, "title");
            }}
            value={inputField.title}
            placeholder="Title of the Video"
            className="w-[70%] h-11 py-0 px-5 text-base text-white box-border bg-gray-700 border-0 rounded"
          />
          <input
            type="text"
            onChange={(e) => {
              handleOnChangeInput(e, "description");
            }}
            value={inputField.description}
            placeholder="Description"
            className="w-[70%] h-11 py-0 px-5 text-base text-white box-border bg-gray-700 border-0 rounded"
          />
          <input
            type="text"
            onChange={(e) => {
              handleOnChangeInput(e, "videoType");
            }}
            value={inputField.videoType}
            placeholder="Category"
            className="w-[70%] h-11 py-0 px-5 text-base text-white box-border bg-gray-700 border-0 rounded"
          />
          {/* Thumbnail Upload */}
          <div className="w-[70%]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white">Thumbnail</span>
              {inputField.thumbnail && (
                <span className="text-green-400 text-sm">✓ Uploaded</span>
              )}
            </div>
            <input
              className="file:bg-white file:text-black file:border-0 file:rounded file:px-3 file:py-1 file:mr-2 file:text-sm text-white bg-gray-700 rounded p-1 w-full h-11 box-border"
              type="file"
              onChange={(e) => uploadImage(e, "image")}
              accept="image/*"
            />
            {uploadProgress.thumbnail > 0 && (
              <Box sx={{ width: "100%", mt: 0.5 }}>
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress.thumbnail}
                  sx={{ height: 6, borderRadius: 3 }}
                />
                <div className="text-xs text-gray-400 text-right mt-0.5">
                  {uploadProgress.thumbnail}%
                </div>
              </Box>
            )}
          </div>
          {/* Video Upload */}
          <div className="w-[70%]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white">Video</span>
              {inputField.videoLink && (
                <span className="text-green-400 text-sm">✓ Uploaded</span>
              )}
            </div>
            <input
              className="file:bg-white file:text-black file:border-0 file:rounded file:px-3 file:py-1 file:mr-2 file:text-sm text-white bg-gray-700 rounded p-1 w-full h-11 box-border"
              type="file"
              onChange={(e) => uploadImage(e, "video")}
              accept="video/mp4,video/webm,video/*"
            />
            {uploadProgress.video > 0 && (
              <Box sx={{ width: "100%", mt: 0.5 }}>
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress.video}
                  sx={{ height: 6, borderRadius: 3 }}
                />
                <div className="text-xs text-gray-400 text-right mt-0.5">
                  {uploadProgress.video}%
                </div>
              </Box>
            )}
          </div>
        </div>
        <div className="flex gap-5 justify-center mt-6">
          <button
            onClick={handleSubmitFunc}
            disabled={!isFormValid || uploadProgress.uploading}
            className={`py-2.5 px-5 border border-solid font-medium text-lg rounded cursor-pointer no-underline ${
              !isFormValid || uploadProgress.uploading
                ? "bg-black text-white cursor-not-allowed"
                : "text-white hover:bg-white hover:text-black"
            }`}
          >
            {uploadProgress.uploading ? "Uploading..." : "Upload"}
          </button>
          <Link
            to={"/"}
            className="text-white py-2.5 px-5 border border-solid font-medium text-lg rounded cursor-pointer no-underline hover:bg-white hover:text-black"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

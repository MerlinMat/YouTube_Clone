import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [uploadedImageUrl, setUploadedImageUrl] = useState(
    "https://www.vhv.rs/dpng/d/512-5129752_perfil-anonimo-hd-png-download-no-profile-photo.png"
  );
  const [signUpField, setSignUpField] = useState({
    channelName: "",
    userName: "",
    password: "",
    about: "",
    profilePic: uploadedImageUrl,
  });

  const [progressBar, setProgressBar] = useState(false);

  const handleInputField = (event, name) => {
    setSignUpField({
      ...signUpField,
      [name]: event.target.value,
    });
  };
  console.log(signUpField);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    //  youtube-clone
    data.append("upload_preset", "youtube-clone");
    try {
      setProgressBar(true);
      // cloudName="dv9do2w7g";
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dv9do2w7g/image/upload",
        data
      );
      const imageUrl = response.data.url;
      setUploadedImageUrl(imageUrl);
      setSignUpField({
        ...signUpField,
        profilePic: imageUrl,
      });
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload profile image");
    } finally {
      setProgressBar(false);
    }
  };

  const handleSignup = async () => {
    if (!signUpField.profilePic) {
      toast.warn("Please wait for profile picture to upload");
      return;
    }
    setProgressBar(true);

    try {
      const payload = {
        ...signUpField,
        profilePic: uploadedImageUrl || signUpField.profilePic,
      };
      // Call Signup
      const signupRes = await axios.post(
        "http://localhost:4000/auth/signUp",
        signUpField,
        { withCredentials: true }
      );

      toast.success("Signup successful!");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/");
    } catch (signupErr) {
      console.log(
        "Signup failed:",
        signupErr.response?.data || signupErr.message
      );
      toast.error(signupErr.response?.data?.error || "Signup failed");
    } finally {
      setProgressBar(false);
    }
  };

  return (
    <div className="pt-14 text-white w-full flex flex-col items-center h-screen bg-black">
      <div className="w-2/5 border border-solid py-4 px-5 mt-8 flex flex-col justify-center items-center shadow-[0.5px_0.5px_0_white]">
        <div className="flex gap-5 w-full justify-center items-center font-semibold text-2xl non-italic">
          <FaYoutube className="text-red-500 text-[54px]" />
          SignUp
        </div>
        <div className="gap-5 w-full flex justify-center items-center flex-col mt-7">
          <input
            value={signUpField.channelName}
            onChange={(e) => handleInputField(e, "channelName")}
            className="w-2/3 h-11 text-white py-0 px-2.5 border-0 rounded-md bg-gray-900"
            type="text"
            placeholder="Channel Name"
          />
          <input
            value={signUpField.userName}
            onChange={(e) => handleInputField(e, "userName")}
            className="w-2/3 h-11 text-white py-0 px-2.5 border-0 rounded-md bg-gray-900"
            type="text"
            placeholder="User Name"
          />
          <input
            value={signUpField.password}
            onChange={(e) => handleInputField(e, "password")}
            className="w-2/3 h-11 text-white py-0 px-2.5 border-0 rounded-md bg-gray-900"
            type="password"
            placeholder="Password"
          />
          <input
            value={signUpField.about}
            onChange={(e) => handleInputField(e, "about")}
            className="w-2/3 h-11 text-white py-0 px-2.5 border-0 rounded-md bg-gray-900"
            type="text"
            placeholder="About Your Channel"
          />

          <div className="flex gap-8">
            <input
              type="file"
              onChange={(e) => uploadImage(e)}
              className="file:bg-white text-black"
            />
            <div className="w-[100px] h-[100px]">
              <img
                className="w-full h-full rounded-full object-cover"
                src={uploadedImageUrl}
              />
            </div>
          </div>

          <div className=" w-full flex items-center gap-8 justify-center">
            <div
              onClick={handleSignup}
              className="p-2.5 text-lg font-medium rounded-md border border-solid cursor-pointer text-white no-underline hover:bg-white hover:text-black"
            >
              SignUp
            </div>
            <Link
              to={"/"}
              className="p-2.5 text-lg font-medium rounded-md border border-solid cursor-pointer text-white no-underline hover:bg-white hover:text-black"
            >
              Home Page
            </Link>
          </div>
          {progressBar && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

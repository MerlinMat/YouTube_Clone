import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ setLoginModel }) {
  const [loginField, setLoginField] = useState({ userName: "", password: "" });
  const handleOnChangeInput = (event, name) => {
    setLoginField({
      ...loginField,
      [name]: event.target.value,
    });
  };

  const handleLoginFun = async () => {
    axios
      .post("http://localhost:4000/auth/login", loginField, {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("userProfilePic", res.data.user.profilePic);
        toast.success("Login successful!", {
          autoClose: 1500,
          onClose: () => {
            window.location.reload(); // Reload after toast closes
          },
        });
      })
      .catch((err) => {
        toast.error("Invalid Credentials");
        console.log(err);
      });
  };
  return (
    <div className="w-screen h-screen bg-[rgba(8,8,8,0.86)] fixed inset-0 overflow-hidden top-0 left-0 text-white flex justify-center font-normal not-italic">
      <div className="w-2/5 h-3/5 mt-24 bg-black box-border p-16 flex flex-col items-center shadow-[0.5px_0.5px_8px_white]">
        <div className="text-2xl font-medium flex gap-2.5 items-center">
          <FaYoutube className="text-red-500 text-[54px]" />
          Login
        </div>
        {/* Username and password field */}
        <div className="flex flex-col gap-8 mt-6 w-full items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <input
              value={loginField.userName}
              onChange={(e) => handleOnChangeInput(e, "userName")}
              className="w-2/3 h-11 text-white px-2.5 py-0 border-0 rounded-md bg-gray-900"
              type="text"
              placeholder="UserName"
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <input
              value={loginField.password}
              onChange={(e) => handleOnChangeInput(e, "password")}
              className="w-2/3 h-11 text-white px-2.5 py-0 border-0 rounded-md bg-gray-900"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="w-2/3 flex justify-between mt-8">
          <div
            onClick={handleLoginFun}
            className="w-1/4 border border-solid h-9 flex justify-center items-center rounded-md text-lg font-semibold cursor-pointer text-white no-underline hover:text-black hover:bg-white"
          >
            Login
          </div>
          <Link
            to={"/signup"}
            onClick={() => setLoginModel()}
            className="w-1/4 border border-solid h-9 flex justify-center items-center rounded-md text-lg font-semibold cursor-pointer text-white no-underline hover:text-black hover:bg-white"
          >
            SignUp
          </Link>
          <div
            onClick={() => setLoginModel()}
            className="w-1/4 border border-solid h-9 flex justify-center items-center rounded-md text-lg font-semibold cursor-pointer text-white no-underline hover:text-black hover:bg-white"
          >
            Cancel
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

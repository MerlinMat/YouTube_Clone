import { FaMicrophone } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import axios from "axios";

export default function Navbar({ setSidebarFunc, Sidebar, setSearchQuery }) {
  const [searchText, setSearchText] = useState("");

  const [userPic, setUserPic] = useState(
    "https://ih1.redbubble.net/image.1380092762.9137/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
  );
  const [navbarModel, setNavbarModel] = useState(false);
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClickModel = () => {
    setNavbarModel((prev) => !prev);
  };
  const sidebarFunc = () => {
    setSidebarFunc(!Sidebar);
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      setSearchQuery(searchText.trim());
      //  Clear search input after search
      setSearchText("");
    }
  };

  const handleprofile = () => {
    let userId = localStorage.getItem("userId");
    navigate(`/user/${userId}`);
    setNavbarModel(false);
  };

  const setLoginModel = () => {
    setLogin(false);
  };

  const onclickOfPopUpOption = (button) => {
    setNavbarModel(false);
    if (button === "login") {
      setLogin(true);
    } else {
      localStorage.clear();
      getLogoutFun();
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    }
  };

  const getLogoutFun = async () => {
    axios
      .post("http://localhost:4000/auth/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log("Logout");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let userProfilePic = localStorage.getItem("userProfilePic");
    setIsLoggedIn(localStorage.getItem("userId") !== null ? true : false);
    if (userProfilePic !== null) {
      setUserPic(userProfilePic);
    }
  }, []);
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm flex items-center justify-between px-4 py-2 w-full">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-4" onClick={sidebarFunc}>
        <button className="text-2xl hover:bg-gray-200 rounded-4xl">☰</button>
        <Link
          to={"/"}
          className="flex items-center cursor-pointer"
          onClick={() => {
            setSearchQuery(""); // Clear search filter
            setSearchText(""); // Clear search input
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube"
            className="h-5"
          />
          <sup className="text-xs ml-1 text-gray-600">IN</sup>
        </Link>
      </div>

      {/* Center: Search Bar */}
      <div className="flex items-center w-1/2 max-w-2xl">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 px-4 py-1 border border-gray-300 rounded-l-full outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          className="px-4 py-1 border border-l-0 border-gray-300 rounded-r-full bg-gray-100 cursor-pointer"
          onClick={handleSearch}
        >
          🔍
        </button>

        <button className="ml-2 bg-gray-100 p-2 rounded-full">
          <FaMicrophone />
        </button>
      </div>

      {/* Right: Create, Notifications, Avatar */}
      <div className="flex items-center gap-4 mr-6">
        <Link to={"/7688/upload"}>
          <div className="bg-gray-100 px-3 py-1 rounded-full text-sm cursor-pointer">
            ➕ Create
          </div>
        </Link>
        <div className="relative">
          <button className="text-xl">🔔</button>
        </div>

        <div>
          <img
            onClick={handleClickModel}
            src={userPic}
            alt=""
            className="w-[30px] rounded-full cursor-pointer"
          />
          {navbarModel && (
            <div className="absolute z-20 w-max right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden">
              {isLoggedIn && (
                <div
                  onClick={handleprofile}
                  className="p-2.5 bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  Profile
                </div>
              )}

              {!isLoggedIn && (
                <div
                  onClick={() => onclickOfPopUpOption("login")}
                  className="p-2.5 bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  Login
                </div>
              )}
              {isLoggedIn && (
                <div
                  onClick={() => onclickOfPopUpOption("logout")}
                  className="p-2.5 bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  Logout
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {login && <Login setLoginModel={setLoginModel} />}
    </header>
  );
}

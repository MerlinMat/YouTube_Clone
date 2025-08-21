import React, { useEffect, useState, useRef } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function HomePage({ Sidebar, searchQuery, setSearchQuery }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isTransparent, setIsTransparent] = useState(false);
  const optionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If clicked outside of options bar and transparency is active
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target) &&
        isTransparent
      ) {
        setIsTransparent(false);
        setSelectedOption(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTransparent]); // Only re-run when transparency changes

  useEffect(() => {
    //checking login status
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      // api calling for Home page only if logged in
      axios
        .get("http://localhost:4000/api/allVideo")
        .then((res) => {
          console.log(res.data.videos);
          setData(res.data.videos);
          setFilteredData(res.data.videos);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Filter videos based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (video.description &&
            video.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (video.user?.channelName &&
            video.user.channelName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  const handleOptionClick = (item) => {
    if (item === "All") {
      setSelectedOption("All");
      setIsTransparent(false); // Always show normal for "All"
    } else if (selectedOption === item) {
      setIsTransparent(!isTransparent); // Toggle transparency
    } else {
      setSelectedOption(item);
      setIsTransparent(true); // Show transparent for new selection
    }
  };

  const options = [
    "All",
    "Javascript",
    "Gaming",
    "Live",
    "Music",
    "Thrillers",
    "Debates",
    "Democracy",
    "Comedy",
    "Skills",
    "Animated Films",
    "News",
    "Mixes",
    "Sports",
    "Air Force",
    "Python",
    "Crime",
    "Art",
    "Dance",
  ];

  return (
    <div
      className={`
      flex flex-col flex-1 min-h-screen w-full
      ${Sidebar ? "md:ml-[274px]" : ""}
      ${isTransparent ? "opacity-20" : "opacity-100"}
      transition-opacity duration-300 ease-in-out
      overflow-x-hidden
    `}
    >
      {/* Search results header */}
      {searchQuery && (
        <div className="px-4 py-2 bg-gray-100">
          <h2 className="text-lg font-semibold">
            Search results for: "{searchQuery}"
          </h2>
          <p className="text-sm text-gray-600">
            {filteredData.length} video(s) found
          </p>
        </div>
      )}
      {/*scrollable options bar */}
      <div className="scroll-wrapper">
        <div
          ref={optionsRef}
          className=" sticky top-0 z-10 bg-white shadow-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="hometop flex gap-[15px] overflow-x-auto w-full px-2 py-2 scrollbar-hide">
            {options.map((item, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(item)}
                className={`
           flex-shrink-0 py-1.5 px-3 rounded-full  // Adjusted padding
            flex justify-center items-center cursor-pointer
            text-xs sm:text-sm transition-all duration-200  // Smaller text on mobile
          ${
            selectedOption === item
              ? item === "All"
                ? "bg-gray-800 text-white shadow-md"
                : "bg-gray-700 text-white shadow-md"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }
        `}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={
          Sidebar
            ? "grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-4 pb-5 px-2"
            : "grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-4 pb-5 px-2"
        }
      >
        {filteredData?.map((item, ind) => {
          return (
            <Link
              key={item._id}
              to={`/watch/${item._id}`}
              className="flex flex-col no-underline cursor-pointer "
            >
              <div className="w-full relative rounded-lg overflow-hidden aspect-video">
                <img
                  className="w-full h-full object-cover"
                  src={item.thumbnail}
                  alt="thumbnail"
                />
                <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-gray-900 text-white text-xs">
                  20:05
                </div>
              </div>

              <div className="flex pt-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={item?.user?.profilePic ||'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg'}
                    alt="Profile"
                  />
                </div>

                <div className="ml-2 flex flex-col">
                  <div className="font-semibold text-sm sm:text-base">
                    {item?.title}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-gray-600">
                    {item?.user?.channelName}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {item?.like} likes
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        {/* No results message */}
        {filteredData.length === 0 && searchQuery && (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">
              No videos found for "{searchQuery}"
            </p>
          </div>
        )}

        {/* No videos at all */}
        {filteredData.length === 0 && !searchQuery && (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">Please login to view the videos</p>
          </div>
        )}
      </div>
    </div>
  );
}

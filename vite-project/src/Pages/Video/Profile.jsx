import React, { useState, useEffect } from "react";
import SideNavbar from "../../components/SideNavbar";
import { IoIosPlay } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const fallbackProfilePic = "https://www.gravatar.com/avatar/default?s=150";
const fallbackThumbnail =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNjAiIGhlaWdodD0iOTAiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjYWFhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5UaHVtYm5haWwgTm90IEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=";

export default function Profile({ Sidebar }) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/${id}/channel`,
        { withCredentials: true }
      );

      console.log("API Response:", response.data);

      // Handle the actual API response structure
      if (response.data.success === true) {
        setUser(response.data.user);
        setData(response.data.videos || []);
      } else {
        throw new Error("API request was not successful");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err.message);
      setUser({
        profilePic: fallbackProfilePic,
        channelName: "Error Loading Profile",
        userName: "",
        about: "Could not load profile data",
      });
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      console.log("Fetching profile for ID:", id);
      await fetchProfileData();
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex w-full pt-2.5 pr-3.5 pb-0 pl-3.5 box-border">
        <SideNavbar Sidebar={Sidebar} />
        <div className="flex-1 ml-72 mt-14 flex justify-center items-center">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full pt-2.5 pr-3.5 pb-0 pl-3.5 box-border">
        <SideNavbar Sidebar={Sidebar} />
        <div className="flex-1 ml-72 mt-14 flex justify-center items-center text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex w-full pt-2.5 pr-3.5 pb-0 pl-3.5 box-border">
        <SideNavbar Sidebar={Sidebar} />
        <div className="flex-1 ml-72 mt-14 flex justify-center items-center">
          User not found
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full pt-2.5 pr-3.5 pb-0 pl-3.5 box-border">
      <SideNavbar Sidebar={Sidebar} />

      <div className="flex flex-col overflow-x-hidden flex-1 ml-72 mt-14 justify-center items-center">
        {/* Profile top section */}
        <div className="w-full flex pt-0 pr-0 pb-5 pl-0">
          <div className="w-32 h-32">
            <img
              className="w-full h-full rounded-full object-cover"
              src={user?.profilePic}
              alt="Profile"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackProfilePic;
              }}
            />
          </div>
          {/* Right section of profile */}
          <div className="flex flex-col gap-2 py-0 px-2.5 w-5/6">
            <div className="text-4xl font-semibold">{user.channelName}</div>
            <div className="text-base text-gray-500">
              {user.userName} - {data.length} videos
            </div>
            <div className="text-base text-gray-500">{user.about}</div>
          </div>
        </div>

        {/* Profile bottom section */}
        <div className="w-full">
          <div className="text-2xl pb-2.5 font-medium flex items-center border-b border-b-solid border-b-gray-500">
            Videos &nbsp; <IoIosPlay />
          </div>
          {/* bottom videos */}
          <div className="flex gap-2.5 h-screen flex-wrap mt-5">
            {data.map((item) => (
              <Link
                to={`/watch/${item._id}`}
                key={item._id}
                className="w-52 cursor-pointer"
              >
                <div className="w-full h-36">
                  <img
                    className="w-full h-full object-cover"
                    src={item?.thumbnail || fallbackThumbnail}
                    alt={item?.title || "Video thumbnail"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackThumbnail;
                    }}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <div className="w-full text-base font-semibold line-clamp-2">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}

            {data.length === 0 && (
              <div className="w-full text-center text-gray-500 mt-10">
                No videos found for this channel
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

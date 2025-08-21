import React, { useState, useEffect } from "react";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function video() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  const fetchVideoById = async () => {
    //api call for selected video
    await axios
      .get(`http://localhost:4000/api/getVideoById/${id}`)
      .then((response) => {
        console.log(response.data.video);
        setData(response.data.video);
        setVideoUrl(response?.data?.video?.videoLink);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCommentByVideoId = async () => {
    await axios
      .get(`http://localhost:4000/commentApi/comment/${id}`)
      .then((response) => {
        console.log(response.data.comments);
        setComments(response.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchVideoById();
    getCommentByVideoId();
  }, []);

  const handleComment = async () => {
    const body = {
      message: message,
      video: id,
    };
    await axios
      .post("http://localhost:4000/commentApi/comment", body, {
        withCredentials: true,
      })
      .then((resp) => {
        console.log(resp);
        const newComment = resp.data.comment;
        setComments([newComment, ...comments]);
        setMessage("");
      })
      .catch((err) => {
        toast.error("Please Login first to comment");
      });
  };

  return (
    <div className="mt-14 flex py-[30px] px-0 justify-center">
      <div className="w-full max-w-[875px] flex flex-col">
        <div className="w-full">
          {data && (
            <video width="400" controls autoplay className="w-full rounded-lg">
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/webm" />
              Your browse doesnot support the video tag
            </video>
          )}
        </div>
        <div></div>
        {/* Video Description */}
        <div className="flex flex-col">
          {/* Title */}
          <div className="text-xl font-bold">{data?.title}</div>
          {/* ProfileDetails including like and dislike */}
          <div className="flex justify-between mt-2.5">
            {/* left side */}
            <div className="flex gap-3.5">
              <Link
                to={`/user/${data?.user?._id}`}
                className="w-9 h-9 cursor-pointer"
              >
                <img
                  className="w-full h-full rounded-full"
                  src={data?.user?.profilePic || 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg'}
                  alt=""
                />
              </Link>
              <div className="flex flex-col">
                <div className="font-medium text-base">
                  {data?.user?.channelName}
                </div>
                <div className="text-gray-500 text-sm">
                  {data?.user?.createdAt.slice(0, 10)}
                </div>
              </div>
              {/* subscribe */}
              <div className="bg-black text-white py-0 px-4 rounded-2xl flex justify-center items-center h-9 font-semibold text-sm cursor-pointer">
                Subscribe
              </div>
            </div>

            {/* right side */}
            <div className="flex gap-2.5 bg-gray-200 justify-center items-center p-2.5 box-border rounded-2xl cursor-pointer">
              <div className="flex gap-2.5 text-xl">
                <BiLike />
                <div className="font-medium relative -top-1">{data?.like}</div>
              </div>
              <div className="w-0 h-5 border border-solid border-gray-400"></div>
              <div className="flex gap-2.5 text-xl">
                <BiDislike />
              </div>
            </div>
          </div>
          {/* Below the icon */}
          <div className="flex flex-col p-2.5 bg-gray-200 w-full rounded-lg  font-medium text-sm gap-2.5 mt-2.5 box-border">
            <div>{data?.createdAt.slice(0, 10)}</div>
            <div>{data?.description}</div>
          </div>
        </div>
        {/* Youtube Comment section */}
        <div className="flex flex-col mt-5">
          <div className="text-xl font-medium">{comments.length} Comments</div>
          {/* self comment section */}
          <div className="flex mt-2.5 gap 2.5">
            <img
              className="w-9 h-9 rounded-full"
              src="https://images.pexels.com/photos/9611/flowers.jpg?cs=srgb&dl=pexels-free-nature-stock-9611.jpg&fm=jpg"
              alt=""
            />
            <div className="flex flex-col w-full">
              <input
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                className=" p-3 w-full h-9 border-0 text-base border-b border-b-gray-300 focus:outline-none placeholder:text-[16px]"
                type="text"
                placeholder="Add a Comment"
              />
              {/* Cancel and comment button */}
              <div className="flex justify-end gap-3.5 mt-2.5">
                <div className="py-2 px-4 rounded-2xl border border-solid border-black cursor-pointer hover:bg-black hover:text-white">
                  Cancel
                </div>
                <div
                  onClick={handleComment}
                  className="py-2 px-4 rounded-2xl border border-solid border-black cursor-pointer hover:bg-black hover:text-white"
                >
                  Comment
                </div>
              </div>
            </div>
          </div>
          {/* Others comment */}
          <div className="flex flex-col gap-2.5">
            {/* Loop the comments */}

            {comments.map((item, index) => {
              return (
                <div className="flex mt-2.5 gap-2.5">
                  <img
                    className="w-9 h-9 rounded-full"
                    src={item?.user?.profilePic }
      alt=""
                
                  />
                  <div className="flex flex-col">
                    <div className="flex gap-2.5 ml-2">
                      <div className="text-md font-medium">
                        {item?.user?.channelName}
                      </div>
                      <div className="text-md text-gray-500">
                        {item?.createdAt.slice(0, 10)}
                      </div>
                    </div>
                    <div className="ml-2 mt-2.5">{item?.message}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* right side video part */}
      <div className="w-full max-w-md py-[10px] px-[15px] gap-3.5 flex flex-col">
        <div className="flex gap-3.5 cursor-pointer">
          <div className="w-[168px] h-24">
            <img
              className="w-[inherit]"
              src="https://i.ytimg.com/vi/v_mfezG66lo/maxresdefault.jpg"
              alt=""
            />
          </div>
          {/* right side video description */}
          <div className="flex flex-col gap-[3px]">
            <div className="text-base font-medium mb-1">
              Javascript for beginners{" "}
            </div>
            <div className="text-xs text-gray-600">Javascript</div>
            <div className="text-xs text-gray-600">136 Views - 1 day ago</div>
          </div>
        </div>

        <div className="flex gap-3.5 cursor-pointer">
          <div className="w-[168px] h-24">
            <img
              className="w-[inherit]"
              src="https://i.ytimg.com/vi/v_mfezG66lo/maxresdefault.jpg"
              alt=""
            />
          </div>
          {/* right side video description */}
          <div className="flex flex-col gap-[3px]">
            <div className="text-base font-medium mb-1">
              Javascript for beginners{" "}
            </div>
            <div className="text-xs text-gray-600">Javascript</div>
            <div className="text-xs text-gray-600">136 Views - 1 day ago</div>
          </div>
        </div>

        <div className="flex gap-3.5 cursor-pointer">
          <div className="w-[168px] h-24">
            <img
              className="w-[inherit]"
              src="https://i.ytimg.com/vi/v_mfezG66lo/maxresdefault.jpg"
              alt=""
            />
          </div>
          {/* right side video description */}
          <div className="flex flex-col gap-[3px]">
            <div className="text-base font-medium mb-1">
              Javascript for beginners{" "}
            </div>
            <div className="text-xs text-gray-600">Javascript</div>
            <div className="text-xs text-gray-600">136 Views - 1 day ago</div>
          </div>
        </div>

        <div className="flex gap-3.5 cursor-pointer">
          <div className="w-[168px] h-24">
            <img
              className="w-[inherit]"
              src="https://i.ytimg.com/vi/v_mfezG66lo/maxresdefault.jpg"
              alt=""
            />
          </div>
          {/* right side video description */}
          <div className="flex flex-col gap-[3px]">
            <div className="text-base font-medium mb-1">
              Javascript for beginners{" "}
            </div>
            <div className="text-xs text-gray-600">Javascript</div>
            <div className="text-xs text-gray-600">136 Views - 1 day ago</div>
          </div>
        </div>

        <div className="flex gap-3.5 cursor-pointer">
          <div className="w-[168px] h-24">
            <img
              className="w-[inherit]"
              src="https://i.ytimg.com/vi/v_mfezG66lo/maxresdefault.jpg"
              alt=""
            />
          </div>
          {/* right side video description */}
          <div className="flex flex-col gap-[3px]">
            <div className="text-base font-medium mb-1">
              Javascript for beginners{" "}
            </div>
            <div className="text-xs text-gray-600">Javascript</div>
            <div className="text-xs text-gray-600">136 Views - 1 day ago</div>
          </div>
        </div>

        <div className="flex gap-3.5 cursor-pointer">
          <div className="w-[168px] h-24">
            <img
              className="w-[inherit]"
              src="https://i.ytimg.com/vi/v_mfezG66lo/maxresdefault.jpg"
              alt=""
            />
          </div>
          {/* right side video description */}
          <div className="flex flex-col gap-[3px]">
            <div className="text-base font-medium mb-1">
              Javascript for beginners{" "}
            </div>
            <div className="text-xs text-gray-600">Javascript</div>
            <div className="text-xs text-gray-600">136 Views - 1 day ago</div>
          </div>
        </div>

        <div className="flex gap-3.5 cursor-pointer">
          <div className="w-[168px] h-24">
            <img
              className="w-[inherit]"
              src="https://i.ytimg.com/vi/v_mfezG66lo/maxresdefault.jpg"
              alt=""
            />
          </div>
          {/* right side video description */}
          <div className="flex flex-col gap-[3px]">
            <div className="text-base font-medium mb-1">
              Javascript for beginners{" "}
            </div>
            <div className="text-xs text-gray-600">Javascript</div>
            <div className="text-xs text-gray-600">136 Views - 1 day ago</div>
          </div>
        </div>

        <div className="flex gap-3.5 cursor-pointer">
          <div className="w-[168px] h-24">
            <img
              className="w-[inherit]"
              src="https://i.ytimg.com/vi/v_mfezG66lo/maxresdefault.jpg"
              alt=""
            />
          </div>
          {/* right side video description */}
          <div className="flex flex-col gap-[3px]">
            <div className="text-base font-medium mb-1">
              Javascript for beginners{" "}
            </div>
            <div className="text-xs text-gray-600">Javascript</div>
            <div className="text-xs text-gray-600">136 Views - 1 day ago</div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

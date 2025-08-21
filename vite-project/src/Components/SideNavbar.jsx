import "./Sidebar.css";
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { GoVideo } from "react-icons/go";
import { LuGraduationCap } from "react-icons/lu";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { BiCut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function SideNavbar({ Sidebar, setSearchQuery }) {
  const navigate = useNavigate();
  return (
    <div
      className={
        Sidebar
          ? "sidebar flex flex-col flex-[0.16_1_0%] box-border h-[92vh] fixed top-[55px] left-0 w-64 p-[14px] hover:overflow-y-auto"
          : "hidden"
      }
    >
      <div className="flex flex-col pb-[10px] border-b-1 border-gray-300">
        <div
          className="flex gap-2 items-center py-[9px] px-[10px] rounded-2xl cursor-pointer hover:bg-gray-200"
          onClick={() => {
            navigate("/");
            if (setSearchQuery) {
              setSearchQuery(""); // Clear the search filter
            }
          }}
        >
          <IoMdHome />
          <div className="text-sm font-normal">Home</div>
        </div>
        <div className="flex gap-2 items-center py-[9px] px-[10px] rounded-2xl cursor-pointer hover:bg-gray-200">
          <SiYoutubeshorts />
          <div className="text-sm font-normal">Shorts</div>
        </div>
        <div className="flex gap-2 items-center py-[9px] px-[10px] rounded-2xl cursor-pointer hover:bg-gray-200 ">
          <MdOutlineSubscriptions />
          <div className="text-sm font-normal">Subscriptions</div>
        </div>
      </div>
      <div className="flex flex-col px-0 py-[10px] border-b-1 border-gray-300">
        <div className="flex gap-2 items-center py-[9px] px-[10px] rounded-2xl cursor-pointer hover:bg-gray-200">
          <div className="text-sm font-normal ">You</div>
          <MdKeyboardArrowRight />
        </div>
        <div className="flex gap-2 items-center py-[9px] px-[10px] rounded-2xl cursor-pointer hover:bg-gray-200">
          <MdHistory />
          <div className="text-sm font-normal">History</div>
        </div>
        <div className="flex gap-2 items-center py-[9px] px-[10px] rounded-2xl cursor-pointer hover:bg-gray-200">
          <MdOutlinePlaylistPlay />
          <div className="text-sm font-normal">Playlists</div>
        </div>
        <div className="flex gap-2 items-center py-[9px] px-[10px] rounded-2xl cursor-pointer hover:bg-gray-200">
          <GoVideo />
          <div className="text-sm font-normal">Your Videos</div>
        </div>
        <div className="flex gap-2 items-center py-[9px] px-[10px] rounded-2xl cursor-pointer hover:bg-gray-200">
          <LuGraduationCap />
          <div className="text-sm font-normal">Your Courses</div>
        </div>
        <div className="flex gap-2 items-center py-[9px] px-[10px] rounded-2xl cursor-pointer hover:bg-gray-200">
          <MdOutlineWatchLater />
          <div className="text-sm font-normal">Watch Later</div>
        </div>
        <div className="flex gap-2 items-center py-[9px] px-[10px] rounded-2xl cursor-pointer hover:bg-gray-200">
          <AiOutlineLike />
          <div className="text-sm font-normal">Liked Videos</div>
        </div>
        <div className="flex gap-2 items-center py-[9px] px-[10px] rounded-2xl cursor-pointer hover:bg-gray-200">
          <BiCut />
          <div className="text-sm font-normal">Your Clips</div>
        </div>
      </div>
      {/* Subscription */}
      <div className="flex flex-col px-0 py-[10px] border-b-1 border-gray-300">
        <div className="flex gap-2 items-center py-[9px] px-[10px] rounded-2xl cursor-pointer hover:bg-gray-200">
          <div className="text-sm font-normal ">Subscriptions</div>
        </div>
        <div className="flex gap-2 items-center py-[9px] px-[10px] rounded-2xl cursor-pointer hover:bg-gray-200">
          <img
            className="w-5 h-5 "
            src="https://seeklogo.com/images/A/Asianet-logo-6C0650C464-seeklogo.com.png"
            alt=""
          />
          <div>Asianet News</div>
        </div>
        <div className="flex gap-2 items-center py-[9px] px-[10px] rounded-2xl cursor-pointer hover:bg-gray-200">
          <img
            className="w-5 h-5 "
            src="https://cdn.freelogovectors.net/wp-content/uploads/2021/12/aajtak-logo-freelogovectors.net_.png"
            alt=""
          />
          <div>Aaj Tak</div>
        </div>
        <div className="flex gap-2 items-center py-[9px] px-[10px] rounded-2xl cursor-pointer hover:bg-gray-200">
          <img
            className="w-5 h-5 "
            src="https://logowik.com/content/uploads/images/ndtv9182.logowik.com.webp"
            alt=""
          />
          <div>NDTV</div>
        </div>
        <div className="flex gap-2 items-center py-[9px] px-[10px] rounded-2xl cursor-pointer hover:bg-gray-200">
          <img
            className="w-5 h-5 "
            src="https://thecodeteacher.com/wp-content/uploads/2023/11/DOM-introduction-in-javascript-chai-aur-javascript.jpg"
            alt=""
          />
          <div>Chai aur Code</div>
        </div>
      </div>
    </div>
  );
}

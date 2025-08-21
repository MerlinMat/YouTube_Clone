import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Video from "./Pages/Video/Video";
import Profile from "./Pages/Video/Profile";
import { Route, Routes } from "react-router-dom";
import VideoUpload from "./Pages/Video/VideoUpload";
import SignUp from "./Pages/Video/SignUp";

function App() {
  const [Sidebar, setSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const setSidebarFunc = (value) => {
    setSidebar(value);
  };
  return (
    <div>
      <Navbar
        setSidebarFunc={setSidebarFunc}
        Sidebar={Sidebar}
        setSearchQuery={setSearchQuery}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              Sidebar={Sidebar}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          }
        />
        <Route path="/watch/:id" element={<Video />} />
        <Route path="/user/:id" element={<Profile Sidebar={Sidebar} />} />
        <Route path="/:id/upload" element={<VideoUpload />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;

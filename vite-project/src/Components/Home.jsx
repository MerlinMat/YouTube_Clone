import SideNavbar from "./SideNavbar";
import HomePage from "./HomePage";

export default function Home({ Sidebar, searchQuery, setSearchQuery  }) {

  return (
   <div className="flex w-full pt-[10px] pr-[13px] pb-0 pl-0 box-border">
      <SideNavbar Sidebar={Sidebar} setSearchQuery={setSearchQuery}/>
      <HomePage Sidebar={Sidebar} searchQuery={searchQuery} />
    </div>
  );
}

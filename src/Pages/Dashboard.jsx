import React, { useContext, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";
import {
  Avatar,
  AvatarImage,
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarItem,
  SidebarList,
  AvatarFallback,
} from "keep-react";
import UserContext from "../Context/AuthContext";
import { FaEnvelopeOpenText, FaHome, FaUser, FaUsers } from "react-icons/fa";
import {
  MdAdminPanelSettings,
  MdOutlinePostAdd,
  MdReport,
} from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import DashboardMenu from "../Components/DashboardMenu";
import useCheckAdmin from "../Routers/useCheckAdmin";
function Dashboard() {
  const { user } = useContext(UserContext);
  const role = useCheckAdmin();
  const { pathname } = useLocation();
  useEffect(() => {
    const DynamicTitle = {
      "/Dashboard": "Dashboard | Edu forum",
      "/Dashboard/AddPost": "AddPost | Edu forum",
      "/Dashboard/MyProfile": "MyProfile | Edu forum",
      "/Dashboard/MyPosts": "MyPosts | Edu forum",
      "/Dashboard/ManageUsers": "ManageUsers | Edu forum",
      "/Dashboard/AdminProfile": "AdminProfile | Edu forum",
      "/Dashboard/MakeAnnouncement": "MakeAnnouncement | Edu forum",
      "/Dashboard/ReportedActivities": "ReportedActivities | Edu forum",
    };
    document.title = DynamicTitle[pathname] || "Edu forum";
  }, [pathname]);
  return (
    <div className="md:flex w-full bg-slate-100  gap-3">
      <div className="md:grow">
        <Sidebar className="  hidden md:block shadow-none h-screen bg-gradient-to-tr from-blue-50 to-white   rounded">
          <SidebarBody>
            {/* fornormar users routes  */}

            {role === "user" && (
              <SidebarList>
                <Link to={"/"}>
                  <SidebarItem className="flex items-center gap-2 text-lg">
                    <FaHome />
                    Home
                  </SidebarItem>
                </Link>

                <Link to={"/Dashboard/AddPost"}>
                  <SidebarItem className="flex items-center gap-2 text-lg">
                    <MdOutlinePostAdd />
                    AddPost
                  </SidebarItem>
                </Link>

                <Link to={"/Dashboard/MyProfile"}>
                  <SidebarItem className="flex items-center gap-2 text-lg">
                    <FaUser />
                    MyProfile
                  </SidebarItem>
                </Link>

                <Link to={"/Dashboard/MyPosts"}>
                  <SidebarItem className="flex items-center gap-2 text-lg">
                    <FaEnvelopeOpenText />
                    MyPosts
                  </SidebarItem>
                </Link>
              </SidebarList>
            )}

            {/* for admin  routs  */}
            {role === "admin" && (
              <SidebarList>
                <Link to={"/"}>
                  <SidebarItem className="flex items-center gap-2 text-lg">
                    <FaHome />
                    Home
                  </SidebarItem>
                </Link>

                <Link to={"/Dashboard/ManageUsers"}>
                  <SidebarItem className="flex items-center gap-2 text-lg">
                    <FaUsers />
                    Manage Users
                  </SidebarItem>
                </Link>

                <Link to={"/Dashboard/AdminProfile"}>
                  <SidebarItem className="flex items-center gap-2 text-lg">
                    <MdAdminPanelSettings />
                    Admin Profile
                  </SidebarItem>
                </Link>

                <Link to={"/Dashboard/MakeAnnouncement"}>
                  <SidebarItem className="flex items-center gap-2 text-lg">
                    <TfiAnnouncement />
                    MakeAnnouncement
                  </SidebarItem>
                </Link>

                <Link to={"/Dashboard/ReportedActivities"}>
                  <SidebarItem className="flex items-center gap-2 text-lg">
                    <MdReport />
                    Reported Activities
                  </SidebarItem>
                </Link>
              </SidebarList>
            )}
          </SidebarBody>
          <SidebarFooter>
            <Avatar>
              <AvatarImage src={user?.photoURL} alt={user?.displayName} />
              <AvatarFallback>{user?.displayName}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-body-4 font-medium text-metal-400 dark:text-white">
                {user?.displayName}
              </p>
              <p className="text-body-4 font-normal text-metal-300 dark:text-metal-400">
                {user?.email}
              </p>
            </div>
          </SidebarFooter>
        </Sidebar>

        <DashboardMenu />
      </div>

      <div className="md:w-[70%] ">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;

import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
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
        <Sidebar className="   hidden md:block shadow-none h-full bg-gradient-to-tr from-blue-50 to-white   rounded">
          <SidebarBody>
            {/* fornormar users routes  */}

            {role === "user" && (
              <SidebarList>
                <NavLink to={"/"} >
                  <SidebarItem className="flex items-center gap-2 text-lg">
                    <FaHome />
                    Home
                  </SidebarItem>
                </NavLink>

                <NavLink
   to={"/Dashboard/AddPost"}>
                  <SidebarItem className="flex items-center gap-2 text-lg">
                    <MdOutlinePostAdd />
                    AddPost
                  </SidebarItem>
                </NavLink>

                <NavLink to={"/Dashboard/MyProfile"}>
                  <SidebarItem className="flex items-center gap-2 text-lg">
                    <FaUser />
                    MyProfile
                  </SidebarItem>
                </NavLink>

                <NavLink to={"/Dashboard/MyPosts"}>
                  <SidebarItem className="flex items-center gap-2 text-lg">
                    <FaEnvelopeOpenText />
                    MyPosts
                  </SidebarItem>
                </NavLink>
              </SidebarList>
            )}

            {/* for admin  routs  */}
            {role === "admin" && (
              <SidebarList>
                <NavLink to={"/"}>
                  <SidebarItem className="flex items-center gap-2 text-lg">
                    <FaHome />
                    Home
                  </SidebarItem>
                </NavLink>

                <NavLink to={"/Dashboard/ManageUsers"}>
                  <SidebarItem className="flex items-center gap-2 text-lg">
                    <FaUsers />
                    Manage Users
                  </SidebarItem>
                </NavLink>

                <NavLink to={"/Dashboard/AdminProfile"}>
                  <SidebarItem className="flex items-center gap-2 text-lg">
                    <MdAdminPanelSettings />
                    Admin Profile
                  </SidebarItem>
                </NavLink>

                <NavLink to={"/Dashboard/MakeAnnouncement"}>
                  <SidebarItem className="flex items-center gap-2 text-lg">
                    <TfiAnnouncement />
                    MakeAnnouncement
                  </SidebarItem>
                </NavLink>

                <NavLink to={"/Dashboard/ReportedActivities"}>
                  <SidebarItem className="flex items-center gap-2 text-lg">
                    <MdReport />
                    Reported Activities
                  </SidebarItem>
                </NavLink>
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

      <div className="md:w-[80%]  ">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;

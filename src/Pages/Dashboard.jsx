import React, { useContext } from "react";
import { Link, Outlet } from "react-router";
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
function Dashboard() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div className="md:flex  gap-5">
      <Sidebar className=" hidden md:block shadow-none h-screen bg-gradient-to-tr from-blue-50 to-white   rounded">
        <SidebarBody>
          {/* fornormar users routes  */}

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

          {/* for admin  routs  */}
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
      <DashboardMenu/>
      <Outlet />
    </div>
  );
}

export default Dashboard;

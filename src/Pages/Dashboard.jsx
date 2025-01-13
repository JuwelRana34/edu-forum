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
function Dashboard() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div className="md:flex gap-5">
      <Sidebar className=" shadow-none overflow-y-scroll rounded">
        <SidebarBody>
          {/* fornormar users routes  */}

          <SidebarList>
            <SidebarItem>
              <Link className="flex items-center gap-2 text-lg" to={"/"}>
                <FaHome />
                Home
              </Link>
            </SidebarItem>

            <SidebarItem>
              <Link
                className="flex items-center gap-2 text-lg"
                to={"/Dashboard/AddPost"}
              >
                <MdOutlinePostAdd />
                AddPost
              </Link>
            </SidebarItem>

            <SidebarItem>
              <Link
                className="flex items-center gap-2 text-lg"
                to={"/Dashboard/MyProfile"}
              >
                <FaUser />
                MyProfile
              </Link>
            </SidebarItem>

            <SidebarItem>
              <Link
                className="flex items-center gap-2 text-lg"
                to={"/Dashboard/MyPosts"}
              >
                <FaEnvelopeOpenText />
                MyPosts
              </Link>
            </SidebarItem>
          </SidebarList>

          {/* for admin  routs  */}
          <SidebarList>
            <SidebarItem>
              <Link className="flex items-center gap-2 text-lg" to={"/"}>
                <FaHome />
                Home
              </Link>
            </SidebarItem>

            <SidebarItem>
              <Link
                className="flex items-center gap-2 text-lg"
                to={"/Dashboard/ManageUsers"}
              >
                <FaUsers />
                Manage Users
              </Link>
            </SidebarItem>

            <SidebarItem>
              <Link
                className="flex items-center gap-2 text-lg"
                to={"/Dashboard/AdminProfile"}
              >
                <MdAdminPanelSettings />
                Admin Profile
              </Link>
            </SidebarItem>

            <SidebarItem>
              <Link
                className="flex items-center gap-2 text-lg"
                to={"/Dashboard/MakeAnnouncement"}
              >
                <TfiAnnouncement />
                MakeAnnouncement
              </Link>
            </SidebarItem>

            <SidebarItem>
              <Link
                className="flex items-center gap-2 text-lg"
                to={"/Dashboard/ReportedActivities"}
              >
                <MdReport />
                Reported Activities
              </Link>
            </SidebarItem>
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
      <Outlet />
    </div>
  );
}

export default Dashboard;

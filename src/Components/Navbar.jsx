import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { CiLogout} from "react-icons/ci";
import { MdOutlineAccountCircle } from "react-icons/md";
import {
  Dropdown,
  DropdownAction,
  DropdownArrow,
  DropdownContent,
  DropdownDivider,
  DropdownGroup,
  DropdownItem,
} from "keep-react";

import { useContext, useEffect, useState } from "react";
import UserContext from "../Context/AuthContext";
import { Button, toast } from "keep-react";

import { FaBell } from "react-icons/fa";
import useAnnouncementes from "../Hook/useAnnouncementes";
function Navbar() {
  const { pathname } = useLocation();
  const { user, LogOut, setUser, setIsloading,} = useContext(UserContext);
  const {announcements} = useAnnouncementes()

  const navigate = useNavigate();
  const handleLogout = () => {
    LogOut()
      .then(() => {
        setIsloading(false);
        setUser(null);
        toast.warning("Logged Out Successfully");
      })
      .catch((err) => {
        setIsloading(false);
        toast.error(`${err.message}`);
      });
  };

  useEffect(() => {
    const DynamicTitle = {
      "/": "Home | Edu forum",
      "/Dashboard": "Dashboard | Edu forum",
      "/MemberShip": "MemberShip | Edu forum",
    };
    document.title = DynamicTitle[pathname] || "Edu forum";
  }, [pathname]);




  const navitems = (
    <>
      <NavLink to={"/"}>
        <li>
          <a>Home</a>
        </li>
      </NavLink>
      {
        !user && <NavLink to={"/JoinUs"}>
        <li>
          <a>Join us</a>
        </li>
      </NavLink>
      }
      
      <NavLink to={"/MemberShip"}>
        <li>
          <a>Member Ship</a>
        </li>
      </NavLink>

      <li>
        <a className="relative w-fit "><FaBell className="text-xl">
          </FaBell> 
          <p className=" absolute -top-2 right-1 lg:-top-[5px] lg:right-2  h-5 w-5  text-center text-white rounded-full bg-green-500">{announcements?.length || 0}</p>
         
        </a>
      </li>

    </>
  );

  return (
    <nav className="backdrop-blur bg-white/35 z-[999] sticky top-0">
      <div className="navbar  container mx-auto py-2  ">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn p-2 btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu font-semibold menu-sm dropdown-content space-y-2 bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navitems}
          </ul>
        </div>
        <Link to={"/"} className="flex items-center">
          <img
            src={"https://cdn-icons-png.flaticon.com/128/12112/12112232.png"}
            className=" dark:rounded-lg w-12 md:w-16"
            alt="Edu forum"
          />

          <Link
            to={"/"}
           
            className="btn Logo font-[ Rowdies] text-[#23a4f8]  text-xl btn-ghost p-2 dark:text-metal-300 md:text-3xl font-bold font-berkshire"
          >
           Edu Forum
          </Link>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu flex items-center space-x-4 font-semibold menu-horizontal px-1">
          {navitems}
        </ul>
      </div>
      <div className="navbar-end ">
        {user && 
          <>
            <div className="flex cursor-pointer items-center space-x-2">
              <Dropdown>
                <DropdownAction asChild>
                  <img
                    className=" rounded-full h-12 ring-2 ring-[#23a8fe]/35   shadow-lg w-12"
                    src={user.photoURL}
                    alt={user.displayName}
                  />
                </DropdownAction>
                <DropdownContent className="dropdown">               
                  <h1 className="font-semibold text-metal-600">Hey! {user.displayName}</h1>
                  <DropdownDivider />
                  <DropdownGroup>
                    <Link to={'/Dashboard'}>
                    <DropdownItem><MdOutlineAccountCircle className="text-xl font-semibold" />Dashboard</DropdownItem>
                    </Link>
                    
                    <DropdownItem className="text-rose-500" onClick={handleLogout}> <CiLogout className="text-xl font-semibold"/> Logout</DropdownItem>
                  </DropdownGroup>
                </DropdownContent>
              </Dropdown>
              
            </div>
          </>
       }
      </div>
    </div>
    </nav>
    
  );
}

export default Navbar;

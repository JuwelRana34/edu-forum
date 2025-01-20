import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { Link } from "react-router";
import UserContext from "../Context/AuthContext";
import useCheckAdmin from "../Routers/useCheckAdmin";
import useAnnouncementes from "../Hook/useAnnouncementes";
import { Avatar, AvatarFallback, AvatarImage } from "keep-react";

const userNavigation = [
  { name: "Home", href: "/", current: false },
  { name: "Add post", href: "AddPost", current: false },
  { name: "My Posts", href: "MyPosts", current: false },
  { name: "My Profile", href: "MyProfile", current: false },
];
const adminNavigation = [
  { name: "Home", href: "/", current: false },
  { name: "Manage Users", href: "ManageUsers", current: false },
  { name: "Admin Profile", href: "AdminProfile", current: false },
  { name: "Make Announcement", href: "MakeAnnouncement", current: false },
  { name: "Reported Activities", href: "ReportedActivities", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardMenu() {
  const { user} = useContext(UserContext);
  const role = useCheckAdmin()
  const {announcements} = useAnnouncementes()
  return (
    <Disclosure as="nav" className="md:hidden bg-base-100  fixed top-0 w-full   z-50">
      <div className="mx-auto  max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative  flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 border border-metal-300 text-metal-400  hover:text-black focus:outline-1 focus:ring-1 focus:ring-inset focus:ring-metal-300">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link to={'/'} className="flex shrink-0 items-center">
              <img
                alt="edu forum"
                src={"https://cdn-icons-png.flaticon.com/128/9482/9482897.png"}
                className="h-12 w-auto"
              />
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div
              type="button"
              className="relative rounded-full bg-gray-200 p-1 text-gray-400"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
              <p className=" absolute flex items-center justify-center -top-2 -right-0 lg:-top-[5px] lg:right-2  h-5 w-5  text-center text-white rounded-full bg-green-500">
                {announcements?.length || 0}
              </p>
            </div>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
              <Avatar>
        <AvatarImage  src={user.photoURL} />
        <AvatarFallback className=" uppercase font-semibold text-base">{user.displayName.substring(0,2)}</AvatarFallback>
      </Avatar>
              </div>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="  space-y-1 px-2 pb-3 pt-2">
        {role === "user"? <> 
        {userNavigation.map((item,index) => (
            <Link key={index}
              to={`${item.href}`}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </Link>
          ))}

        </>: <>
        {adminNavigation.map((item, index) => (
          <Link key={index}
            to={`${item.href}`}
            aria-current={item.current ? "page" : undefined}
            className={classNames(
              item.current
                ? "bg-gray-900 text-white"
                : "text-gray-500 hover:bg-gray-700 hover:text-white",
              "block rounded-md px-3 py-2 text-base font-medium"
            )}
          >
            {item.name}
          </Link>
        ))}
        </>
        }   
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

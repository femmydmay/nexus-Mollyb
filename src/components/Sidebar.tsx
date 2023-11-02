"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MdDashboard,
  MdPlaylistAdd,
  MdFormatListBulletedAdd,
  MdManageAccounts,
  MdSupport,
} from "react-icons/md";
import { BiEdit, BiMinus, BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaUsersCog, FaCogs } from "react-icons/fa";

import { GoTasklist } from "react-icons/go";
import Menu from "./Menu";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Link from "next/link";
import axios from "axios";
import { usePathname } from "next/navigation";
import { emptyUser } from "@/redux/reducers/userReducers";
interface Props {
  state: {
    collapse: boolean;
    setCollapse: Dispatch<SetStateAction<boolean>>;
  };
}
const Sidebar = ({ state }: Props) => {
  const router = useRouter();
  const navigation = [
    {
      href: "/dashboard",
      name: "Overview",
      icon: <MdDashboard size={24} />,
    },
    {
      href: "/dashboard/add-listing",
      name: "Post a listing",
      icon: <MdPlaylistAdd size={24} />,
    },
    {
      href: "/dashboard/listings",
      name: "My Listings",
      icon: <GoTasklist size={22} />,
    },

    {
      href: "/dashboard/messages",
      name: "Messages",
      icon: <BiSolidMessageSquareDetail size={22} />,
    },
    {
      href: "/dashboard/ticket",
      name: "Support",
      icon: <MdSupport size={22} />,
    },
  ];

  const pathname =  usePathname()
  const adminNavigation = [
    {
      href: "/admin/create-plan",
      name: "Create Plan",
      icon: <MdFormatListBulletedAdd size={24} />,
    },
    {
      href: "/admin/manage-plan",
      name: "Manage Plan",
      icon: <BiEdit size={24} />,
    },
    {
      href: "/admin/manage-users",
      name: "Manage Users",
      icon: <FaUsersCog size={24} />,
    },
    {
      href: "/admin/manage-listings",
      name: "Manage Listings",
      icon: <FaCogs size={24} />,
    },
  ];
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.userReducers);


  const logout = async () => {
    try {
      const response = await axios.post("/api/logout", {});
      if (response.status === 200) {
        dispatch(emptyUser())
        setTimeout(() =>window.location.href='/', 500 )
        
      }
    } catch (error) {
     
    }
  };

  const profileRef = useRef<HTMLButtonElement | null>(null);

  const [isProfileActive, setIsProfileActive] = useState(false);

  useEffect(() => {
    const handleProfile = (e: Event) => {
      if (
        profileRef.current &&
        !profileRef.current?.contains(e.target as HTMLButtonElement)
      )
        setIsProfileActive(false);
    };
    document.addEventListener("click", handleProfile);
  }, []);

  const nestedNav = [
    {
      href: "/dashboard/profile",
      name: "Profile",
      icon: <BiMinus size={15} />,
    },
    {
      href: "/dashboard/subscriptions",
      name: "Subscriptions/Ads",
      icon: <BiMinus size={15} />,
    },
  ];



  return (
    <>
      <nav
        className={` top-0 left-0 h-full border-r bg-slate-900  ${
          state.collapse ? "w-0 overflow-hidden" : "w-80"
        } transition-all ease-in-out duration-200 space-y-8 `}
      >
        <div className="flex flex-col h-full px-4">
          <div className="h-20 flex items-center pl-2">
            <div className="w-full flex items-center gap-x-4">
              <img
                src={user?.image as string}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <span className="block text-orange-400 text-sm font-semibold">
                  {user?.firstname} {user?.lastname}
                </span>
                <span className="block mt-px text-white text-xs">
                  {user?.plan?.title}
                </span>
              </div>
              <div className="relative flex-1 text-right">
                <button
                  ref={profileRef}
                  className="p-1.5 rounded-md text-white hover:bg-gray-50 active:bg-gray-100 hover:text-slate-900"
                  onClick={() => setIsProfileActive(!isProfileActive)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isProfileActive ? (
                  <div className="absolute z-10 top-12 right-0 w-48 rounded-lg bg-white shadow-md border text-sm text-gray-600">
                    <div className="p-2 text-left">
                      <span className="block text-slate-800 p-2">
                        {user?.email}
                      </span>

                      <button
                        className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="overflow-auto border-t mt-3 pt-4 ">
            <ul className="text-sm font-medium flex-1 space-y-2">
              {navigation.map((item, idx) => (
                <li key={idx} className="">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-x-2  p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 hover:text-slate-900 duration-150 ${
                      item.href === pathname
                        ? "text-slate-900  bg-gray-50"
                        : "text-white"
                    }`}
                  >
                    <div className="hover:text-slate-900">{item.icon}</div>
                    {item.name}
                  </Link>
                </li>
              ))}

              <li>
                <Menu items={nestedNav}>
                  <MdManageAccounts size={24} />
                  Account
                </Menu>
              </li>
            </ul>
            {user?.role === "ADMIN" && (
              <div className="pt-2 mt-2 border-t">
                <ul className="text-sm font-medium flex-1 space-y-2">
                  {adminNavigation.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-x-2  p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 hover:text-slate-900 duration-150 ${
                          item.href === pathname
                            ? "text-slate-900  bg-gray-50"
                            : "text-white"
                        }`}
                      >
                        <div className="hover:text-slate-900">{item.icon}</div>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;

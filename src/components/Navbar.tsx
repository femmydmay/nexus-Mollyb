"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getUser } from "@/redux/reducers/userReducers";


import Image from "next/image";
import { usePathname } from "next/navigation";
import Dropdown from "./DropDown";

const Navbar = () => {
  const [state, setState] = useState(false);
  const navigation = [
    { title: "Home", path: "/" },
    { title: "Rent", path: "/listings?type=for+rent" },
    { title: "Sale", path: "/listings?type=for+sale" },
    // { title: "Agents", path: "/agents" },

  ];

  const path = usePathname()

  const dispatch = useAppDispatch();
 
  const user = useAppSelector((state) => state.userReducers);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <header className="shadow py-5 bg-white">
      <nav className="items-center  px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6">
        <div className="flex justify-between">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              width={120}
              height={50}
              alt="Float UI logo"
            />
          </Link>
          <button
            className="text-gray-500 outline-none md:hidden"
            onClick={() => setState(!state)}
          >
            {state ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        <ul
          className={`flex-1 justify-between mt-12 md:flex md:mt-0 ${
            state ? "" : "hidden"
          }`}
        >
          {user.user ? (
            <div className="order-2">

              <Dropdown />
            </div>
          ) : (
            <>
              <li className="order-2 pb-5 md:pb-0">
                <Link
                  href="/login"
                  className="py-3 px-6 rounded-md shadow-md text-white text-center bg-primary focus:shadow-none block md:inline"
                >
                  Sign In
                </Link>
              </li>
              <li className="order-2 pb-5 md:pb-0 ml-4">
                <Link
                  href="/signup"
                  className="py-3 px-6 rounded-md border text-primary border-primary text-center  focus:shadow-none block md:inline"
                >
                  Signup
                </Link>
              </li>
            </>
          )}

          <div className="order-1 flex-1 justify-center items-center space-y-5 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => (
              <li
                className={`text-gray-800 font-semi-bold text-xl px-2 rounded-lg hover:text-primary ${
                  path === item.path
                    ? "underline underline-offset-1 text-primary"
                    : ""
                }`}
                key={idx}
              >
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

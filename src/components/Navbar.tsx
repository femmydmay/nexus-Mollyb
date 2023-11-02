"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getUser } from "@/redux/reducers/userReducers";


import Image from "next/image";
import { usePathname } from "next/navigation";
import CheckAuth from "./CheckAuth";
import Loader from "./Loader";


const Navbar = () => {
  const [state, setState] = useState(false);
  const navigation = [
    { title: "Home", path: "/" },
    { title: "Rent", path: "/listings?type=for+rent" },
    { title: "Sale", path: "/listings?type=for+sale" },
    // { title: "Agents", path: "/agents" },

  ];

  const path = usePathname()



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
          <Suspense fallback={ <Loader/>}>
            
<CheckAuth/>
        </Suspense>
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

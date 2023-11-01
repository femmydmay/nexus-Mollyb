'use client'
import Link from "next/link";
import {  Dispatch, SetStateAction,  } from "react";
import { RxHome } from "react-icons/rx";
import {BiSolidBell} from 'react-icons/bi'
import { Button } from "@mui/joy";

interface Props {
  state: {
    collapse: boolean;
    setCollapse: Dispatch<SetStateAction<boolean>>;
    toggleDrawer: (
      inOpen: boolean
    ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  };
}

const DashNav =  ({state}:Props) => {
  // const [state, setState] = useState(false);
const {collapse, setCollapse} = state;
  // Replace javascript:void(0) paths with your paths


  return (
    <header className="text-base lg:text-sm ">
      <div className={`bg-white items-center   max-w-screen   lg:px-8 `}>
        <div className="flex items-center justify-between py-3 lg:py-5 max-lg:px-2 ">
          <a href="#">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo.png"
              width={120}
              height={50}
              alt="Float UI logo"
            />
          </a>
          <div className="flex items-end space-x-4 ">
            <button
              type="button"
              className="relative inline-flex items-center p-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <BiSolidBell size={20} />
              <span className="sr-only">Notifications</span>
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-4  -right-2 dark:border-gray-900">
                1
              </div>
            </button>

            <Link
              href="/"
              className="text-green-500 hover:underline flex items-center gap-2 shadow-green-400"
            >
              {" "}
              <RxHome size={20} />
              Home
            </Link>
            <button
              className="text-gray-500 hover:text-gray-800 max-lg:hidden"
              onClick={() => setCollapse((prev) => !prev)}
            >
              {collapse ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            <Button
              className="text-gray-500 hover:text-gray-800 lg:hidden"
              variant="outlined"
              color="neutral"
              onClick={state.toggleDrawer(true)}
            >
              {collapse ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};


export default DashNav
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  items: { href: string; icon: ReactNode; name: string }[];
}
const Menu = (props: Props) => {
  const { children, items } = props;
  const [isOpened, setIsOpened] = useState(false);
  const pathname = usePathname()
  return (
    <div className="">
      <button
        className="w-full flex items-center justify-between  text-white p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 hover:text-slate-900 duration-150"
        onClick={() => setIsOpened(!isOpened)}
      >
        <span className="flex items-center gap-x-2">{children}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 duration-150 ${isOpened ? "rotate-180" : ""}`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpened ? (
        <ul className="mx-4 px-2  text-sm font-medium">
          {items.map((item, idx) => (
            <li key={idx} className="my-2">
              <Link
                href={item.href}
                className={`flex items-center gap-x-2  p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150 hover:text-slate-900 ${
                  item.href === pathname
                    ? "text-slate-900  bg-gray-50"
                    : "text-white"
                }`}
              >
                {item.icon ? (
                  <span className=" hover:text-slate-900">{item.icon}</span>
                ) : (
                  ""
                )}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default Menu;

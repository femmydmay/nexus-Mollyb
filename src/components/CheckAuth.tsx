import Link from 'next/link';
import React, { useEffect } from 'react'
import Dropdown from "./DropDown";
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getUser } from '@/redux/reducers/userReducers';
const CheckAuth = () => {
      const dispatch = useAppDispatch();

      useEffect(() => {
        dispatch(getUser());
      }, []);
  const user = useAppSelector((state) => state.userReducers);

  return (
    <>
      {user.user ? (
        <div className="order-2">
          <Dropdown />
        </div>
      ) : (
        <>
          <li className="order-2 pb-5 md:pb-0">
            <Link
              href="/login"
              className="py-3 hover:bg-primary/70 px-6 rounded-md shadow-md text-white text-center bg-primary focus:shadow-none block md:inline"
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
    </>
  );
}

export default CheckAuth
"use client";

import { useAppSelector } from "@/hooks";
import { FaListAlt } from "react-icons/fa";
import { PiListPlusFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import axios, { AxiosError } from "axios";

import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import RecentListings from "./RecentListings";


const DashPage = () => {
  const { user } = useAppSelector((state) => state.userReducers);


  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);



  const verify = async () => {
    try {
      const response = await axios.post("/api/email/send-code", { email });
      if (response.status === 200) {
        toast.success("verification message sent");
        setToken(response.data.token);
        console.log(response);
        setSuccess(true);
      }
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;

      if (error.response) {
        toast.error(error.response?.data.message as string);
      }
    }
  };
  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      const response = await axios.post("/api/email/verify/" + token, {
        email,
        code,
      });
      if (response.status === 200) {
        toast.success("email verified successfully");
        setTimeout(() => {
          window.location.href = "";
        }, 1000);
      }
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;

      if (error.response) {
        toast.error(error.response?.data.message as string);
      }
    }
  };
  return (
    <>
      {user?.email_verified ? (
        <div className="bg-white p-2 mt-10 h-full space-y-4">
          <article>
            <h2 className="mb-4 font-semibold">Your Dashboard</h2>
            <hr />
            <p className="mt-3">
              Welcome back, {user?.firstname} {user.lastname}
            </p>
          </article>
          <div className="lg:grid lg:grid-cols-3  w-10/12 mx-auto max-lg:space-y-5 lg:h-32 mt-5 gap-5">
            <Link
              href="/dashboard/add-listing"
              className="border shadow rounded-md  p-3 text-primary grid place-items-center"
            >
              <PiListPlusFill size={30} />
              <p>Post a Listing</p>
            </Link>
            <Link
              href="/dashboard/listings"
              className="border  grid place-items-center p-3 text-green-400"
            >
              <FaListAlt size={30} />
              <p>Your Listings</p>
            </Link>
            <Link
              href="/dashboard/profile"
              className="border  grid place-items-center p-3 text-rose-500 "
            >
              <CgProfile size={30} />
              <p> Profile</p>
            </Link>
          </div>

          <hr className=" max-lg:hidden" />
          <div>
            <h2 className="font-bold">Recent Listings</h2>
                      <hr className="my-4 max-lg:hidden" />
                      
<RecentListings user={user}/>
     
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center  p-5 mt-2">
            <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
              <h3 className="text-2xl">
                Thanks for signing up for Nexus Classic!
              </h3>
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-24 h-24 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                  />
                </svg>
              </div>

              <p>
                We&apos;re happy you&apos;re here. Let&apos;s get your email
                address verified:
              </p>
              <div className="mt-4">
                {success ? (
                  <form action="" onSubmit={handleSubmit}>
                    <div>
                      <label className="font-medium">Email</label>
                      <input
                        type="text"
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        placeholder="abcd"
                        onChange={(event) => setCode(event.target.value)}
                        value={code}
                        // {...register("email")}
                      />
                      {/* {errors.email && (
                        <p className="text-rose-500">{errors.email.message}</p>
                      )} */}
                    </div>

                    <button className="w-full my-2 px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-indigo-600 rounded-lg duration-150">
                      submit
                    </button>
                  </form>
                ) : (
                  <button
                    className="px-2 py-2 text-blue-200 bg-blue-600 rounded"
                    onClick={verify}
                  >
                    Send Email Verification Code
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashPage;

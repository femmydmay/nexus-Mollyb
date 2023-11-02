"use client";
import { Fetcher } from "@/types/fetch";
import { Button } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import useSWR from "swr";
import { FaWhatsapp } from "react-icons/fa";
import Loader from "./Loader";


const fetcher: Fetcher = (url) =>
  axios.get(url as string).then((res) => res.data);
const Subs = () => {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/subscriptions/sub`,
    fetcher
  );

  if (!data || error) {
    return <Loader />;
  }
  return (
    <>
      {" "}
      <div className="grid grid-cols-2 my-3">
        <div>
          <h3 className="font-bold text-sm my-3 ">Current Plan</h3>
          <div className="grid grid-cols-2 gap-y-3">
            <h3 className="font-bold text-sm">Plan: </h3>
            <p>{data.plan.title}</p>
            <h3 className="font-bold text-sm">Began:</h3>
            <p>
              {new Date(data.subscriptions.starting_date).toLocaleDateString()}
            </p>
            <h3 className="font-bold text-sm">Expires:</h3>
            <p>
              {new Date(data.subscriptions.ending_date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-sm  my-3">Plan Details</h3>
          <div className="grid grid-cols-2 gap-y-3">
            <h3 className="font-bold text-sm">No of Standard Listing:</h3>
            <p>{data.plan.no_of_listings}</p>
            <h3 className="font-bold text-sm">No of Listings per month:</h3>
            <p>{data.plan.listings_per_month}</p>
            <h3 className="font-bold text-sm">No of Image Uploads :</h3>
            <p>{data.plan.image_uploads}</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="py-6 min-h-[10rem]">
        <p className="text-center">
          Upgrade your subscription to enjoy more benefits and visibility
        </p>

        <div className="flex justify-center mt-2">
          <Button
            variant="contained"
            color="warning"
            className="bg-orange-500 mx-auto block mt-3 w-fit"
          >
            <Link href="/dashboard/subscriptions/orders">Upgrade Plan</Link>
          </Button>
        </div>
      </div>
      <hr />
      <div className="items-center justify-center flex py-3">
        <p className="text-center ">Help Line:</p>
        <Link
          href="https://wa.me/+2348179006524"
          target="_blank"
          className="flex items-center ml-2 text-blue-600 hover:text-blue-400 "
        >
          <FaWhatsapp /> +234 817 900 6524
        </Link>
      </div>
    </>
  );
};

export default Subs;

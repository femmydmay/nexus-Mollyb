
import React from 'react'
import { BiPhone } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { Grid, Sheet, styled } from "@mui/joy";
import { Listing } from "@prisma/client";
import { useEffect } from "react";

import { searchListing } from "@/redux/reducers/listingReducers";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { User } from "@/types/user";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  //@ts-ignore
  ...theme.typography.body2,
  padding: theme.spacing(1),

  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));
interface Listings extends Listing {
  Uploads: Array<{
    url: string;
  }>;
  user: User;
}
const AllListings = () => {

  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  useEffect(() => {
    const search = searchParams.get("search") as string | "";
    const type = searchParams.get("type") as string | "";
    const property_type = searchParams.get("property-type") as string | "";
    const price = searchParams.get("price") as string | "";
    const state = searchParams.get("state") as string | "";
    dispatch(searchListing({ search, type, property_type, price, state }));
  }, [searchParams]);
      const { listings } = useAppSelector((state) => state.listingReducers);
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      {listings.map((listing) => {
        const listings = listing as Listings;

        return (
          <Grid md={6} xs={12} key={listings.id}>
            <Item>
              <Link href={`/details/${listing.id}`}>
                <div className="">
                  <div className="relative  flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white/10 bg-white">
                    <div className="w-full md:w-1/4 bg-white ">
                      <img
                        src={listings.Uploads[0].url}
                        alt="tailwind logo"
                        className="rounded w-full"
                      />
                    </div>
                    <div className="w-full md:w-3/4 grid">
                      <div className="">
                        <span className="font-bold text-2xl text-rose-700">
                          {new Intl.NumberFormat().format(
                            Number(listing.price)
                          )}
                        </span>{" "}
                        &nbsp;
                        <span>per {listing.price_per_unit}</span>
                      </div>

                      <p className=" text-md">{listing.title}</p>
                      <p className="font-bold text-rose-700 text-md">
                        {listing.address}, {listing.city}
                      </p>

                      <div>
                        <span className="text-yellow-400 capitalize font-bold text-md">
                          marketer:
                        </span>{" "}
                        <span>
                          {" "}
                          {listings.user.firstname} {listings.user.lastname}{" "}
                          Real Estate Consultant
                        </span>
                      </div>
                      <div className="flex gap-3 items-center">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                          {listing.market_status}
                        </span>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 flex gap-2">
                          <BiPhone size={15} /> {listings.user.phone_no}
                        </span>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 flex gap-2">
                          <MdEmail size={15} /> {listings.user.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Item>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default AllListings
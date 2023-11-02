'use client'
import ListingTable from "@/components/ListingTable";

import useSWR from "swr";
import React from "react";
import Loader from "./Loader";
import { Fetcher } from "@/types/fetch";

const fetcher: Fetcher = (...args) => fetch(...args).then((res) => res.json());
const ManageListing =  () => {


   const {
     data: listings,  
     error,
     isLoading,
   } = useSWR(`/api/listings`, fetcher);

       if (!listings || error) {
         return <Loader />;
       }
  
    return (
      <div>
        <ListingTable listings={listings as any} />
      </div>
    );
};

export default ManageListing;

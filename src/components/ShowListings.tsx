"use client";


import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Loader from "./Loader";
import AllListings from "./AllListings";





const ShowListings = () => {
  const searchParams = useSearchParams();

    return (
      <>
        <h3 className="font-bold">
          Results for Property {searchParams.get("type") as string | ""}
            </h3>
            <Suspense fallback={<Loader />}>
                <AllListings/>

            </Suspense>

        
     
      </>
    );
};

export default ShowListings;

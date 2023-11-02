
import Loader from "@/components/Loader";
import Subs from "@/components/Subs";
import React, { Suspense } from "react";

   


const Page = () => {

    
  return (
    <section className=" min-h-min my-auto grid place-items-center mt-3">
      <div className="shadow bg-white w-11/12 mx-auto p-2 ">
        <h3 className="font-bold text-base my-3">Subscription and Advert</h3>
        <hr />

        <Suspense fallback={<Loader/>}>
          <Subs/>
        </Suspense>
 
      </div>
    </section>
  );
};

export default Page;

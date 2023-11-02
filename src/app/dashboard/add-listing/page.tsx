import CreateListing from "@/components/CreateListing";
import Loader from "@/components/Loader";
import { Suspense } from "react";




const Page = () => {

  
    
  
  return (
    <div className="mt-3 bg-white w-11/12 mx-auto p-4 ">
      <h2 className="text-2xl font-bold text-slate-900 my-5">
        PROPERTY DETAILS
      </h2>
      <Suspense fallback={<Loader/>}>

  <CreateListing/>

      </Suspense>

    </div>
  ); 
};

export default Page;

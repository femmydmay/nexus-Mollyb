import DashPage from "@/components/DashPage";
import Loader from "@/components/Loader";
import { Suspense } from "react";

const Page = () => {




  return (
    <section className=" max-lg:w-11/12 lg:w-9/12 mx-auto h-full bg-white mt-4 pb-5 flex-1 overflow-y-auto ">
      <Suspense fallback={<Loader/>}>
        <DashPage/>
</Suspense>
    </section>
  );
};

export default Page;

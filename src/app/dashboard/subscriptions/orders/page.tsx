import Loader from "@/components/Loader";
import OrderComp from "@/components/OrderComp";
import { Suspense } from "react";

const Page = () => {


  return (
    <form className="md:flex  p-2">
    

      <Suspense fallback={<Loader/>}>
        <OrderComp/>
      </Suspense>
    </form>
  );
};

export default Page;

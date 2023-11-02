import Loader from "@/components/Loader";
import Manageuser from "@/components/Manageuser";
import { Suspense } from "react";


const Page = async () => {

  return (
    <div>
      <Suspense fallback={<Loader/>}>
        <Manageuser/>
    </Suspense>
    </div>
  );
};

export default Page;

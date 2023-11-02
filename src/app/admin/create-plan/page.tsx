import Loader from "@/components/Loader";
import PlanForm from "@/components/PlanForm";
import AdminCheck from "@/layout/AdminCheck";
import { Suspense } from "react";
const CreatePlan = () => {
  return (
    <AdminCheck>
      <div className="grid min-h-[80vh] place-items-center">
        <Suspense fallback={<Loader/>}>

        <PlanForm/>
        </Suspense>
      </div>
    </AdminCheck>
  );
};

export default CreatePlan;

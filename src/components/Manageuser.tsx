

import AdminCheck from "@/layout/AdminCheck";
import AllUsers from "@/components/AllUsers";



const Manageuser = async () => {
   

  

    return (
      <div>
        {" "}
        <AdminCheck>
          <AllUsers />
          {" "}
        </AdminCheck>
      </div>
    );
};

export default Manageuser;

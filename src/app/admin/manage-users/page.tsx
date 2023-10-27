

import { User } from "@/types/user";


// import AdminCheck from "@/layout/AdminCheck";
import AllUsers from "@/components/AllUsers";


const getUsers = async () => {
  const response = await fetch('http://localhost:3000/api/users')
  return response.json()
}

const Page = async () => {
const users = await getUsers() as User[];
  return (
    // <AdminCheck>
<AllUsers data={users}/>  
  
    // </AdminCheck>
  );
};

export default Page;

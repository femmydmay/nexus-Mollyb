


import Dash from "@/layout/Dash";

import AdminCheck from "@/layout/AdminCheck";



export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default async function  DashLayout({
  children,
}: {
  children: React.ReactNode;
  }, ) {
  




 
   

  return (
<>

      <AdminCheck>
        
    <Dash>
      
   

      {children}
 
 </Dash>
</AdminCheck>
</>
 
  );
}

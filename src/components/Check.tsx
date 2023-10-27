import React from 'react'
const getUser = async () => {
  const response = await fetch("http://localhost:3000/api/users/user");
  return response.json();
};
const Check = async ({ children }: { children: React.ReactNode }) => {
  const data = await getUser();
  
    return <div>{ children}</div>;
};

export default Check
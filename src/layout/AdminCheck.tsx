'use client'
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getUser } from "@/redux/reducers/userReducers";
import React, { useEffect } from "react";

const AdminCheck = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAppSelector((state) => state.userReducers);
  const dispatch= useAppDispatch()
  useEffect(() => {
  dispatch(getUser())
},[dispatch])
  if (loading) { 
    return <Loading/>
  }
  return (
    <>
      {user && (
              <>
                  {
                      
                      user.role === 'ADMIN'?
                      <>{children}</>:<NotFound/>
                }
        </>
      )}
    </>
  );
};

export default AdminCheck;

'use client'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useAppDispatch } from '@/hooks';
import { findAllListings } from '@/redux/reducers/listingReducers';
import React, { useEffect } from 'react'

const MainLayout = ({ children }:{
  children: React.ReactNode
}) => {


  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(findAllListings())
  },[])

  return (
    <main className='flex flex-col min-h-screen'>
      <Navbar />
      <section className='flex flex-col flex-1 bg-gray-200 '>

      {children}
      </section>
      <Footer />
    </main>
  );
}

export default MainLayout
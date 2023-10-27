import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react'

const MainLayout = ({ children }:{
  children: React.ReactNode
}) => {
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
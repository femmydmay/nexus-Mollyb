'use client'
import Loader from "@/components/Loader"
import ManageListing from "@/components/ManageListing"
import { Suspense } from "react"

const Page = () => {

   
    
    
  
    
   
  return ( 
    <div>
      <Suspense fallback={<Loader/>}>

<ManageListing/>
      </Suspense>

    </div>
  )
}

export default Page
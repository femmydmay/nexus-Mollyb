import ListingTable from '@/components/ListingTable'
import { Listing, User } from '@prisma/client'
import React from 'react'

const getListings = async () => {
    const response = await fetch('http://localhost:3000/api/listings', {
        cache:"no-cache"
    })
    if (response.status === 200) {
        return response.json()
    }
}

interface TopListing extends Listing {
  user: User;
  images: { url: string; id: string }[];
}
const Page = async () => {
    const listings = await getListings() as TopListing[]
   
    console.log(listings);
    
  
    
   
  return ( 
      <div>
          <ListingTable listings={listings}/>

    </div>
  )
}

export default Page
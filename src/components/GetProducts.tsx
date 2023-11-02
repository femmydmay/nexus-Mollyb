'use client'
import { Listing } from '@prisma/client';
import React from 'react'
import Products from './Products';
import Loader from './Loader';
import { useAppSelector } from '@/hooks';

const GetProducts = async () => {

  const {listings} = useAppSelector(state=>state.listingReducers)

  if (!listings) {
    return <Loader/>
  }
  return (
    <>
      {listings.length > 0 ? (
        <>
          <div className="">
            <Products
              item={
                listings.filter(
                  (list) => list.advert_type === "for sale" && list.TopListings
                ) as any
              }
              title="Top Selling Properties"
            />
          </div>
          <div className="">
            <Products
              item={
                listings.filter(
                  (list) => list.advert_type === "for rent" && list.TopListings
                ) as any
              }
              title="Top Renting Properties"
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default GetProducts
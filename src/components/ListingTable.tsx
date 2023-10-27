"use client";

import { Listing, User } from "@prisma/client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
interface TopListing extends Listing{
    user: User,
    images:{url:string, id:string}[]
    
}

const ListingTable = ({ listings }: { listings: TopListing[] }) => {

    
  const [selectedItem, setSelectedItem] = useState<'for rent'| 'for sale' | 'All'>('All');
  const labelColors: any = {
    Good: {
      color: "text-green-600 bg-green-50",
    },
    Normal: {
      color: "text-blue-600 bg-blue-50",
    },
    Great: {
      color: "text-pink-600 bg-pink-50",
    },
    Bad: {
      color: "text-red-600 bg-red-50",
    },
  };

    
    const handleClick = async ( id:string) => {
        try {
            const response = await axios.post(`/api/listings/top-listing`, {
               id,
            },
            ) 

            if (response.status === 200) { 
                toast.success('listing added to top page listing')
                setTimeout(() => window.location.href = '', 500)
            }

        } catch (error) {
          
            
        }
    }

  const handleDelete = async (id: string) => {
     
       try {
         const response = await axios.put(`/api/listings/top-listing/`,{id});

         if (response.status === 200) {
           toast.success("listing reomved from top page listing");
           setTimeout(() => (window.location.href = ""), 500);
         }
       } catch (error) {
       
       }
     };

  return (
    <div className=" max-sm:w-11/12 w-10/12  mx-auto mt-20 bg-white p-5 shadow rounded">
      <div className="items-center justify-between md:flex p-4 ">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            All Listings
          </h3>
        </div>
        <button></button>
      </div>
      <div className="text-sm mt-12 overflow-x-auto ">
        <ul
          role="tablist"
          className="w-full border-b flex items-center gap-x-3 overflow-x-auto"
        >
          <li
            className={`py-2 border-b-2 ${
              selectedItem == "All"
                ? "border-orange-600 text-orange-600"
                : "border-white text-gray-500"
            }`}
          >
            <button
              role="tab"
              aria-selected={selectedItem == "All" ? true : false}
              aria-controls={`tabpanel-all`}
              className="py-2.5 px-4 rounded-lg duration-150 hover:text-orange-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
              onClick={() => setSelectedItem("All")}
            >
              All
            </button>
          </li>
          <li
            className={`py-2 border-b-2 ${
              selectedItem == "for rent"
                ? "border-orange-600 text-orange-600"
                : "border-white text-gray-500"
            }`}
          >
            <button
              role="tab"
              aria-selected={selectedItem == "for rent" ? true : false}
              aria-controls={`tabpanel-Rent`}
              className="py-2.5 px-4 rounded-lg duration-150 hover:text-orange-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
              onClick={() => setSelectedItem("for rent")}
            >
              For Rent
            </button>
          </li>
          <li
            className={`py-2 border-b-2 ${
              selectedItem == "for sale"
                ? "border-orange-600 text-orange-600"
                : "border-white text-gray-500"
            }`}
          >
            <button
              role="tab"
              aria-selected={selectedItem == "for sale" ? true : false}
              aria-controls={`tabpanel-Sell`}
              className="py-2.5 px-4 rounded-lg duration-150 hover:text-orange-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
              onClick={() => setSelectedItem("for sale")}
            >
              For Sale
            </button>
          </li>
        </ul>
        <table className="w-full table-auto text-left ">
          <thead className="text-gray-600 font-medium border-b">
            <tr>
              <th className="w-9/12 py-4 pr-6 capitalize">
                {selectedItem === null ? "All" : selectedItem}
              </th>
              <th className="py-4 pr-6">Agent</th>
              <th className="py-4 pr-6">Clicks</th>
              <th className="py-4 pr-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {listings 
              .filter((listing) =>
                selectedItem === "All"
                  ? listing
                  : listing.advert_type === selectedItem
              )
              .map((item, idx) => (
                <tr key={item.id}>
                  <td className="pr-6 py-4 whitespace-nowrap">{item.title}</td>
                  <td className="pr-6 py-4 whitespace-nowrap text-orange-600 capitalize">
                    {item.user.firstname} {item.user.lastname}
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">-</td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {item.TopListings ? ( 
                      <button
                        className="bg-orange-600 text-white hover:bg-orange-500 px-2 py-1 rounded-md "
                        onClick={() => handleDelete(item.id as string)}
                      >
                  Remove from top listings
                      </button>
                    ) : (
                      <button
                        className="bg-green-600 text-white hover:bg-green-500 px-2 py-1 rounded-md "
                        onClick={() => handleClick(item.id)}
                      >
                        Add to top listings
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListingTable;

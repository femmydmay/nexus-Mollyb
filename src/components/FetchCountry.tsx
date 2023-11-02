
'use client'
import React from "react";

import { UseFormRegister } from "react-hook-form";




const FetchCountry =  ({

register
}: {
  register:UseFormRegister<any>
  }) => {
   
   

    return (
      <select className="w-full py-3 pl-2 rounded" {...register("country")}>
        <option value="Nigeria">Nigeria</option>
      </select>
    );
  };

export default FetchCountry;

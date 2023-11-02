"use client";

import { Fetcher } from "@/types/fetch";
import axios from "axios";
import { UseFormRegister } from "react-hook-form";








const SelectFetch = ({ register, country }: { register: UseFormRegister<any>; country:string }) => {

  return (
    <select className="w-full py-3 pl-2" {...register("state")}>
      <option value="Abuja">Abuja</option>
       <option value="Lagos">Lagos</option>
       <option value="Rivers">Rivers</option>
      <option value="Enugu">Enugu</option>
    </select>
  );
};

export default SelectFetch;




"use client";

import { Fetcher } from "@/types/fetch";
import axios from "axios";
import { UseFormRegister } from "react-hook-form";

import useSWR from "swr";






const SelectFetch = ({ register, country }: { register: UseFormRegister<any>; country:string }) => {

  return (
    <select className="w-full py-3 pl-2" {...register("state")}>
      <option value="FC">Abuja Federal Capital Territory</option>
       <option value="LA">Lagos</option>
       <option value="RI">Rivers</option>
      <option value="EN">Enugu</option>
    </select>
  );
};

export default SelectFetch;

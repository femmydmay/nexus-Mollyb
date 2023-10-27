
'use client'
import React from "react";
import { Fetcher } from "@/types/fetch";
import useSWR from "swr";
import axios from "axios";
import { UseFormRegister } from "react-hook-form";



const fetcher: Fetcher = (url) =>
  axios
    .get(url as string, {
      headers: {
        "X-CSCAPI-KEY":
          "ODhUbUpBQ2hIdG5yekg4dzBtUVdFQ3BxQU5KR1BvdTFVWmN0cjlpeA==",
      },
    })
    .then((res) => res.data);
interface CountriesData {
  iso2: string;

  name: string;



}
const FetchCountry =  ({

register
}: {
  register:UseFormRegister<any>
  }) => {
    const { data, isLoading, error, mutate } = useSWR(
      "https://api.countrystatecity.in/v1/countries",
      fetcher
    );
    const state: CountriesData[] = data;
   

    return (
      <select className="w-full py-3 pl-2 " {...register("country")}>
        <option value="NG">Nigeria</option>
      </select>
    );
  };

export default FetchCountry;

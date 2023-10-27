'use client'

import { Fetcher } from "@/types/fetch";
import axios from "axios";
import { UseFormRegister } from "react-hook-form";

import useSWR from "swr";
interface Props {
  country: string;
  state: string;

  register: UseFormRegister<any>;
}

interface City {
  id: number;
  name: string;
}


const fetcher: Fetcher = (url) =>
  axios
    .get(url as string, {
      headers: {
        "X-CSCAPI-KEY":
          "ODhUbUpBQ2hIdG5yekg4dzBtUVdFQ3BxQU5KR1BvdTFVWmN0cjlpeA==",
      },
    })
    .then((res) => res.data);

const FetchCity = ({ country, state,  register}: Props) => {
  
  const { data, isLoading, error, mutate } = useSWR(
    `https://api.countrystatecity.in/v1/countries/NG/states/${state}/cities`,
    fetcher
    );
    const cities: City[] = data
  

  return (
    <select
      className="w-full py-3 pl-2"
  {...register('city')}
    >
      {isLoading ? (
        <option value="">loading...</option>
      ) : (
        cities.map((st) => (
          <option key={st.id} value={st.name}>
            {st.name}
          </option>
        ))
      )}
    </select>
  );
};

export default FetchCity;

'use client'


import { cities } from "@/utils/data";

import { UseFormRegister } from "react-hook-form";


interface Props {
  country: string;
  state: 'Lagos' | 'Abuja' | 'Rivers' | 'Enugu';

  register: UseFormRegister<any>;
}





const FetchCity = ({  state,  register}: Props) => {
  
 
  

  return (
    <select
      className="w-full py-3 pl-2 rounded"
  {...register('city')}
    >
      {
        cities[state].map((st) => (
          <option key={st} value={st}>
            {st}
          </option>
        ))
    }
    </select>
  );
};

export default FetchCity;

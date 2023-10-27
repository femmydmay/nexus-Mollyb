import React from 'react'
import { UseFormRegister } from 'react-hook-form';
interface Props {
data: Array<{value:string, label:string}>
  // handleChange: React.ChangeEventHandler<HTMLSelectElement>;
  // value: string;
  name: string;
  register:UseFormRegister<any>
}

const CustomSelect = ({data,  register, name}:Props) => {
  return (
    <select  id="" className="w-full py-3 pl-2" {...register(name)}  >
      {data.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default CustomSelect
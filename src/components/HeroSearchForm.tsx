'use client'
import { ReadonlyURLSearchParams, usePathname, useSearchParams, useRouter } from 'next/navigation';
import * as yup from "yup";
// import { useRouter } from 'next/router';
import React, { useCallback } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
interface SearchParams extends ReadonlyURLSearchParams{
    size: number
}
interface Type {
  search: string;
  property_type: string;
}

const HeroSearchForm = () => {

      const formSchema = yup.object().shape({
        search: yup.string(),
        property_type: yup.string()
      });
     const {
       register,
       reset,
       watch,
       handleSubmit,
       formState: { errors },
     } = useForm<Type>({
         resolver: yupResolver(formSchema),
         defaultValues:{
           property_type:"for+sale"
       }
     });
     const router = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();

      const createQueryString = useCallback(
          (name: string, value: string) => {
              
              const params = new URLSearchParams(searchParams as SearchParams); 
     
          params.set(name, value);

          return params.toString();
        },
        [searchParams]
      );
    
    const handlesubmit = handleSubmit((data) => {
        
       
           router.replace(`/listings?search=${data.search}&type=${data.property_type}`)
    })
    return (
      <form onSubmit={handlesubmit}>
        <div className="flex mb-5">
          <div className="radio-inputs">
            <label className="radio">
              <input type="radio" {...register('property_type')}   value='for+rent'/>
              <span className="name">Rent</span>
            </label>
            <label className="radio">
                        <input type="radio" {...register('property_type')} value='for+sale' />
              <span className="name">Buy</span>
            </label>
          </div>
        </div>
        <div className="w-full flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary "
              placeholder="Search properties"
              {...register("search")}
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    );
}

export default HeroSearchForm
'use client'
import React, { use, useEffect } from 'react'
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { Fetcher } from '@/types/fetch';


import AdminCheck from '@/layout/AdminCheck';
import { plans_details } from "@/utils/data";
import Select from "react-select";
import makeAnimated from "react-select/animated";
interface Details {
  value: string;
  label: string;
}
interface IPlan {
  id: string;
  title: string;
  price: number;
  listing_expiry: string;
  image_uploads: string;
  max_listings: string;
}
const animatedComponents = makeAnimated();
const fetcher: Fetcher = (...args) => fetch(...args).then((res) => res.json());
const SinglePlan = ({ params }: { params: { id: string } }) => {
    const formSchema = yup.object().shape({
      title: yup.string().required("plan title is required"),
      price: yup
        .number()
        .required("Price is required")
        .typeError("price must be a number")
        .moreThan(-1, "price can not be a negative value"),

      max_listings: yup.string().required("Listing number is required"),
      image_uploads: yup.string().required("Image upload can not be enpty"),
    });
    
    const {id} =  params

  
    const {
      data: plan,
      error,
      isLoading,
  } = useSWR(`/api/plans/${id}`, fetcher);
  


 
    const {
      register,
      watch,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<IPlan>({
      //@ts-ignore
      resolver: yupResolver(formSchema),
      defaultValues: {
        title: "",
       
        price: 0,
        id: ''
        
    }
    });
  const [details, setDetails] = React.useState<Details[]>([]);
   const onsubmit = handleSubmit(async (data) => {
    console.log(data);
    
     try {
       const response = await axios.put(`/api/plans/${data.id}`, {
         ...data,
         max_listings: Number(data.max_listings),
         other_features: JSON.stringify(details),
       });
       if (response.status === 200) {
         toast.success("plan updated suuccessfully");
         reset({ title: response.data.title,  price: response.data.price });  
       }
     } catch (error) {
       const e = error as AxiosError<{ message: string }>;

       if (e.response) {
         toast.error(e?.response?.data?.message as string);
       }
     }
   });

  //  if (isLoading) {
  //    return <CircularProgress />;
  //  }
  useEffect(() => {

    if (plan) {
      console.log(plan);

 
      reset({ title: plan.title, price: plan.price, id: plan.id, image_uploads: plan.image_uploads, max_listings: plan.max_listings.toString(), })
      setDetails(JSON.parse(plan.other_features))
  }

},[plan])
  
  console.log(details);
  
  



  return (
    <AdminCheck>
      <div className="grid min-h-[80vh] place-items-center">
        <form
          action=""
          className="w-2/3 max-sm:w-11/12 max-md:w-4/5 mx-auto bg-white rounded p-3 shadow-md"
          onSubmit={onsubmit}
        >
          <h1 className="text-center uppercase text-orange-800 font-bold text-2xl mb-8">
            Create Plans
          </h1>

          <div className="grid grid-cols-2 items-center gap-2">
            <div>
              <label
                htmlFor="title"
                className="mb-1 block text-base font-medium text-slate-700"
              >
                Title
              </label>
              <input
                type="text"
                className="w-full rounded"
                placeholder="Title"
                {...register("title")}
              />
            </div>
            <div>
              <label
                htmlFor="fName"
                className="mb-1 block text-base font-medium text-slate-700"
              >
                Number of Listings Per Month
              </label>
              <select
                {...register("max_listings")}
                id=""
                className="w-full rounded block h-10  pl-1"
              >
                <option value="0">0</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="10">10</option>
                <option value="15">15</option>  
                <option value="20">20</option>
                <option value="unlimited">unlimited</option>
              </select>
            </div>
          </div>
          {errors.title && (
            <p className="text-rose-500 first-letter:uppercase">
              {errors.title.message}
            </p>
          )}


          <div className="my-2">
            <label
              htmlFor="fName"
              className="mb-1 block text-base font-medium text-slate-700"
            >
              Price
            </label>
            <input
              type="number"
              className="w-full  rounded "
              placeholder="Price"
              {...register("price")}
            />
            {errors.price && (
              <p className="text-rose-500 first-letter:uppercase">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="mb-1">
            <label
              htmlFor="fName"
              className=" block text-base font-medium text-slate-700"
            >
              Other Features
            </label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              placeholder="Other Features"
              isMulti
              required
              className="mb-3"
              value={details}
              onChange={(newValue) => {
                setDetails(newValue as Details[]);
              }}
              options={plans_details}
            />
          </div>

          <button className="bg-orange-500 text-white float-right  py-2 px-5 rounded">
            Save
          </button>
        </form>
      </div>
    </AdminCheck>
  );
};

export default SinglePlan
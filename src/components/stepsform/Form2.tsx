import React, { MouseEventHandler, useState, useEffect } from 'react'

import Facilities from '../Facilities';

import { Box, Button, SelectChangeEvent } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup"; 

import { toast } from 'react-hot-toast';

interface Props {
  handleNext: MouseEventHandler<HTMLButtonElement>;
  handleBack: MouseEventHandler<HTMLButtonElement>;
  steps: {
    label: string;
    Component: ({ handleNext, handleBack, index, steps }: Props) => React.JSX.Element;
  }[];
  index: number;
}

interface IForm {
 
  price: string;


  bedrooms: string|null;
  bathrooms: string|null; 
  toilets: string |null;
  year_built: string;
  total_area: string;
price_per_unit: string;
  covered_area: string;

}
const Form2 = ({ handleNext, handleBack, index, steps }: Props) => {

 const res = JSON.parse(
    localStorage.getItem("propertydata") as string
  )

    const formSchema = yup.object().shape({
     
      price: yup.string(),
   
      show_price: yup.string(),
      bedrooms: yup.string(),
      bathrooms: yup.string(),
      toilets: yup.string(),
      year_built: yup.string(),
      total_area: yup.string(),
price_per_unit: yup.string(),
      covered_area: yup.string(), 
     
    });

    const {
      register,
      handleSubmit,
      watch,
      getValues,
      setValue,
      reset,
      formState: { errors },
    } = useForm<IForm>({
      //@ts-ignore
      resolver: yupResolver(formSchema),
      defaultValues: {
      
        price: "",
      
        bedrooms: null,
        bathrooms: null,
        toilets: null,
        year_built: "",
        total_area: "",
      
        covered_area: "",
      
      },
    });
  const handleChange = (event: SelectChangeEvent<typeof facilities>) => {
    const {
      target: { value },
    } = event;
    setFacilities(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [facilities, setFacilities] = React.useState<string[]>([]);




  const submit = handleSubmit(async (data) => {
    try {
      if (!data.price) {
        toast.error("please fill in the price for the property")
        return 
  }

      const res = JSON.parse(localStorage.getItem("propertydata") as string);
             localStorage.setItem(
               "propertydata",
               JSON.stringify({...res, ...data, facilities })
        );
     

         const next: any = handleNext;
        next()
      // }
    } catch (err) {
      

    }
  })

  useEffect(() => {

  const result = JSON.parse(
    localStorage.getItem("propertydata") as string
  ) as IForm;

  if (result.price || result.year_built) {
    reset({
   ...result
      
    });
    }
    
        
},[res])
  

  return (
    <form onSubmit={submit}>
      <section className=" py-4 my-5 ">
        <div className="grid grid-cols-2 gap-2 items-center">
          <div>
            <label
              htmlFor="fName"
              className="mb-1 block text-base font-medium text-slate-900"
            >
              Price (₦)
            </label>

            <input
              type="number"
              id="fName"
              placeholder="eg. ₦100,000"
              {...register("price")}
              className="w-full  border border-slate-900 bg-white py-3 px-6 text-base font-medium text-slate-900 outline-none focus:border-slate-900 focus:shadow-md appearance-none"
            />
          </div>

          <div>
            <label
              htmlFor="fName"
              className="mb-1 block text-base font-medium text-slate-900"
            >
              Unit per price
            </label>

            <input
              type="text"
              id="fName"
              placeholder="eg. room"
              {...register("price_per_unit")}
              className="w-full  border border-slate-900 bg-white py-3 px-6 text-base font-medium text-slate-900 outline-none focus:border-slate-900 focus:shadow-md appearance-none"
            />
          </div>
        </div>
      </section>
      <hr />
      <div className="my-2">
        <p className="">Select the available facilities at this property</p>
        <Facilities
          data={[
            "24/7 Electricity",
            "Furnished",
            "Swimming Pool",
            "Elevator",
            "Water Facility",
            "Serviced",
            "Parking Space",
            "Gym",
          ]}
          handleChange={handleChange}
          values={facilities}
          label="facilities"
        />
      </div>

      <section className="border-b py-5 border-y">
        <section className="grid grid-cols-4 gap-2 my-6">
          <div>
            <label
              htmlFor="fName"
              className="mb-1 block text-base font-medium text-slate-900 border-slate-900"
            >
              No of bedrooms
            </label>

            <input
              type="text"
              placeholder="No of bedrooms"
              // onChange={handleChangeInput}
              // value={data.bedrooms}
              {...register("bedrooms")}
              className="w-full  border border-slate-900 bg-white py-3 px-6 text-base font-medium text-slate-900 outline-none focus:border-slate-900 focus:shadow-md"
            />
          </div>
          <div>
            <label
              htmlFor="fName"
              className="mb-1 block text-base font-medium text-slate-900"
            >
              No of Bathrooms
            </label>

            <input
              type="text"
              {...register("bathrooms")}
              placeholder="No of Bathrooms"
              className="w-full  border border-slate-900 bg-white py-3 px-6 text-base font-medium text-slate-900 outline-none focus:border-slate-900 focus:shadow-md"
            />
          </div>
          <div>
            <label
              htmlFor="fName"
              className="mb-1 block text-base font-medium text-slate-900"
            >
              No of Toilets
            </label>

            <input
              type="text"
              placeholder="No of Toilets"
              {...register("toilets")}
              className="w-full  border border-slate-900 bg-white py-3 px-6 text-base font-medium text-slate-900 outline-none focus:border-slate-900 focus:shadow-md"
            />
          </div>
          <div>
            <label
              htmlFor="fName"
              className="mb-1 block text-base font-medium text-slate-900"
            >
              Year Built
            </label>

            <input
              type="number"
              placeholder="Year Property was Built"
              {...register("year_built")}
              className="w-full  border border-slate-900 bg-white py-3 px-6 text-base font-medium text-slate-900 outline-none focus:border-slate-900 focus:shadow-md"
            />
          </div>
        </section>

        <section className="grid-cols-2 grid gap-2 w-1/2">
          <div>
            <p>Total Area</p>
            <input
              type="text"
              placeholder="eg. 2(sqm)"
              {...register("total_area")}
              className="w-full"
            />
          </div>

          <div>
            <p>Covered Area</p>
            <input
              type="text"
              placeholder="eg. 2(sqm)"
              {...register("covered_area")}
            />
          </div>
        </section>
      </section>

      <Box sx={{ mb: 2 }}>
        <div>
          <Button
            variant="contained"
            type="submit"
            // onClick={handleNext}
            className="bg-blue-800"
            sx={{ mt: 1, mr: 1 }}
          >
            {index === steps.length - 1 ? "Finish" : "Continue"}
          </Button>
          <Button
            disabled={index === 0}
            onClick={handleBack}
            sx={{ mt: 1, mr: 1 }}
          >
            Back
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default Form2
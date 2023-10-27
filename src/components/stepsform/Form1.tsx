import React, { MouseEventHandler, Suspense } from "react";
import CustomSelect from "../CustomSelect";
import {
  advertOptions,
  available,
  propertyType,
  propertyUse,
} from "../../utils/data";
import FetchCountry from "../FetchCountry";
import FetchCity from "../FetchCity";
import SelectFetch from "../SelectFetch";
import { Box, Button } from "@mui/material";


import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Alert } from "flowbite-react";
import { BiError } from "react-icons/bi";

interface IForm {
  state: string;
  country: string;
  city: string;
  title: string;
  advert_type: string;
  property_type: string;
  property_use: string;
  show_address: string;
  market_status: string;
  address: string;
}
interface Props {
  handleNext: MouseEventHandler<HTMLButtonElement>;
  handleBack: MouseEventHandler<HTMLButtonElement>;
  steps: {
    label: string;
    Component: ({
      handleNext,
      handleBack,
      index,
      steps,
    }: Props) => React.JSX.Element;
  }[];
  index: number;
}
const Form1 = ({ handleNext, handleBack, index, steps }: Props) => {
  const formSchema = yup.object().shape({
    state: yup
      .string()
      .required("Provide the state where the prperty is located!"),
    country: yup
      .string()
      .required("Provide the country where the prperty is located!"),
    city: yup
      .string()
      .required("Provide the City where the property is located!"),
    title: yup.string().required("Title field can not be empty!!!"),
    advert_type: yup.string().required("select one advert type!"),
    property_type: yup.string(),
    property_use: yup.string(),
    show_address: yup.string().default("true"),
    market_status: yup.string(),
    address: yup.string().required("address is required to upload property"),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      state: "FC",
      country: "NG",
      city: "Abuja",
      title: "",
      advert_type: "",
      property_type: "",
      property_use: "",
      show_address: "true",
      market_status: "",
      address: "",
    },
  });

  const submit = handleSubmit(async (data) => {
    try {
      const next: any = handleNext;

      localStorage.setItem("propertydata", JSON.stringify(data));

      next();
    } catch (error) {}
  });

  return (
    <form onSubmit={submit}>
      {errors.title || errors.advert_type || errors.city || errors.address ? (
        <Alert color="failure" icon={BiError}>
          {Object.values(errors).map((err) => {
            return <p key={err.message}>{err.message}</p>;
          })}
        </Alert>
      ) : (
        ""
      )}
      <section className="grid lg:grid-cols-2 gap-2">
        <div className="mb-5">
          <label
            htmlFor="fName"
            className="mb-1 block text-base font-medium text-slate-900"
          >
            Listing title
          </label>
          <input
            type="text"
            {...register("title")}
            id="fName"
            placeholder="e.g 10 bedroom house for sale"
            className={`w-full  border-slate-900 border  bg-white py-3 px-6 text-base font-medium text-slate-900 outline-none focus:border-slate-900 focus:shadow-md`}
          />
        </div>

        <section className="grid lg:grid-cols-2 gap-2">
          <div className="">
            <label
              htmlFor="fName"
              className="mb-1 block text-base font-medium text-slate-900"
            >
              Advertising For
            </label>

            <CustomSelect
              data={advertOptions}
              // handleChange={onChangeSelect}
              register={register}
              name="advert_type"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="fName"
              className="mb-1 block text-base font-medium text-slate-900"
            >
              Property Type
            </label>

            <CustomSelect
              data={propertyType}
              register={register}
              name="property_type"
            />
          </div>
        </section>
      </section>

      <section className="grid lg:grid-cols-2 gap-2">
        <div>
          <label
            htmlFor="fName"
            className="mb-1 block text-base font-medium text-slate-900"
          >
            Use of Property
          </label>
          <CustomSelect
            data={propertyUse}
            register={register}
            name="property_use"
          />
        </div>
        <div>
          <label
            htmlFor="fName"
            className="mb-1 block text-base font-medium text-slate-900"
          >
            Market Status
          </label>
          <CustomSelect
            data={available}
            register={register}
            name="market_status"
          />
        </div>
      </section>

      <section className="border-y py-4 my-5 ">
        <h2 className="text-md text-slate-900">
          Provide information on location of property
        </h2>
        <div className="grid lg:grid-cols-2 gap-4 my-4">
          <div>
            <label
              htmlFor="fName"
              className="mb-1 block text-base font-medium text-slate-900"
            >
              Country
            </label>

            <FetchCountry register={register} />
          </div>

          <div className="grid lg:grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="fName"
                className="mb-1 block text-base font-medium text-slate-900"
              >
                State
              </label>
              <Suspense
                fallback={
                  <select className="w-full py-3 ">
                    <option value="">Loading state...</option>
                  </select>
                }
              >
                <SelectFetch
                  register={register}
                  // setValues={setValue}
                  country={getValues().country}
                />
              </Suspense>
            </div>
            <div>
              <label
                htmlFor="fName"
                className="mb-1 block text-base font-medium text-slate-900"
              >
                City
              </label>

              <FetchCity
                register={register}
                country={getValues().country}
                state={watch().state}
              />
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4 my-5">
          <div className="">
            <label
              htmlFor="fName"
              className="mb-1 block text-base font-medium text-slate-900"
            >
              Property Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address")}
              placeholder="e.g abc Road Chevron Tollgate Drive , Eko, Lagos"
              className="w-full  border border-slate-900 bg-white py-3 px-6 text-base font-medium text-slate-900 outline-none focus:border-slate-900 focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="fName"
              className="mb-1 block text-base font-medium text-slate-900"
            >
              Reveal Property Location?
            </label>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                {...register("show_address")}
                id="show_address"
                value="true"
                // checked={watch().show_address === "true" ? true : false}
                placeholder="e.g gwarimpa first avenue"
                className="  checked:ring-orange-500 checked:bg-orange-500"
              />
              <span>Yes (Recommended)</span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="show_address"
                value="false"
                placeholder="e.g gwarimpa first avenue"
                {...register("show_address")}
                className="  checked:ring-orange-500 checked:bg-orange-500"
              />
              <span>No</span>
            </div>
          </div>
        </div>
      </section>

      <Box sx={{ mb: 2 }}>
        <div>
          <Button
            variant="contained"
            type="submit"
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

export default Form1;

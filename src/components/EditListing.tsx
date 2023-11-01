'use client'
import { SetStateAction, Dispatch, Suspense, useState, useEffect } from "react";


import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog, { ModalDialogProps } from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import { Listing } from "@prisma/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FetchCountry from "./FetchCountry";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Alert } from "flowbite-react";
import { BiError } from "react-icons/bi";
import CustomSelect from "./CustomSelect";
import {
  advertOptions,
  available,
  propertyType,
  propertyUse,
} from "../utils/data";
import SelectFetch from "./SelectFetch";
import FetchCity from "./FetchCity";
import Facilities from "./Facilities";
import { SelectChangeEvent, Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";
const EditListing = ({
  layout,
  setLayout,
  listing,
}: {
  layout: "center" | "fullscreen" | undefined;
  setLayout: Dispatch<SetStateAction<"center" | "fullscreen" | undefined>>;
  listing: Listing;
}) => {
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
  const [description, setDescription] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,

    formState: { errors },
  } = useForm<Listing>({
    // @ts-ignore
    resolver: yupResolver(formSchema),
    defaultValues: {
      state: "FC",
      country: "NG",
      city: "Abuja",
      title: "",
      advert_type: "",
      property_type: "",
      property_use: "",
      show_address: "true" as any,
      market_status: "",
      address: "",
    },
  });
  const [facilities, setFacilities] = useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof facilities>) => {
    const {
      target: { value },
    } = event;
    setFacilities(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const submit = handleSubmit(async (data) => {
    try {
      const response = await axios.put("/api/listings", {
        ...data,
        facilities: JSON.stringify(facilities),
        description,
        show_address: JSON.parse(data.show_address as any),
      });
      if (response.status === 200) {
        toast.success("listing updated");
        setLayout(undefined)
      }
    } catch (error) {
      console.error(error)
      toast.error("error updating listing");
    }
  });

  useEffect(() => {
 
    if (listing) {
      setFacilities(JSON.parse(listing.facilities as string));
      setDescription(listing.description as string);
      reset({
        ...listing,
        show_address: JSON.stringify(listing.show_address) as any,
      });
    }
  }, [listing, reset]);

  return (
    <>
      <Modal open={!!layout} onClose={() => setLayout(undefined)}>
        <ModalDialog
          aria-labelledby="layout-modal-title"
          aria-describedby="layout-modal-description"
          layout={layout}
          sx={{ overflowY: "auto" , width:"70%"}}
        >
          <ModalClose />
          <Typography
            id="layout-modal-title"
            component="h2"
            className="text-center font-bold text-slate-900"
          >
            Edit Listing
          </Typography>
          <hr />
          <div>
            <form onSubmit={submit}>
              {errors.title ||
              errors.advert_type ||
              errors.city ||
              errors.address ? (
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
                    placeholder="Title"
                    className={`w-full pl-2  border-slate-900 border  bg-white py-3 px-6 text-base font-medium text-slate-900 outline-none focus:border-slate-900 focus:shadow-md`}
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
                      placeholder="e.g gwarimpa first avenue"
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

              <hr />
              <section className=" py-4 my-5 ">
                <div className="grid lg:grid-cols-2 gap-2 items-center">
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
                      placeholder="eg. ₦10000"
                      {...register("price")}
                      className="w-full  border border-slate-900 bg-white py-3 px-6 text-base font-medium text-slate-900 outline-none focus:border-slate-900 focus:shadow-md appearance-none"
                    />
                  </div>
                  <div className="">
                    <p className="">
                      Select the available facilities at this property
                    </p>
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
                </div>
              </section>

              <section className="border-b py-5 border-y">
                <section className="grid lg:grid-cols-4 gap-2 my-6">
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

                <section className="lg:grid-cols-2 grid gap-2 w-1/2 mb-5">
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

                <hr />
                <h2 className="font-bold text-xl py-4">Description</h2>
                <hr />
                <div className="h-80 mt-5">
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    placeholder="Description"
                    className="h-60"
                  />
                </div>
              </section>

              <Button
            
                variant="contained"
                className="float-right my-2 bg-primary"
                type="submit"
              >
                {" "}
                Update
              </Button>
            </form>
          </div>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default EditListing;

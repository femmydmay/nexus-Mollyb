"use client";

import { Fetcher } from "@/types/fetch";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Loading from "@/components/Loading";
const fetcher: Fetcher = (url) =>
  axios.get(url as string).then((res) => res.data);

interface IForm {
  plan: string;
  duration: string;
  payment_method: string;
  coupon: string;
  name: string;
  address: string;
  email: string;
  phone_number: string;
}
const Page = () => {
  const { data } = useSWR(`/api/plans`, fetcher);
  const formSchema = yup.object().shape({
    plan: yup.string().required("Please choose a plan"),
    duration: yup.string().required("Please choose a duration"),
    payment_method: yup.string().required("Please choose a payment method"),
    coupon: yup.string(),
    name: yup.string().required("please enter your full name"),
    email: yup.string().email("Please enter your email address"),
    phone_number: yup.string(),
  });
  const [duration, setDuration] = useState("");
  const {
    register,

    watch,

    formState: { errors },
  } = useForm<IForm>({
    //@ts-ignore
    resolver: yupResolver(formSchema),
    defaultValues: {
      // address: "",
      coupon: "",
      duration: "1",
      email: "",
      name: "",
      payment_method: "online",
      phone_number: "",
      plan: "10000",
    },
  });
  var date = new Date();
  useEffect(() => {
    date.setMonth(date.getMonth() + Number(watch().duration));
    setDuration(
      date.toLocaleDateString("default", { month: "long", year: "numeric" })
    );
  }, [date, register, watch, watch().duration]);
  if (!data) {
    return <Loading />;
  }

  return (
    <form className="md:flex  p-2">
      <div className="md:w-8/12  bg-white px-2 border-r border-slate-800 shadow rounded-l">
        <div className="  my-2 mx-auto">
          <div className="flex justify-between w-full p-3">
            <h2 className="font-bold">Order Details</h2>
            <a href="">See All Plans</a>
          </div>
          <hr />
          <p className="text-sm my-2">
            Select your order preference and payment method. You can pay
            securely online instantly or by bank transfer.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="mb-5">
            <label
              htmlFor="fName"
              className="mb-1 block text-base font-medium text-slate-900"
            >
              Select Plan
            </label>
            <select id="" className="w-full rounded p-2" {...register("plan")}>
              {data.map((plan: any) => {
                if (plan.price !== 0) {
                  return (
                    <option
                      value={plan.price}
                      key={plan.price}
                      className="checked:bg-orange-700 checked:text-white text-lg "
                    >
                      {plan.title} - {plan.price}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="fName"
              className="mb-1 block text-base font-medium text-slate-900"
            >
              Duration
            </label>
            <select
              id=""
              className="w-full rounded p-2"
              {...register("duration")}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((plan: any) => {
                return (
                  <option
                    value={plan}
                    key={plan}
                    className="checked:bg-orange-700 checked:text-white text-lg "
                  >
                    {plan} - Month
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-5 ">
            <label
              htmlFor="fName"
              className="mb-1 block text-base font-medium text-slate-900"
            >
              Payment Method
            </label>
            <select
              {...register("payment_method")}
              id=""
              className="w-full rounded p-2"
            >
              <option value="online">Online Payment</option>
              <option value="transfer">Bank Transfer</option>
              <option value="cash">Cash Deposit</option>
              <option value="cheque">Cheque payment</option>
            </select>
          </div>

          <div className="mb-5">
            <label
              htmlFor="fName"
              className="mb-1 block text-base font-medium text-slate-900"
            >
              Coupon
            </label>
            <input
              type="text"
              className="w-full rounded"
              {...register("coupon")}
            />
          </div>
        </div>
        <hr />
        <p className="text-sm my-2">
          What name and contact should be on the Invoice or the Receipt?
        </p>

        <div className="grid grid-cols-2 gap-2">
          <div className="mb-5">
            <label
              htmlFor="fName"
              className="mb-1 block text-base font-medium text-slate-900"
            >
              Full Name
            </label>
            <input
              type="text"
              className="w-full rounded"
              {...register("name")}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="address"
              className="mb-1 block text-base font-medium text-slate-900"
            >
              Address (optional)
            </label>
            <input
              type="text"
              className="w-full rounded"
              placeholder="address"
              {...register("address")}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-1 block text-base font-medium text-slate-900"
            >
              Email Address
            </label>
            <input
              type="text"
              className="w-full rounded"
              placeholder="email address"
              {...register("email")}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-1 block text-base font-medium text-slate-900"
            >
              Phone Number
            </label>
            <input
              type="text"
              className="w-full rounded"
              placeholder="phone number"
              {...register("phone_number")}
            />
          </div>
        </div>
      </div>
      <div className="md:w-4/12 bg-amber-100 p-2 space-y-4 shadow rounded-r">
        <p className="text-sm my-2">Your Cart</p>
        <hr className="border-black" />

        <div className="flex justify-between text-sm  py-2">
          <p>Plan</p>

          <p>Premium Plan</p>
        </div>
        <div className="flex justify-between text-sm  py-2">
          <p>Price</p>

          <p>{watch().plan}</p>
        </div>
        <div className="flex justify-between text-sm  py-2">
          <p>No of months</p>

          <p>{watch().duration}</p>
        </div>

        <div className="flex justify-between text-sm  py-2">
          <p>Durations</p>

          <p>
            {date.toLocaleString("default", { month: "long", year: "numeric" })}{" "}
            to {duration}
          </p>
        </div>
        <hr className="border-black" />
        <div className="flex justify-between text-sm  py-2">
          <p>Total</p>

          <p>{Number(watch().plan) * Number(watch().duration)}</p>
        </div>
        <div className="flex justify-between text-sm  py-2">
          <p>Coupon</p>

          <p>-</p>
        </div>
        <div className="flex justify-between text-sm  border-y py-4 border-slate-900">
          <p>Total</p>
          <p>{Number(watch().plan) * Number(watch().duration)}</p>{" "}
        </div>
        <button className="float-right bg-slate-700 text-sm py-1 text-white px-2 rounded">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Page;

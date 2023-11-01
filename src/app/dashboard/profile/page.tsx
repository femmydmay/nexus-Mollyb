"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@mui/material";
import CircularProgressCustom from "@/components/CircularProgressCustom";
import { MdPhotoCamera } from "react-icons/md";
import { useAppSelector } from "@/hooks";
import { User } from "@prisma/client";

/* eslint-disable @next/next/no-img-element */
interface IForm extends User {
  plan: {
    title: string;
  };
}
const Page = () => {
  const formSchema = yup.object().shape({
    firstname: yup.string().required("first name is required"),
    lastname: yup.string().required("last name is required"),

    email: yup
      .string()
      .required("email is required")
      .email("please enter a valid email address"),
    whatsapp_no: yup.string(),
    phone_no: yup.string(),
    alternate_email: yup.string(),
  });

  const [files, setFiles] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
       email: "",
      alternate_email: "",
      phone_no: "",
      whatsapp_no: "", 
    },
  });

  const { user } = useAppSelector((state) => state.userReducers);
  console.log(user);

  useEffect(() => {
    if (user) {
      reset({ ...user });
    }
  }, [user, reset]);

  const onsubmit = handleSubmit(async (data) => {
    try {
      const { plan, ...user } = data;
      const response = await axios.put("/api/users/user", user);

      if (response.status === 200) {
        toast.success("profile updated successfully");
        reset({ ...response.data });
      }
    } catch (error) {}
  });

  useEffect(() => {
    const onSubmit = async () => {
      try {
        const formdata = new FormData();
        if (files) {
          formdata.append("image", files[0]);
          const response = await axios.post("/api/users/profilepics", formdata);

          if (response.status === 200) {
            toast.success("profile updated successfully");
            reset({ ...response.data });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    onSubmit();
  }, [files, reset]);

  if (!user) {
    return <CircularProgressCustom />;
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-4">
      <div className="flex flex-col items-center  py-8 w-11/12 mx-auto min-h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Update Profile
            </h1>
            <hr />
            <div>
              <section className="flex gap-2 items-end">
                <div className="w-28">
                  {previewImage ? (
                    <img
                      src={previewImage as string}
                      alt=""
                      className="w-full"
                    />
                  ) : (
                    <img src={user.image as string} alt="" className="w-full" />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileRef}
                    onChange={(event) => {
                      setFiles(event.target.files as any);
                      const reader = new FileReader();
                      reader.onload = function (e) {
                        if (e.target?.result) {
                          setPreviewImage(e.target?.result as string);
                        }
                      };

                      if (event.target.files) {
                        reader.readAsDataURL(event.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />
                  <Button
                    color="secondary"
                    variant="contained"
                    className="bg-violet-900 mr-3"
                    onClick={() => fileRef?.current?.click()}
                    startIcon={<MdPhotoCamera />}
                  >
                    Upload
                  </Button>
                  <Button color="error" variant="outlined">
                    Delete
                  </Button>
                </div>
              </section>
            </div>
            <hr />
            <form className="space-y-4 md:space-y-6" onSubmit={onsubmit}>
              <section className="grid grid-cols-2 gap-2">
                <div>
                  <label
                    htmlFor="firstname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.firstname
                        ? "border-red-500 border-2 focus:border-red-500"
                        : ""
                    }`}
                    placeholder="john"
                    {...register("firstname")}
                  />
                  {errors.firstname && (
                    <p className="text-rose-500">{errors.firstname.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Lastname
                  </label>
                  <input
                    type="text"
                    {...register("lastname")}
                    id="lastname"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.lastname
                        ? "border-red-500 border-2 focus:border-red-500"
                        : ""
                    }`}
                    placeholder="doe"
                  />
                  {errors.lastname && (
                    <p className="text-rose-500">{errors.lastname.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    id="email"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.email
                        ? "border-red-500 border-2 focus:border-red-500"
                        : ""
                    }`}
                    placeholder="name@company.com"
                  />

                  {errors.email && (
                    <p className="text-rose-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Alternate email
                  </label>
                  <input
                    type="email"
                    {...register("alternate_email")}
                    id="alternate_email"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.email
                        ? "border-red-500 border-2 focus:border-red-500"
                        : ""
                    }`}
                    placeholder="name@company.com"
                  />

                  {errors.alternate_email && (
                    <p className="text-rose-500">
                      {errors.alternate_email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Whatsapp Number
                  </label>
                  <input
                    type="text"
                    {...register("whatsapp_no")}
                    id="whatsapp_no"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.email
                        ? "border-red-500 border-2 focus:border-red-500"
                        : ""
                    }`}
                    placeholder="07012345678 "
                  />

                  {errors.whatsapp_no && (
                    <p className="text-rose-500">
                      {errors.whatsapp_no.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    {...register("phone_no")}
                    id="whatsapp_no"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.email
                        ? "border-red-500 border-2 focus:border-red-500"
                        : ""
                    }`}
                    placeholder="07012345678"
                  />

                  {errors.phone_no && (
                    <p className="text-rose-500">{errors.phone_no.message}</p>
                  )}
                </div>
              </section>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;

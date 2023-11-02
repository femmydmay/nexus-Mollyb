"use client";



import {

  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,

} from "@mui/material";
import React, { useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

import FlashAlert from "@/components/FlashAlert";
import { User } from "@prisma/client";
import { useAppSelector } from "@/hooks";



interface IForm {
  id: string;
  firstname: string;
  lastname: string;
  
  email_verified: boolean;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: string;
}

// let completeButtonRef = useRef(null);

const AllUsers = () => {

  const formSchema = yup.object().shape({
    id: yup.string(),
    firstname: yup.string().required("first name is required"),
    lastname: yup.string().required("last name is required"),
    role: yup.string().required("role is required"),
    email_verified: yup.boolean(),
    email: yup
      .string()
      .required("email is required")
      .email("please enter a valid email address"),
    password: yup.string(),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match"),
  });

  const {
    register,
   handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IForm>({
//@ts-ignore
  resolver:yupResolver(formSchema)
  });

    const { users:data } = useAppSelector((state) => state.userReducers);
    let [isOpen, setIsOpen] = useState(false);
    let [isOpendel, setIsOpendel] = useState(false);
  
      const onSubmit = handleSubmit(async (data) => {
        try {
          const response = await axios.put(`/api/users/user/${data.id}`, data);
          if (response.status === 200) {
            toast.success("Account updated successfully");
            // mutate();
            setIsOpen(false);
            reset(response.data);
          }
        } catch (error) {}
      });
    
      const handledelete = (user: IForm) => {
        setIsOpen(false);
        setIsOpendel(true);
      };
    
      const handleclick = async (id: string) => {
        try {
          const response = await axios.delete(`/api/users/user/${id}`);
          if (response.status === 200) {
            toast.success(response.data.message);
            // mutate();
            setIsOpendel(false);
          }
        } catch (error) {
          const e = error as AxiosError<{ message: string }>;

          if (e.response) {
            toast.error(e?.response?.data?.message as string);
          }
        }
      };
  return (
    <div className=" sm:w-11/12   mx-auto mt-20 r">
      <Dialog
        // static={true}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        // initialFocus={completeButtonRef}
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto ">
          <Dialog.Panel className="bg-white shadow-md rounded p-3 md:w-1/2 ">
            <Dialog.Title className="text-orange-700 font-bold text-xl my-2">
              Update account
            </Dialog.Title>

            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}> 
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
              </section>

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
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  id="password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.password
                      ? "border-red-500 border-2 focus:border-red-500"
                      : ""
                  }`}
                />
                {errors.password && (
                  <p className="text-rose-500">{errors?.password.message}</p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  {...register("passwordConfirmation")}
                  placeholder="••••••••"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.passwordConfirmation
                      ? "border-red-500 border-2 focus:border-red-500"
                      : ""
                  }`}
                />
                {errors.passwordConfirmation ? (
                  <p className="text-rose-500">
                    {errors.passwordConfirmation.message}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role
                </label>
                <select
                  id=""
                  {...register("role")}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.role
                      ? "border-red-500 border-2 focus:border-red-500"
                      : ""
                  }`}
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </select>
                {errors.role ? (
                  <p className="text-rose-500">{errors.role.message}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="flex items-start ">
                <div className=" mr-2">
                  <label
                    htmlFor="terms"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email Verified
                  </label> 
                </div>
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    {...register("email_verified")}
                  />
                </div>
              </div>

              <div className="grid justify-end gap-2  grid-cols-2">
                <Button
                  // onClick={() => setIsOpen(false)}
                  color="primary"
                  variant="contained"
                  className="bg-sky-600"
                  type="submit"
                >
                  Update
                </Button>
                <Button
                  onClick={() => handledelete(getValues())}
                  color="error"
                  variant="contained"
                  type="button"
                  className="bg-rose-500"
                >
                  Delete
                </Button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      <FlashAlert
        open={isOpendel}
        setOpen={setIsOpendel}
        handleclick={handleclick}
        title="Delete Account"
        description={`This will delete ${
          getValues()?.firstname
        } from the database permanently`}
        msg={`Are you sure you want to delete this account? All  data
          will be permanently removed. This action cannot be undone.`}
        id={getValues().id}
      />

      <TableContainer component={Paper}>
        <h1 className="text-2xl text-orange-800 font-bold text-center my-3">
          USERS
        </h1>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                  textTransform: "uppercase",
                }}
              >
                First Name
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                  textTransform: "uppercase",
                }}
              >
                Last Name
              </TableCell>

              <TableCell
                align="left"
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                  textTransform: "uppercase",
                }}
              >
                Email
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                  textTransform: "uppercase",
                }}
              >
                Verified
              </TableCell>

              <TableCell align="left" sx={{ fontWeight: 700, fontSize: 20 }}>
                Role
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 700, fontSize: 20 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ? data.map((data: User) => (
                  <TableRow
                    key={data.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {data.firstname}
                    </TableCell>
                    <TableCell align="left">{data.lastname}</TableCell>

                    <TableCell align="left">{data.email}</TableCell>
                    <TableCell align="left">
                      {data.email_verified.toString()}
                    </TableCell>
                    <TableCell align="left">{data.role}</TableCell>
                    <TableCell align="left">
                      <Button
                        color="info"
                        variant="contained"
                        className="bg-sky-900"
                        // LinkComponent="a"
                        onClick={() => {
                          setIsOpen(true);

                          reset({
                            firstname: data.firstname,
                            lastname: data.lastname,
                            email: data.email,
                         
                            email_verified: data.email_verified,
                            role: data.role,
                            id: data.id,
                          });
                        }}
                        // href={`/admin/plan/${plan.id}`}
                      >
                        Manage
                      </Button>{" "}
                    </TableCell>
                  </TableRow>
                ))
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllUsers;

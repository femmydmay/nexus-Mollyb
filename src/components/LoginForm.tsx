"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { login, setAuthLoading } from "@/redux/reducers/authReducers";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { getUser } from "@/redux/reducers/userReducers";

interface ILogin {
  email: string;
  password: string;
}

const LoginForm = () => {
  const formSchema = yup.object().shape({
    email: yup.string().required("email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(formSchema),
  });
  const dispatch = useAppDispatch();
  const { loggedin, loading } = useAppSelector((state) => state.authReducers);
  const { user } = useAppSelector((state) => state.userReducers);
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    try {
      dispatch(setAuthLoading({ loading: true }));

      dispatch(login(data));
    } catch (error) {
      const e = error as AxiosError<{ message: string }>;

      if (e.response) {
        toast.error(e?.response?.data?.message as string);
      }
    }
  });

  useEffect(() => {
    if (user) {
      dispatch(getUser());
      reset();
      router.push("/dashboard");
    }
  }, [user]);

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="font-medium">Email</label>
        <input
          type="text"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          placeholder="james@email.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-rose-500">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="font-medium">Password</label>
        <input
          type="password"
          placeholder="*********"
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-rose-500">{errors.password.message}</p>
        )}
      </div>
      <button
        className="w-full px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-indigo-600 rounded-lg duration-150 flex items-center justify-center"
        disabled={loading ? true : false}
      >
        {loading ? (
          <CircularProgress
            size={20}
            disableShrink
            className="text-white fill-white mr-2"
            sx={{ color: "white" }}
          />
        ) : (
          ""
        )}{" "}
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;

'use client'
import axios from "axios";
import Link from "next/link";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useForm } from "react-hook-form";
import * as yup from "yup"; 
import { yupResolver } from "@hookform/resolvers/yup";
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";

interface IForm{
    firstname: string
    lastname: string
phone_no: string,
    email: string
    password: string
    passwordConfirmation: string
}
const Signup = () => {  

    const formSchema = yup.object().shape({
        firstname: yup.string().required('first name is required'),
        lastname: yup.string().required('last name is required'),
        phone_no: yup.string().required('phone number is required'),
        email: yup.string().required('email is required').email('please enter a valid email address'),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password length should be at least 8 characters")
        .max(12, "Password cannot exceed more than 12 characters")
        .matches( 
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+\-=|\\]).{8,32}$/,
          "Password must include a digit, lowercase and uppercase letters, and a special character"
        ),
      passwordConfirmation: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password")], "Passwords do not match"),
    });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors,  },
  } = useForm<IForm>({
      resolver:yupResolver(formSchema)
  });
  

const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {
   

        try {
          const response = await axios.post('/api/signup', data)
          if (response.status === 200) {
            toast.success('Account created successfully')
            setTimeout(()=> router.push('/login'), 3000) 
          }
        } catch (error) {
          
        }
    })
  
    
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-4">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="firstname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your first Name
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
                  Your last name
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
                  Your phone number 
                </label>
                <PhoneInput
                  placeholder="Enter phone number"
                  defaultCountry="NG"
                  value={watch().phone_no}
                  onChange={(value)=> setValue('phone_no', value as string)}
                />
                
                {errors.phone_no && (
                  <p className="text-rose-500">{errors.phone_no.message}</p>
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
              <div>
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
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;

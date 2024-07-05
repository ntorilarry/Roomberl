import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RoomBerlLogo } from "../../assets";
import toast from "react-hot-toast";
import { responseType } from "../../models/response/base-response";
import { signUpRequest } from "../../models/request/auth-request";
import {
  useGetHostelsQuery,
  useSignUpMutation,
} from "../../services/auth-service";
import Loader from "../../components/Loader";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signUpData, setSignUpData] = useState<signUpRequest>({
    password2: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobile: "",
    address: "",
    gender: "",
    hostel: "",
    groups: [],
    userPermissions: [],
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSignUpData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [userSignup, { isLoading }] = useSignUpMutation();

  const handleFormSubmit = async () => {
    try {
      const response = await userSignup(signUpData);
      const { status, data } = response["data"] as responseType;
      if (status === "success") {
        const { id } = data.user;
        toast.success(status);
        navigate("/auth/sign-up-additional", {
          state: { id },
        });
      } else {
        Object.keys(data).forEach((key) => {
          data[key].forEach((message) => {
            toast.error(message);
          });
        });
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  const { data: response } = useGetHostelsQuery();
  const Hostels = response?.data?.hostels || [];
  return (
    <div className="bg-[#F9FAFB]">
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col justify-center sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo */}
          <div className="mx-auto flex items-center text-heading">
            <img className="w-14" src={RoomBerlLogo} alt="" />
          </div>

          <p className="mb-6 mt-3 text-center text-sm text-text">
            Have account?{" "}
            <Link
              to="/auth/login"
              className="font-semibold text-primary hover:text-primary-accent"
            >
              Sign in
            </Link>
          </p>
        </div>
        <div className="bg-white rounded-2xl border  p-4 sm:p-7 ">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 ">Register</h2>
            <p className="text-sm text-gray-600 ">
              Manage your name, password and account settings.
            </p>
          </div>

          <form>
            <div className="grid sm:grid-cols-12 font-medium gap-2 sm:gap-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-full-name"
                  className="inline-block text-sm text-gray-800 mt-2.5 "
                >
                  Full name
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="sm:grid sm:grid-cols-2 w-full">
                  <div className="">
                    <input
                      id="af-account-full-name"
                      type="text"
                      {...register("firstName", {
                        required: "First name is required", // Updated the required rule
                        pattern: {
                          value: /^[A-Za-z0-9\- ]+$/,
                          message: "Please enter only alphanumeric",
                        },
                      })}
                      onChange={handleInputChange}
                      className="py-3 px-3 pe-11 block w-full border border-gray-300 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
                      placeholder="Eg. John"
                    />
                    <p className="text-red-500 text-sm">
                      {errors?.firstName?.message?.toString()}
                    </p>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="py-3 px-3 pe-11 block w-full border border-gray-300 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
                     placeholder="Eg. Doe"
                      {...register("lastName", {
                        required: "Last name is required", // Updated the required rule
                        pattern: {
                          value: /^[A-Za-z0-9\- ]+$/,
                          message: "Please enter only alphanumeric",
                        },
                      })}
                      onChange={handleInputChange}
                    />
                    <p className="text-red-500 text-sm">
                      {errors?.lastName?.message?.toString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-email"
                  className="inline-block text-sm text-gray-800 mt-2.5 "
                >
                  Username
                </label>
              </div>

              <div className="sm:col-span-9">
                <input
                  id="af-account-email"
                  type="text"
                  className="py-3 px-3 pe-11 block w-full border border-gray-300 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
                  placeholder="username"
                  {...register("username", {
                    required: "username is required", // Updated the required rule
                  })}
                  onChange={handleInputChange}
                />
                <p className="text-red-500 text-sm">
                  {errors?.username?.message?.toString()}
                </p>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-email"
                  className="inline-block text-sm text-gray-800 mt-2.5 "
                >
                  Email
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  id="af-account-email"
                  type="email"
                  className="py-3 px-3 pe-11 block w-full border border-gray-300 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
                  placeholder="example@example.com"
                  {...register("email", {
                    required: { value: true, message: "Email is required" },

                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Email format is invalid",
                    },
                  })}
                  onChange={handleInputChange}
                />
                <p className="text-red-500 text-sm">
                  {errors?.email?.message?.toString()}
                </p>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-password"
                  className="inline-block text-sm text-gray-800 mt-2.5 "
                >
                  Password
                </label>
              </div>

              <div className="sm:col-span-9">
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      id="af-account-password"
                      type={showPassword ? "text" : "password"}
                      className="py-3 px-3 pe-11 block w-full border border-gray-300 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
                      placeholder="Enter  password"
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[A-Za-z0-9]).{8,}$/,
                          message:
                            "It should have at least 8 characters and special character",
                        },
                      })}
                      onChange={handleInputChange}
                    />
                    {showPassword ? (
                      <FiEyeOff
                        className="absolute end-2.5 bottom-[0.95rem] text-lg"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <FiEye
                        className="absolute end-2.5 bottom-[0.95rem] text-lg"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </div>
                  <p className="text-red-500 text-sm">
                    {errors?.password?.message?.toString()}
                  </p>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="py-3 px-3 pe-11 block w-full border border-gray-300 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
                      placeholder="Confirm password"
                      {...register("password2", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                          value === getValues("password") ||
                          "The passwords do not match",
                      })}
                      onChange={handleInputChange}
                    />
                    {showConfirmPassword ? (
                      <FiEyeOff
                        className="absolute end-2.5 bottom-[0.95rem] text-lg"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    ) : (
                      <FiEye
                        className="absolute end-2.5 bottom-[0.95rem] text-lg"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    )}
                  </div>
                  <p className="text-red-500 text-sm">
                    {errors?.password2?.message?.toString()}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="inline-block">
                  <label
                    htmlFor="af-account-phone"
                    className="inline-block text-sm text-gray-800 mt-2.5 "
                  >
                    Phone
                  </label>
                </div>
              </div>

              <div className="sm:col-span-9">
                <input
                  id="af-account-phone"
                  type="text"
                  className="py-3 px-3 pe-11 block w-full border border-gray-300 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
                  placeholder="02xxxxxxxx or 05xxxxxxxx"
                  {...register("mobile", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                    pattern: {
                      value: /^(233|0)\d{9}$/,
                      message: "Phone number must be a valid number",
                    },
                  })}
                  onChange={handleInputChange}
                />
                <p className="text-red-500 text-sm">
                  {errors?.mobile?.message?.toString()}
                </p>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-country"
                  className="inline-block text-sm text-gray-800 mt-2.5 "
                >
                  Gender
                </label>
              </div>

              <div className="sm:col-span-9">
                <select
                  id="af-account-country"
                  {...register("gender", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                  })}
                  onChange={handleInputChange}
                  className="py-3 px-3 pe-11 block w-full border border-gray-300 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  dark:border-slate-700  dark:focus:ring-slate-600"
                >
                  <option value="" selected>
                    Choose gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <p className="text-red-500 text-sm">
                  {errors?.gender?.message?.toString()}
                </p>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-bio"
                  className="inline-block text-sm text-gray-800 mt-2.5 "
                >
                  Address
                </label>
              </div>

              <div className="sm:col-span-9">
                <textarea
                  id="af-account-bio"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Address is required",
                    },
                  })}
                  onChange={handleInputChange}
                  rows={4}
                  className="py-3 px-3 block w-full border border-gray-300 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
                  placeholder="Address"
                ></textarea>
                <p className="text-red-500 text-sm">
                  {errors?.address?.message?.toString()}
                </p>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-country"
                  className="inline-block text-sm text-gray-800 mt-2.5 "
                >
                  Hostel
                </label>
              </div>

              <div className="sm:col-span-9">
                <select
                  id="af-account-country"
                  {...register("hostel", {
                    required: {
                      value: true,
                      message: "Hostel is required",
                    },
                  })}
                  onChange={handleInputChange}
                  className="py-3 px-3 pe-11 block w-full border border-gray-300 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  dark:border-slate-700  dark:focus:ring-slate-600"
                >
                  <option value="" selected>
                    Choose hostel
                  </option>
                  {Hostels.map((data, index) => (
                    <option key={index} value={data.id}>
                      {data.name}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 text-sm">
                  {errors?.hostel?.message?.toString()}
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-x-2">
              <button
                type="submit"
                onClick={handleSubmit(handleFormSubmit)}
                className="py-3 px-8 inline-flex justify-center items-center gap-2 rounded-full border border-transparent f bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm "
              >
                {isLoading ? (
                  <span>
                    <Loader />
                  </span>
                ) : (
                  <span>Submit and Continue</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

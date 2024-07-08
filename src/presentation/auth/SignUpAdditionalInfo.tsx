import React, { ChangeEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RoomBerlLogo } from "../../assets";
import toast from "react-hot-toast";
import { responseType } from "../../models/response/base-response";
import { signUpAddInfoRequest } from "../../models/request/auth-request";
import { useSignUpAddInfoMutation } from "../../services/auth-service";
import { useForm } from "react-hook-form";
import Loader from "../../components/Loader";

const SignUpAdditionalInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const userId = location.state?.id;
  const [infoData, setInfoData] = useState<signUpAddInfoRequest>({
    otherName: "",
    nickname: "",
    guardianFullName: "",
    ghanaCardNumber: "",
    courseOfStudy: "",
    dateOfBirth: "",
    guardianPhone: "",
    studentIdNumber: "",
    date_of_admission: "",
    user: userId,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInfoData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [additionalSignup, { isLoading }] = useSignUpAddInfoMutation();

  const handleFormSubmit = async (e) => {
    // e.preventDefault();
    try {
      const response = await additionalSignup(infoData);
      const { status } = response["data"] as responseType;
      if (status === "success") {
        toast.success(status);
        navigate("/auth/questions-and-answers", {
          state: { userId },
        });
      } else {
        toast.error(status);
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="bg-[#F9FAFB] dark:bg-slate-800">
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col justify-center sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo */}
          <div className="mx-auto flex items-center text-heading">
            <img className="w-14" src={RoomBerlLogo} alt="" />
          </div>

          <p className="mb-6 mt-3 text-center text-sm text-text dark:text-white">
            Have account?{" "}
            <Link
              to="/auth/login"
              className="font-semibold text-primary hover:text-primary-accent"
            >
              Sign in
            </Link>
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 dark:border-slate-700  p-4 sm:p-7 ">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Complete your registration
            </h2>
            <p className="text-sm text-gray-600 dark:text-white">
              Manage your name, password and account settings.
            </p>
          </div>

          <form>
            <div className="grid sm:grid-cols-12 font-medium gap-2 sm:gap-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-email"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-white"
                >
                  Other name
                </label>
              </div>

              <div className="sm:col-span-9">
                <input
                  id="af-account-email"
                  type="text"
                  className="py-3 px-3 pe-11 block w-full border dark:border-none dark:text-white dark:bg-slate-700 border-gray-300 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
                  placeholder="Other Name"
                  {...register("otherName", {
                    required: "Other name is required", // Updated the required rule
                    pattern: {
                      value: /^[A-Za-z0-9\- ]+$/,
                      message: "Please enter only alphanumeric",
                    },
                  })}
                  onChange={handleInputChange}
                />
                <p className="text-red-500 text-sm">
                  {errors?.otherName?.message?.toString()}
                </p>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-email"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-white"
                >
                  Nick name
                </label>
              </div>

              <div className="sm:col-span-9">
                <input
                  id="af-account-email"
                  type="text"
                  className="py-3 px-3 pe-11 block w-full border dark:border-none dark:text-white dark:bg-slate-700 border-gray-300 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
                  placeholder="Nick Name"
                  {...register("nickname", {
                    required: "Nick name is required", // Updated the required rule
                    pattern: {
                      value: /^[A-Za-z0-9\- ]+$/,
                      message: "Please enter only alphanumeric",
                    },
                  })}
                  onChange={handleInputChange}
                />
                <p className="text-red-500 text-sm">
                  {errors?.otherName?.message?.toString()}
                </p>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-email"
                  className="inline-block text-sm text-gray-800 dark:text-white mt-2.5 "
                >
                  Guardian FullName
                </label>
              </div>

              <div className="sm:col-span-9">
                <input
                  type="text"
                  className="py-3 px-3 pe-11 block w-full border border-gray-300 dark:border-none dark:text-white dark:bg-slate-700 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
                  placeholder="Guardian FullName"
                  {...register("guardianFullName", {
                    required: "Guardian FullName is required", // Updated the required rule
                    pattern: {
                      value: /^[A-Za-z0-9\- ]+$/,
                      message: "Please enter only alphanumeric",
                    },
                  })}
                  onChange={handleInputChange}
                />
                <p className="text-red-500 text-sm">
                  {errors?.guardianFullName?.message?.toString()}
                </p>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-email"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-white"
                >
                  Ghana Card Number
                </label>
              </div>

              <div className="sm:col-span-9">
                <input
                  type="text"
                  className="py-3 px-3 pe-11 block w-full border border-gray-300 dark:border-none dark:text-white dark:bg-slate-700 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
                  placeholder="GHA-xxxxxxxxx-x"
                  {...register("ghanaCardNumber", {
                    required: "Ghana Card Number is required",
                    pattern: {
                      value: /^GHA-\d{9}-\d$/,
                      message: "Invalid Ghana Card Number format",
                    },
                  })}
                  onChange={handleInputChange}
                />
                <p className="text-red-500 text-sm">
                  {errors?.ghanaCardNumber?.message?.toString()}
                </p>
              </div>

              <div className="sm:col-span-3">
                <div className="inline-block">
                  <label
                    htmlFor="af-account-phone"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-white"
                  >
                    Date Of Birth
                  </label>
                </div>
              </div>

              <div className="sm:col-span-9">
                <input
                  id="af-account-phone"
                  type="date"
                  className="py-3 px-3 pe-11 block w-full border border-gray-300 dark:border-none dark:text-white dark:bg-slate-700 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
                  {...register("dateOfBirth", {
                    required: "Date of birth is required",
                  })}
                  onChange={handleInputChange}
                />
                <p className="text-red-500 text-sm">
                  {errors?.dateOfBirth?.message?.toString()}
                </p>
              </div>

              <div className="sm:col-span-3">
                <div className="inline-block">
                  <label
                    htmlFor="af-account-phone"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-white"
                  >
                    Guardian Phone
                  </label>
                </div>
              </div>

              <div className="sm:col-span-9">
                <input
                  id="af-account-phone"
                  type="text"
                  className="py-3 px-3 pe-11 block w-full border border-gray-300 dark:border-none dark:text-white dark:bg-slate-700 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
                  placeholder="02xxxxxxxx or 05xxxxxxxx"
                  {...register("guardianPhone", {
                    required: {
                      value: true,
                      message: "Guardian number is required",
                    },
                    pattern: {
                      value: /^(233|0)\d{9}$/,
                      message: "Phone number must be a valid number",
                    },
                  })}
                  onChange={handleInputChange}
                />
                <p className="text-red-500 text-sm">
                  {errors?.guardianPhone?.message?.toString()}
                </p>
              </div>
              <div className="sm:col-span-3">
                <div className="inline-block">
                  <label
                    htmlFor="af-account-phone"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-white"
                  >
                    Student Id Number
                  </label>
                </div>
              </div>

              <div className="sm:col-span-9">
                <input
                  id="af-account-phone"
                  type="text"
                  className="py-3 px-3 pe-11 block w-full border border-gray-300 dark:border-none dark:text-white dark:bg-slate-700 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
                  placeholder="School Student Id"
                  {...register("studentIdNumber", {
                    required: "Student Id number is required",
                  })}
                  onChange={handleInputChange}
                />
                <p className="text-red-500 text-sm">
                  {errors?.studentIdNumber?.message?.toString()}
                </p>
              </div>

              <div className="sm:col-span-3">
                <div className="inline-block">
                  <label
                    htmlFor="af-account-phone"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-white"
                  >
                    Course of study
                  </label>
                </div>
              </div>

              <div className="sm:col-span-9">
                <input
                  id="af-account-phone"
                  type="text"
                  className="py-3 px-3 pe-11 block w-full border border-gray-300 dark:border-none dark:text-white dark:bg-slate-700 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
                  placeholder="Course of study"
                  {...register("courseOfStudy", {
                    required: "courseOfStudy is required",
                  })}
                  onChange={handleInputChange}
                />
                <p className="text-red-500 text-sm">
                  {errors?.courseOfStudy?.message?.toString()}
                </p>
              </div>

              <div className="sm:col-span-3">
                <div className="inline-block">
                  <label
                    htmlFor="af-account-phone"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-white"
                  >
                    Date Of Admission
                  </label>
                </div>
              </div>

              <div className="sm:col-span-9">
                <input
                  id="af-account-phone"
                  type="date"
                  className="py-3 px-3 pe-11 block w-full border border-gray-300 dark:border-none dark:text-white dark:bg-slate-700 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
                  {...register("date_of_admission", {
                    required: "Date Of Admission is required",
                  })}
                  onChange={handleInputChange}
                />
                <p className="text-red-500 text-sm">
                  {errors?.date_of_admission?.message?.toString()}
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-x-2">
              <button
                type="submit"
                onClick={handleSubmit(handleFormSubmit)}
                className="py-3 px-8 inline-flex justify-center items-center gap-2 rounded-full border dark:border-white bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm "
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

export default SignUpAdditionalInfo;

import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest } from "../../models/request/auth-request";
import { useLoginMutation } from "../../services/auth-service";
import toast from "react-hot-toast";
import { responseType } from "../../models/response/base-response";
import Loader from "../../components/Loader";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LogIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState<loginRequest>({
    email: "",
    password: "",
  });

  const handleFormChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [userLogin, { isLoading }] = useLoginMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userLogin(loginData);
      console.log(response);
      const { status, data } = response["data"] as responseType;
      if (status === "success") {
        const { access } = data.token;
        sessionStorage.setItem("access_token", access);
        const { id, firstName, lastName, email, hostel } = data.user;
        sessionStorage.setItem("user_id", id);
        sessionStorage.setItem("first_name", firstName);
        sessionStorage.setItem("last_name", lastName);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("hostel", hostel);
        toast.success(status);
        navigate("/");
      } else {
        toast.error(status);
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "An unexpected error occurred");
    }
  };
  return (
    <div className="bg-white dark:bg-slate-800">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-[60%]"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white dark:text-white">
                Welcome to RoomBerl
              </h2>

              <p className="max-w-xl mt-3 text-gray-300 dark:text-white">
                More than ever, we believe that perfect student accommodation
                combined with the right roommates create an exciting university
                experience.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">
                Sign in
              </h2>

              <p className="mt-3 text-gray-500 dark:text-white">
                Enter your email and password
              </p>
            </div>

            <div className="mt-8 font-medium">
              <form>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-white"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@example.com"
                    onChange={handleFormChanged}
                    className="block w-full px-4 py-3 mt-2 text-gray-700  border-2 dark:text-white placeholder-gray-400 bg-white rounded-lg dark:bg-slate-700  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-3 relative">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 dark:text-white"
                    >
                      Password
                    </label>
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleFormChanged}
                    placeholder="Your Password"
                    className="block w-full px-4 py-3 mt-2 text-gray-700  border-2 dark:text-white dark:bg-slate-700 placeholder-gray-400 bg-white rounded-lg  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
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
                <p className="text-right">
                  <a
                    href="#"
                    className="text-sm text-gray-400 dark:text-white focus:text-blue-500 hover:text-blue-500 hover:underline"
                  >
                    Forgot password?
                  </a>
                </p>
                <div onClick={handleFormSubmit} className="mt-6">
                  <button
                    disabled={!loginData.email || !loginData.password}
                    className="w-full px-4 py-3 tracking-wide rounded-full text-white transition-colors duration-200 transform bg-[#1B8ADB] hover:bg-[#125182] focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    {isLoading ? (
                      <span>
                        <Loader />
                      </span>
                    ) : (
                      <span>Sign in</span>
                    )}
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400 dark:text-white">
                Don&#x27;t have an account yet?{" "}
                <Link
                  to="/auth/sign-up"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

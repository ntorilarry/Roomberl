import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { loginRequest } from "../../models/request/auth-request";
import {
  useGetHostelByCodeNameQuery,
  useLoginMutation,
} from "../../services/auth-service";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LogIn = () => {
  const navigate = useNavigate();
  const { code_name } = useParams<{ code_name?: string }>();
  console.log(code_name, "code_name");
  const {
    data: response,
    error,
    isError,
    isLoading: isHostelLoading,
  } = useGetHostelByCodeNameQuery(code_name ?? "");

  // Error handling for hostel fetch
  useEffect(() => {
    if (!code_name || code_name === "null" || code_name === undefined) {
      toast.loading("Page not found! Redirecting...", { duration: 5000 });

      setTimeout(() => {
        window.location.href = "https://roomberl.com/universities/";
      }, 5000); // 5 seconds delay
    }
  }, [code_name]);

  useEffect(() => {
    if (isError) {
      const errorMessage =
        (error as any)?.data?.detail || "Hostel not found! Redirecting...";
      toast.loading(errorMessage);
      // Redirect after a short delay to allow the toast to display
      setTimeout(() => {
        window.location.href = "https://roomberl.com/universities/";
      }, 3000); // 3 seconds delay
    }
  }, [isError, error]);

  // Proceed only if data is successfully fetched
  const hostelImage = response?.data[0]?.image;
  const hostelID = response?.data[0]?.id;

  // Set session storage only if hostel data is available
  useEffect(() => {
    if (hostelID && code_name) {
      sessionStorage.setItem("hostelID", hostelID);
      sessionStorage.setItem("code_name", code_name);
    }
  }, [hostelID, code_name]);

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
      const { status, data } = response.error
        ? response.error["data"]
        : response["data"];
      if (status === "success") {
        const { access } = data.token;
        sessionStorage.setItem("access_token", access);

        const {
          id,
          firstName,
          lastName,
          email,
          hostel,
          groups,
          gender,
          additionalDetails,
          roomPayments,
        } = data.user;
        sessionStorage.setItem("user_id", id);
        sessionStorage.setItem("first_name", firstName);
        sessionStorage.setItem("last_name", lastName);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("hostel", hostel[0].id);
        sessionStorage.setItem("hostelName", hostel[0].name);
        sessionStorage.setItem("gender", gender);

        let userRole = "Student"; // Default role if groups are empty or undefined
        if (groups && groups.length > 0) {
          userRole = groups[0].name;
        }

        sessionStorage.setItem("roles", userRole);

        if (userRole !== "Administrator" && hostel[0].id !== hostelID) {
          console.log("hostel validation", hostel[0].id, hostelID);
          toast.error("You do not belong in this hostel");
          navigate(`/auth/login/${code_name}`);
          return;
        }

        if (userRole === "Student") {
          const userAdditionalDetails = additionalDetails?.[0];
          const responses = userAdditionalDetails?.responses;
          const roomID = userAdditionalDetails?.roomId;

          const userRoomPayments = roomPayments?.[0];
          const paymentVerification = userRoomPayments?.isVerified;
          const paymentRoomTypeId = userRoomPayments?.roomType?.id;
          sessionStorage.setItem("paymentVerification", paymentVerification);
          sessionStorage.setItem("roomID", roomID);
          sessionStorage.setItem("paymentRoomTypeId", paymentRoomTypeId);
          if (
            responses === null ||
            (typeof responses === "object" &&
              Object.keys(responses).length === 0)
          ) {
            console.log(id, "id");
            // Navigate to questions and answers page with the id as state
            navigate("/auth/questions-and-answers", { state: { id } });
            return;
          }
          if (paymentVerification === true) {
            navigate(`/rooms/rooms/${paymentRoomTypeId}`);
          } else {
            navigate("/rooms/view-room-types");
          }
        } else if (
          userRole === "Administrator" ||
          userRole === "Hostel_manager"
        ) {
          navigate("/rooms/amenities");
        }

        toast.success(status);
      } else {
        if (typeof data === "object" && data !== null) {
          const errorMessages = Object.entries(data)
            .map(([key, value]) => {
              if (Array.isArray(value)) {
                return `${key}: ${value.join(", ")}`;
              }
              return `${key}: ${value}`;
            })
            .join(", ");
          toast.error(errorMessages);
        } else {
          toast.error(data);
        }
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
            backgroundImage: `url(https://cyrax1.pythonanywhere.com/media/${hostelImage})`,
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              {/* <h2 className="text-4xl font-bold text-white dark:text-white">
                Welcome to {hostelName || "Roomberl"}
              </h2> */}

              <p className="max-w-xl mt-3 text-gray-300 font-bold text-3xl dark:text-white">
                Book your room with ease and choose your roommates seamlessly
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
                    className="block w-full px-4 py-3 mt-2 text-gray-700 border-2 dark:border-none dark:text-white dark:bg-slate-700 placeholder-gray-400 bg-white rounded-lg focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
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
                    className="block w-full px-4 py-3 mt-2 text-gray-700  border-2 dark:border-none dark:text-white dark:bg-slate-700 placeholder-gray-400 bg-white rounded-lg  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {showPassword ? (
                    <FiEyeOff
                      className="absolute end-2.5 bottom-[0.95rem] text-lg dark:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FiEye
                      className="absolute end-2.5 bottom-[0.95rem] text-lg dark:text-white"
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
                    className="w-full px-4 py-3 tracking-wide rounded-full border dark:border-white text-white transition-colors duration-200 transform bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
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
                  to={`/auth/sign-up/${code_name}`}
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

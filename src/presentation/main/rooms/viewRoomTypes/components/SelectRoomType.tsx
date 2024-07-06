import React, { useState } from "react";
import { HiMiniPlus } from "react-icons/hi2";
import { responseType } from "../../../../../models/response/base-response";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import {
  useGetAddInfoByUserIdQuery,
  useUpdateRoomTypeMutation,
} from "../../../../../services/auth-service";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const SelectRoomType = ({ roomTypeId }) => {
  const [userID, setUserID] = useState<string | null>(
    sessionStorage.getItem("user_id")
  );
  const navigate = useNavigate();
  const [selectRoomType, { isLoading: selectLoading }] =
    useUpdateRoomTypeMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const roomTypeRequest = {
        roomType: roomTypeId,
      };

      const response = await selectRoomType({
        body: roomTypeRequest,
        userId: userID || "",
      });
      console.log(response);
      const { status } = response["data"] as responseType;
      if (status === "success") {
        toast.success(status);
        navigate("/payments/user", {
          state: { roomTypeId },
        });
      } else {
        toast.error(status);
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  const { data: response, isLoading: getInfoLoading } =
    useGetAddInfoByUserIdQuery(userID || "");
  const checkRoomType = response?.data?.roomType?.id || [];
  const isPaymentVerified = response?.data?.roomPayments?.some(
    (payment) => payment.isVerified
  );

  const isRoomTypePresent = response?.data?.roomPayments?.map(
    (payment) => payment.roomTypeId
  )[0];

  console.log(isRoomTypePresent);

  sessionStorage.setItem("isPaymentVerified", isPaymentVerified);
  sessionStorage.setItem("isRoomTypePresent", isRoomTypePresent);
  console.log("isRoomTypePresent", isRoomTypePresent);
  console.log("isPaymentVerified", isPaymentVerified);

  const handleNavigatePayment = () => {
    navigate("/rooms/payment", {
      state: { roomTypeId },
    });
  };

  return (
    <div>
      {roomTypeId === isRoomTypePresent ? (
        isPaymentVerified ? (
          <button className="inline-flex cursor-not-allowed my-2 items-center justify-center rounded-full bg-teal-700 px-3 py-2 text-xs font-semibold text-white shadow-sm">
            Paid
            <IoCheckmarkCircleOutline className="ml-2" />
          </button>
        ) : (
          <button
            onClick={handleNavigatePayment}
            className="inline-flex cursor-pointer my-2 items-center justify-center rounded-full bg-gray-700 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:border-primary-accent hover:bg-primary-accent"
          >
            Make payment
          </button>
        )
      ) : (
        <button
          onClick={handleFormSubmit}
          disabled={selectLoading}
          className="inline-flex cursor-pointer my-2 items-center justify-center rounded-full bg-gray-700 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:border-primary-accent hover:bg-primary-accent"
        >
          Select
          <HiMiniPlus className="ml-2" />
        </button>
      )}
    </div>
  );
};

export default SelectRoomType;

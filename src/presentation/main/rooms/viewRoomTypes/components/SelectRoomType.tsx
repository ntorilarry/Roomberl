import React, { useState } from "react";
import { HiMiniPlus } from "react-icons/hi2";

import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import {
  useUpdateRoomTypeMutation,
} from "../../../../../services/auth-service";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useGlobalState } from "../../../../../utils/GlobalStateContext";

const SelectRoomType = ({ roomTypeId }) => {
  const [userID, setUserID] = useState<string | null>(
    sessionStorage.getItem("user_id")
  );

  const { isRoomTypePresent, isPaymentVerified } = useGlobalState();
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
      const { status, data } = response.error
        ? response.error["data"]
        : response["data"];
      if (status === "success") {
        toast.success(status);
        navigate("/payments/user", {
          state: { roomTypeId },
        });
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

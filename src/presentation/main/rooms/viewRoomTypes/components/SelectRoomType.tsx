import React, { useState } from "react";
import { HiMiniPlus } from "react-icons/hi2";
import { responseType } from "../../../../../models/response/base-response";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import {
  useGetAddInfoByUserIdQuery,
  useUpdateRoomTypeMutation,
} from "../../../../../services/auth-service";

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
        navigate("/rooms/payment", {
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
  const checkRoomType = response?.data.roomType.id || [];

  const handleNavigatePayment = () => {
    navigate("/rooms/payment", {
      state: { roomTypeId },
    });
  };

  return (
    <div>
      {roomTypeId === checkRoomType ? (
        <button
          onClick={handleNavigatePayment}
          className="inline-flex cursor-pointer my-2 items-center justify-center rounded-full bg-teal-700 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:border-primary-accent hover:bg-primary-accent"
        >
          Make payment
        </button>
      ) : (
        <button
          onClick={handleFormSubmit}
          disabled={selectLoading}
          className="inline-flex cursor-pointer my-2 items-center justify-center rounded-full bg-teal-700 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:border-primary-accent hover:bg-primary-accent"
        >
          Select
          <HiMiniPlus className="ml-2" />
        </button>
      )}
    </div>
  );
};

export default SelectRoomType;

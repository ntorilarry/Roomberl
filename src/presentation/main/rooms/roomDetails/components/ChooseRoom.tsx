import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi2";

import { useChooseRoomMutation } from "../../../../../services/auth-service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChooseRoom = ({ roomID }) => {
  const navigate = useNavigate();
  const [userID] = useState<string | null>(sessionStorage.getItem("user_id"));

  const [selectRoom] = useChooseRoomMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const roomRequest = {
        room: roomID,
      };

      const response = await selectRoom({
        body: roomRequest,
        userId: userID || "",
      });
      console.log(response);
      const { status, data } = response.error
        ? response.error["data"]
        : response["data"];
      if (status === "success") {
        toast.success(status);
        navigate("/rooms/room-details/choose-room/success");
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
    <div>
      <button
        onClick={handleFormSubmit}
        className="text-sm rounded-full flex items-center justify-center leading-none text-white bg-gray-800 dark:bg-gray-600 w-full py-3 px-4 hover:bg-gray-700"
      >
        Choose room
        <HiArrowRight />
      </button>
    </div>
  );
};

export default ChooseRoom;

import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi2";

import { useChooseRoomMutation } from "../../../../../services/auth-service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UnselectRoom = () => {
  const navigate = useNavigate();
  const [userID, setUserID] = useState<string | null>(
    sessionStorage.getItem("user_id")
  );

  const [selectRoom, { isLoading: selectLoading }] = useChooseRoomMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const roomRequest = {
        room: null,
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
        navigate("/rooms/room-details/leave-room/success");
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
        className=" text-base flex items-center justify-center leading-none text-white bg-red-700 dark:bg-red-500 w-full py-4 px-4 hover:bg-red-600"
      >
        Leave room
        <HiArrowRight />
      </button>
    </div>
  );
};

export default UnselectRoom;

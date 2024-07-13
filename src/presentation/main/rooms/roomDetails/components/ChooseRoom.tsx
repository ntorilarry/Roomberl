import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import { responseType } from "../../../../../models/response/base-response";
import { useChooseRoomMutation } from "../../../../../services/auth-service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChooseRoom = ({ roomID }) => {
  const navigate = useNavigate();
  const [userID, setUserID] = useState<string | null>(
    sessionStorage.getItem("user_id")
  );

  const [selectRoom, { isLoading: selectLoading }] = useChooseRoomMutation();

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
      const { status } = response["data"] as responseType;
      if (status === "success") {
        toast.success(status);
        navigate("rooms/room-details/choose-room/success");
      } else {
        toast.error(status);
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
        className="text-base rounded-full flex items-center justify-center leading-none text-white bg-gray-800 dark:bg-gray-600 w-full py-4 hover:bg-gray-700"
      >
        Choose this room
        <HiArrowRight />
      </button>
    </div>
  );
};

export default ChooseRoom;

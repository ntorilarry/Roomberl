import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import { responseType } from "../../../../../models/response/base-response";
import { useChooseRoomMutation } from "../../../../../services/auth-service";
import toast from "react-hot-toast";

const UnselectRoom = () => {
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
      const { status } = response["data"] as responseType;
      if (status === "success") {
        toast.success(status);
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
        className="rounded-full text-base flex items-center justify-center leading-none text-white bg-red-700 dark:bg-red-500 w-full py-4 hover:bg-red-600"
      >
        Unselect room
        <HiArrowRight />
      </button>
    </div>
  );
};

export default UnselectRoom;

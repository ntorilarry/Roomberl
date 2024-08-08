import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetRoomsByIdQuery } from "../../../../services/room-service";
import ChooseRoom from "./components/ChooseRoom";
import UnselectRoom from "./components/UnselectRoom";
import ProtectedRoutes from "../../../auth/utils/ProtectedRoutes";
import { useGlobalState } from "../../../../utils/GlobalStateContext";
import { MdCheckroom, MdMeetingRoom } from "react-icons/md";
import { FaCediSign } from "react-icons/fa6";
import { TbFileDescription } from "react-icons/tb";
import Loader from "../../../../components/Loader";

const RoomDetails = () => {
  const { roomTypeId, roomId } = useParams();
  const [hostel] = useState(sessionStorage.getItem("hostel"));

  const { state } = useGlobalState();
  const { RoomIdPresent } = state;

  const { data: response, isLoading } = useGetRoomsByIdQuery({
    hostelId: hostel || "",
    roomTypeId: roomTypeId || "",
    id: roomId || "",
  });

  const roomDetails = response?.data?.results[0] || [];

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-6 py-3 md:flex-row lg:items-stretch xl:py-8 max-w-screen-2xl m-auto w-full px-3 sm:px-8 lg:px-16">
      <div className="flex min-w-[300px] flex-1 flex-col items-start gap-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 px-3 py-8 sm:p-6 md:gap-6 xl:gap-12 2xl:min-w-[300px]">
        <p className="font-medium text-blue-700 dark:text-white">
          {" "}
          {roomDetails.hostel?.name || "NA"}
        </p>
        <div className="flex max-w-md flex-col gap-2">
          <h3 className="text-xl font-semibold tracking-tight dark:text-white">
            {roomDetails.name}
          </h3>
          <div className="flex flex-wrap text-[#53575A] text-sm dark:text-white items-center">
            <MdMeetingRoom />
            <h1 className=" pl-2 font-normal">
              {" "}
              {roomDetails.roomType?.name}
            </h1>
          </div>
          <div className="flex flex-wrap text-[#53575A] text-sm dark:text-white items-center">
            <FaCediSign />
            <h1 className=" pl-2 font-normal">
              {" "}
              GHS {roomDetails.roomType?.price}
            </h1>
          </div>
          <div className="flex flex-wrap text-[#53575A] text-sm dark:text-white items-center">
            <TbFileDescription />
            <h1 className=" pl-2 font-normal">
              {" "}
              {roomDetails.description || "No description"}
            </h1>
          </div>
          <div className="flex flex-wrap text-[#53575A] text-sm dark:text-white items-center">
            <MdCheckroom />
            <h1 className=" pl-2 font-normal">
              {" "}
              {roomDetails.roomAmenities
                ?.map((amenity) => amenity.name)
                .join(", ") || "No amenities"}
            </h1>
          </div>
        </div>
        {RoomIdPresent === roomDetails.id ? (
          <UnselectRoom />
        ) : (
          <ChooseRoom roomID={roomDetails.id} />
        )}
      </div>
      <div className="flex flex-1 md:max-xl:items-center">
        <img
          className="xl:max-h-[490px] xl:max-w-lg 2xl:max-h-none 2xl:max-w-full object-cover rounded-2xl"
          alt="img of a girl posing"
          src={`https://cyrax1.pythonanywhere.com${roomDetails.floorPlan}`}
          width="1128"
          height="1060"
        />
      </div>
    </section>
  );
};

export default ProtectedRoutes(RoomDetails, {
  allowedRoles: ["Student"],
});

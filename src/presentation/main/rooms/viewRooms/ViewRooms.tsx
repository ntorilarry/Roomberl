import React, { useState } from "react";
import { useGetRoomsQuery } from "../../../../services/room-service";
import { Link, useParams } from "react-router-dom";
import { FaGamepad, FaRegStar } from "react-icons/fa6";
import { HiArrowRight, HiOutlineBuildingOffice } from "react-icons/hi2";
import ViewRoomLoader from "./components/ViewRoomLoader";
import ProtectedRoutes from "../../../auth/utils/ProtectedRoutes";
import { useGlobalState } from "../../../../utils/GlobalStateContext";
import { getRoomParams } from "../../../../models/request/room-request";

const ViewRooms = () => {
  const { roomTypeId } = useParams();
  const [roomGender] = useState(sessionStorage.getItem("gender"));
  const [hostel] = useState(sessionStorage.getItem("hostel"));
  const { RoomIdPresent, isRoomTypePresent, isPaymentVerified } =
    useGlobalState();



    const { data: response, isLoading } = useGetRoomsQuery({
      hostelId: hostel || "",
      roomTypeId: roomTypeId || "",
      gender: roomGender || "",
      page: 1,
      size: 99999999,
    } as getRoomParams);

  const rooms = response?.data?.results || [];

  if (isLoading) {
    return (
      <div>
        <ViewRoomLoader />
      </div>
    );
  }

  // Find the current room if RoomIdPresent matches any room's id
  const currentRoom = rooms.find((item) => item.id === RoomIdPresent);

  return (
    <div>
      {/* Only show the "Current room" section if RoomIdPresent matches a room */}
      {currentRoom && (
        <div className="w-full">
          <h2 className="text-xl mb-5 dark:text-white font-semibold">
            Current room
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 border gap-4 dark:border-none">
            <div className="flex p-4 gap-x-4 bg-white dark:bg-slate-700 rounded-lg transform transition duration-300 hover:scale-105">
              <div>
                <img
                  className="object-cover w-48 h-48"
                  src={
                    currentRoom.floorPlan
                      ? `https://cyrax1.pythonanywhere.com${currentRoom.floorPlan}`
                      : "https://placehold.co/500x500?text=No+Image"
                  }
                  alt={currentRoom.name || "Room"}
                />
              </div>
              <div className="flex flex-col items-center">
                <div>
                  <h1 className="text-base leading-none font-semibold text-black dark:text-white mb-2">
                    {currentRoom.name}
                  </h1>
                  <div className="flex flex-wrap text-[#53575A] dark:text-white items-center">
                    <HiOutlineBuildingOffice className="text-[16px]" />
                    <h1 className="text-sm pl-2 font-normal">
                      {currentRoom.code || "NA"}
                    </h1>
                  </div>
                  <div className="flex flex-wrap text-[#53575A] dark:text-white items-center">
                    <FaRegStar className="text-[16px]" />
                    <h1 className="text-sm pl-2 font-normal">
                      {currentRoom.roomAmenities
                        .map((amenity) => amenity.name)
                        .join(", ") || "NA"}
                    </h1>
                  </div>
                  <div className="flex text-[#53575A] py-2 dark:text-white items-center">
                    <FaGamepad className="text-[16px]" />
                    <hr className="w-full"></hr>
                  </div>
                  <div className="flex text-sm leading-4 py-2 text-[#53575A] dark:text-white items-center">
                    <p>{currentRoom.description || "NA"}</p>
                  </div>
                  {currentRoom.isLocked && (
                    <p className="text-red-600 pt-2 text-sm">
                      This room is locked
                    </p>
                  )}
                  <Link
                    to={`/rooms/room-details/${roomTypeId}/${currentRoom.id}`}
                    className="inline-flex cursor-pointer my-2 items-center justify-center rounded-full bg-red-700 hover:bg-red-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:border-primary-accent hover:bg-primary-accent"
                  >
                    Leave room
                    <HiArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* "Choose room" section */}
      <div className="w-full mt-5">
        <h2 className="text-xl mb-5 dark:text-white font-semibold">
          Choose room
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 border gap-4 dark:border-none">
          {rooms.length === 0 ? (
            <div className=" w-full">
              <p className="text-lg dark:text-white">No available rooms</p>
            </div>
          ) : (
            rooms.map((item, key) => (
              <div
                key={key}
                className="flex p-4 gap-x-4 bg-white dark:bg-slate-700 rounded-lg transform transition duration-300 hover:scale-105"
              >
                <div>
                  <img
                    className="object-cover w-48 h-48"
                    src={
                      item.floorPlan
                        ? `https://cyrax1.pythonanywhere.com${item.floorPlan}`
                        : "https://placehold.co/500x500?text=No+Image"
                    }
                    alt={item.name || "Room"}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div>
                    <h1 className="text-base leading-none font-semibold text-black dark:text-white mb-2">
                      {item.name}
                    </h1>
                    <div className="flex flex-wrap text-[#53575A] dark:text-white items-center">
                      <HiOutlineBuildingOffice className="text-[16px]" />
                      <h1 className="text-sm pl-2 font-normal">
                        {item.code || "NA"}
                      </h1>
                    </div>
                    <div className="flex flex-wrap text-[#53575A] dark:text-white items-center">
                      <FaRegStar className="text-[16px]" />
                      <h1 className="text-sm pl-2 font-normal">
                        {item.roomAmenities
                          .map((amenity) => amenity.name)
                          .join(", ") || "NA"}
                      </h1>
                    </div>
                    <div className="flex text-[#53575A] py-2 dark:text-white items-center">
                      <FaGamepad className="text-[16px]" />
                      <hr className="w-full"></hr>
                    </div>
                    <div className="flex text-sm leading-4 py-2 text-[#53575A] dark:text-white items-center">
                      <p>{item.description || "NA"}</p>
                    </div>
                    {item.isLocked ? (
                      <p className="text-red-600 pt-2 text-sm">
                        This room is locked
                      </p>
                    ) : (
                      isPaymentVerified &&
                      isRoomTypePresent === roomTypeId && (
                        <>
                          {RoomIdPresent === item.id ? (
                            <Link
                              to={`/rooms/room-details/${roomTypeId}/${item.id}`}
                              className="inline-flex cursor-pointer my-2 items-center justify-center rounded-full bg-green-700 hover:bg-green-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:border-primary-accent hover:bg-primary-accent"
                            >
                              Current room
                              <HiArrowRight className="ml-2" />
                            </Link>
                          ) : (
                            <Link
                              to={`/rooms/room-details/${roomTypeId}/${item.id}`}
                              className="inline-flex cursor-pointer my-2 items-center justify-center rounded-full bg-[#4187ED] px-3 py-2 text-xs font-semibold text-white shadow-sm hover:border-primary-accent hover:bg-primary-accent"
                            >
                              Choose room
                              <HiArrowRight className="ml-2" />
                            </Link>
                          )}
                        </>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoutes(ViewRooms, {
  allowedRoles: ["Student"],
});

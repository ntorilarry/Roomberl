import React, { useState } from "react";
import { useGetRoomsQuery } from "../../../../services/room-service";
import { Link, useParams } from "react-router-dom";
import { FaGamepad, FaRegStar } from "react-icons/fa6";
import { HiArrowRight, HiOutlineBuildingOffice } from "react-icons/hi2";
import { BsSendCheck } from "react-icons/bs";
import ViewRoomLoader from "./components/ViewRoomLoader";
import UnselectRoom from "../roomDetails/components/UnselectRoom";

const ViewRooms = () => {
  const { roomTypeId } = useParams();
  const parseBoolean = (value) => {
    return value === "true";
  };

  const [verify, setVerify] = useState(
    parseBoolean(sessionStorage.getItem("isPaymentVerified"))
  );

  const [payRoomTypeId, setPayRoomTypeId] = useState(
    sessionStorage.getItem("isRoomTypePresent")
  );

  const [RoomIdPresent, setRoomIdPresent] = useState(
    sessionStorage.getItem("RoomIdPresent")
  );

  const [hostel, setHostel] = useState(sessionStorage.getItem("hostel"));

  const { data: response, isLoading } = useGetRoomsQuery({
    hostelId: hostel || "",
    roomTypeId: roomTypeId || "",
  });

  const rooms = response?.data?.results || [];

  console.log("verify", verify, payRoomTypeId, roomTypeId);

  if (isLoading) {
    return (
      <div>
        <ViewRoomLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
        <h2 className="text-xl mb-5 dark:text-white font-semibold ">
          Choose room
        </h2>
        <div className="grid md:grid-cols-2 p-4 border gap-4 dark:border-none">
          {rooms.length === 0 ? (
            <div className=" w-full">
              <p className="text-lg dark:text-white">No available rooms</p>
            </div>
          ) : (
            rooms.map((item, key) => (
              <div
                key={key}
                className="flex p-4 gap-x-4 bg-white dark:bg-slate-700 rounded-lg"
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
                    <h1 className="text-[18px] leading-none font-semibold text-black dark:text-white mb-2">
                      {item.name}
                    </h1>
                    <div className="flex flex-wrap text-[#53575A] dark:text-white items-center">
                      <HiOutlineBuildingOffice className="text-[16px]" />
                      <h1 className="text-[14px] pl-2 font-normal">
                        {item.code || "Na"}
                      </h1>
                    </div>
                    <div className="flex flex-wrap text-[#53575A] dark:text-white items-center">
                      <FaRegStar className="text-[16px]" />
                      <h1 className="text-[14px] pl-2 font-normal">
                        {item.roomAmenities
                          .map((amenity) => amenity.name)
                          .join(", ") || "NA"}
                      </h1>
                    </div>
                    <div className="flex text-[#53575A] py-2 dark:text-white items-center">
                      <FaGamepad className="text-[16px]" />
                      <hr className="w-full"></hr>
                    </div>
                    <div className="flex text-[14px] leading-4 py-2 text-[#53575A] dark:text-white items-center">
                      <p>{item.description || "NA"}</p>
                    </div>
                    {verify && payRoomTypeId === roomTypeId && (
                      <>
                        {RoomIdPresent === item.id ? (
                          <Link
                            to={`/rooms/room-details/${roomTypeId}/${item.id}`}
                            className="inline-flex cursor-pointer my-2 items-center justify-center rounded-full bg-red-700 hover:bg-red-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:border-primary-accent hover:bg-primary-accent"
                          >
                            Unselect room
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

export default ViewRooms;

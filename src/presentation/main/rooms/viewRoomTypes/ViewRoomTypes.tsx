import React, { useState } from "react";
import { BsSendCheck } from "react-icons/bs";
import { FaCediSign } from "react-icons/fa6";
import { useGetRoomTypeQuery } from "../../../../services/room-service";
import { FaGamepad, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import ViewRoomTypesLoader from "./components/ViewRoomTypesLoader";
import SelectRoomType from "./components/SelectRoomType";
import ProtectedRoutes from "../../../auth/utils/ProtectedRoutes";
import { useGlobalState } from "../../../../utils/GlobalStateContext";

const ViewRoomTypes = () => {
  const [hostel] = useState(sessionStorage.getItem("hostel"));
  const { data: response, isLoading } = useGetRoomTypeQuery({
    hostelId: hostel || "",
    page: 1,
    size: 99999999,
  });

  const roomType = response?.data.results || [];

  const { state } = useGlobalState();
  const { isPaymentVerified, isRoomTypePresent } = state;

  if (isLoading) {
    return (
      <div>
        <ViewRoomTypesLoader />
      </div>
    );
  }

  const filteredRoomTypes = roomType.filter((item) => {
    if (isPaymentVerified === true && item.id === isRoomTypePresent) {
      return true;
    } else if (isPaymentVerified !== true) {
      return true;
    }
    return false;
  });

  return (
    <div>
      <div className="sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
        <h2 className="text-xl mb-5 dark:text-white font-semibold">
          Select room type
        </h2>
        <div className="grid gap-4 row-gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRoomTypes.map((item, key) => (
            <div
              key={key}
              className="bg-white dark:bg-slate-800 rounded-lg flex flex-col justify-between p-4 border dark:border-none"
            >
              <div>
                <h1 className="text-[18px] leading-none font-semibold text-black dark:text-white mb-2 ">
                  {item.name}
                </h1>
                <div className="flex flex-wrap text-[#53575A] dark:text-white  items-center">
                  <FaCediSign className="text-[16px] " />
                  <h1 className="text-[14px] pl-2 font-normal">{item.price}</h1>
                </div>
                {/* <div className="flex flex-wrap text-[#53575A] dark:text-white  items-center">
                  <HiOutlineBuildingOffice className="text-[16px] " />
                  <h1 className="text-[14px] pl-2 font-normal">
                    {item.numOccupancy} rooms available
                  </h1>
                </div> */}
                <div className="flex flex-wrap text-[#53575A] dark:text-white  items-center">
                  <FaRegStar className="text-[16px] " />
                  <h1 className="text-[14px] pl-2 font-normal">
                    {item.roomAmenities
                      .map((amenity) => amenity.name)
                      .join(", ") || "NA"}
                  </h1>
                </div>

                <div className="flex text-[#53575A] py-2 dark:text-white  items-center">
                  <FaGamepad className="text-[16px] " />
                  <hr className=" w-full"></hr>
                </div>
                <div className="flex text-[14px] leading-4 py-2 text-[#53575A] dark:text-white  items-center">
                  <p>{item.description || "NA"}</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/rooms/rooms/${item.id}`}
                    className="inline-flex cursor-pointer my-2 items-center justify-center rounded-full bg-[#4187ED] px-3 py-2 text-xs font-semibold text-white shadow-sm hover:border-primary-accent hover:bg-primary-accent"
                  >
                    View rooms
                    <BsSendCheck className="ml-2" />
                  </Link>
                  <SelectRoomType roomTypeId={item.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoutes(ViewRoomTypes, {
  allowedRoles: ["Student"],
});

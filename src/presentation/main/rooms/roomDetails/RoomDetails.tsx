import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetRoomMatesQuery,
  useGetRoomsQuery,
} from "../../../../services/room-service";
import ChooseRoom from "./components/ChooseRoom";
import UnselectRoom from "./components/UnselectRoom";
import ProtectedRoutes from "../../../auth/utils/ProtectedRoutes";
import { useGlobalState } from "../../../../utils/GlobalStateContext";
import { MdCheckroom, MdMeetingRoom } from "react-icons/md";
import { FaCediSign } from "react-icons/fa6";
import { TbFileDescription } from "react-icons/tb";
import Loader from "../../../../components/Loader";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { StartMessageModal } from "../../messages/components/StartMessageModal";
import { getRoomParams } from "../../../../models/request/room-request";

const RoomDetails = () => {
  const { roomTypeId, roomId } = useParams();
  const [hostel] = useState(sessionStorage.getItem("hostel"));

  const { RoomIdPresent, isPaymentVerified } = useGlobalState();

  const { data: roomResponse, isLoading: RoomLoading } = useGetRoomsQuery({
    hostelId: hostel || "",
    roomTypeId: roomTypeId || "",
    id: roomId || "",
  } as getRoomParams);

  const roomDetails = roomResponse?.data?.results[0] || [];

  const { data: roommatesResponse, isLoading: RoomateLoading } =
    useGetRoomMatesQuery(roomId || "");

  const roomMates = roommatesResponse?.data?.results || [];
  console.log(roomMates, "roomMates");
  if (RoomLoading || RoomateLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
 
    <section className="py-12 bg-white  dark:bg-slate-800 sm:py-16">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 gap-5 mt-4 md:gap-6 sm:grid-cols-2">
          <div className="bg-gray-400 rounded-lg overflow-hidden aspect-[16/9]">
            <img
              className="object-cover w-full h-full"
              src={
                roomDetails.floorPlan
                  ? `https://cyrax1.pythonanywhere.com${roomDetails.floorPlan}`
                  : "https://placehold.co/500x500?text=No+Image"
              }
              alt="Room Floor Plan"
            />
          </div>

          <div className="overflow-hidden bg-gray-400 rounded-lg  aspect-[16/9]">
            <Swiper
              spaceBetween={20}
              loop={true}
              slidesPerView={1}
              navigation={true}
              autoplay={{
                delay: 10000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Navigation, Pagination, Autoplay]}
              className="mySwiper"
            >
              {roomDetails.images?.length > 0 ? (
                roomDetails.images.map((data) => (
                  <SwiperSlide key={data.id}>
                    <img
                      className="object-cover w-full h-full"
                      src={`https://cyrax1.pythonanywhere.com${data.image}`}
                      alt=""
                    />
                  </SwiperSlide>
                ))
              ) : (
                <img
                  className="object-cover w-full h-full"
                  src="https://placehold.co/500x500?text=No+Image"
                  alt=""
                />
              )}
            </Swiper>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-8 lg:grid-cols-5">
          <div className="pb-8 border-b border-gray-200 dark:border-gray-600 lg:col-span-3  lg:border-r lg:pr-14 lg:pb-0 lg:border-b-0">
            <h1 className="mt-5 text-3xl font-bold text-gray-900 dark:text-gray-50">
              {roomDetails.name}
            </h1>
            <p className="mt-2 text-sm font-normal text-gray-500 dark:text-gray-200">
              {" "}
              {roomDetails.hostel?.name || "NA"}
            </p>

            <p className="text-base font-normal leading-7 text-gray-700 dark:text-gray-100 mt-5">
              {roomDetails.description || "No description"}
            </p>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mt-4">
              Room Amenities
            </h2>
            <ul className="space-y-2 text-base font-medium text-gray-600 dark:text-gray-50 list-disc list-inside mt-2">
              {roomDetails.roomAmenities?.length > 0 ? (
                roomDetails.roomAmenities.map((amenity) => (
                  <li key={amenity.id}>{amenity.name}</li>
                ))
              ) : (
                <li>No amenities available</li>
              )}
            </ul>

            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mt-4">
              Other room details
            </h2>
            <div className="flex flex-wrap text-[#53575A] text-base dark:text-white items-center">
              <MdMeetingRoom />{" "}
              <h1 className=" pl-2 font-normal">
                {roomDetails.roomType?.name}{" "}
              </h1>{" "}
            </div>
            <div className="flex flex-wrap text-[#53575A] text-sm dark:text-white items-center">
              <FaCediSign />{" "}
              <h1 className=" pl-2 font-normal">
                GHS {roomDetails.roomType?.price}
              </h1>{" "}
            </div>
          </div>

          <div className="pt-8 lg:col-span-2 lg:pl-14 lg:pt-0">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-50">
              Roommates:
            </h3>
            <div className="mt-5 space-y-3">
              {roomMates?.length > 0 ? (
                roomMates?.map((data) => (
                  <label
                    key={data.id}
                    className="relative flex items-center p-4 border-2 border-gray-200 rounded-md cursor-pointer focus:outline-none"
                  >
                    <div></div>
                    <div className="flex flex-col justify-between w-full sm:flex-row ml-2">
                      <div className="flex">
                        <span>
                          <img
                            className="w-10 h-10 rounded-full"
                            src={`https://ui-avatars.com/api/?name=${data?.additionalDetails[0].nickname}}&background=random&size=32`}
                            alt=""
                          />
                        </span>
                        <div className="ml-2">
                          <span className="block text-base font-bold text-gray-900 dark:text-gray-50">
                            {data?.additionalDetails[0].nickname}
                          </span>
                          <span className="block text-xs font-medium text-gray-500">
                            {" "}
                            {data?.additionalDetails[0].courseOfStudy}
                          </span>
                          <span className="block text-xs font-medium text-gray-500">
                            {" "}
                            Match Percent: {data?.matchPercentage}
                          </span>
                        </div>
                      </div>
                      {isPaymentVerified && (
                        <div className="">
                          <StartMessageModal
                            objectID={data?.additionalDetails[0].id}
                          />
                        </div>
                      )}
                    </div>
                  </label>
                ))
              ) : (
                <label className="relative flex items-center p-4 border-2 border-gray-200 rounded-md cursor-pointer focus:outline-none">
                  <div>
                    <span>
                      <img
                        className="w-8 h-8 rounded-full"
                        src={`https://ui-avatars.com/api/?name=NA&background=random&size=32`}
                        alt=""
                      />
                    </span>
                  </div>
                  <div className="flex flex-col ml-5">
                    <span className="block text-lg font-bold text-gray-900 dark:text-gray-50">
                      No room mates
                    </span>
                  </div>
                </label>
              )}
            </div>
            {isPaymentVerified && (
              <div className="mt-5 space-y-3">
                {RoomIdPresent === roomDetails.id ? (
                  <UnselectRoom />
                ) : (
                  <ChooseRoom roomID={roomDetails.id} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProtectedRoutes(RoomDetails, {
  allowedRoles: ["Student"],
});

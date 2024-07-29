import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetRoomsByIdQuery } from "../../../../services/room-service";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ChooseRoom from "./components/ChooseRoom";
import UnselectRoom from "./components/UnselectRoom";
import ProtectedRoutes from "../../../auth/utils/ProtectedRoutes";
import { useGetMatchingUsersQuery } from "../../../../services/user-service";
import { useGlobalState } from "../../../../utils/GlobalStateContext";

const RoomDetails = () => {
  const { roomTypeId, roomId } = useParams();
  const [showAmenities, setShowAmenities] = useState(false);
  const [showMatchingUsers, setShowMatchingUsers] = useState(false);
  const [hostel] = useState(sessionStorage.getItem("hostel"));

  const { state } = useGlobalState();
  const { RoomIdPresent } = state;

  const { data: response, isLoading } = useGetRoomsByIdQuery({
    hostelId: hostel || "",
    roomTypeId: roomTypeId || "",
    id: roomId || "",
  });

  const roomDetails = response?.data?.results[0] || [];

  const { data: matchResponse, isLoading: matchLoading } =
    useGetMatchingUsersQuery();
  const matchUsers = matchResponse?.data?.results;

  return (
    <div className="bg-white dark:bg-slate-800">
      <div className="md:flex items-start justify-center py-12 md:px-6 px-4">
        <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
          <Swiper
            spaceBetween={30}
            loop={true}
            navigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation, Pagination, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                className="w-full object-cover"
                alt="img of a girl posing"
                src={`https://cyrax1.pythonanywhere.com${roomDetails.floorPlan}`}
              />
            </SwiperSlide>
            {roomDetails.images?.map((data, index) => (
              <SwiperSlide key={index}>
                <div>
                  <img
                    className="mt-6 w-full object-cover"
                    alt="img of a girl posing"
                    src={`https://cyrax1.pythonanywhere.com${data.image}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div className="border-b border-gray-200 dark:border-gray-500 pb-6">
            <p className="text-sm leading-none text-gray-600 dark:text-white">
              {roomDetails.hostel?.name || "NA"}
            </p>
            <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">
              {roomDetails.name}
            </h1>
          </div>
          <div className="py-4 border-b border-gray-200 dark:border-gray-500 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800 dark:text-white">
              Room Type
            </p>
            <div className="flex items-center justify-center">
              <p className="text-sm leading-none text-gray-600 dark:text-white">
                {roomDetails.roomType?.name}
              </p>
            </div>
          </div>
          <div className="py-4 border-b border-gray-200 dark:border-gray-500 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800 dark:text-white">
              Price
            </p>
            <div className="flex items-center justify-center">
              <p className="text-sm leading-none text-gray-600 dark:text-white mr-3">
                {" "}
                GHS {roomDetails.roomType?.price}
              </p>
            </div>
          </div>

          {RoomIdPresent === roomDetails.id ? (
            <UnselectRoom />
          ) : (
            <ChooseRoom roomID={roomDetails.id} />
          )}

          <div>
            <p className=" text-base lg:leading-tight leading-normal text-gray-600 dark:text-white mt-7">
              {roomDetails.description || "NA"}
            </p>
            <p className="text-base leading-4 mt-7 text-gray-600 dark:text-white">
              Room Code: {roomDetails.code || "NA"}
            </p>
          </div>
          <div>
            <div className="border-t border-b py-4 mt-7 border-gray-200 dark:border-gray-500">
              <div
                onClick={() => setShowAmenities(!showAmenities)}
                className="flex justify-between items-center cursor-pointer"
              >
                <p className="text-base leading-4 text-gray-800 dark:text-white">
                  Room Amenities
                </p>
                <button
                  className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded"
                  aria-label="show or hide"
                >
                  <svg
                    className={
                      "transform dark:fill-white" +
                      (showAmenities ? "rotate-180" : "rotate-0")
                    }
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 1L5 5L1 1"
                      stroke="#4B5563"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={
                  "pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 dark:text-white " +
                  (showAmenities ? "block" : "hidden")
                }
                id="sect"
              >
                {roomDetails.roomAmenities
                  ?.map((amenity) => amenity.name)
                  .join(", ")}
              </div>
            </div>
            <div className="border-b py-4 border-gray-200 dark:border-gray-500">
              <div
                onClick={() => setShowMatchingUsers(!showMatchingUsers)}
                className="flex justify-between items-center cursor-pointer"
              >
                <p className="text-base leading-4 text-gray-800 dark:text-white">
                  Matching Users
                </p>
                <button
                  className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded"
                  aria-label="show or hide"
                >
                  <svg
                    className={
                      "transform dark:fill-white" +
                      (showMatchingUsers ? "rotate-180" : "rotate-0")
                    }
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 1L5 5L1 1"
                      stroke="#4B5563"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={
                  "pt-4 text-base leading-normal text-gray-600 dark:text-white " +
                  (showMatchingUsers ? "block" : "hidden")
                }
                id="sect"
              >
                <div className="w-full px-4 py-5 mx-auto">
                  <div className="grid sm:grid-cols-2 gap-2">
                    {matchUsers?.map((item, key) => (
                      <div
                        key={key}
                        className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-transparent dark:border-white"
                      >
                        <div className="p-3">
                          <div className="flex">
                            <img
                              src={`https://ui-avatars.com/api/?name=${item.nickname}&background=random&size=30`}
                              alt="Avatar"
                              className="rounded-full"
                            />

                            <div className="grow ms-5">
                              <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                {item.nickname || "NA"}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-white">
                                {item.courseOfStudy}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-white">
                                Match: {item.matchPercentage}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoutes(RoomDetails, {
  allowedRoles: ["Student"],
});

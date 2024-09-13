import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetRoomMatesQuery,
  useGetRoomsByIdQuery,
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

const RoomDetails = () => {
  const { roomTypeId, roomId } = useParams();
  const [hostel] = useState(sessionStorage.getItem("hostel"));

  const { state } = useGlobalState();
  const { RoomIdPresent } = state;

  const { data: roomResponse, isLoading: RoomLoading } = useGetRoomsByIdQuery({
    hostelId: hostel || "",
    roomTypeId: roomTypeId || "",
    id: roomId || "",
  });

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
    // <section className="flex flex-col gap-6 py-3 md:flex-row lg:items-stretch xl:py-8 max-w-screen-2xl m-auto w-full px-3 sm:px-8 lg:px-16">
    //   <div className="flex min-w-[300px] flex-1 flex-col items-start gap-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 px-3 py-8 sm:p-6 md:gap-6 xl:gap-12 2xl:min-w-[300px]">
    //     <p className="font-medium text-blue-700 dark:text-white">
    //       {" "}
    //       {roomDetails.hostel?.name || "NA"}
    //     </p>
    //     <div className="flex max-w-md flex-col gap-2">
    //       <h3 className="text-xl font-semibold tracking-tight dark:text-white">
    //         {roomDetails.name}
    //       </h3>
    //       <div className="flex flex-wrap text-[#53575A] text-sm dark:text-white items-center">
    //         <MdMeetingRoom />
    //         <h1 className=" pl-2 font-normal">
    //           {" "}
    //           {roomDetails.roomType?.name}
    //         </h1>
    //       </div>
    //       <div className="flex flex-wrap text-[#53575A] text-sm dark:text-white items-center">
    //         <FaCediSign />
    //         <h1 className=" pl-2 font-normal">
    //           {" "}
    //           GHS {roomDetails.roomType?.price}
    //         </h1>
    //       </div>
    //       <div className="flex flex-wrap text-[#53575A] text-sm dark:text-white items-center">
    //         <TbFileDescription />
    //         <h1 className=" pl-2 font-normal">
    //           {" "}
    //           {roomDetails.description || "No description"}
    //         </h1>
    //       </div>
    //       <div className="flex flex-wrap text-[#53575A] text-sm dark:text-white items-center">
    //         <MdCheckroom />
    //         <h1 className=" pl-2 font-normal">
    //           {" "}
    //           {roomDetails.roomAmenities
    //             ?.map((amenity) => amenity.name)
    //             .join(", ") || "No amenities"}
    //         </h1>
    //       </div>
    //     </div>
    //     {RoomIdPresent === roomDetails.id ? (
    //       <UnselectRoom />
    //     ) : (
    //       <ChooseRoom roomID={roomDetails.id} />
    //     )}
    //   </div>
    //   <div className="flex flex-1 md:max-xl:items-center">
    //     <img
    //       className="xl:max-h-[490px] xl:max-w-lg 2xl:max-h-none 2xl:max-w-full object-cover rounded-2xl"
    //       alt="img of a girl posing"
    //       src={`https://cyrax1.pythonanywhere.com${roomDetails.floorPlan}`}
    //       width="1128"
    //       height="1060"
    //     />
    //   </div>
    // </section>
    <section className="py-12 bg-white  dark:bg-slate-800 sm:py-16">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 gap-5 mt-4 md:gap-6 sm:grid-cols-2">
          <div className="bg-gray-400 rounded-lg overflow-hidden aspect-[16/9]">
            <img
              className="object-cover  w-full h-full"
              src={`https://cyrax1.pythonanywhere.com${roomDetails.floorPlan}`}
              alt="Room Floor Plan"
            />
          </div>

          <div className="overflow-hidden bg-gray-400 rounded-lg aspect-w-16 aspect-[16/9]">
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
                  src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/1/image-2.png"
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
            <ul className="space-y-4 text-base font-medium text-gray-600 list-disc list-inside mt-2">
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
                    <div>
                      <span>
                        <img
                          className="w-8 h-8 rounded-full"
                          src={`https://ui-avatars.com/api/?name=${data?.additionalDetails[0].nickname}}&background=random&size=32`}
                          alt=""
                        />
                      </span>
                    </div>
                    <div className="flex flex-col ml-5">
                      <span className="block text-lg font-bold text-gray-900 dark:text-gray-50">
                        {data?.additionalDetails[0].nickname}
                      </span>
                      <span className="block mt-1 text-sm font-medium text-gray-500">
                        {" "}
                        {data?.additionalDetails[0].courseOfStudy}
                      </span>
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

            <div className="mt-5 space-y-3">
              {RoomIdPresent === roomDetails.id ? (
                <UnselectRoom />
              ) : (
                <ChooseRoom roomID={roomDetails.id} />
              )}

              {/* <button
                type="button"
                className="
                            flex
                            items-center
                            justify-center
                            w-full
                            px-4
                            py-3
                            text-base
                            font-bold
                            text-center text-gray-900
                            transition-all
                            duration-200
                            bg-transparent
                            border-2 border-gray-900
                            rounded-md
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                            hover:bg-gray-900
                            focus:bg-gray-900 focus:text-white
                            hover:text-white
                        "
              >
                Live preview
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProtectedRoutes(RoomDetails, {
  allowedRoles: ["Student"],
});

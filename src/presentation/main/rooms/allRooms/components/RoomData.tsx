import React, { useEffect, useState } from "react";
import moment from "moment";
import { useGetRoomsQuery } from "../../../../../services/room-service";
import RoomsTables from "./RoomsTables";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const RoomData = () => {
  const [filterhostel, setFilterHostel] = useState("");
  const [filterRoomType, setFilterRoomType] = useState("");
  const { data: response, isLoading } = useGetRoomsQuery({
    hostelId: filterhostel,
    roomTypeId: filterRoomType,
  });

  const Rooms = response?.data.results || [];

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Code",
        accessor: "code",
      },
      {
        Header: "Floor Plan",
        accessor: "floorPlan",
        Cell: ({ value }) =>
          value ? (
            <img
              src={`https://cyrax1.pythonanywhere.com${value}`}
              alt="Floor Plan"
              style={{ width: "50px", height: "auto" }}
            />
          ) : (
            "NA"
          ),
      },
      {
        Header: "Images",
        accessor: "images",
        Cell: ({ value }) =>
          value && value.length > 0 ? (
            <div className="grid gap-2 grid-cols-3">
              {value.map((image, index) => (
                <div key={index}>
                  <img
                    src={`https://cyrax1.pythonanywhere.com${image.image}`}
                    alt={`Room Image ${index + 1}`}
                    style={{ width: "50px", height: "auto" }}
                  />
                </div>
              ))}
            </div>
          ) : (
            "NA"
          ),
      },
      {
        Header: "Room Amenities",
        accessor: (row) =>
          row.roomAmenities.map((amenity) => amenity.name).join(", "),
      },

      {
        Header: "Date Created",
        accessor: (row) => moment(row.createdAt).format("MMMM Do YYYY"),
      },
    ],
    []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Calculate total pages
  const totalPages = Math.ceil(Rooms.length / pageSize);

  // Get current quotes to display
  const currentAmenities = Rooms.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <RoomsTables
        columns={columns}
        data={currentAmenities}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isLoading={isLoading}
        setFilterHostel={setFilterHostel}
        setFilterRoomType={setFilterRoomType}
      />
    </div>
  );
};

export default RoomData;

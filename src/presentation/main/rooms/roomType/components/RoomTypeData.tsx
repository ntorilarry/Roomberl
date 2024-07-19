import React, { useEffect, useState } from "react";
import moment from "moment";
import { useGetRoomTypeQuery } from "../../../../../services/room-service";
import RoomTypeTable from "./RoomTypeTable.tsx";
import { DeleteRoomType } from "./DeleteRoomType";
import { EditRoomType } from "./EditRoomType";

const RoomTypeData = () => {
  const [filterValue, setFilterValue] = useState("");
  const { data: response, isLoading } = useGetRoomTypeQuery(filterValue);

  const RoomAmenity = response?.data.results || [];

  const columns = React.useMemo(
    () => [
      // {
      //   Header: "Id",
      //   accessor: "id",
      // },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Occupancy Number",
        accessor: "numOccupancy",
      },
      {
        Header: "Current Occupancy",
        accessor: "currentOccupancy",
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
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-x-2">
            <EditRoomType typeroom={row.original} />
            <DeleteRoomType typeroom={row.original} />
          </div>
        ),
      },
    ],
    []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Calculate total pages
  const totalPages = Math.ceil(RoomAmenity.length / pageSize);

  // Get current quotes to display
  const currentAmenities = RoomAmenity.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <RoomTypeTable
        columns={columns}
        data={currentAmenities}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isLoading={isLoading}
        setFilterValue={setFilterValue}
      />
    </div>
  );
};

export default RoomTypeData;

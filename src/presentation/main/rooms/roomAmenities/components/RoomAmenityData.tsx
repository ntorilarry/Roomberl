import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useGetRoomAmenitiesQuery } from "../../../../../services/room-service";
import RoomAmenityTable from "./RoomAmenityTable.tsx";
import TableShimmerLoader from "../../../../../components/TableShimmerLoader";

const RoomAmenityData = () => {
  const location = useLocation();

  const { data: response, isLoading } = useGetRoomAmenitiesQuery();

  const RoomAmenity = response?.data.results || [];

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
        Header: "Date Created",
        accessor: (row) => moment(row.createdAt).format("MMMM Do YYYY"),
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
      <RoomAmenityTable
        columns={columns}
        data={currentAmenities}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isLoading={isLoading}
      />

    </div>
  );
};

export default RoomAmenityData;

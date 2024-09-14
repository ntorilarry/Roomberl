import React, { useMemo, useState } from "react";
import moment from "moment";
import { useGetRoomAmenitiesQuery } from "../../../../../services/room-service";
import RoomAmenityTable from "./RoomAmenityTable.tsx";
import { EditRoomAmenity } from "./EditRoomAmenity";
import { DeleteRoomAmenity } from "./DeleteRoomAmenity";
import Pagination from "../../../../../components/Pagination";
import { useGlobalState } from "../../../../../utils/GlobalStateContext";

const RoomAmenityData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: response, isLoading } = useGetRoomAmenitiesQuery({
    page: currentPage,
    size: pageSize,
  });
 // Destructure state and dispatch
  const { searchQuery } = useGlobalState();

  const roomAmenity = response?.data.results || [];

  const filteredData = useMemo(() => {
    if (!searchQuery) return roomAmenity;

    return roomAmenity.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, roomAmenity]);

  const totalElements = response?.data.count || 0;
  const totalPages = Math.ceil(totalElements / pageSize);
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

      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-x-2">
            <EditRoomAmenity amenity={row.original} />
            <DeleteRoomAmenity amenity={row.original} />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <RoomAmenityTable
        columns={columns}
        data={filteredData}
        isLoading={isLoading}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        totalElements={totalElements}
      />
    </div>
  );
};

export default RoomAmenityData;

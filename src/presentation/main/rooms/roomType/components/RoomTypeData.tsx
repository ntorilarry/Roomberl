import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { useGetRoomTypeQuery } from "../../../../../services/room-service";
import RoomTypeTable from "./RoomTypeTable.tsx";
import { DeleteRoomType } from "./DeleteRoomType";
import { EditRoomType } from "./EditRoomType";
import Pagination from "../../../../../components/Pagination";
import { useGlobalState } from "../../../../../utils/GlobalStateContext";

const RoomTypeData = () => { // Destructure state and dispatch
  const { searchQuery } = useGlobalState();
  const [roles] = useState(sessionStorage.getItem("roles") || "");
  const [hostelID] = useState(sessionStorage.getItem("hostel") || "");
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: response, isLoading } = useGetRoomTypeQuery({
    hostelId: filterValue,
    page: currentPage,
    size: pageSize,
  });

  useEffect(() => {
    if (roles === "Hostel_manager") {
      setFilterValue(hostelID);
    }
  }, [roles, hostelID]);

  const roomType = response?.data.results || [];

  const filteredData = useMemo(() => {
    if (!searchQuery) return roomType;

    return roomType.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, roomType]);
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

  return (
    <div>
      <RoomTypeTable
        columns={columns}
        data={filteredData}
        isLoading={isLoading}
        setFilterValue={setFilterValue}
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

export default RoomTypeData;

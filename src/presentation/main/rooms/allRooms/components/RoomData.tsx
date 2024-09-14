import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { useGetRoomsQuery } from "../../../../../services/room-service";
import RoomsTables from "./RoomsTables";
import { EditRoom } from "./EditRoom";
import { DeleteRoom } from "./DeleteRoom";
import Pagination from "../../../../../components/Pagination";
import { useGlobalState } from "../../../../../utils/GlobalStateContext";
import { LockRoom } from "./LockRoom";
import { IoLockOpen, IoLockClosedSharp } from "react-icons/io5";
import { UnlockRoom } from "./UnlockRoom";
import { DuplicateRoom } from "./DuplicateRoom";

const RoomData = () => {
  const [filterhostel, setFilterHostel] = useState("");
  const [filterRoomType, setFilterRoomType] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: response, isLoading } = useGetRoomsQuery({
    hostelId: filterhostel,
    roomTypeId: filterRoomType,
    gender: filterGender,
    page: currentPage,
    size: pageSize,
  });


  const { searchQuery } = useGlobalState();

  const rooms = response?.data.results || [];

  // Filter the data based on the search query
  const filteredData = useMemo(() => {
    if (!searchQuery) return rooms;

    return rooms.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, rooms]);

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
            <div className="grid gap-2 grid-cols-2">
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
        Header: "Room Lock",
        accessor: "isLocked",
        Cell: ({ value }) =>
          value ? (
            <div>
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                <IoLockClosedSharp className="size-2.5" />
                Locked
              </span>
            </div>
          ) : (
            <div>
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-500/10 dark:text-blue-500">
                <IoLockOpen className="size-2.5" />
                Unlocked
              </span>
            </div>
          ),
      },
      {
        Header: "Date Created",
        accessor: (row) => moment(row.createdAt).format("MMMM Do YYYY"),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-x-2">
            <EditRoom room={row.original} />
            <DuplicateRoom room={row.original}/>
            {row.original.isLocked ? (
              <UnlockRoom room={row.original} />
            ) : (
              <LockRoom room={row.original} />
            )}
            <DeleteRoom room={row.original} />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <RoomsTables
        columns={columns}
        data={filteredData}
        isLoading={isLoading}
        setFilterHostel={setFilterHostel}
        setFilterRoomType={setFilterRoomType}
        setFilterGender={setFilterGender}
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

export default RoomData;

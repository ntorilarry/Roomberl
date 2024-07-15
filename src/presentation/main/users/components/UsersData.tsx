import React, { useState } from "react";
import moment from "moment";
import UsersTable from "./UsersTable";
import { useGetUsersByHostelIdQuery } from "../../../../services/user-service";
import { DisableUsers } from "./DisableUsers";
import { EnableUsers } from "./EnableUsers";

const UsersData = () => {
  const [filterValue, setFilterValue] = useState("");
  const { data: response, isLoading } = useGetUsersByHostelIdQuery(filterValue);

  const RoomAmenity = response?.data.results || [];

  const columns = React.useMemo(
    () => [
      {
        Header: "Full Name",
        accessor: "fullName",
        Cell: ({ row }) => {
          const { firstName, lastName } = row.original;
          return (
            <div className="flex items-center gap-2">
              <img
                src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&size=30`}
                alt="Avatar"
                className="rounded-full"
              />
              {firstName} {lastName}
            </div>
          );
        },
      },

      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Mobile",
        accessor: "mobile",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Status",
        accessor: "isActive",
        Cell: ({ value }) => (value ? "Active" : "Inactive"),
      },

      {
        Header: "Group Permission",
        accessor: (row) =>
          row.groups.map((item) => item?.name),
      },

      {
        Header: "Date Joined",
        accessor: (row) => moment(row.dateJoined).format("MMMM Do YYYY"),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-x-2">
            {row.original.isActive ? (
              <DisableUsers user={row.original} />
            ) : (
              <EnableUsers user={row.original} />
            )}
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
      <UsersTable
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

export default UsersData;

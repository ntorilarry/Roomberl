import React, { useMemo, useState } from "react";
import moment from "moment";
import UsersTable from "./UsersTable";
import { useGetUsersByHostelIdQuery } from "../../../../services/user-service";
import { DisableUsers } from "./DisableUsers";
import { EnableUsers } from "./EnableUsers";
import { GroupPermission } from "./GroupPermission";
import Pagination from "../../../../components/Pagination";
import { useGlobalState } from "../../../../utils/GlobalStateContext";

const UsersData = () => {
  const { state } = useGlobalState(); // Destructure state and dispatch
  const { searchQuery } = state;
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: response, isLoading } = useGetUsersByHostelIdQuery({
    hostelId: filterValue,
    page: currentPage,
    size: pageSize,
  });

  const Users = response?.data.results || [];

  const filteredData = useMemo(() => {
    if (!searchQuery) return Users;

    return Users.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, Users]);

  // Get current quotes to display
  const totalElements = response?.data.count || 0;
  const totalPages = Math.ceil(totalElements / pageSize);
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
        accessor: (row) => row.groupsObj.map((item) => item?.name),
      },

      {
        Header: "Date Joined",
        accessor: (row) => moment(row.dateJoined).format("MMMM Do YYYY"),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-x-2">
            <div>
              {" "}
              {row.original.isActive ? (
                <DisableUsers user={row.original} />
              ) : (
                <EnableUsers user={row.original} />
              )}
            </div>
            <div>
              <GroupPermission user={row.original} />
            </div>
          </div>
        ),
      },
    ],
    []
  );

  // Calculate total pages

  return (
    <div>
      <UsersTable
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

export default UsersData;

import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import UsersTable from "./UsersTable";
import { useGetUsersByHostelIdQuery } from "../../../../services/user-service";
import { DisableUsers } from "./DisableUsers";
import { EnableUsers } from "./EnableUsers";
import { GroupPermission } from "./GroupPermission";
import Pagination from "../../../../components/Pagination";
import { useGlobalState } from "../../../../utils/GlobalStateContext";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const UsersData = () => {
  const [roles] = useState(sessionStorage.getItem("roles") || "");
  const [hostelID] = useState(sessionStorage.getItem("hostel") || "");
  const { searchQuery } = useGlobalState();
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: response, isLoading } = useGetUsersByHostelIdQuery({
    hostelId: filterValue,
    page: currentPage,
    size: pageSize,
  });

  useEffect(() => {
    if (roles === "Hostel_manager") {
      setFilterValue(hostelID);
    }
  }, [roles, hostelID]);

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
            {roles === "Administrator" && (
              <div>
                <GroupPermission user={row.original} />
              </div>
            )}
            <Link
              to={`/view-profile/${row.original.id}`}
              className="py-2 px-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:hover:bg-slate-700"
            >
              <CgProfile className="flex-shrink-0 size-3.5" />
              View Profile
            </Link>
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

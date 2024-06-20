import React, { useState } from "react";
import moment from "moment";
import { useGetRoomPaymentQuery } from "../../../../../services/room-service";
import AdminPaymentTable from "./AdminPaymentTable";
import { IoIosWarning } from "react-icons/io";
import { MdVerified } from "react-icons/md";

const AdminPaymentData = () => {
  const { data: response, isLoading } = useGetRoomPaymentQuery();

  const RoomPayment = response?.data.results || [];

  const columns = React.useMemo(
    () => [
      {
        Header: "Full Name",
        accessor: "fullName",
        Cell: ({ row }) => {
          const { firstName, lastName } = row.original.user;
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
        Header: "Amount Payed",
        accessor: "amountPayed",
      },
      {
        Header: "First Receipt",
        accessor: "firstReceipt",
        Cell: ({ value }) =>
          value ? (
            <a href={`https://cyrax1.pythonanywhere.com${value}`}>
              <img
                src={`https://cyrax1.pythonanywhere.com${value}`}
                alt="Floor Plan"
                style={{ width: "50px", height: "auto" }}
              />
            </a>
          ) : (
            "NA"
          ),
      },
      {
        Header: "Second Receipt",
        accessor: "secondReceipt",
        Cell: ({ value }) =>
          value ? (
            <a href={`https://cyrax1.pythonanywhere.com${value}`}>
              <img
                src={`https://cyrax1.pythonanywhere.com${value}`}
                alt="Floor Plan"
                style={{ width: "50px", height: "auto" }}
              />
            </a>
          ) : (
            "NA"
          ),
      },
      {
        Header: "Note",
        accessor: "note",
      },
      {
        Header: "Verification",
        accessor: "isVerified",
        Cell: ({ value }) =>
          value ? (
            <div>
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                <MdVerified className="size-2.5" />
                Verified
              </span>
            </div>
          ) : (
            <div>
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-500/10 dark:text-yellow-500">
                <IoIosWarning className="size-2.5" />
                Not verified
              </span>
            </div>
          ),
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
  const totalPages = Math.ceil(RoomPayment.length / pageSize);

  // Get current quotes to display
  const currentAmenities = RoomPayment.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <AdminPaymentTable
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

export default AdminPaymentData;

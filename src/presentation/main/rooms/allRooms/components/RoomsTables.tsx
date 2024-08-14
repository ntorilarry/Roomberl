import React from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { useTable, useFilters, useGlobalFilter, useSortBy } from "react-table";
import Pagination from "../../../../../components/Pagination";
import { FiSearch } from "react-icons/fi";
import { FilterRoom } from "./FilterRoom";
import { AddRoom } from "./AddRoom";

const RoomsTables = ({
  columns,
  data,
  isLoading,
  setFilterHostel,
  setFilterRoomType,
  setFilterGender,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy);
  return (
    <div>
      <div className="w-full mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-2 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden dark:bg-slate-800 dark:border-slate-800">
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center">
                  <h1 className="text-gray-800 dark:text-white font-semibold text-xl">
                    All Rooms
                  </h1>
                  <div className="sm:col-span-2 md:grow">
                    <div className="flex justify-end gap-x-2">
                      <div className="gap-x-2 relative inline-flex">
                        <FilterRoom
                          setFilterHostel={setFilterHostel}
                          setFilterRoomType={setFilterRoomType}
                          setFilterGender={setFilterGender}
                        />
                        <AddRoom />
                      </div>
                    </div>
                  </div>
                </div>

                <table
                  {...getTableProps()}
                  className="min-w-full divide-y bg-white dark:bg-slate-800 divide-gray-200 dark:divide-slate-700"
                >
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            scope="col"
                            className="px-6 py-3 text-start"
                          >
                            <div className="flex items-center justify-between gap-x-2">
                              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-slate-200">
                                {column.render("Header")}
                              </span>
                              <span>
                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <FaSortDown className="w-4 h-4 text-gray-400" />
                                  ) : (
                                    <FaSortUp className="w-4 h-4 text-gray-400" />
                                  )
                                ) : (
                                  <FaSort className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                )}
                              </span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody
                    {...getTableBodyProps()}
                    className="divide-y divide-gray-200 dark:divide-slate-700"
                  >
                    {isLoading ? (
                      Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index} className="animate-pulse">
                          {columns.map((column, colIndex) => (
                            <td
                              key={colIndex}
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              <div className="h-4 bg-gray-200 rounded dark:bg-slate-700"></div>
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : rows.length > 0 ? (
                      rows.map((row) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                              <td
                                {...cell.getCellProps()}
                                className="px-6 py-4 whitespace-nowrap"
                              >
                                {cell.column.Header === "Description" ||
                                "Room Amenities" ? (
                                  <td
                                    {...cell.getCellProps()}
                                    className="h-px w-60 min-w-60"
                                  >
                                    <div className="block relative">
                                      <p className="text-xs text-wrap text-gray-800 dark:text-slate-200">
                                        {cell.render("Cell")}
                                      </p>
                                    </div>
                                  </td>
                                ) : (
                                  <div className="block">
                                    <span className="block text-xs font-normal text-gray-800 dark:text-slate-200">
                                      {cell.render("Cell")}
                                    </span>
                                  </div>
                                )}
                              </td>
                            ))}
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={columns.length}
                          className="text-center dark:text-white py-5 font-bold"
                        >
                          No data records
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsTables;

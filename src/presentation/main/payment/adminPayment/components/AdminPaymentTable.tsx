import React, { useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { useTable, useFilters, useGlobalFilter, useSortBy } from "react-table";
import Pagination from "../../../../../components/Pagination";
import { FiSearch } from "react-icons/fi";
import { FilterPayments } from "./FilterPayments";

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = React.useCallback(
    (value) => {
      setGlobalFilter(value || undefined);
    },
    [setGlobalFilter]
  );

  return (
    <div className="sm:col-span-1">
      <label htmlFor="hs-as-table-product-review-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <input
          type="text"
          id="hs-as-table-product-review-search"
          name="hs-as-table-product-review-search"
          className="py-2 px-3 ps-11 border block w-full border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:placeholder-slate-500 dark:focus:ring-slate-700"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
        />
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
          <FiSearch className="flex-shrink-0 size-4 text-gray-400 dark:text-slate-500" />
        </div>
      </div>
    </div>
  );
};

const AdminPaymentTable = ({
  columns,
  data,
  totalPages,
  currentPage,
  onPageChange,
  isLoading,
  setFilterValue
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy);
  
  const [roles, setRoles] = useState(sessionStorage.getItem("roles") || "");
  return (
    <div>
      <div className="max-w-[85rem] mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-2 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden dark:bg-slate-800 dark:border-slate-800">
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center ">
                  <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                  <div className="sm:col-span-2 md:grow">
                    <div className="flex justify-end gap-x-2">
                      <div className=" relative inline-block">
                      {roles !== "Hostel_manager" && (
                        <FilterPayments setFilterValue={setFilterValue}/>
                      )}
                      </div>
                    </div>
                  </div>
                </div>

                <table
                  {...getTableProps()}
                  className="min-w-full divide-y bg-white dark:bg-slate-800 divide-gray-200 dark:divide-slate-700"
                >
                  <thead className="">
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
                                className="px-6 py-4 whitespace-nowrap align-top"
                              >
                                {cell.column.Header === "Note" ? (
                                  <td
                                    {...cell.getCellProps()}
                                    className="h-px w-60 min-w-60"
                                  >
                                    <div className="block relative z-10">
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

                <div className="px-6 py-4 grid gap-3 md:flex md:justify-center md:items-center border-t border-gray-200 dark:border-slate-700">
                  <div>
                    <Pagination
                      totalPages={totalPages}
                      currentPage={currentPage}
                      onPageChange={onPageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPaymentTable;

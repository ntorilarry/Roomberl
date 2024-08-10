import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  totalElements,
}) => {
  const visiblePages = 3; // Number of visible pagination items
  const halfVisible = Math.floor(visiblePages / 2);
  let startPage = Math.max(1, currentPage - halfVisible);
  let endPage = Math.min(totalPages, currentPage + halfVisible);

  if (currentPage <= halfVisible + 1) {
    endPage = Math.min(totalPages, visiblePages);
  } else if (currentPage + halfVisible >= totalPages) {
    startPage = Math.max(1, totalPages - visiblePages + 1);
  }

  const startEntity = (currentPage - 1) * pageSize + 1;
  const endEntity = Math.min(currentPage * pageSize, totalElements);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages: React.ReactNode[] = [];

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          type="button"
          onClick={() => onPageChange(1)}
          className={`relative -ml-0.5 inline-flex cursor-pointer dark:text-white items-center justify-center border-2 px-4 py-2.5 text-sm font-semibold shadow-sm focus:z-10 focus:outline-none focus:ring-2 focus:ring-orange-400/80 focus:ring-offset-0 disabled:opacity-30
            ${
              currentPage === 1
                ? "z-10 bg-[#1A9AFB] text-white border-muted-3 "
                : "bg-transparent border-muted-3 text-text hover:text-heading"
            }
          `}
        >
          1
        </button>
      );

      if (startPage > 2) {
        pages.push(
          <span key="ellipsis-start" className="px-2">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          type="button"
          onClick={() => onPageChange(i)}
          className={`relative -ml-0.5 inline-flex cursor-pointer dark:text-white items-center justify-center border-2 px-4 py-2.5 text-sm font-semibold shadow-sm focus:z-10 focus:outline-none focus:ring-2 focus:ring-orange-400/80 focus:ring-offset-0 disabled:opacity-30
            ${
              currentPage === i
                ? "z-10 bg-[#1A9AFB] text-white border-muted-3 "
                : "bg-transparent border-muted-3 text-text hover:text-heading"
            }
          `}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis-end" className="px-2">
            ...
          </span>
        );
      }

      pages.push(
        <button
          key={totalPages}
          type="button"
          onClick={() => onPageChange(totalPages)}
          className={`relative -ml-0.5 inline-flex cursor-pointer dark:text-white items-center justify-center border-2 px-4 py-2.5 text-sm font-semibold shadow-sm focus:z-10 focus:outline-none focus:ring-2 focus:ring-orange-400/80 focus:ring-offset-0 disabled:opacity-30
            ${
              currentPage === totalPages
                ? "z-10 bg-[#1A9AFB] text-white border-muted-3 "
                : "bg-transparent border-muted-3 text-text hover:text-heading"
            }
          `}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex lg:flex-row flex-col w-full items-center justify-between">
      <p className="dark:text-white">
        Showing {startEntity || 0} to {endEntity || 0} of {totalElements || 0}{" "}
        entities
      </p>
      <nav
        className="flex items-center  space-x-1 mt-4"
        aria-label="Pagination"
      >
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="relative inline-flex cursor-pointer dark:text-white items-center justify-center rounded-l-xl border-2 border-muted-3 bg-transparent px-4 py-2.5 text-sm font-semibold text-text shadow-sm hover:text-heading focus:z-10 focus:text-heading focus:outline-none focus:ring-2 focus:ring-orange-400/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:text-text dark:focus:ring-white/80"
        >
          <span className="sr-only">Previous</span>
          <MdKeyboardArrowLeft className="h-5 w-5" />
        </button>
        {renderPageNumbers()}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="relative -ml-0.5 inline-flex cursor-pointer dark:text-white items-center justify-center rounded-r-xl border-2 border-muted-3 bg-transparent px-4 py-2.5 text-sm font-semibold text-text shadow-sm hover:text-heading focus:z-10 focus:text-heading focus:outline-none focus:ring-2 focus:ring-orange-400/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:text-text dark:focus:ring-white/80"
        >
          <span className="sr-only">Next</span>
          <MdKeyboardArrowRight className="h-5 w-5" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;

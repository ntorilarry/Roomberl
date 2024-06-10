import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
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

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          type="button"
          onClick={() => onPageChange(i)}
          className={`relative -ml-0.5 inline-flex cursor-pointer items-center justify-center border-2 px-4 py-2.5 text-sm font-semibold shadow-sm focus:z-10 focus:outline-none focus:ring-2 focus:ring-orange-400/80 focus:ring-offset-0 disabled:opacity-30
            ${
              currentPage === i
                ? "z-10 bg-[#1A9AFB] text-white border-muted-3 "
                : "bg-transparent border-muted-3 text-text hover:text-heading"
            }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <nav
      className="flex items-center justify-center space-x-1 mt-4"
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
  );
};

export default Pagination;

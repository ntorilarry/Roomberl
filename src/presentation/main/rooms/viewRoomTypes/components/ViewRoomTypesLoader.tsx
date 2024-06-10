import React from "react";

const ViewRoomTypesLoader = () => {
  return (
    <div className="grid gap-4 row-gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-700 rounded-lg flex flex-col justify-between p-4 border dark:border-none animate-pulse"
        >
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default ViewRoomTypesLoader;

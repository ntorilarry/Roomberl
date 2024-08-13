import React from "react";

const ViewRoomLoader = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 p-4 border gap-4 dark:border-none">
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            className="flex p-4 gap-x-4 bg-white dark:bg-slate-700 rounded-lg animate-pulse"
          >
            <div className="w-48 h-48 bg-gray-300 dark:bg-slate-600"></div>
            <div className="flex flex-col items-center">
              <div className="w-32 h-6 bg-gray-300 dark:bg-slate-600 mb-2"></div>
              <div className="w-20 h-4 bg-gray-300 dark:bg-slate-600 mb-2"></div>
              <div className="w-40 h-4 bg-gray-300 dark:bg-slate-600 mb-2"></div>
              <div className="w-full h-2 bg-gray-300 dark:bg-slate-600 mb-2"></div>
              <div className="w-full h-2 bg-gray-300 dark:bg-slate-600 mb-2"></div>
              <div className="w-32 h-8 bg-gray-300 dark:bg-slate-600"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewRoomLoader;

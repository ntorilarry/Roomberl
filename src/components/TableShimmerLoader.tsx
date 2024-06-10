const TableShimmerLoader = () => {
  return (
    <div className="animate-pulse ">
    {Array.from({ length: 10 }).map((_, index) => (
      <div key={index} className="flex space-x-4 p-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
  );
};

export default TableShimmerLoader;

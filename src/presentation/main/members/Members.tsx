import React from "react";
import ProtectedRoutes from "../../auth/utils/ProtectedRoutes";
import { useGetMatchingUsersQuery } from "../../../services/user-service";
import Loader from "../../../components/Loader";

const Members = () => {
  const { data: matchResponse, isLoading: matchLoading } =
    useGetMatchingUsersQuery();
  const matchUsers = matchResponse?.data?.results;

  if (matchLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="px-4 py-6 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl bg-white dark:bg-slate-800">
        <div className="mx-auto mb-6 lg:max-w-xl sm:text-center">
          <p className="inline-block px-3 text-lg font-semibold text-gray-900 dark:text-white mb-4 rounded-full ">
            Matching Users
          </p>
        </div>
        {matchUsers && matchUsers.length > 0 ? (
          <div className="grid gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:max-w-screen-lg">
            {matchUsers.map((item, key) => (
              <div key={key}>
                <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
                  <img
                    className="absolute object-cover w-full h-full rounded-xl"
                    src={`https://ui-avatars.com/api/?name=${item.nickname}&background=random`}
                    alt="Person"
                  />
                </div>
                <div className="flex flex-col sm:text-center">
                  <p className="text-lg font-bold dark:text-white">
                    {item.nickname || "NA"}
                  </p>
                  <p className=" text-sm text-gray-800 dark:text-white">
                    {item.courseOfStudy}
                  </p>
                  <p className="mb-5 text-sm text-gray-800 dark:text-white">
                    Match percentage: {item.matchPercentage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-lg text-gray-800 dark:text-white">
            No matching users found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProtectedRoutes(Members, {
  allowedRoles: ["Student"],
});

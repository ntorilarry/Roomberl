import React, { useState } from "react";
import ProtectedRoutes from "../../auth/utils/ProtectedRoutes";
import { useGetMatchingUsersQuery } from "../../../services/user-service";
import Loader from "../../../components/Loader";
import { StartMessageModal } from "../messages/components/StartMessageModal";
import { Link } from "react-router-dom";

const Members = () => {
  const [hostelId] = useState(sessionStorage.getItem("hostel"));

  const { data: matchResponse, isLoading: matchLoading } =
    useGetMatchingUsersQuery(hostelId || "");
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
      <section className="">
        <div className="w-full px-6 mx-auto">
          <h1 className="text-xl font-semibold text-center text-gray-800 capitalize lg:text-2xl dark:text-white">
            {" "}
            Matching Users
          </h1>
          {matchUsers && matchUsers.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {matchUsers.map((item, key) => (
                <Link
                  to={`/view-profile/${item.user?.id}`}
                  key={key}
                  className="flex bg-white dark:bg-slate-800 flex-col items-center p-8 border cursor-pointer rounded-xl dark:border-gray-700 transform transition duration-300 hover:scale-110"
                >
                  <img
                    className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
                    src={
                      item.user?.image ||
                      `https://ui-avatars.com/api/?name=${item.nickname}&background=random`
                    }
                    alt=""
                  />

                  <h1 className="mt-4 text-base font-semibold text-gray-700 capitalize dark:text-white">
                    {item.nickname || "NA"}
                  </h1>

                  <p className="text-gray-600 text-sm capitalize dark:text-gray-300">
                    {item.courseOfStudy}
                  </p>
                  <p className="text-gray-500 text-sm capitalize dark:text-gray-300">
                    Match percentage: {item.user.matchPercentage}
                  </p>
                  <div className="flex items-center gap-x-2">
                    <StartMessageModal objectID={item.user.id} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-lg text-gray-800 dark:text-white">
              No matching users found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProtectedRoutes(Members, {
  allowedRoles: ["Student"],
});

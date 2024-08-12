import React from "react";
import ProtectedRoutes from "../../auth/utils/ProtectedRoutes";
import { useGetMatchingUsersQuery } from "../../../services/user-service";
import Loader from "../../../components/Loader";
import { RiUserFill } from "react-icons/ri";
import { StartMessageModal } from "../messages/components/StartMessageModal";
import { Link } from "react-router-dom";

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
      <section className="">
        <div className="container px-6 mx-auto">
          <h1 className="text-xl font-semibold text-center text-gray-800 capitalize lg:text-2xl dark:text-white">
            {" "}
            Matching Users
          </h1>
          {matchUsers && matchUsers.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 xl:grid-cols-4">
              {matchUsers.map((item, key) => (
                <div
                  key={key}
                  className="flex bg-white dark:bg-slate-800 flex-col items-center p-8 transition-colors duration-300 transform border cursor-pointer rounded-xl dark:border-gray-700"
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
                    Match percentage: {item.matchPercentage}
                  </p>
                  <div className="flex items-center gap-x-2">
                    <Link
                      to={`/view-profile/${item.user?.id}`}
                      className="bg-green-700 rounded-full   hover:bg-green-600"
                    >
                      <RiUserFill className="text-2xl p-1 m-auto  text-white " />
                    </Link>
                    <StartMessageModal objectID={item.user.id} />
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
      </section>
    </div>
  );
};

export default ProtectedRoutes(Members, {
  allowedRoles: ["Student"],
});

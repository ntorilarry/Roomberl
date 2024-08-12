import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserProfileQuery } from "../../../services/user-service";
import { useGetAddInfoByUserIdQuery } from "../../../services/auth-service";
import Loader from "../../../components/Loader";
import ProfileTabs from "../Profile/components/ProfileTabs";
import { StartMessageModal } from "../messages/components/StartMessageModal";

const ViewMemberProfile = () => {
  const { userId } = useParams();
  const { data: profileResponse, isLoading: getProfileLoading } =
    useGetUserProfileQuery(userId || "");

  const profile = profileResponse?.data;

  const { data: addInfoResponse, isLoading: getInfoLoading } =
    useGetAddInfoByUserIdQuery(userId || "");
  const addData = addInfoResponse?.data;

  if (getProfileLoading || getInfoLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <main className="w-full bg-white dark:bg-slate-800 min-h-screen py-1 lg:max-w-7xl mx-auto">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 sm:rounded-lg">
            <div className="grid mx-auto">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                <img
                  className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                  src={
                    profile?.image ||
                    `https://ui-avatars.com/api/?name=${profile?.firstName}+${profile?.lastName}&background=random&size=130`
                  }
                  alt="Bordered avatar"
                />
                <div className="px-4">
                  {" "}
                  <StartMessageModal objectID={userId} />
                </div>
              </div>
              <ProfileTabs profile={profile} addData={addData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewMemberProfile;

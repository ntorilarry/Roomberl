import React, { useState } from "react";
import ProfileTabs from "./components/ProfileTabs";
import { useGetUserProfileQuery } from "../../../services/user-service";

const MyProfile = () => {
  const [userID] = useState<string | null>(sessionStorage.getItem("user_id"));
  const { data: response, isLoading: getInfoLoading } = useGetUserProfileQuery(
    userID || ""
  );

  const profile = response?.data;
  return (
    <div>
      <section className="relative pt-16 pb-24 bg-white dark:bg-slate-800">
        <img
          src="https://pagedone.io/asset/uploads/1705471739.png"
          alt=""
          className="w-full absolute top-0 left-0 z-0 h-32"
        />
        <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-center relative z-10 mb-2.5">
            <img
              src={`https://ui-avatars.com/api/?name=${profile?.firstName}+${profile?.lastName}&background=random&size=130`}
              alt=""
              className="border-4 border-solid border-white rounded-full"
            />
          </div>

          {/* <h3 className="text-center font-manrope font-bold text-3xl leading-10 text-gray-900 mb-3">
            Jenny Wilson
          </h3>
          <p className="font-normal text-base leading-7 text-gray-500 text-center mb-8">
            A social media influencers and singer
          </p> */}
          <ProfileTabs profile={profile}/>
        </div>
      </section>
    </div>
  );
};

export default MyProfile;

import { useState } from "react";

const ProfileDetails = ({ profile }) => {
  const [hostelName] = useState(sessionStorage.getItem("hostelName"));

  const [roles] = useState(sessionStorage.getItem("roles") || "");
  return (
    <div className="bg-white dark:bg-slate-800 max-w-6xl shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          User profile
        </h3>
        {/* <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-white">
          Details and informations about user.
        </p> */}
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 dark:bg-slate-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">
              Full name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {profile?.firstName} {profile?.lastName}
            </dd>
          </div>
          <div className="bg-white dark:bg-slate-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">
              Phone Number
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {profile?.mobile}
            </dd>
          </div>
          <div className="bg-gray-50 dark:bg-slate-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">
              Email address
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {profile?.email}
            </dd>
          </div>
          <div className="bg-white dark:bg-slate-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">
              Address
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {profile?.address || "NA"}
            </dd>
          </div>
          <div className="bg-gray-50 dark:bg-slate-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">
              Gender
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {profile?.gender}
            </dd>
          </div>
          <div className="bg-gray-white dark:bg-slate-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">
              Roles
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {roles}
            </dd>
          </div>
          <div className="bg-gray-50 dark:bg-slate-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray- dark:text-white">
              Hostel Name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {hostelName}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ProfileDetails;

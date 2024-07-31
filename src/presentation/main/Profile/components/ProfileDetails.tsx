import { useState } from "react";
import { useGetHostelByCodeNameQuery } from "../../../../services/auth-service";

const ProfileDetails = ({ profile }) => {
  const [hostelName] = useState(sessionStorage.getItem("hostelName"));

  const [roles] = useState(sessionStorage.getItem("roles") || "");

  return (
    <div className="flex justify-center">
      <div className="space-y-3">
        <dl className="flex flex-col sm:flex-row gap-1">
          <dt className="min-w-40">
            <span className="block text-sm text-gray-500 dark:text-white">
              Full Name:
            </span>
          </dt>
          <dd>
            <ul>
              <li className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-white">
                {profile?.firstName} {profile?.lastName}
              </li>
            </ul>
          </dd>
        </dl>

        <dl className="flex flex-col sm:flex-row gap-1">
          <dt className="min-w-40">
            <span className="block text-sm text-gray-500 dark:text-white">
              Email:
            </span>
          </dt>
          <dd>
            <ul>
              <li className="me-1inline-flex items-center text-sm text-gray-800 dark:text-white">
                {profile?.email}
              </li>
            </ul>
          </dd>
        </dl>

        <dl className="flex flex-col sm:flex-row gap-1">
          <dt className="min-w-40">
            <span className="block text-sm text-gray-500 dark:text-white">
              mobile:
            </span>
          </dt>
          <dd>
            <ul>
              <li className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-white">
                {profile?.mobile}
              </li>
            </ul>
          </dd>
        </dl>

        <dl className="flex flex-col sm:flex-row gap-1">
          <dt className="min-w-40">
            <span className="block text-sm text-gray-500 dark:text-white">
              Address:
            </span>
          </dt>
          <dd>
            <ul>
              <li className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-white">
                {profile?.address || "NA"}
              </li>
            </ul>
          </dd>
        </dl>

        <dl className="flex flex-col sm:flex-row gap-1">
          <dt className="min-w-40">
            <span className="block text-sm text-gray-500 dark:text-white">
              Gender
            </span>
          </dt>
          <dd>
            <ul>
              <li className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-white">
                {profile?.gender}
              </li>
            </ul>
          </dd>
        </dl>
        <dl className="flex flex-col sm:flex-row gap-1">
          <dt className="min-w-40">
            <span className="block text-sm text-gray-500 dark:text-white">
              Role
            </span>
          </dt>
          <dd>
            <ul>
              <li className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-white">
                {roles}
              </li>
            </ul>
          </dd>
        </dl>
        <dl className="flex flex-col sm:flex-row gap-1">
          <dt className="min-w-40">
            <span className="block text-sm text-gray-500 dark:text-white">
              Hostel
            </span>
          </dt>
          <dd>
            <ul>
              <li className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-white">
                {hostelName || "NA"}
              </li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default ProfileDetails;

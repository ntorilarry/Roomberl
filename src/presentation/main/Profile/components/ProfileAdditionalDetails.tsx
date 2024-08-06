import React, { useState } from "react";
import { useGetAddInfoByUserIdQuery } from "../../../../services/auth-service";

const ProfileAdditionalDetails = () => {
  const [userID] = useState<string | null>(sessionStorage.getItem("user_id"));
  const { data: response, isLoading: getInfoLoading } =
    useGetAddInfoByUserIdQuery(userID || "");
  const addData = response?.data;
  return (
    <div className="flex justify-center">
      <div className="space-y-3">
        <dl className="flex flex-col sm:flex-row gap-1">
          <dt className="min-w-40">
            <span className="block text-sm text-gray-500 dark:text-white">
              Other Name:
            </span>
          </dt>
          <dd>
            <ul>
              <li className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-white">
                {addData?.otherName}
              </li>
            </ul>
          </dd>
        </dl>

        <dl className="flex flex-col sm:flex-row gap-1">
          <dt className="min-w-40">
            <span className="block text-sm text-gray-500 dark:text-white">
              Nick Name:
            </span>
          </dt>
          <dd>
            <ul>
              <li className="me-1inline-flex items-center text-sm text-gray-800 dark:text-white">
                {addData?.nickname}
              </li>
            </ul>
          </dd>
        </dl>

        <dl className="flex flex-col sm:flex-row gap-1">
          <dt className="min-w-40">
            <span className="block text-sm text-gray-500 dark:text-white">
              Guardian FullName:
            </span>
          </dt>
          <dd>
            <ul>
              <li className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-white">
                {addData?.guardianFullName}
              </li>
            </ul>
          </dd>
        </dl>

        <dl className="flex flex-col sm:flex-row gap-1">
          <dt className="min-w-40">
            <span className="block text-sm text-gray-500 dark:text-white">
              Ghana Card Number:
            </span>
          </dt>
          <dd>
            <ul>
              <li className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-white">
                {addData?.ghanaCardNumber}
              </li>
            </ul>
          </dd>
        </dl>

        <dl className="flex flex-col sm:flex-row gap-1">
          <dt className="min-w-40">
            <span className="block text-sm text-gray-500 dark:text-white">
              Course of Study
            </span>
          </dt>
          <dd>
            <ul>
              <li className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-white">
                {addData?.courseOfStudy}
              </li>
            </ul>
          </dd>
        </dl>
        <dl className="flex flex-col sm:flex-row gap-1">
          <dt className="min-w-40">
            <span className="block text-sm text-gray-500 dark:text-white">
              Date of Birth
            </span>
          </dt>
          <dd>
            <ul>
              <li className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-white">
                {addData?.dateOfBirth}
              </li>
            </ul>
          </dd>
        </dl>
        <dl className="flex flex-col sm:flex-row gap-1">
          <dt className="min-w-40">
            <span className="block text-sm text-gray-500 dark:text-white">
              Guardian Phone
            </span>
          </dt>
          <dd>
            <ul>
              <li className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-white">
                {addData?.guardianPhone}
              </li>
            </ul>
          </dd>
        </dl>
        <dl className="flex flex-col sm:flex-row gap-1">
          <dt className="min-w-40">
            <span className="block text-sm text-gray-500 dark:text-white">
            Student Id Number
            </span>
          </dt>
          <dd>
            <ul>
              <li className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-white">
                {addData?.studentIdNumber}
              </li>
            </ul>
          </dd>
        </dl>
        <dl className="flex flex-col sm:flex-row gap-1">
          <dt className="min-w-40">
            <span className="block text-sm text-gray-500 dark:text-white">
            Date Of Admission
            </span>
          </dt>
          <dd>
            <ul>
              <li className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-white">
                {addData?.dateOfAdmission}
              </li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default ProfileAdditionalDetails;

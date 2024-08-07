const ProfileAdditionalDetails = ({ addData }) => {
  return (
    <div className="bg-white dark:bg-slate-800 max-w-6xl shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Additional Details
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 dark:bg-slate-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">
              Other name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {addData?.otherName}
            </dd>
          </div>
          <div className="bg-white dark:bg-slate-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">
              Nick name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {addData?.nickname}
            </dd>
          </div>

          <div className="bg-gray-50 dark:bg-slate-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">
              Ghana Card Number
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {addData?.ghanaCardNumber}
            </dd>
          </div>

          <div className="bg-white dark:bg-slate-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">
              Date Of Birth
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {addData?.dateOfBirth}
            </dd>
          </div>
          <div className="bg-gray-50 dark:bg-slate-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">
              Student ID Number
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {addData?.studentIdNumber}
            </dd>
          </div>
          <div className="bg-white dark:bg-slate-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">
              course Of Study
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {addData?.courseOfStudy}
            </dd>
          </div>
          <div className="bg-gray-50 dark:bg-slate-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">
              Date OfAdmission
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {addData?.dateOfAdmission}
            </dd>
          </div>
          <div className="bg-white dark:bg-slate-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">
              Guardian Full Name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {addData?.guardianFullName}
            </dd>
          </div>
          <div className="bg-gray-50 dark:bg-slate-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray- dark:text-white">
              Guardian Phone
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {addData?.guardianPhone}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ProfileAdditionalDetails;

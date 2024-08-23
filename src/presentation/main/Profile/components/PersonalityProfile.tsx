import React from "react";

const PersonalityProfile = ({ addData }) => {
  const { responses } = addData;

  const renderResponses = () => {
    return responses.map((response) => {
      return response?.question?.map((q) => {
        const chosenOption = q.option.find((opt) => opt.chosen);
        return (
          <div key={q.id} className="bg-white dark:bg-slate-800 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">
              {q.text || "NA"}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 ">
              {chosenOption ? chosenOption.text : "No answer chosen"}
            </dd>
          </div>
        );
      });
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 max-w-6xl shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Personality profile
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {renderResponses()}
        </dl>
      </div>
    </div>
  );
};

export default PersonalityProfile;

import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import ProfileDetails from "./ProfileDetails";
import ProfileAdditionalDetails from "./ProfileAdditionalDetails";
import PersonalityProfile from "./PersonalityProfile";

const ProfileTabs = ({ profile, addData }) => {
  const tabs = [
    {
      title: "Profile Info",
      content: <ProfileDetails profile={profile} />,
    },
    {
      title: "Additional Details",
      content: <ProfileAdditionalDetails addData={addData} />,
    },
    {
      title: "Personality Profile",
      content: <PersonalityProfile addData={addData} />,
    },
  ];
  return (
    <div className="w-full mt-6">
      <div className="mx-auto px-2 w-full">
        <Tab.Group>
          <Tab.List className="space-x-2 mx-auto bg-[#F3F4F6] dark:bg-slate-900">
            {tabs.map((tab) => (
              <Tab key={tab.title} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected
                        ? "border-[#225187] dark:border-white text-[#225187] dark:text-white"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } w-1/4 border-b-2 px-1 py-4 mb-4 text-center text-sm font-medium`}
                  >
                    {tab.title}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-4">
            {tabs.map((tab) => (
              <Tab.Panel key={tab.title}>
                <div className="text-sm text-text">{tab.content}</div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};
export default ProfileTabs;

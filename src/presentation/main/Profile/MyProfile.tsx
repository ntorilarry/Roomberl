import React, { useEffect, useState } from "react";
import ProfileTabs from "./components/ProfileTabs";
import {
  useGetUserProfileQuery,
  useProfilePictureMutation,
} from "../../../services/user-service";
import Loader from "../../../components/Loader";
import { useGetAddInfoByUserIdQuery } from "../../../services/auth-service";
import toast from "react-hot-toast";

const MyProfile = () => {
  const [userID] = useState<string | null>(sessionStorage.getItem("user_id"));
  const { data: profileResponse, isLoading: getProfileLoading } =
    useGetUserProfileQuery(userID || "");

  const profile = profileResponse?.data;

  const { data: addInfoResponse, isLoading: getInfoLoading } =
    useGetAddInfoByUserIdQuery(userID || "");
  const addData = addInfoResponse?.data;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProfile] = useProfilePictureMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  useEffect(() => {
    if (selectedFile) {
      handleFormSubmit();
    }
  }, [selectedFile]);

  const handleFormSubmit = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await uploadProfile({
        body: formData,
        userId: userID || "",
      });

      console.log(response);
      const { status, data } = response.error
        ? response.error["data"]
        : response["data"];
      if (status === "success") {
        toast.success(status);
      } else {
        if (typeof data === "object" && data !== null) {
          const errorMessages = Object.entries(data)
            .map(([key, value]) => {
              if (Array.isArray(value)) {
                return `${key}: ${value.join(", ")}`;
              }
              return `${key}: ${value}`;
            })
            .join(", ");
          toast.error(errorMessages);
        } else {
          toast.error(data);
        }
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  const handleDeleteImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", "");

      const response = await uploadProfile({
        body: formData,
        userId: userID || "",
      });

      const { status, data } = response.error
        ? response.error["data"]
        : response["data"];

      if (status === "success") {
        toast.success("Image deleted successfully");
        // Optionally, update the UI to reflect the deletion
        setSelectedFile(null);
        // You might also want to update the profile data to reflect the removal
      } else {
        toast.error("Failed to delete image");
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "An unexpected error occurred");
    }
  };

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
                <form>
                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <label
                      htmlFor="dropzone-file-images"
                      className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                    >
                      Change picture
                      <input
                        id="dropzone-file-images"
                        type="file"
                        className="hidden"
                        name="image"
                        onChange={handleFileChange}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      className="py-3.5 px-7 text-base font-medium text-white focus:outline-none bg-red-600 rounded-lg border border-indigo-200 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                    >
                      Delete picture
                    </button>
                  </div>
                </form>
              </div>
              <ProfileTabs profile={profile} addData={addData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProfile;

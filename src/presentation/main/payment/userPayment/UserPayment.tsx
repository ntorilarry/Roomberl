import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { responseType } from "../../../../models/response/base-response";
import { useMakeRoomPaymentMutation } from "../../../../services/room-service";
import { MdDriveFolderUpload } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router-dom";

const UserPayment = () => {
  const location = useLocation();

  const [userID, setUserID] = useState<string | null>(
    sessionStorage.getItem("user_id")
  );
  const { roomTypeId } = location.state || {};
  const [formData, setFormData] = useState({
    amountPayed: "",
    firstReceipt: "",
    secondReceipt: "",
    user: userID || "",
    roomType: roomTypeId,
    note: "",
  });

  const [firstReceipt, setFirstReceipt] = useState<File | null>(null);
  const [secondReceipt, setSecondReceipt] = useState<File | null>(null);

  const handleFormChanged = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (
      name === "firstReceipt" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      setFirstReceipt(e.target.files[0]);
    } else if (
      name === "secondReceipt" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      setSecondReceipt(e.target.files[0]);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const [makePayment, { isLoading }] = useMakeRoomPaymentMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("amountPayed", formData.amountPayed);
      formDataToSend.append("user", formData.user);
      formDataToSend.append("note", formData.note);
      formDataToSend.append("roomType", formData.roomType);

      if (firstReceipt) {
        formDataToSend.append("firstReceipt", firstReceipt);
      }
      if (secondReceipt) {
        formDataToSend.append("secondReceipt", secondReceipt);
      }

      const response = (await makePayment(formDataToSend)) as responseType;
      const { status } = response["data"];
      if (status === "success") {
        toast.success(status);
      } else {
        toast.error(status);
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-2xl bg-white dark:bg-slate-800">
          <h1 className="text-center pt-6 font-semibold text-2xl dark:text-white">
            Upload payment proof to get a room
          </h1>
          <form
            onSubmit={handleFormSubmit}
            encType="multipart/form-data"
            className="py-6 px-9"
          >
            <div className="grid lg:grid-cols-2 gap-6 pt-6">
              <div className="mb-4">
                <label
                  htmlFor="dropzone-file-firstReceipt"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-slate-700 dark:border-white dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <MdDriveFolderUpload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-white">
                      <span className="font-semibold">Click to upload</span>{" "}
                      first receipt
                    </p>
                    <p className="text-xs text-gray-500 dark:text-white">
                      PNG, JPG or JPEG
                    </p>
                  </div>
                  <input
                    id="dropzone-file-firstReceipt"
                    type="file"
                    className="hidden"
                    onChange={handleFormChanged}
                    name="firstReceipt"
                    accept="image/*"
                  />
                </label>
                {firstReceipt && (
                  <div className="my-3 rounded-md bg-[#F5F7FB] dark:bg-slate-700 py-4 px-8">
                    <div className="flex items-center justify-between">
                      <span className="truncate pr-3 text-base font-medium text-[#07074D] dark:text-white">
                        {firstReceipt.name}
                      </span>
                      <IoMdClose
                        className="text-[#07074D] dark:text-white cursor-pointer"
                        onClick={() => setFirstReceipt(null)}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="dropzone-file-secondReceipt"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-slate-700 dark:border-white dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <MdDriveFolderUpload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-white">
                      <span className="font-semibold">Click to upload</span> a
                      second receipt
                    </p>
                    <p className="text-xs text-gray-500 dark:text-white">
                      PNG, JPG or JPEG
                    </p>
                  </div>
                  <input
                    id="dropzone-file-secondReceipt"
                    type="file"
                    className="hidden"
                    onChange={handleFormChanged}
                    name="secondReceipt"
                    accept="image/*"
                  />
                </label>
                {secondReceipt && (
                  <div className="my-3 rounded-md bg-[#F5F7FB] dark:bg-slate-700 py-4 px-8">
                    <div className="flex items-center justify-between">
                      <span className="truncate pr-3 text-base font-medium text-[#07074D] dark:text-white">
                        {secondReceipt.name}
                      </span>
                      <IoMdClose
                        className="text-[#07074D] dark:text-white cursor-pointer"
                        onClick={() => setSecondReceipt(null)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-2">
              <label
                htmlFor="amountPayed"
                className="block mb-2 text-sm font-medium dark:text-white"
              >
                Amount paid
              </label>
              <input
                type="text"
                name="amountPayed"
                id="amountPayed"
                className="py-3 px-4 block w-full rounded-lg bg-[#f0efef] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-600 dark:text-white dark:placeholder-slate-200 dark:focus:ring-slate-600"
                placeholder="Amount paid"
                onChange={handleFormChanged}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="note"
                className="block mb-2 text-sm font-medium dark:text-white"
              >
                Note
              </label>
              <textarea
                placeholder="Note"
                name="note"
                id="note"
                onChange={handleFormChanged}
                className="py-4 px-3 block w-full bg-[#f0efef] rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-600 dark:text-white dark:placeholder-slate-200 dark:focus:ring-slate-600"
              />
            </div>
            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full dark:border darK:border-white rounded-full bg-gray-800 hover:bg-gray-700 py-3 px-8 text-center  text-white outline-none"
                disabled={isLoading}
              >
                Submit payment details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserPayment;

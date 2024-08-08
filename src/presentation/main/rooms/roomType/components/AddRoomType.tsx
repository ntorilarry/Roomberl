import { ChangeEvent, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoCloseCircle } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { roomTypeRequest } from "../../../../../models/request/room-request";
import {
  useAddRoomTypeMutation,
  useGetRoomAmenitiesQuery,
} from "../../../../../services/room-service";

import toast from "react-hot-toast";
import { useGetHostelsQuery } from "../../../../../services/auth-service";
import Select from "react-select";

export const AddRoomType = () => {
  const [roles] = useState(sessionStorage.getItem("roles") || "");
  const [hostelID] = useState(
    sessionStorage.getItem("hostel") || ""
  );
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [formData, setFormData] = useState<roomTypeRequest>({
    name: "",
    description: "",
    price: 0,
    numOccupancy: 0,
    hostel: roles === "Hostel_manager" ? hostelID : "",
    roomAmenities: [],
  });

  const handleFormChanged = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [addRoomType, { isLoading }] = useAddRoomTypeMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addRoomType(formData);
      console.log(response);
      const { status, data } = response.error
        ? response.error["data"]
        : response["data"];
      if (status === "success") {
        toast.success(status);
        setFormData({
          name: "",
          description: "",
          price: 0,
          numOccupancy: 0,
          hostel: roles === "Hostel_manager" ? hostelID : "",
          roomAmenities: [],
        });
        setIsOpen(false);
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

  const { data: response } = useGetHostelsQuery();
  const Hostels = response?.data?.hostels || [];

  const { data: responseAmenity } = useGetRoomAmenitiesQuery();

  const RoomAmenity = responseAmenity?.data.results || [];

  const amenityOptions = RoomAmenity?.map((room) => ({
    value: room.id,
    label: room.name,
  }));
  const handleAmenitiessSelectChange = (selectedOptions) => {
    setFormData((prevEventData) => ({
      ...prevEventData,
      roomAmenities: selectedOptions.map((option) => option.value),
    }));
  };

  return (
    <>
      <button
        type="button"
        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
        onClick={openModal}
      >
        <IoMdAdd className="flex-shrink-0 size-3.5" />
        Add Room Type
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black dark:bg-black dark:bg-opacity-50 bg-opacity-20 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-50 inset-0 flex  items-end justify-center   px-4 pt-4  text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative inline-flex w-full transform flex-col  rounded-xl border-2 bg-white dark:bg-slate-800 dark:border-slate-700 text-left align-bottom transition-all sm:my-8 sm:max-w-md sm:align-middle">
                <div className="absolute top-4 right-5">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex aspect-square cursor-pointer items-center justify-center rounded-xl border-none border-transparent bg-transparent p-2 font-semibold text-text hover:bg-heading/5 focus:bg-heading/5 focus:outline-none focus:ring-2 focus:ring-heading/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text child-svg:h-5 child-svg:w-5"
                  >
                    <span className="sr-only">Close</span>
                    <IoCloseCircle className="h-5 w-5 dark:text-white" />
                  </button>
                </div>

                <div className="flex-1 px-6 ">
                  <Dialog.Title
                    as="h3"
                    className="text-base pt-3 font-semibold dark:text-white"
                  >
                    Create Room Type
                  </Dialog.Title>
                  <hr className="border-hr border-gray-500 mt-4" />
                  <form className="overflow-y-auto">
                    <div className="my-3">
                      <label
                        htmlFor="hs-feedback-post-comment-name-1"
                        className="block mb-2 text-sm font-medium dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="hs-feedback-post-comment-name-1"
                        className="py-3 px-4 block w-full rounded-lg bg-[#f0efef] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:text-white dark:placeholder-slate-200 dark:focus:ring-slate-700"
                        placeholder="Name"
                        onChange={handleFormChanged}
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="hs-feedback-post-comment-name-1"
                        className="block mb-2 text-sm font-medium dark:text-white"
                      >
                        Description
                      </label>
                      <textarea
                        placeholder="Description"
                        name="description"
                        onChange={handleFormChanged}
                        className="py-4 px-3 block w-full  bg-[#f0efef] rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:text-white dark:placeholder-slate-200 dark:focus:ring-slate-700"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="hs-feedback-post-comment-name-1"
                        className="block mb-2 text-sm font-medium dark:text-white"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="hs-feedback-post-comment-name-1"
                        className="py-3 px-4 block w-full rounded-lg bg-[#f0efef] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:text-white dark:placeholder-slate-200 dark:focus:ring-slate-700"
                        placeholder="price"
                        onChange={handleFormChanged}
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="hs-feedback-post-comment-name-1"
                        className="block mb-2 text-sm font-medium dark:text-white"
                      >
                        Number of occupancy
                      </label>
                      <input
                        type="number"
                        name="numOccupancy"
                        id="hs-feedback-post-comment-name-1"
                        className="py-3 px-4 block w-full rounded-lg bg-[#f0efef] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:text-white dark:placeholder-slate-200 dark:focus:ring-slate-700"
                        placeholder="Enter number of occupants"
                        onChange={handleFormChanged}
                      />
                    </div>
                    {roles !== "Hostel_manager" && (
                      <div className="mb-2">
                        <label
                          htmlFor="hs-feedback-post-comment-name-1"
                          className="block mb-2 text-sm font-medium dark:text-white"
                        >
                          Hostel
                        </label>
                        <select
                          name="hostel"
                          id="hs-feedback-post-comment-name-1"
                          className="py-3 px-4 block w-full rounded-lg bg-[#f0efef] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:text-white dark:placeholder-slate-200 dark:focus:ring-slate-700"
                          onChange={handleFormChanged}
                        >
                          <option value="" selected>
                            Choose hostel
                          </option>
                          {Hostels.map((data, index) => (
                            <option key={index} value={data.id}>
                              {data.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div className="mb-2">
                      <label
                        htmlFor="hs-feedback-post-comment-name-1"
                        className="block mb-2 text-sm font-medium dark:text-white"
                      >
                        Room Amenities
                      </label>
                      <Select
                        className="basic-multi-select"
                        classNamePrefix="select"
                        options={amenityOptions}
                        isMulti
                        name="roomAmenities"
                        onChange={handleAmenitiessSelectChange}
                      />
                    </div>
                  </form>
                </div>

                <div className="flex h-16 flex-shrink-0 items-center justify-end space-x-2 bg-layer-3 px-6 shadow-lg">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex cursor-pointer items-center justify-center rounded-2xl  bg-red-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:border-secondary-accent hover:bg-secondary-accent focus:outline-none focus:ring-2 focus:ring-primary/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:border-secondary disabled:hover:bg-secondary disabled:hover:text-white dark:focus:ring-white/80"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    disabled={
                      !formData.name || !formData.price || !formData.hostel
                    }
                    className="inline-flex cursor-pointer items-center justify-center rounded-2xl  bg-[#1B8ADB] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:border-primary-accent hover:bg-primary-accent focus:outline-none focus:ring-2 focus:ring-orange-400/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:border-primary disabled:hover:bg-primary disabled:hover:text-white dark:focus:ring-white/80"
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

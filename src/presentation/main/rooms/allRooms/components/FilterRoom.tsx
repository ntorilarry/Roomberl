import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoCloseCircle } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { useGetHostelsQuery } from "../../../../../services/auth-service";
import { useGetRoomTypeQuery } from "../../../../../services/room-service";

export const FilterRoom = ({ setFilterHostel, setFilterRoomType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("");

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const { data: responseHostel } = useGetHostelsQuery();
  const Hostels = responseHostel?.data?.hostels || [];

  const { data: responseRoomType, isLoading: isRoomTypeLoading } =
    useGetRoomTypeQuery(selectedHostel);
  const RoomTypes = responseRoomType?.data?.results || [];

  const applyFilter = () => {
    setFilterHostel(selectedHostel);
    setFilterRoomType(selectedRoomType);
    closeModal();
  };

  useEffect(() => {
    // Clear the room type selection when the hostel changes
    setSelectedRoomType("");
  }, [selectedHostel]);

  return (
    <>
      <button
        type="button"
        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:hover:bg-slate-700"
        onClick={openModal}
      >
        <FaFilter className="flex-shrink-0 size-3.5" />
        Filter
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
              <Dialog.Panel className="relative inline-flex w-full transform flex-col  rounded-xl border-2 bg-white dark:bg-slate-700 dark:border-slate-600 text-left align-bottom transition-all sm:my-8 sm:max-w-md sm:align-middle">
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

                <div className="flex-1 px-6 py-5 sm:py-6">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold dark:text-white"
                  >
                    Filter Room Type
                  </Dialog.Title>

                  <form className="mt-5">
                    <div className="my-2">
                      <label
                        htmlFor="hostel"
                        className="block mb-2 text-sm font-medium dark:text-white"
                      >
                        Hostel
                      </label>
                      <select
                        id="hostel"
                        value={selectedHostel}
                        onChange={(e) => setSelectedHostel(e.target.value)}
                        className="py-3 px-4 block w-full rounded-lg bg-[#f0efef] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-600 dark:text-white dark:placeholder-slate-200 dark:focus:ring-slate-600"
                      >
                        <option value="" selected disabled>
                          Choose hostel
                        </option>
                        {Hostels.map((data) => (
                          <option key={data.id} value={data.id}>
                            {data.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="my-2">
                      <label
                        htmlFor="roomType"
                        className="block mb-2 text-sm font-medium dark:text-white"
                      >
                        Room Type
                      </label>
                      <select
                        id="roomType"
                        value={selectedRoomType}
                        onChange={(e) => setSelectedRoomType(e.target.value)}
                        disabled={!selectedHostel || isRoomTypeLoading}
                        className="py-3 px-4 block w-full rounded-lg bg-[#f0efef] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-600 dark:text-white dark:placeholder-slate-200 dark:focus:ring-slate-600"
                      >
                        <option value="" selected disabled>
                          Choose room type
                        </option>
                        {RoomTypes.map((data) => (
                          <option key={data.id} value={data.id}>
                            {data.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </form>
                </div>

                <div className="flex h-16 flex-shrink-0 items-center justify-end space-x-2 bg-layer-3 px-6 shadow-lg">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex cursor-pointer items-center justify-center rounded-2xl  bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:border-secondary-accent hover:bg-secondary-accent focus:outline-none focus:ring-2 focus:ring-primary/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:border-secondary disabled:hover:bg-secondary disabled:hover:text-white dark:focus:ring-white/80"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={applyFilter}
                    className="inline-flex cursor-pointer items-center justify-center rounded-2xl  bg-[#1B8ADB] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:border-primary-accent hover:bg-primary-accent focus:outline-none focus:ring-2 focus:ring-orange-400/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:border-primary disabled:hover:bg-primary disabled:hover:text-white dark:focus:ring-white/80"
                  >
                    Filter
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

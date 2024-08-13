import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdDelete } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import toast from "react-hot-toast";
import { useDeleteRoomMutation } from "../../../../../services/room-service";

export const DeleteRoom = ({ room }) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [deleteRoom, { isLoading }] = useDeleteRoomMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteRoom(room.id);
      console.log(response);
      toast.success("Room deleted successfully");
      setIsOpen(false);
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "An unexpected error occurred");
    }
  };
  return (
    <>
      <button
        type="button"
        className="py-2 px-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:hover:bg-slate-700"
        onClick={openModal}
      >
        <MdDelete className="flex-shrink-0 size-3.5" />
        Delete
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

          <div className="fixed z-50 inset-0 flex min-h-screen items-end justify-center  overflow-hidden px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative inline-flex w-full transform flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-800 text-left align-bottom shadow-2xl transition-all sm:my-8 md:my-32 sm:max-w-md sm:align-middle">
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
                    Delete Room
                  </Dialog.Title>

                  <hr className="border-hr border-gray-500 mt-4" />

                  <div className="flex-1  py-5 sm:py-6 dark:text-white">
                    <p>Are you sure you want to delete this room?</p>
                  </div>
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
                    onClick={handleFormSubmit}
                    className="inline-flex cursor-pointer items-center justify-center rounded-2xl  bg-[#1B8ADB] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:border-primary-accent hover:bg-primary-accent focus:outline-none focus:ring-2 focus:ring-orange-400/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:border-primary disabled:hover:bg-primary disabled:hover:text-white dark:focus:ring-white/80"
                  >
                    Delete
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

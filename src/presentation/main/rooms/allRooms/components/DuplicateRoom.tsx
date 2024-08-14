import React, { ChangeEvent, useState } from "react";
import { IoDuplicateOutline, IoCloseCircleOutline } from "react-icons/io5";
import { useDuplicateRoomMutation } from "../../../../../services/room-service";
import toast from "react-hot-toast";

export const DuplicateRoom = ({ room }) => {

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    quantity: 0,
  });

  const [duplicateRoom, { isLoading }] = useDuplicateRoomMutation();

  const handleFormChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parseInt(value),
    }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await duplicateRoom({
        id: room.id || "",
        quantity: formData.quantity,
      });
      console.log(response);
      const { status, data } = response.error
        ? response.error["data"]
        : response["data"];
      if (status === "success") {
        toast.success(status);
        setShowModal(false);
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

  return (
    <>
      <button
        type="button"
        className="py-2 px-2 inline-flex items-center gap-x-2 text-xs text-nowrap font-medium rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800"
        onClick={() => setShowModal(true)}
      >
        <IoDuplicateOutline className="flex-shrink-0 size-3.5" />
        Duplicate Room
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50  outline-none focus:outline-none">
            <div className="relative w-auto z-50 my-6 mx-auto max-w-3xl">
              <div className="dark:border-2 border-slate-700 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-slate-800 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-3 dark:text-white border-b border-solid border-blueGray-200 dark:border-slate-500 rounded-t">
                  <h3 className="text-base font-semibold">Duplicate Room</h3>
                  <IoCloseCircleOutline
                    className="h-6 w-6 text-2xl"
                    onClick={() => setShowModal(false)}
                  />
                </div>
                <div className="relative p-6 max-h-[80vh] overflow-y-auto">
                  <form className="w-full " onSubmit={handleFormSubmit}>
                    <div className="grid gap-6">
                      <div className="mb-2">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium dark:text-white"
                        >
                          Quantity
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          id="quantity"
                          className="py-3 px-4 block w-full rounded-lg bg-[#f0efef] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-600 dark:text-white dark:placeholder-slate-200 dark:focus:ring-slate-600"
                          placeholder="Number of times to duplicate"
                          value={formData.quantity}
                          onChange={handleFormChanged}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 dark:border-slate-500 rounded-b">
                      <button
                        className=" bg-red-500 w-full px-6 py-3 text-white rounded-3xl text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-blue-500 text-white w-full text-sm px-6 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Duplicate
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

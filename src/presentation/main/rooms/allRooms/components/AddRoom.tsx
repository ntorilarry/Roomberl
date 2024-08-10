import React, { ChangeEvent, useEffect, useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import Select from "react-select";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdDriveFolderUpload } from "react-icons/md";
import {
  useAddRoomMutation,
  useGetRoomAmenitiesQuery,
  useGetRoomTypeQuery,
} from "../../../../../services/room-service";
import { useGetHostelsQuery } from "../../../../../services/auth-service";

export const AddRoom = () => {
  const [roles, setRoles] = useState(sessionStorage.getItem("roles") || "");
  const [hostelID, setHostelID] = useState(
    sessionStorage.getItem("hostel") || ""
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedHostelId, setSelectedHostelId] = useState("");

  useEffect(() => {
    if (roles === "Hostel_manager") {
      setSelectedHostelId(hostelID);
    }
  }, [roles, hostelID]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
    floorPlan: "",
    code: "",
    roomType: "",
    hostel: roles === "Hostel_manager" ? hostelID : "",
    gender: "",
    roomAmenities: [],
  });

  const [images, setImages] = useState<File[]>([]);
  const [floorPlan, setFloorPlan] = useState<File | null>(null);

  const handleFormChanged = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (
      name === "images" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      setImages(Array.from(e.target.files));
    } else if (
      name === "floorPlan" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      setFloorPlan(e.target.files[0]);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));

      if (name === "hostel") {
        setSelectedHostelId(value);
      }
    }
  };

  const [addRoom, { isLoading }] = useAddRoomMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("code", formData.code);
      formDataToSend.append("roomType", formData.roomType);
      formDataToSend.append("hostel", formData.hostel);
      formDataToSend.append("gender", formData.gender);
      if (floorPlan) {
        formDataToSend.append("floorPlan", floorPlan);
      }
      formData.roomAmenities.forEach((amenity) => {
        formDataToSend.append("roomAmenities", amenity);
      });

      if (images) {
        Array.from(images).forEach((file, index) => {
          formDataToSend.append(`images[${index}]`, file);
        });
      }

      const response = await addRoom(formDataToSend);
      console.log("add room", response);
      const { status, data } = response.error
        ? response.error["data"]
        : response["data"];
      if (status === "success") {
        toast.success(status);
        setFormData({
          name: "",
          description: "",
          images: [],
          floorPlan: "",
          code: "",
          roomType: "",
          hostel: roles === "Hostel_manager" ? hostelID : "",
          gender: "",
          roomAmenities: [],
        });
        setImages([]);
        setFloorPlan(null);
        setShowModal(false);
      } else {
        const errorMessages = Object.entries(data)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return `${key}: ${value.join(", ")}`;
            }
            return `${key}: ${value}`;
          })
          .join(", ");
        toast.error(errorMessages);
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  const { data: response } = useGetHostelsQuery();
  const Hostels = response?.data?.hostels || [];

  const { data: responseRoomType, isLoading: isRoomTypeLoading } =
    useGetRoomTypeQuery({
      hostelId: selectedHostelId || "",
      page: 1,
      size: 99999999,
    });
  const RoomTypes = responseRoomType?.data?.results || [];

  const { data: responseAmenity } = useGetRoomAmenitiesQuery({
    page: 1,
    size: 99999999,
  });
  const RoomAmenity = responseAmenity?.data.results || [];

  const amenityOptions = RoomAmenity?.map((room) => ({
    value: room.id,
    label: room.name,
  }));

  const handleAmenitiesSelectChange = (selectedOptions) => {
    setFormData((prevEventData) => ({
      ...prevEventData,
      roomAmenities: selectedOptions.map((option) => option.value),
    }));
  };

  return (
    <>
      <button
        type="button"
        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800"
        onClick={() => setShowModal(true)}
      >
        <IoMdAdd className="flex-shrink-0 size-3.5" />
        Add Room
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="dark:border-2 border-slate-700 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-slate-800  outline-none focus:outline-none">
                <div className="flex items-start justify-between p-3 dark:text-white border-b border-solid border-blueGray-200 dark:border-slate-500 rounded-t">
                  <h3 className="text-base  font-semibold">Create Room</h3>
                  <IoCloseCircleOutline
                    className="h-6 w-6 text-2xl"
                    onClick={() => setShowModal(false)}
                  />
                </div>
                <div className="relative p-6 max-h-[80vh] overflow-y-auto">
                  <form
                    className="w-full "
                    onSubmit={handleFormSubmit}
                    encType="multipart/form-data"
                  >
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="mb-2">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium dark:text-white"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="py-3 px-4 block w-full rounded-lg bg-[#f0efef] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-600 dark:text-white dark:placeholder-slate-200 dark:focus:ring-slate-600"
                          placeholder="Name"
                          onChange={handleFormChanged}
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="code"
                          className="block mb-2 text-sm font-medium dark:text-white"
                        >
                          Code
                        </label>
                        <input
                          type="text"
                          name="code"
                          id="code"
                          className="py-3 px-4 block w-full rounded-lg bg-[#f0efef] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-600 dark:text-white dark:placeholder-slate-200 dark:focus:ring-slate-600"
                          placeholder="Code"
                          onChange={handleFormChanged}
                        />
                      </div>
                      {roles !== "Hostel_manager" && (
                        <div className="mb-2">
                          <label
                            htmlFor="hostel"
                            className="block mb-2 text-sm font-medium dark:text-white"
                          >
                            Hostel
                          </label>
                          <select
                            name="hostel"
                            id="hostel"
                            className="py-3 px-4 block w-full rounded-lg bg-[#f0efef] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-600 dark:text-white dark:placeholder-slate-200 dark:focus:ring-slate-600"
                            onChange={handleFormChanged}
                            required
                          >
                            <option value="" disabled selected>
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
                          htmlFor="roomType"
                          className="block mb-2 text-sm font-medium dark:text-white"
                        >
                          Room Type
                        </label>
                        <select
                          name="roomType"
                          id="roomType"
                          className="py-3 px-4 block w-full rounded-lg bg-[#f0efef] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-600 dark:text-white dark:placeholder-slate-200 dark:focus:ring-slate-600"
                          onChange={handleFormChanged}
                          disabled={!selectedHostelId || isRoomTypeLoading}
                          required
                        >
                          <option value="" disabled selected>
                            Choose room type
                          </option>
                          {RoomTypes.map((data, index) => (
                            <option key={index} value={data.id}>
                              {data.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium dark:text-white"
                      >
                        Description
                      </label>
                      <textarea
                        placeholder="Description"
                        name="description"
                        id="description"
                        onChange={handleFormChanged}
                        className="py-4 px-3 block w-full bg-[#f0efef] rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-600 dark:text-white dark:placeholder-slate-200 dark:focus:ring-slate-600"
                      />
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="mb-2">
                        <label
                          htmlFor="gender"
                          className="block mb-2 text-sm font-medium dark:text-white"
                        >
                          Gender
                        </label>
                        <select
                          name="gender"
                          className="py-3 px-4 block w-full rounded-lg bg-[#f0efef] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-600 dark:text-white dark:placeholder-slate-200 dark:focus:ring-slate-600"
                          onChange={handleFormChanged}
                          required
                        >
                          <option value="" disabled selected>
                            Choose Gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="roomAmenities"
                          className="block mb-2 text-sm font-medium dark:text-white"
                        >
                          Room Amenities
                        </label>
                        <Select
                          id="roomAmenities"
                          name="roomAmenities"
                          isMulti
                          options={amenityOptions}
                          onChange={handleAmenitiesSelectChange}
                        />
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6 pt-6">
                      <div className="mb-4">
                        <label
                          htmlFor="dropzone-file-images"
                          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-slate-700 dark:border-white dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <MdDriveFolderUpload className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-white">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              images
                            </p>
                            <p className="text-xs text-gray-500 dark:text-white">
                              PNG, JPG or JPEG
                            </p>
                          </div>
                          <input
                            id="dropzone-file-images"
                            type="file"
                            className="hidden"
                            multiple
                            onChange={handleFormChanged}
                            name="images"
                            accept="image/*"
                          />
                        </label>
                        {images.length > 0 && (
                          <div className="flex flex-wrap mt-2 gap-2">
                            {images.map((image, index) => (
                              <div
                                key={index}
                                className="relative w-24 h-24 bg-gray-200 rounded"
                              >
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`Room ${index + 1}`}
                                  className="w-full h-full object-cover rounded"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setImages(
                                      images.filter((_, i) => i !== index)
                                    )
                                  }
                                  className="absolute top-0 right-0 p-1 bg-white rounded-bl focus:outline-none"
                                >
                                  <IoMdClose className="text-red-500" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="dropzone-file-floorPlan"
                          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-slate-700 dark:border-white dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <MdDriveFolderUpload className="w-10 h-10 mb-3 text-gray-400" />

                            <p className="mb-2 text-sm text-gray-500 dark:text-white">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              a floor plan
                            </p>
                            <p className="text-xs text-gray-500 dark:text-white">
                              PNG, JPG or JPEG
                            </p>
                          </div>
                          <input
                            id="dropzone-file-floorPlan"
                            type="file"
                            className="hidden"
                            onChange={handleFormChanged}
                            name="floorPlan"
                            accept="image/*"
                          />
                        </label>
                        {floorPlan && (
                          <div className="mt-2 relative inline-block bg-gray-200 rounded overflow-hidden">
                            <img
                              src={URL.createObjectURL(floorPlan)}
                              alt="floor_plan"
                              className="w-24 h-24 object-cover"
                            />
                            <button
                              type="button"
                              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-bl"
                              onClick={() => setFloorPlan(null)}
                            >
                              <IoMdClose />
                            </button>
                          </div>
                        )}
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
                        className="bg-blue-500 text-white  w-full  text-sm px-6 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Create Room
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

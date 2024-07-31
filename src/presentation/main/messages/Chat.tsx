import React, { ChangeEvent, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { useParams } from "react-router-dom";
import {
  useCreateMessageMutation,
  useGetChatsByRoomIdQuery,
} from "../../../services/message-service";
import toast from "react-hot-toast";
import { messageRequest } from "../../../models/request/message-request";
import Loader from "../../../components/Loader";

const Chat = () => {
  const [userID, setUserID] = useState<string | null>(
    sessionStorage.getItem("user_id")
  );
  const { roomid } = useParams();
  const { data: response, isLoading } = useGetChatsByRoomIdQuery(roomid || "");
  const chatter = response?.data?.results[0]?.chats;
  const participant1 =
    response?.data?.results[0]?.chats[0]?.room?.participants[0]?.nickname;
    const participant2 =
    response?.data?.results[0]?.chats[0]?.room?.participants[1]?.nickname;
  console.log(chatter, "chat response");

  const [formData, setFormData] = useState<messageRequest>({
    content: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [createMessage] = useCreateMessageMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const createMessageRequest = {
        content: formData.content,
      };

      const response = await createMessage({
        body: createMessageRequest,
        roomid: roomid || "",
      });
      console.log(response);
      const { status, data } = response.error
        ? response.error["data"]
        : response["data"];
      if (status === "success") {
        toast.success(status);
        setFormData({ content: "" }); // Reset form data after successful message sending
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
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-2xl text-center py-4 font-semibold mb-8 text-gray-800 dark:text-white">
        Chat between {participant1} and {participant2}
      </h1>
      <div className="w-full">
        {chatter.map((chat) => (
          <div key={chat.id} className="grid">
            {chat.sender.id === userID ? (
              <div className="flex gap-2.5 justify-end">
                <div className="">
                  <div className="grid mb-2">
                    <div className="px-3 py-2 bg-indigo-600 rounded">
                      <h2 className="text-white text-sm font-normal leading-snug">
                        {chat.content}
                      </h2>
                    </div>
                    <div className="justify-start items-center inline-flex">
                      <h3 className="text-gray-500 text-xs font-normal leading-4 py-1">
                        {new Date(chat.createdAt).toLocaleTimeString()}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-2.5 mb-4 ">
                <div className="grid">
                  <div className="w-max grid">
                    <div className="px-3.5 py-2 bg-white rounded justify-start items-center gap-3 inline-flex">
                      <h5 className="text-gray-900 text-sm font-normal leading-snug">
                        {chat.content}
                      </h5>
                    </div>
                    <div className="justify-end items-center inline-flex mb-2.5">
                      <h6 className="text-gray-500 text-xs font-normal leading-4 py-1">
                        {new Date(chat.createdAt).toLocaleTimeString()}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="w-full pl-3 pr-1 py-1 rounded-3xl bg-white dark:bg-slate-700 border border-gray-500 dark:border-gray-200 items-center gap-2 inline-flex justify-between">
          <div className="flex items-center w-full gap-2 ">
            <FaRegUserCircle className="text-2xl text-[#4F46E5]" />
            <input
              className="grow w-full relative shrink basis-0 text-black dark:text-white dark:bg-slate-700 text-sm font-medium leading-4 py-4 focus:outline-none"
              placeholder="Type here..."
              name="content"
              value={formData.content} // Controlled input
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleFormSubmit}
              className="items-center flex px-3 py-2 bg-indigo-600 rounded-full shadow "
            >
              <IoIosSend className="text-xl text-white" />
              <h3 className="text-white text-xs font-semibold leading-4 px-2">
                Send
              </h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

import React from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGetChatsRoomListQuery } from "../../../../services/message-service";

const MessageHistory = () => {
  const { data: response } = useGetChatsRoomListQuery();
  const chatHistory = response?.data?.results;
  return (
    <div>
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold pb-8 text-gray-800 dark:text-white">
          Message history
        </h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-6">
          {chatHistory && chatHistory.length > 0 ? (
            chatHistory.map((history) => (
              <div
                key={history?.id}
                className="group flex gap-y-6 size-full bg-white dark:bg-slate-800  focus:outline-none focus:bg-gray-100 rounded-lg p-5 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                <BiMessageSquareDetail className="shrink-0 size-8 text-gray-800 mt-0.5 me-6 dark:text-neutral-200" />

                <div>
                  <div>
                    <h3 className="block font-bold pb-2 text-gray-800 dark:text-white">
                      {history.name}
                    </h3>
                    <p className="text-gray-600 text-sm dark:text-neutral-400">
                      Message between {history?.participants[0]?.nickname} and{" "}
                      {history?.participants[1]?.nickname}
                    </p>
                  </div>
                  <Link
                    to={`/message/chat/${history?.id}`}
                    className="mt-3 inline-flex items-center gap-x-1 cursor-pointer text-sm font-semibold text-blue-500 dark:text-neutral-200"
                  >
                    send message
                    <IoIosArrowForward className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No messages yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageHistory;

import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const Chat = () => {
  return (
    <div>
      <div className="w-full">
        <div className="grid pb-11">
          <div className="flex gap-2.5 mb-4">
            <img
              src="https://pagedone.io/asset/uploads/1710412177.png"
              alt="Shanay image"
              className="w-10 h-11"
            />
            <div className="grid">
              <h5 className="text-gray-900 text-sm font-semibold leading-snug pb-1">
                Shanay cruz
              </h5>
              <div className="w-max grid">
                <div className="px-3.5 py-2 bg-white rounded justify-start  items-center gap-3 inline-flex">
                  <h5 className="text-gray-900 text-sm font-normal leading-snug">
                    Guts, I need a review of work. Are you ready?
                  </h5>
                </div>
                <div className="justify-end items-center inline-flex mb-2.5">
                  <h6 className="text-gray-500 text-xs font-normal leading-4 py-1">
                    05:14 PM
                  </h6>
                </div>
              </div>
              <div className="w-max grid">
                <div className="px-3.5 py-2 bg-white rounded justify-start items-center gap-3 inline-flex">
                  <h5 className="text-gray-900 text-sm font-normal leading-snug">
                    Let me know
                  </h5>
                </div>
                <div className="justify-end items-center inline-flex mb-2.5">
                  <h6 className="text-gray-500 text-xs font-normal leading-4 py-1">
                    05:14 PM
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2.5 justify-end pb-40">
          <div className="">
            <div className="grid mb-2">
              <h5 className="text-right text-gray-900 text-sm font-semibold leading-snug pb-1">
                You
              </h5>
              <div className="px-3 py-2 bg-indigo-600 rounded">
                <h2 className="text-white text-sm font-normal leading-snug">
                  Yes, let’s see, send your work here
                </h2>
              </div>
              <div className="justify-start items-center inline-flex">
                <h3 className="text-gray-500 text-xs font-normal leading-4 py-1">
                  05:14 PM
                </h3>
              </div>
            </div>
            <div className="justify-center">
              <div className="grid w-fit ml-auto">
                <div className="px-3 py-2 bg-indigo-600 rounded ">
                  <h2 className="text-white text-sm font-normal leading-snug">
                    Anyone on for lunch today
                  </h2>
                </div>
                <div className="justify-start items-center inline-flex">
                  <h3 className="text-gray-500 text-xs font-normal leading-4 py-1">
                    You
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <img
            src="https://pagedone.io/asset/uploads/1704091591.png"
            alt="Hailey image"
            className="w-10 h-11"
          />
        </div>
        <div className="w-full pl-3 pr-1 py-1 rounded-3xl border border-gray-500 dark:border-gray-200 items-center gap-2 inline-flex justify-between">
          <div className="flex items-center gap-2">
            <FaRegUserCircle className="text-2xl text-[#4F46E5]" />
            <input
              className="grow w-full relative shrink basis-0 text-black text-xs font-medium leading-4 focus:outline-none"
              placeholder="Type here..."
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="items-center flex px-3 py-2 bg-indigo-600 rounded-full shadow ">
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

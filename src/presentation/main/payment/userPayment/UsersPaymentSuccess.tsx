import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { responseType } from "../../../../models/response/base-response";
import { useMakeRoomPaymentMutation } from "../../../../services/room-service";
import { MdDriveFolderUpload } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router-dom";

const UsersPaymentSuccess = () => {
  
  return (
    <div>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-2xl bg-white dark:bg-slate-800">
          <h1 className="text-center pt-6 font-semibold text-2xl dark:text-white">
            Upload payment proof to get a room
          </h1>
       
        </div>
      </div>
    </div>
  );
};

export default UsersPaymentSuccess;

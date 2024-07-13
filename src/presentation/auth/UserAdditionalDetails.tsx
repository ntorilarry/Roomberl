import React, { useState } from "react";
import { useGetAddInfoByUserIdQuery } from "../../services/auth-service";

const UserAdditionalDetails = () => {
  const [userID, setUserID] = useState<string | null>(
    sessionStorage.getItem("user_id")
  );
  const { data: response, isLoading: getInfoLoading } =
    useGetAddInfoByUserIdQuery(userID || "");

  const isPaymentVerified = response?.data?.roomPayments?.some(
    (payment) => payment.isVerified
  );

  const isRoomTypePresent = response?.data?.roomPayments?.map(
    (payment) => payment.roomTypeId
  )[0];

  const RoomIdPresent = response?.data?.room
  sessionStorage.setItem("RoomIdPresent", RoomIdPresent);
  console.log(isRoomTypePresent);

  sessionStorage.setItem("isPaymentVerified", isPaymentVerified);
  sessionStorage.setItem("isRoomTypePresent", isRoomTypePresent);
  return <div></div>;
};

export default UserAdditionalDetails;

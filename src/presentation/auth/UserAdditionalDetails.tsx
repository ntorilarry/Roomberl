import React, { useEffect, useState } from "react";
import { useGetAddInfoByUserIdQuery } from "../../services/auth-service";
import { useGlobalState } from "../../utils/GlobalStateContext";

const UserAdditionalDetails = () => {
  const {
    setIsPaymentVerified,
    setIsRoomTypePresent,
    setRoomIdPresent,
    setPaymentRoomTypeId,
  } = useGlobalState();

  const [userID] = useState<string | null>(sessionStorage.getItem("user_id"));
  const { data: response } = useGetAddInfoByUserIdQuery(userID || "");

  useEffect(() => {
    if (response) {
      const payment = response?.data?.roomPayments?.[0];
      const isPaymentVerified = payment?.isVerified;
      const paymentRoomTypeId = isPaymentVerified ? payment?.roomTypeId : null;
      const isRoomTypePresent = payment?.roomTypeId || null;
      const RoomIdPresent = response?.data?.room || null;

      console.log(
        isPaymentVerified,
        isRoomTypePresent,
        RoomIdPresent,
        paymentRoomTypeId
      );

      setIsPaymentVerified(isPaymentVerified);
      setIsRoomTypePresent(isRoomTypePresent);
      setRoomIdPresent(RoomIdPresent);
      setPaymentRoomTypeId(paymentRoomTypeId);
    }
  }, [
    response,
    setIsPaymentVerified,
    setIsRoomTypePresent,
    setRoomIdPresent,
    setPaymentRoomTypeId,
  ]);

  return <div></div>;
};

export default UserAdditionalDetails;

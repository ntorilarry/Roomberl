import React, { useEffect, useState } from "react";
import { useGetAddInfoByUserIdQuery } from "../../services/auth-service";
import { useGlobalState } from "../../utils/GlobalStateContext";

const UserAdditionalDetails = () => {
  const { dispatch } = useGlobalState();
  const [userID] = useState<string | null>(sessionStorage.getItem("user_id"));
  const { data: response } = useGetAddInfoByUserIdQuery(userID || "");

  useEffect(() => {
    if (response) {
      const payment = response?.data?.roomPayments?.[0];

      const isPaymentVerified = payment?.isVerified || false;
      const paymentRoomTypeId = isPaymentVerified ? payment?.roomTypeId : null;
      const isRoomTypePresent = payment?.roomTypeId || null;
      const RoomIdPresent = response?.data?.room || null;

      console.log(isPaymentVerified, isRoomTypePresent, RoomIdPresent, paymentRoomTypeId);

      dispatch({ type: "SET_IS_PAYMENT_VERIFIED", payload: isPaymentVerified });
      dispatch({
        type: "SET_IS_ROOM_TYPE_PRESENT",
        payload: isRoomTypePresent,
      });
      dispatch({ type: "SET_ROOM_ID_PRESENT", payload: RoomIdPresent });
      dispatch({ type: "SET_IS_PAYMENT_ROOMTYPE_ID", payload: paymentRoomTypeId });
    }
  }, [response, dispatch]);
  return <div></div>;
};

export default UserAdditionalDetails;

import React, { useEffect, useState } from "react";
import { useGetAddInfoByUserIdQuery } from "../../services/auth-service";
import { useGlobalState } from "../../utils/GlobalStateContext";

const UserAdditionalDetails = () => {
  const { dispatch } = useGlobalState();
  const [userID] = useState<string | null>(
    sessionStorage.getItem("user_id")
  );
  const { data: response, isLoading: getInfoLoading } =
    useGetAddInfoByUserIdQuery(userID || "");

  useEffect(() => {
    if (response) {

      const isPaymentVerified = response?.data?.roomPayments?.map(
        (payment) => payment.isVerified
      )[0];

      const isRoomTypePresent = response?.data?.roomPayments?.map(
        (payment) => payment.roomTypeId
      )[0];

      const RoomIdPresent = response?.data?.room;

      console.log(isPaymentVerified, isRoomTypePresent, RoomIdPresent);

      dispatch({ type: "SET_IS_PAYMENT_VERIFIED", payload: isPaymentVerified });
      dispatch({
        type: "SET_IS_ROOM_TYPE_PRESENT",
        payload: isRoomTypePresent,
      });
      dispatch({ type: "SET_ROOM_ID_PRESENT", payload: RoomIdPresent });
    }
  }, [response, dispatch]);
  return <div></div>;
};

export default UserAdditionalDetails;

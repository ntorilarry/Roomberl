import React, { useState, useEffect } from "react";
import { getRoomPaymentParams } from "../../../../models/request/room-request";
import { useGetRoomPaymentQuery } from "../../../../services/room-service";
import { useGlobalState } from "../../../../utils/GlobalStateContext";

const PaymentCheck = () => {
  const { setPaymentStatus } = useGlobalState();
  const [userID] = useState<string | null>(sessionStorage.getItem("user_id"));
  const { data: response, isLoading } = useGetRoomPaymentQuery({
    user: userID,
    page: 1,
    size: 999999,
  } as getRoomPaymentParams);

  useEffect(() => {
    if (!isLoading && response && response.data?.results) {
      const incompletePayments = response.data.results.filter(
        (payment) => payment.paymentStatus !== "Full payment"
      );

      if (incompletePayments.length > 0) {
        // Update global state with incomplete payment status, or handle as needed
        setPaymentStatus("Incomplete");
      } else {
        // All payments are full
        setPaymentStatus("Full");
      }
    }
  }, [isLoading, response, setPaymentStatus]);

  return <div></div>;
};

export default PaymentCheck;

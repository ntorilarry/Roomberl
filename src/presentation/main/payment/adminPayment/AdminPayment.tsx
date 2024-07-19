import React from "react";
import AdminPaymentData from "./components/AdminPaymentData";
import ProtectedRoutes from "../../../auth/utils/ProtectedRoutes";

const AdminPayment = () => {
  return (
    <div>
      <AdminPaymentData />
    </div>
  );
};

export default ProtectedRoutes(AdminPayment, {
  allowedRoles: ["Administrator", "Hotel_manager"],
});

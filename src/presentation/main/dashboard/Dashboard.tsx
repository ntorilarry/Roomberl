import React from "react";
import ProtectedRoutes from "../../auth/utils/ProtectedRoutes";

const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default ProtectedRoutes(Dashboard, {
  allowedRoles: ["Administrator", "Student", "Hotel_manager"],
});

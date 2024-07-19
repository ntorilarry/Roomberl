import React from "react";
import RoomAmenityData from "./components/RoomAmenityData";
import ProtectedRoutes from "../../../auth/utils/ProtectedRoutes";

const RoomAmenities = () => {
  return (
    <div>
      <RoomAmenityData />
    </div>
  );
};

export default ProtectedRoutes(RoomAmenities, {
  allowedRoles: ["Administrator", "Hotel_manager"],
});
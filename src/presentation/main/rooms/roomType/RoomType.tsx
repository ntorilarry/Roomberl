import ProtectedRoutes from "../../../auth/utils/ProtectedRoutes";
import RoomTypeData from "./components/RoomTypeData";

const RoomType = () => {

  return (
    <div>
     <RoomTypeData  />
    </div>
  );
};

export default ProtectedRoutes(RoomType, {
  allowedRoles: ["Administrator", "Hotel_manager"],
});

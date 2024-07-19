import UsersData from "./components/UsersData";
import ProtectedRoutes from "../../auth/utils/ProtectedRoutes";

const Users = () => {
  return (
    <div>
      <UsersData />
    </div>
  );
};

export default ProtectedRoutes(Users, {
  allowedRoles: ["Administrator"],
});

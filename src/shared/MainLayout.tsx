import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import ProtectedRoutes from "../presentation/auth/utils/ProtectedRoutes";
import { useGlobalState } from "../utils/GlobalStateContext";
import UserAdditionalDetails from "../presentation/auth/UserAdditionalDetails";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roles] = useState(sessionStorage.getItem("roles") || "");

  const { isPaymentVerified } = useGlobalState();

  console.log(isPaymentVerified, "isPaymentVerified");

  const shouldRenderSidebar = () => {
    return (
      roles.includes("Administrator") ||
      roles.includes("Hostel_manager") ||
      (roles.includes("Student") && isPaymentVerified === true)
    );
  };

  return (
    <div className="dark:bg-slate-900 h-screen bg-gray-100">
      <UserAdditionalDetails />
      {shouldRenderSidebar() && (
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}
      {shouldRenderSidebar() ? (
        <div className="lg:pl-[280px]">
          <Header setSidebarOpen={setSidebarOpen} />
          <main className="py-10 dark:bg-slate-900 bg-gray-100">
            <div className="px-4 sm:px-6 lg:px-8">
              {/* <UserAdditionalDetails /> */}
              <Outlet />
            </div>
          </main>
        </div>
      ) : (
        <div className="lg:pl-0">
          <Header setSidebarOpen={setSidebarOpen} />
          <main className="py-10 dark:bg-slate-900 bg-gray-100">
            <div className="px-4 sm:px-6 lg:px-8">
              {/* <UserAdditionalDetails /> */}
              <Outlet />
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default ProtectedRoutes(MainLayout, {
  allowedRoles: ["Administrator", "Student", "Hostel_manager"],
});

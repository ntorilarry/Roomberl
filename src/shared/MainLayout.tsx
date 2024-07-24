import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import UserAdditionalDetails from "../presentation/auth/UserAdditionalDetails";
import ProtectedRoutes from "../presentation/auth/utils/ProtectedRoutes";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className=" dark:bg-slate-900  h-screen bg-gray-100 ">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:pl-[280px]">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="py-10 dark:bg-slate-900 bg-gray-100">
          <div className="px-4 sm:px-6 lg:px-8">
            <UserAdditionalDetails />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProtectedRoutes(MainLayout, {
  allowedRoles: ["Administrator", "Student", "Hostel_manager"],
});

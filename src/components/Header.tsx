// import React, { Fragment, useContext, useState } from "react";
// import AuthContext from "../presentation/auth/utils/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import { Menu, Transition } from "@headlessui/react";
// import { Switcher } from "./Switcher";
// import { RoomBerlLogo } from "../assets";
// import { HiOutlineMenuAlt2 } from "react-icons/hi";

// const Header = ({ sideBar, setSideBar }) => {
//   const navigate = useNavigate();

//   const [firstName, setFirstName] = useState(
//     sessionStorage.getItem("first_name")
//   );
//   const [lastName, setLastName] = useState(sessionStorage.getItem("last_name"));
//   const [email, setEmail] = useState(sessionStorage.getItem("email"));
//   const { logout } = useContext(AuthContext);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };
//   return (
//     <div>
//       <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-slate-700 dark:border-slate-800">
//         <div className="px-3 py-3 lg:px-5 lg:pl-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center justify-start rtl:justify-end">
//               <button
//                 data-drawer-target="logo-sidebar"
//                 data-drawer-toggle="logo-sidebar"
//                 aria-controls="logo-sidebar"
//                 type="button"
//                 className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//               >
//                 <span className="sr-only">Open sidebar</span>
//                 <HiOutlineMenuAlt2 className="w-6 h-6" />
//               </button>
//               <Link to="/rooms/view-room-types" className="flex ms-2 md:me-24">
//                 <img
//                   src={RoomBerlLogo}
//                   className="h-8 me-3"
//                   alt="FlowBite Logo"
//                 />
//                 <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
//                   RoomBerl
//                 </span>
//               </Link>
//             </div>

//             <div className="flex items-center">
//               <div className="flex gap-x-4 items-center ms-3">
//                 <Switcher />
//                 <Menu as="div" className="relative">
//                   <Menu.Button className="flex text-sm bg-slate-700 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
//                     <span className="sr-only">Open user menu</span>
//                     <img
//                       className="w-8 h-8 rounded-full"
//                       src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&size=40`}
//                       alt=""
//                     />
//                   </Menu.Button>
//                   <Menu.Items className="absolute right-0 z-50 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-slate-700 dark:divide-slate-600">
//                     <div className="px-4 py-3">
//                       <p className="text-sm text-gray-900 dark:text-white">
//                         {firstName} {lastName}
//                       </p>
//                       <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
//                         {email}
//                       </p>
//                     </div>

//                     <Menu.Item>
//                       {({ active }) => (
//                         <a
//                           href="#"
//                           className={`block px-4 py-2 text-sm ${
//                             active
//                               ? "bg-gray-100 dark:bg-gray-600 dark:text-white"
//                               : "text-gray-700 dark:text-gray-300"
//                           }`}
//                         >
//                           Profile
//                         </a>
//                       )}
//                     </Menu.Item>
//                     <Menu.Item>
//                       {({ active }) => (
//                         <div
//                           onClick={handleLogout}
//                           className={`block px-4 py-2 text-sm ${
//                             active
//                               ? "bg-gray-100 dark:bg-gray-600 dark:text-white"
//                               : "text-gray-700 dark:text-gray-300"
//                           }`}
//                         >
//                           Sign out
//                         </div>
//                       )}
//                     </Menu.Item>
//                   </Menu.Items>
//                 </Menu>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Header;
import {
  HiMiniBars4,
  HiOutlineBell,
  HiMagnifyingGlass,
  HiMiniChevronDown,
} from "react-icons/hi2";
import { Menu, Transition } from "@headlessui/react";
import { Switcher } from "./Switcher";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = ({ setSidebarOpen }) => {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b dark:border-0  bg-white dark:bg-slate-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 dark:text-white lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <HiMiniBars4 className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div
        className="h-6 w-px bg-gray-900/10 dark:bg-white/10 lg:hidden"
        aria-hidden="true"
      />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <HiMagnifyingGlass
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Search..."
            type="search"
            name="search"
          />
        </form> */}
        <div className="flex flex-1 justify-end items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <HiOutlineBell className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div
            className="h-6 w-px bg-gray-900/10 dark:bg-white/10 lg:hidden"
            aria-hidden="true"
          />

          <Switcher />

          {/* Separator */}
          <div
            className="h-6 w-px bg-gray-900/10 dark:bg-white/10 lg:hidden"
            aria-hidden="true"
          />

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  Tom Cook
                </span>
                <HiMiniChevronDown
                  className="ml-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900"
                        )}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;

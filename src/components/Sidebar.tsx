import { Fragment } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import {
  HiMiniXMark,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineFolder,
  HiOutlineUsers,
} from "react-icons/hi2";
import {
  MdOutlineBedroomParent,
  MdOutlineMeetingRoom,
  MdOutlinePayments,
  MdOutlineRoomPreferences,
} from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { GoHome } from "react-icons/go";
import { RoomBerlLogo } from "../assets";
import { NavLink } from "react-router-dom";
import { LuMessagesSquare } from "react-icons/lu";
import { useGlobalState } from "../utils/GlobalStateContext";
import { RiSecurePaymentFill } from "react-icons/ri";

const navigation = [
  {
    name: "Rooms",
    icon: HiOutlineFolder,
    subItems: [
      {
        name: "View Room Types",
        href: "/rooms/view-room-types",
        icon: MdOutlineBedroomParent,
      },
      {
        name: "Room Amenities",
        href: "/rooms/amenities",
        icon: MdOutlineMeetingRoom,
      },
      {
        name: "Room Types",
        href: "/rooms/roomtypes",
        icon: MdOutlineRoomPreferences,
      },
      { name: "All Rooms", href: "/rooms/all-rooms", icon: SiGoogleclassroom },
    ],
  },
  { name: "Members", href: "/members", icon: GoHome },
  {
    name: "Payment",
    href: "/payments/verify-payment",
    icon: MdOutlinePayments,
  },
  { name: "Users", href: "/users", icon: HiOutlineUsers },
  { name: "Messages", href: "/message/history", icon: LuMessagesSquare },
  {
    name: "Complete Payment",
    href: "/payments/user",
    icon: RiSecurePaymentFill,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { isRoomTypePresent, isPaymentVerified, paymentStatus } =
    useGlobalState();

  const roles = sessionStorage.getItem("roles");
  const isAdmin = roles && roles.includes("Administrator");
  const isStudent = roles && roles.includes("Student");
  const isHotelManager = roles && roles.includes("Hostel_manager");

const filteredNavigation = navigation
  .filter((item) => {
    if (isStudent) {
      if (paymentStatus === "Incomplete") {
        // Show only the "Complete Payment" option if payment is incomplete
        return item.name === "Complete Payment";
      } else if (isPaymentVerified) {
        // Show simplified "Rooms" when payment is verified
        return (
          item.name === "Rooms" ||
          item.name === "Members" ||
          item.name === "Messages"
        );
      } else {
        // Show "Rooms" with accordion, along with "Members" and "Messages"
        return (
          item.name === "Members" ||
          item.name === "Messages" ||
          (item.name === "Rooms" &&
            item.subItems &&
            item.subItems.some((subItem) => subItem.name === "View Room Types"))
        );
      }
    }
    if (isAdmin || isHotelManager) {
      // Admin and Hotel Manager can see only Rooms, Payments, and Users
      return (
        item.name === "Rooms" ||
        item.name === "Payment" ||
        item.name === "Users"
      );
    }
    return true;
  })
  .map((item) => {
    if (isStudent && paymentStatus === "Incomplete") {
      // Return "Complete Payment" when payment is incomplete
      return {
        name: "Complete Payment",
        href: "/payments/user",
        icon: RiSecurePaymentFill,
      };
    } else if (isStudent && isPaymentVerified) {
      // Simplified "Rooms" item when payment is verified
      if (item.name === "Rooms") {
        return {
          name: "Rooms",
          href: `/rooms/rooms/${isRoomTypePresent}`,
          icon: HiOutlineFolder,
        };
      }
    } else if (item.subItems) {
      // Show accordion for other cases
      return {
        ...item,
        subItems: item.subItems.filter((subItem) => {
          if (isStudent) {
            return subItem.name === "View Room Types";
          }
          if (isAdmin || isHotelManager) {
            return subItem.name !== "View Room Types";
          }
          return true;
        }),
      };
    }
    return item;
  });



  return (
    <>
      <Transition show={sidebarOpen}>
        <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <HiMiniXMark
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex h-screen grow flex-col gap-y-5 overflow-y-auto border dark:border-0 bg-white dark:bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                  <a
                    href="/"
                    className="flex gap-x-2 h-16 shrink-0 items-center"
                  >
                    <img
                      className="h-8 w-auto"
                      src={RoomBerlLogo}
                      alt="Your Company"
                    />
                    <p className="font-semibold text-slate-900 text-xl dark:text-white">
                      RoomBerl
                    </p>
                  </a>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {filteredNavigation.map((item) =>
                            item.subItems ? (
                              <Disclosure key={item.name}>
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button
                                      className={classNames(
                                        "text-gray-400 hover:text-black dark:hover:text-white hover:bg-[#F9FAFB] dark:hover:bg-slate-700",
                                        "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-medium w-full justify-between"
                                      )}
                                    >
                                      <div className="flex items-center gap-x-3">
                                        <item.icon
                                          className="h-6 w-6 shrink-0"
                                          aria-hidden="true"
                                        />
                                        {item.name}
                                      </div>
                                      {open ? (
                                        <HiOutlineChevronUp
                                          className="h-5 w-5 shrink-0"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <HiOutlineChevronDown
                                          className="h-5 w-5 shrink-0"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </Disclosure.Button>
                                    <Disclosure.Panel className=" space-y-1">
                                      {item.subItems.map((subItem) => (
                                        <NavLink
                                          key={subItem.name}
                                          to={subItem.href}
                                          className={({ isActive }) =>
                                            classNames(
                                              isActive
                                                ? "bg-white dark:bg-slate-800 text-black dark:text-white"
                                                : "text-gray-400 hover:text-black dark:hover:text-white hover:bg-[#F9FAFB] dark:hover:bg-slate-700",
                                              "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-medium"
                                            )
                                          }
                                        >
                                          <subItem.icon
                                            className="h-6 w-6 shrink-0"
                                            aria-hidden="true"
                                          />
                                          {subItem.name}
                                        </NavLink>
                                      ))}
                                    </Disclosure.Panel>
                                  </>
                                )}
                              </Disclosure>
                            ) : (
                              <li key={item.name}>
                                <NavLink
                                  to={item.href}
                                  className={({ isActive }) =>
                                    classNames(
                                      isActive
                                        ? "bg-gray-100 dark:bg-slate-700 text-black dark:text-white"
                                        : "text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700",
                                      "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-medium"
                                    )
                                  }
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </NavLink>
                              </li>
                            )
                          )}
                        </ul>
                      </li>

                      {/* <li className="mt-auto">
                        <a
                          href="#"
                          className="group -mx-2 flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                        >
                          <HiOutlineCog6Tooth
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          Settings
                        </a>
                      </li> */}
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50  lg:flex lg:w-[280px] lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-slate-800 px-6 pb-4">
          <a href="/" className="flex gap-x-2 h-16 shrink-0 items-center">
            <img className="h-8 w-auto" src={RoomBerlLogo} alt="Your Company" />
            <p className="font-semibold text-slate-900 text-xl dark:text-white">
              RoomBerl
            </p>
          </a>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {filteredNavigation.map((item) =>
                    item.subItems ? (
                      <Disclosure key={item.name}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={classNames(
                                "text-gray-400 hover:text-black dark:hover:text-white hover:bg-[#F9FAFB] dark:hover:bg-slate-700",
                                "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-medium w-full justify-between"
                              )}
                            >
                              <div className="flex items-center gap-x-3">
                                <item.icon
                                  className="h-6 w-6 shrink-0"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </div>
                              {open ? (
                                <HiOutlineChevronUp
                                  className="h-5 w-5 shrink-0"
                                  aria-hidden="true"
                                />
                              ) : (
                                <HiOutlineChevronDown
                                  className="h-5 w-5 shrink-0"
                                  aria-hidden="true"
                                />
                              )}
                            </Disclosure.Button>
                            <Disclosure.Panel className="space-y-1">
                              {item.subItems.map((subItem) => (
                                <NavLink
                                  key={subItem.name}
                                  to={subItem.href}
                                  className={({ isActive }) =>
                                    classNames(
                                      isActive
                                        ? " text-black dark:text-white bg-gray-100 dark:bg-slate-700"
                                        : "text-gray-400  hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700",
                                      "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-medium"
                                    )
                                  }
                                >
                                  <subItem.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {subItem.name}
                                </NavLink>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ) : (
                      <li key={item.name}>
                        <NavLink
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-gray-100 dark:bg-slate-700 text-black dark:text-white"
                                : "text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700",
                              "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-medium"
                            )
                          }
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </NavLink>
                      </li>
                    )
                  )}
                </ul>
              </li>

              {/* <li className="mt-auto">
                <a
                  href="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <HiOutlineCog6Tooth
                    className="h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  Settings
                </a>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

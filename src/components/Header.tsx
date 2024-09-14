import {
  HiMiniBars4,
  HiOutlineBell,
  HiMiniChevronDown,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import { Menu, Transition } from "@headlessui/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../presentation/auth/utils/AuthContext";
import DarkModeToggle from "./DarkModeToggle";
import { useGlobalState } from "../utils/GlobalStateContext";

const userNavigation = [
  { name: "Your profile", href: "/my-profile" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

  const [firstName] = useState(sessionStorage.getItem("first_name"));

  const [code_name] = useState<string | null>(
    sessionStorage.getItem("code_name")
  );
  const [lastName] = useState(sessionStorage.getItem("last_name"));

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate(`/auth/login/${code_name}`);
  };

  const { setSearchQuery } = useGlobalState();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the global searchQuery directly
  };
  return (
    <div className="sticky top-0 z-40 w-full flex h-16 shrink-0 items-center gap-x-4 bg-white dark:bg-slate-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
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
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <HiMagnifyingGlass
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 dark:bg-slate-800 dark:text-white pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:ring-offset-0 sm:text-sm"
            placeholder="Search..."
            type="search"
            name="search"
            onChange={handleSearchChange}
          />
        </form>
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

          <DarkModeToggle />

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
                src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&size=40`}
                alt=""
              />
              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                  aria-hidden="true"
                >
                  {firstName} {lastName}
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
                      <Link
                        to={item.href}
                        onClick={
                          item.name === "Sign out" ? handleLogout : undefined
                        }
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900"
                        )}
                      >
                        {item.name}
                      </Link>
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

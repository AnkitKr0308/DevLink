import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../Buttons/Button";
import LogoutBtn from "../Buttons/LogoutBtn";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink to="/">
            <img src="/DevLink.png" className="h-12" alt="DevLink Logo" />
            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              DevLink
            </span> */}
          </NavLink>

          {/* <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button> */}
          {!authStatus ? (
            <>
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <Button onClick={() => navigate("/login")}>Login</Button>

                <Button onClick={() => navigate("/signup")}>Sign Up</Button>
              </div>
            </>
          ) : (
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <LogoutBtn />
            </div>
          )}

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-sm md:p-0 ${
                      isActive
                        ? "text-blue-700 dark:text-blue-500" // Active page
                        : "text-white hover:text-blue-500 dark:hover:text-blue-300" // Inactive
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-sm md:p-0 ${
                      isActive
                        ? "text-blue-700 dark:text-blue-500" // Active page
                        : "text-white hover:text-blue-500 dark:hover:text-blue-300" // Inactive
                    }`
                  }
                >
                  About
                </NavLink>
              </li>
              {authStatus && (
                <li>
                  <NavLink
                    to="/my-links"
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded-sm md:p-0 ${
                        isActive
                          ? "text-blue-700 dark:text-blue-500" // Active page
                          : "text-white hover:text-blue-500 dark:hover:text-blue-300" // Inactive
                      }`
                    }
                  >
                    My Links
                  </NavLink>
                </li>
              )}
              {authStatus && (
                <li>
                  <NavLink
                    to="/add-link"
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded-sm md:p-0 ${
                        isActive
                          ? "text-blue-700 dark:text-blue-500" // Active page
                          : "text-white hover:text-blue-500 dark:hover:text-blue-300" // Inactive
                      }`
                    }
                  >
                    Add Link
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to="/support"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-sm md:p-0 ${
                      isActive
                        ? "text-blue-700 dark:text-blue-500" // Active page
                        : "text-white hover:text-blue-500 dark:hover:text-blue-300" // Inactive
                    }`
                  }
                >
                  Support
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-sm md:p-0 ${
                      isActive
                        ? "text-blue-700 dark:text-blue-500" // Active page
                        : "text-white hover:text-blue-500 dark:hover:text-blue-300" // Inactive
                    }`
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;

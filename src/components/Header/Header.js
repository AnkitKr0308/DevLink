import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../Buttons/Button";
import LogoutBtn from "../Buttons/LogoutBtn";
import { useSelector } from "react-redux";
import Navigations from "../Buttons/Navigations";

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
                <Navigations to="/">Home</Navigations>
              </li>
              <li>
                <Navigations to="/about">About</Navigations>
              </li>
              {authStatus && (
                <li>
                  <Navigations to="/my-link">My Links</Navigations>
                </li>
              )}
              {authStatus && (
                <li>
                  <Navigations to="/add-link">Add Link</Navigations>
                </li>
              )}
              {authStatus && (
                <li>
                  <Navigations to="/support">Support</Navigations>
                </li>
              )}
              <li>
                <Navigations to="/contact">Contact</Navigations>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;

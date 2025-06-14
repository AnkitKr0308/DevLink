import React from "react";
import { NavLink } from "react-router-dom";

function Navigations({ className, children, to, ...props }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block py-2 px-3 rounded-sm md:p-0 ${
          isActive
            ? "text-blue-700 dark:text-blue-500 hover:underline"
            : "text-white hover:text-blue-500 dark:hover:text-blue-300 hover:underline"
        }`
      }
      {...props}
    >
      {children}
    </NavLink>
  );
}

export default Navigations;

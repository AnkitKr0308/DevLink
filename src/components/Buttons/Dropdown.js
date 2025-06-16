import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Dropdown({ label, items = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const isActive = items.some((item) => location.pathname.startsWith(item.to));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className={`block w-full text-left py-2 px-3 rounded-sm md:p-0 ${
          isOpen || isActive
            ? "text-blue-700 dark:text-blue-500 hover:underline"
            : "text-white hover:text-blue-500 dark:hover:text-blue-300 hover:underline"
        }`}
      >
        {label}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-44 rounded-md shadow-lg bg-white dark:bg-gray-700 z-50">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {items.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.to}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;

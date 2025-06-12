import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer className="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800 ">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link to="/" className="hover:underline">
              DevLink™
            </Link>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 gap-5 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <Link>About</Link>
            </li>
            <li>
              <Link>Privacy Policy</Link>
            </li>

            <li>
              <Link>Contact</Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

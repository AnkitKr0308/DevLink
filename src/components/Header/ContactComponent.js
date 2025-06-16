import React from "react";
import { Link } from "react-router-dom";

function ContactComponent() {
  return (
    <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm text-center max-w-xl mx-auto mt-6">
      <p className="text-gray-800 text-lg font-medium">
        Having trouble?{" "}
        <Link
          to="/createcase"
          className="text-blue-600 hover:text-blue-800 font-semibold underline transition duration-200"
        >
          Raise a complaint
        </Link>{" "}
        and our team will assist you shortly.
      </p>
    </div>
  );
}

export default ContactComponent;

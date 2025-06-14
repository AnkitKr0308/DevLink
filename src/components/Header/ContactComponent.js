import React from "react";
import { Link } from "react-router-dom";

function ContactComponent() {
  return (
    <div>
      <p>
        In case of any issue please raise a{" "}
        <Link to="/support" className="text-blue-400 underline">
          complaint
        </Link>
      </p>
    </div>
  );
}

export default ContactComponent;

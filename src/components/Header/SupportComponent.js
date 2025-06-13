import React from "react";
import Input from "../Editors/Input";
import Button from "../Buttons/Button";

function SupportComponent() {
  const fields = [
    { name: "First Name", label: "First Name", required: true },
    { name: "Last Name", label: "Last Name", required: true },
    {
      name: "Email Address",
      label: "Email Address",
      required: true,
      type: "email",
    },
    {
      name: "Contact",
      label: "Contact",
      required: true,
      type: "tel",
      pattern: "[6-9][0-9]{9}",
    },
    { name: "Issue Description", label: "Issue Description", required: true },
  ];

  const handleSubmit = () => {};

  return (
    <div>
      <Input onSubmit={handleSubmit} fields={fields} />
      <Button>Submit</Button>
    </div>
  );
}

export default SupportComponent;

import React, { useRef, useState } from "react";
import Input from "../../Editors/Input";
import Button from "../../Buttons/Button";
import { Link } from "react-router-dom";
import Modal from "../../Editors/Modal";
import { createSupport } from "../../../DevLinkApi/supportapi";
import { useSelector } from "react-redux";

function CreateCaseComponent() {
  // const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // const [loading, SetLoading] = useState(true);

  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user); // get full user object

  const [successMsg, setSuccessMsg] = useState("");

  const inputRef = useRef();

  const handleSubmit = async () => {
    const formData = inputRef.current.getFormData();

    try {
      const result = await createSupport({
        Name: formData.name,
        Email: user ? user.email : formData.email,
        Contact: formData.contact,
        Issue: formData.issue,
      });

      // setValues((prev) => [...prev, result]);

      setSuccessMsg("Support Request has been created: " + result.caseId);
      setShowModal(true);
      // inputRef.current.resetForm();
    } catch (error) {
      console.error("Error creating support ticket", error);
      throw error;
    }
  };

  // if (loading) return <p>Loading user details...</p>;

  if (authStatus) {
    if (!user) return <p>Loading user details...</p>;
    const fields = [
      { name: "Name", label: "Name", required: true, id: "name" },

      {
        name: "Email",
        label: "Email Address",
        id: "email",
        required: true,
        type: "email",
        defaultValue: user?.email || "",
      },
      {
        name: "Contact",
        label: "Contact",
        required: true,
        type: "tel",
        pattern: "[6-9][0-9]{9}",
        id: "contact",
      },
      {
        name: "Issue",
        label: "Issue Description",
        id: "issue",
        required: true,
      },
    ];
    return (
      <div>
        {showModal && (
          <Modal header="Case Raised" onClose={() => setShowModal(false)}>
            {successMsg}
            <div className="text-right">
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
              >
                OK
              </button>
            </div>
          </Modal>
        )}

        <h2 className="text-3xl font-bold text-black mt-40 mb-10">
          Register a Complaint
        </h2>
        <Input ref={inputRef} fields={fields} labelColor="text-black" />
        <Button type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    );
  } else {
    return (
      <div className="mt-40 flex flex-col items-center justify-center text-center space-y-4">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
          You're not logged in
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Please{" "}
          <Link to="/login" className="text-blue-500 underline">
            log in
          </Link>{" "}
          to raise a complaint and get help from our support team.
        </p>
      </div>
    );
  }
}

export default CreateCaseComponent;

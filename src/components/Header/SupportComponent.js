import React, { useEffect, useRef, useState } from "react";
import Input from "../Editors/Input";
import Button from "../Buttons/Button";
import appwriteservice from "../../appwrite/AppwriteService";
import authservice from "../../appwrite/auth";
import Modal from "../Editors/Modal";

function SupportComponent() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authservice.getCurrentUser();
        if (user && user.$email) {
          setUser(user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const user = await authservice.getCurrentUser();
  //     if (user.email) {
  //       setEmail(user.$email);
  //     } else {
  //    }
  //   };   setEmail("");

  //   fetchUser();
  // }, []);

  const fields = [
    { name: "Name", label: "Name", required: true },

    {
      name: "EmailAddress",
      label: "Email Address",
      required: true,
      type: "email",
      defaultValue: user?.$email || "",
    },
    {
      name: "Contact",
      label: "Contact",
      required: true,
      type: "tel",
      pattern: "[6-9][0-9]{9}",
    },
    { name: "Issue", label: "Issue Description", required: true },
  ];

  const [successMsg, setSuccessMsg] = useState("");

  const inputRef = useRef();

  const handleSubmit = async () => {
    const formData = inputRef.current.getFormData();

    try {
      const result = await appwriteservice.createSupport({
        Name: formData.Name,
        EmailAddress: user ? user.email : formData.EmailAddress,
        Contact: formData.Contact,
        Issue: formData.Issue,
      });

      setSuccessMsg("Support Request has been created: " + result.$id);
      setShowModal(true);
      inputRef.current.resetForm();
    } catch (error) {
      console.error("Error creating support ticket", error);
      throw error;
    }
  };

  return (
    <div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>{successMsg}</Modal>
      )}

      <h2 className="text-3xl font-bold text-black mt-40 mb-10">
        Register a Complaint
      </h2>
      <Input ref={inputRef} fields={fields} />
      <Button type="button" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default SupportComponent;

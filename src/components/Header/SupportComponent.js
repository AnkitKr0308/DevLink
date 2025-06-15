import React, { useEffect, useRef, useState } from "react";
import Input from "../Editors/Input";
import Button from "../Buttons/Button";
// import appwriteservice from "../../appwrite/AppwriteService";
import authservice from "../../appwrite/auth";
import Modal from "../Editors/Modal";
import { createSupport } from "../../DevLinkApi/supportapi";

function SupportComponent() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // const [values, setValues] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authservice.getCurrentUser();
        if (user && user.email) {
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
      name: "Email",
      label: "Email Address",
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
    },
    { name: "Issue", label: "Issue Description", required: true },
  ];

  const [successMsg, setSuccessMsg] = useState("");

  const inputRef = useRef();

  const handleSubmit = async () => {
    const formData = inputRef.current.getFormData();

    try {
      const result = await createSupport({
        Name: formData.Name,
        Email: user ? user.email : formData.Email,
        Contact: formData.Contact,
        Issue: formData.Issue,
      });

      console.log(result);

      // setValues((prev) => [...prev, result]);

      setSuccessMsg("Support Request has been created: " + result.supportId);
      setShowModal(true);
      // inputRef.current.resetForm();
    } catch (error) {
      console.error("Error creating support ticket", error);
      throw error;
    }
  };
  if (!user) return <p>Loading user details...</p>;
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

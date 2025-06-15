import React, { useRef } from "react";
import Button from "../Buttons/Button";

import Input from "../Editors/Input";
import { AddLink } from "../../DevLinkApi/linksdata";
import authservice from "../../appwrite/auth";

function AddLinks() {
  const fields = [
    { name: "Title", label: "Title", required: true },
    { name: "URL", label: "URL", required: true, type: "url" },
    { name: "Category", label: "Category", required: false },
    {
      name: "Description",
      label: "Description",
      required: false,
      size: "large",
    },
  ];

  const inputRef = useRef();

  const handleSubmit = async () => {
    try {
      const user = await authservice.getCurrentUser();
      const userId = user?.email;
      const formData = inputRef.current.getFormData();
      const data = {
        ...formData,
        UserId: userId,
        Date: new Date().toISOString(),
      };
      await AddLink(data);
      alert("Details added successfully");
    } catch (error) {
      console.error("Error adding details", error);
      alert("Failed to add link");
    }
  };

  // const handleSubmit = async () => {
  //   const formData = inputRef.current.getFormData();
  //   try {
  //     await appwriteservice.createPost(formData);
  //     alert("Details added successfully");
  //     inputRef.current.resetForm();
  //   } catch (error) {
  //     console.error("Error adding details", error);
  //     throw error;
  //   }
  // };

  return (
    <div>
      <label className="text-3xl font-bold text-black">Add Link</label>
      <Input ref={inputRef} fields={fields} />

      <Button type="button" onClick={handleSubmit}>
        Add
      </Button>
    </div>
  );
}

export default AddLinks;

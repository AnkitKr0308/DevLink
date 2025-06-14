import React, { useRef } from "react";
import Button from "../Buttons/Button";
import appwriteservice from "../../appwrite/AppwriteService";
import Input from "../Editors/Input";

function AddLinks() {
  const fields = [
    { name: "Title", label: "Title", required: true },
    { name: "URL", label: "URL", required: true, type: "url" },
    { name: "Tags", label: "Tags", required: false },
    {
      name: "Description",
      label: "Description",
      required: false,
      size: "large",
    },
  ];

  const inputRef = useRef();

  const handleSubmit = async () => {
    const formData = inputRef.current.getFormData();
    try {
      await appwriteservice.createPost(formData);
      alert("Details added successfully");
      inputRef.current.resetForm();
    } catch (error) {
      console.error("Error adding details", error);
      throw error;
    }
  };

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

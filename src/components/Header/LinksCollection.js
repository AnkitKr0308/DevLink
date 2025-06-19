import React, { useState, useEffect, useRef } from "react";
import { GetLinkbyUser, UpdateLinkData } from "../../DevLinkApi/linksdata";
import authservice from "../../appwrite/auth";
import DataTable from "../DataTable";
import { Link } from "react-router-dom";
import Button from "../Buttons/Button";
import Modal from "../Editors/Modal";
import Input from "../Editors/Input";
import { AddLink, DeleteLink } from "../../DevLinkApi/linksdata";

function LinksCollection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [editingData, SetEditingData] = useState(null);

  const handleDelete = async (id) => {
    const result = await DeleteLink(id);
    if (result === "Deleted successfully") {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const loadModal = () => {
    setShowModal(true);
  };

  const fields = [
    {
      name: "Title",
      label: "Title",
      id: "title",
      required: true,
    },
    { name: "URL", label: "URL", id: "url", required: true, type: "url" },
    { name: "Category", label: "Category", id: "category", required: false },
    {
      name: "Description",
      label: "Description",
      id: "description",
      required: false,
      size: "large",
    },
  ];

  const inputRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await authservice.getCurrentUser();
        const userId = user.email;
        const linkData = await GetLinkbyUser(userId, searchData);
        if (linkData) {
          setData(linkData);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchData]);

  const columns = [
    { label: "URL", id: "url", type: "link", isExternal: true },
    { label: "Title", id: "title" },
    { label: "Description", id: "description" },
    { label: "Category", id: "category" },
  ];

  const submitModal = async () => {
    try {
      const user = await authservice.getCurrentUser();
      const userId = user?.email;
      const formData = inputRef.current.getFormData();

      if (editingData) {
        const updatedData = {
          ...editingData,
          ...formData,
          UserId: userId,
          Date: new Date().toISOString(),
        };

        const result = await UpdateLinkData(editingData.id, updatedData);
        if (result) {
          setData((prev) =>
            prev.map((item) => (item.id === editingData.id ? result : item))
          );
          alert("Details updated successfully");
        } else {
          alert("Failed to update");
        }
      } else {
        const newData = {
          ...formData,
          UserId: userId,
          Date: new Date().toISOString(),
        };
        const result = await AddLink(newData);
        setData((prev) => [...prev, result]);
        setShowModal(false);
        alert("Details added successfully");
      }
    } catch (error) {
      console.error("Error saving details", error);
      alert("Failed to save link");
    } finally {
      setShowModal(false);
      SetEditingData(null);
    }
  };

  const handleEditBtn = async (id) => {
    const selectedItem = data.find((item) => item.id === id);
    SetEditingData(selectedItem);
    setShowModal(true);
  };

  return (
    <div className="mt-40 mb-10">
      <div className="flex space-x-3 mb-4 justify-center">
        <input
          type="search"
          id="search"
          onChange={(e) => setSearchData(e.target.value.trim())}
          className="block w-1/2 h-11 px-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Type here to Search..."
        />
        <Button onClick={loadModal}>Add New Link</Button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <DataTable
          columns={columns}
          data={data}
          loading={loading}
          rowkey="id"
          actions={(data) => (
            <div className="flex space-x-4">
              <Link
                onClick={() => handleEditBtn(data.id)}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </Link>

              <Link
                onClick={() => handleDelete(data.id)}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Delete
              </Link>
            </div>
          )}
        />

        {showModal && (
          <Modal header="Add a new link" onClose={() => setShowModal(false)}>
            <Input
              ref={inputRef}
              fields={fields}
              defaultValues={editingData}
              labelColor="text-white"
            />
            <div className="text-right">
              <button
                onClick={submitModal}
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
              >
                Save
              </button>{" "}
              <button
                onClick={() => {
                  setShowModal(false);
                  SetEditingData(null);
                }}
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
              >
                Cancel
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
export default LinksCollection;

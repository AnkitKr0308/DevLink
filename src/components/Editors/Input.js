import React, { useState } from "react";
import Button from "../Buttons/Button";
import appwriteservice from "../../appwrite/AppwriteService";

function Input() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTag] = useState("");
  const [desc, setDesc] = useState("");

  const addlink = async (e) => {
    e.preventDefault();
    const postData = {
      Title: title,
      URL: url,
      Tags: tags,
      Description: desc,
    };
    try {
      await appwriteservice.createPost(postData);
      alert("Details added successfully");
      setTag("");
      setTitle("");
      setUrl("");
      setDesc("");
    } catch (error) {
      console.error("Error adding details", error);
      throw error;
    }
  };

  return (
    <form onSubmit={addlink}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="tag"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tags
          </label>
          <input
            type="text"
            id="tag"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tech"
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="url"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          URL
        </label>
        <input
          type="url"
          id="url"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="https://example.com"
          required
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="decription"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          onChange={(e) => setDesc(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <Button type="submit">Add</Button>
    </form>
  );
}

export default Input;

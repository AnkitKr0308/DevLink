import React, { useState, useEffect } from "react";
import appwriteservice from "../../appwrite/AppwriteService";
import { Link } from "react-router-dom";

function LinksCollection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const linkData = await appwriteservice.fetchDetails();
        if (linkData) {
          setData(linkData.documents);
        }
      } catch (error) {
        console.error("Error fetching data", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-40">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                URL
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Tags
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No Data found
                </td>
              </tr>
            ) : 
            (
              data.map((data) => (
                <tr
                  key={data.$id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                >
                  <td className="px-6 py-4">
                    <Link
                      to={data.URL}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data.URL}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{data.Title}</td>
                  <td className="px-6 py-4">{data.Description}</td>
                  <td className="px-6 py-4">{data.Tags}</td>
                  <td>
                    <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default LinksCollection;

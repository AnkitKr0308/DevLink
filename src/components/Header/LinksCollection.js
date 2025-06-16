import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { GetLinkbyUser } from "../../DevLinkApi/linksdata";
import authservice from "../../appwrite/auth";
import DataTable from "../DataTable";

function LinksCollection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await authservice.getCurrentUser();
        const userId = user.email;
        // const linkData = await appwriteservice.fetchDetails();
        const linkData = await GetLinkbyUser(userId);
        if (linkData) {
          setData(linkData);

          console.log("Fetched link data:", linkData);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { label: "URL", id: "url", type: "link" },
    { label: "Title", id: "title" },
    { label: "Description", id: "desc" },
    { label: "Category", id: "category" },
  ];

  return (
    <div className="mt-40">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <DataTable
          columns={columns}
          data={data}
          loading={loading}
          // actions={(row) => (
          //   <Link
          //     // to={`/edit/${row.id}`}
          //     className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          //   ></Link>
          // )}
        />
      </div>
    </div>
  );
}
export default LinksCollection;

import React from "react";
import { Link } from "react-router-dom";

function DataTable({ columns, data, loading = false, actions, baseLink = "" }) {
  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((col) => (
              <th key={col.id} scope="col" className="px-9 py-3">
                {col.label}
              </th>
            ))}
            {actions && (
              <th scope="col" className="px-9 py-3">
                Actions
              </th>
            )}
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
          ) : (
            data.map((data) => (
              <tr
                key={data.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              >
                {columns.map((col) => (
                  <td key={col.id} className="px-9 py-4">
                    {col.type === "link" ? (
                      <Link
                        to={`${baseLink}/${data[col.id]}`}
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {data[col.id]}
                      </Link>
                    ) : (
                      data[col.id]
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;

import React, { useState } from "react";
import { Link } from "react-router-dom";

function DataTable({
  columns,
  data,
  loading = false,
  actions,
  baseLink = "",
  rowkey = "",
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const safeData = Array.isArray(data) ? data : [];
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = safeData.slice(startIndex, startIndex + rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

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
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center py-4"
              >
                Loading...
              </td>
            </tr>
          ) : paginatedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center py-4"
              >
                No Data found
              </td>
            </tr>
          ) : (
            paginatedData.map((dataItem) => (
              <tr
                key={dataItem[rowkey]}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              >
                {columns.map((col) => (
                  <td key={col.id} className="px-9 py-4">
                    {col.type === "link" ? (
                      col.isExternal ? (
                        <Link
                          to={dataItem[col.id]}
                          className="text-blue-500 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {dataItem[col.id]}
                        </Link>
                      ) : (
                        <Link
                          to={`${baseLink}/${dataItem[col.id]}`}
                          className="text-blue-500 hover:underline"
                          onClick={(e) => {
                            if (col.onClick) {
                              e.preventDefault();
                              col.onClick(dataItem);
                            }
                          }}
                        >
                          {dataItem[col.id]}
                        </Link>
                      )
                    ) : (
                      dataItem[col.id]
                    )}
                  </td>
                ))}
                {actions && <td className="px-9 py-4">{actions(dataItem)}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 px-6 py-3 flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
        <div>
          {currentPage > 1 && (
            <button
              onClick={handlePrevious}
              className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600"
            >
              ❮ Prev
            </button>
          )}
        </div>
        <div>{totalPages > 0 ? `${currentPage}/${totalPages}` : ""}</div>
        <div>
          {currentPage < totalPages && (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600"
            >
              Next ❯
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataTable;

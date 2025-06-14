import React from "react";

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center border-b pb-3 mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Request Submitted!
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ×
          </button>
        </div>
        <div className="text-gray-700 dark:text-gray-300 mb-4">{children}</div>
        <div className="text-right">
          <button
            onClick={onClose}
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

import React from "react";

function Drawer({ isOpen, onClose, children, label = "" }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[33vw] bg-gray-300 z-50 shadow-lg transform transition-transform duration-300${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>
        <label className="font-semibold">{label}</label>
        <div className="p-4 overflow-y-auto h-full">{children}</div>
      </div>
    </>
  );
}

export default Drawer;

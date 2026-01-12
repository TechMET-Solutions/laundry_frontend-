import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

function EditArea({ onClose }) {
  const [isActive, setIsActive] = useState(true);

  

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] rounded-xl px-6 py-5 relative shadow-lg">

        {/* Close */}
        <IoIosClose
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl cursor-pointer"
        />

        {/* Title */}
        <h2 className="text-lg font-semibold mb-5">Edit Area</h2>

        {/* Row 1 */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="text-sm font-medium">
              Emirate<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Emirate"
              className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium">
              Code<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Code"
            className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="text-sm font-medium">
            Emirates<span className="text-red-500">*</span>
          </label>
          <select className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300">
            <option>Choose Emirates</option>
            <option>United Arab Emirates</option>
            <option>India</option>
          </select>
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-3 mb-6">
          <div
            onClick={() => setIsActive(!isActive)}
            className={`w-10 h-5 flex items-center rounded-full cursor-pointer ${
              isActive ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                isActive ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </div>
          <span className="text-sm">Is Active?</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border rounded-md text-sm"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-md text-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditArea;

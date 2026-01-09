import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

function AddNewEmployee({ onClose, role }) {
  const [selectedRole, setSelectedRole] = useState(role || "");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {/* Modal */}
      <div className="bg-white w-[900px] max-h-[90vh] overflow-y-auto rounded-[10px] p-6 shadow-lg relative">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Add Employee
          </h2>
          <button onClick={onClose}>
            <IoIosClose className="w-9 h-9 text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* Form */}
        <form className="grid grid-cols-3 gap-x-6 gap-y-4">

          {/* First Name */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Select Role <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] bg-white outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="">Select Role</option>
              <option>Supervisor</option>
              <option>Driver</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="********"
              className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              D.O.B
            </label>
            <input
              type="date"
              className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Hire Date */}
          <div>
            <label className="text-sm text-gray-600 font-medium">
              Hire Date
            </label>
            <input
              type="date"
              className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Vehicle ID (Driver Only) */}
          {selectedRole === "Driver" && (
            <div>
              <label className="text-sm text-gray-600 font-medium">
                Vehicle ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Vehicle ID"
                className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          )}

          {/* License Number (Driver Only) */}
          {selectedRole === "Driver" && (
            <div>
              <label className="text-sm text-gray-600 font-medium">
                License Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="License Number"
                className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          )}

          {/* Address */}
          <div className="col-span-2">
            <label className="text-sm text-gray-600 font-medium">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-between items-center mt-8">

          {/* Toggle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-5 bg-indigo-500 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5" />
            </div>
            <span className="text-sm text-gray-600">Is Active?</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm border border-indigo-500 text-indigo-600 rounded-[8px] hover:bg-indigo-50"
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 text-sm bg-indigo-600 text-white rounded-[8px] hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AddNewEmployee;

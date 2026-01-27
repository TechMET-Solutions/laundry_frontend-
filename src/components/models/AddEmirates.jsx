import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { createEmirate, updateEmirate } from "../../api/location_management";

function AddEmirates({ onClose, onSuccess, mode = "add", emirateData }) {
  const isView = mode === "view";
  const isEdit = mode === "edit";

  const [isActive, setIsActive] = useState(true);
  const [form, setForm] = useState({
    emirate: "",
    code: "",
    country: "",
    status: true,
  });

  // 🔥 Pre-fill for edit/view
  useEffect(() => {
    if (emirateData && (isEdit || isView)) {
      setForm({
        emirate: emirateData.emirate,
        code: emirateData.code,
        country: emirateData.country,
        status: emirateData.status === 1,
      });
      setIsActive(emirateData.status === 1);
    }
  }, [emirateData, isEdit, isView]);

  const handleChange = (e) => {
    if (isView) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (isView) return;

    if (!form.emirate || !form.code || !form.country) {
      alert("Fill all required fields");
      return;
    }

    const payload = {
      ...form,
      status: form.status ? 1 : 0,
    };

    try {
      if (isEdit) {
        await updateEmirate(emirateData.id, payload);
      } else {
        await createEmirate(payload);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save emirate");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl px-6 py-5 relative shadow-lg mx-4">

        <IoIosClose
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl cursor-pointer hover:text-gray-700"
        />

        <h2 className="text-lg font-semibold mb-5 capitalize">
          {mode} Emirates
        </h2>

        {/* Row 1 - Emirate and Code */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="text-sm font-medium">
              Emirates Name<span className="text-red-500">*</span>
            </label>
            <input
              name="emirate"
              value={form.emirate}
              onChange={handleChange}
              disabled={isView}
              placeholder="Emirates Name"
              className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300 disabled:bg-gray-100"
            />
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium">
              Code<span className="text-red-500">*</span>
            </label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              disabled={isView}
              placeholder="Code"
              className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300 disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="text-sm font-medium">
            Country<span className="text-red-500">*</span>
          </label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            disabled={isView}
            className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300 disabled:bg-gray-100"
          >
            <option value="">Choose Country</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="India">India</option>
          </select>
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-3 mb-6">
          <div
            onClick={() => {
              if (isView) return;
              setIsActive(!isActive);
              setForm({ ...form, status: !form.status });
            }}
            className={`w-10 h-5 rounded-full relative cursor-pointer transition ${
              isActive ? "bg-green-500" : "bg-gray-300"
            } ${isView ? "cursor-not-allowed" : ""}`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                isActive ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </div>
          <span className="text-sm font-medium">{isActive ? "Active" : "Inactive"}</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          {!isView && (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition"
            >
              {isEdit ? "Update" : "Save"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddEmirates;

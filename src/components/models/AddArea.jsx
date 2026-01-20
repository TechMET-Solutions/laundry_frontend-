import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import{ createArea} from "../../api/area";

function AddArea({ onClose, onSuccess }) {

  const [isActive, setIsActive] = useState(true);
const [form, setForm] = useState({
      area: "",
      emirates:"",
      radius: "",
      country: "",
      status: true,
    });
    
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async () => {
      if (!form.area || !form.emirates || !form.radius || !form.country) {
      alert("Fill all required fields");
      return;
    }
    try {
      await createArea({
      area: form.area,              
      emirates: form.emirates,
      radius: form.radius,
      country: form.country,
      status: form.status ? 1 : 0,
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating area:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] rounded-xl px-6 py-5 relative shadow-lg">

        {/* Close */}
        <IoIosClose
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl cursor-pointer"
        />

        {/* Title */}
        <h2 className="text-lg font-semibold mb-5">Add Area</h2>

        {/* Row 1 */}
        <div className="flex gap-4 mb-4">
        <div className="flex-1">
            <label className="text-sm font-medium">
              Area Name<span className="text-red-500">*</span>
            </label>
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              placeholder="Area Name"
              className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300"
            />
        </div>


          <div className="flex-1">
            <label className="text-sm font-medium">
              Emirate<span className="text-red-500">*</span>
            </label>
            <input
              name="emirates"
              value={form.emirates}
              onChange={handleChange}
              placeholder="Emirate"
              className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium">
              Radius<span className="text-red-500">*</span>
            </label>
            <input
              name="radius"
              value={form.radius}
              onChange={handleChange}
              placeholder="radius"
            className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300"
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
  className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300"
>
  <option value="">Choose Country</option>
  <option value="United Arab Emirates">United Arab Emirates</option>
  <option value="India">India</option>
  <option value="Antarctica">Antarctica</option>
  <option value="Antigua And Barbuda">Antigua And Barbuda</option>
</select>

        </div>

        {/* Toggle */}
        <div className="flex items-center gap-3 mb-6">
        <div
        onClick={() => {
          setIsActive(!isActive);
          setForm({ ...form, status: !form.status });
        }}

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
          <button onClick={handleSubmit} className="px-6 py-2 bg-indigo-600 text-white rounded-md text-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddArea;

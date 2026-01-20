import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import{ createEmirate} from "../../api/location_management";

function AddEmirates({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    country: "",
    status: true,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.code || !form.country) {
      alert("Fill all required fields");
      return;
    }

    try {
      await createEmirate({
      emirate: form.name,              
      code: form.code,
      country: form.country,
      status: form.status ? 1 : 0,     
});

      onSuccess(); // refresh list
      onClose();   // close modal
    } catch (err) {
      console.error(err);
      alert("Failed to add emirate");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] rounded-xl px-6 py-5 relative">

        <IoIosClose
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl cursor-pointer"
        />

        <h2 className="text-lg font-semibold mb-5">Add Emirates</h2>

        <div className="flex gap-4 mb-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Emirate"
            className="w-full border p-2 rounded"
          />

          <input
            name="code"
            value={form.code}
            onChange={handleChange}
            placeholder="Code"
            className="w-full border p-2 rounded"
          />
        </div>

        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="">Choose Country</option>
          <option value="United Arab Emirates">United Arab Emirates</option>
          <option value="India">India</option>
        </select>

        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            checked={form.status}
            onChange={() =>
              setForm({ ...form, status: !form.status })
            }
          />
          <span>Is Active?</span>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEmirates;

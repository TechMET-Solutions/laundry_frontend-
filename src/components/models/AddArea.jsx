import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { createArea, updateArea } from "../../api/area";
import { COUNTRIES } from "../../constants/countries";
import { getAllEmiratesFetch } from "../../api/location_management";

function AddArea({ onClose, onSuccess, mode = "add", areaData }) {
  const isView = mode === "view";
  const isEdit = mode === "edit";

  const [isActive, setIsActive] = useState(true);
  const [isEmirates, setIsEmirates] = useState([]);
  const [form, setForm] = useState({
    area: "",
    emirates: "",
    country: "",
    status: true,
  });


  // 🔥 Pre-fill for edit/view
  useEffect(() => {
    if (areaData && (isEdit || isView)) {
      setForm({
        area: areaData.area || "",
        emirates: areaData.emirates || "",
        country: areaData.country || "",
        status: areaData.status === 1,
      });
      setIsActive(areaData.status === 1);
    }
  }, [areaData, isEdit, isView]);

  const handleChange = (e) => {
    if (isView) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (isView) return;

    if (!form.area || !form.emirates || !form.country) {
      alert("Fill all required fields");
      return;
    }

    const payload = {
      ...form,
      status: form.status ? 1 : 0,
    };

    try {
      if (isEdit) {
        await updateArea(areaData.id, payload);
      } else {
        await createArea(payload);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // emirates fetch
  useEffect(() => {
    const fetchEmirates = async () => {
      try {
        const res = await getAllEmiratesFetch();
        const activeEmirates = (res.data.data || []).filter(
          (item) => Number(item.status) !== 0
        );
        setIsEmirates(activeEmirates);
      } catch (error) {
        console.error("Failed to fetch emirates", error);
      }
    };

    fetchEmirates();
  }, []);


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] rounded-xl px-6 py-5 relative shadow-lg">

        <IoIosClose
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl cursor-pointer"
        />

        <h2 className="text-lg font-semibold mb-5 capitalize">
          {mode} Area
        </h2>

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
              disabled={isView}
              placeholder="Area Name"
              className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] outline-none focus:ring-2 focus:ring-indigo-300 disabled:bg-gray-100"
            />
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium">
              Emirate<span className="text-red-500">*</span>
            </label>
            <select
              name="emirates"
              value={form.emirates}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-sm border border-[#BEC3E4]"
            >
              <option value="">Emirates</option>
              {isEmirates.map((item) => (
                <option key={item.id} value={item.emirate}>
                  {item.emirate}
                </option>
              ))}
            </select>
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

            {COUNTRIES.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>


        <div className="flex items-center gap-3 mb-6">
          <div
            onClick={() => {
              if (isView) return;

              const newStatus = !isActive;
              setIsActive(newStatus);
              setForm({ ...form, status: newStatus });
            }}
            className={`w-10 h-5 rounded-full relative cursor-pointer transition 
      ${isActive ? "bg-green-500" : "bg-gray-300"}`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all
        ${isActive ? "right-0.5" : "left-0.5"}`}
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

          {!isView && (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md text-sm"
            >
              {isEdit ? "Update" : "Save"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddArea;

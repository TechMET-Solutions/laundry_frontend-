import React, { useEffect, useState } from "react";
import { createCollection, updateCollection } from "../../api/collection";

const AddCollectionModal = ({ mode, collection, onClose, onSuccess }) => {
  const isView = mode === "view";
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    collection_type: "CLOTH",
    customer_type: "",
    customer_id: "",
    pickup_date: "",
    time_slot: "",
    phone_number: "",
    driver_id: "",
    comments: "",
  });

  useEffect(() => {
    if (collection) {
      setForm({
        collection_type: collection.collection_type || "CLOTH",
        customer_type: collection.customer_type || "",
        customer_id: collection.customer_id || "",
        pickup_date: collection.pickup_date || "",
        time_slot: collection.time_slot || "",
        phone_number: collection.phone_number || "",
        driver_id: collection.driver_id || "",
        comments: collection.comments || "",
      });
    }
  }, [collection]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type) => {
    setForm((prev) => ({
      ...prev,
      collection_type: type,
      customer_type: type === "PAYMENT" ? "" : prev.customer_type,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      console.log(collection);

      await updateCollection(collection.id, form);
    } else {
      await createCollection(form);
    }

    onSuccess?.();
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"></div>

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-[520px] rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-lg font-semibold mb-4">
            {isView ? "View Collection" : isEdit ? "Edit Collection" : "Add Collection"}
          </h2>

          {/* Collection Type */}
          <div className="flex gap-6 mb-4 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={form.collection_type === "CLOTH"}
                onChange={() => handleTypeChange("CLOTH")}
                disabled={isView}
              />
              Cloth Collection
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={form.collection_type === "PAYMENT"}
                onChange={() => handleTypeChange("PAYMENT")}
                disabled={isView}
              />
              Payment Collection
            </label>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {form.collection_type === "CLOTH" && (
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Customer Type
                </label>
                <select
                  name="customer_type"
                  value={form.customer_type}
                  onChange={handleChange}
                  disabled={isView}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select Customer Type</option>
                  <option value="Individual">Individual</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Customer Id <span className="text-red-500">*</span>
              </label>
              <input
                name="customer_id"
                value={form.customer_id}
                onChange={handleChange}
                disabled={isView}
                placeholder="Customer ID"
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Pickup Date
              </label>
              <input
                type="date"
                name="pickup_date"
                value={form.pickup_date}
                onChange={handleChange}
                disabled={isView}
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Time Slot
              </label>
              <select
                name="time_slot"
                value={form.time_slot}
                onChange={handleChange}
                disabled={isView}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Time Slot</option>
                <option>03 PM - 04 PM</option>
                <option>04 PM - 05 PM</option>
                <option>05 PM - 06 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                disabled={isView}
                placeholder="10-digit phone number"
                pattern="^[0-9]{10}$"
                inputMode="numeric"
                maxLength={10}
                required
                title="Phone number must be exactly 10 digits"
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Driver Id <span className="text-red-500">*</span>
              </label>
              <input
                name="driver_id"
                value={form.driver_id}
                onChange={handleChange}
                disabled={isView}
                placeholder="Driver ID"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-600 font-medium mb-1">Comments</label>
            <textarea
              name="comments"
              value={form.comments}
              onChange={handleChange}
              disabled={isView}
              className="border w-full p-2 rounded"
              placeholder="Comments"
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>

            {!isView && (
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                {isEdit ? "Update" : "Save"}
              </button>
            )}
          </div>
        </form>
      </div>
    </>

  );
};

export default AddCollectionModal;

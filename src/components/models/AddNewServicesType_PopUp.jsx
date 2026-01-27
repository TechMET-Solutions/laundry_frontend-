import Button from "../../components/ui/Button";
import InputWithDropdown from "../../components/ui/DropDownInputField";
import InputField from "../../components/ui/InputField";
import ToggleButton from "../../components/ui/ToggleButton";
import { createServiceType } from "../../api/servicesapi";
import { updateServiceType } from "../../api/servicesapi";
import { useState, useEffect, useRef } from "react";

export default function AddNewServicesType_PopUp({
  onClose,
  onAdd,
  editData = null,
}) {
  const fileInputRef = useRef(null);
  const [name, setName] = useState(editData?.name || "");
  const [abbreviation, setAbbreviation] = useState(
    editData?.abbreviation || "",
  );
  const [icon, setIcon] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState(editData?.status ?? 1);
  const [loading, setLoading] = useState(false);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIcon(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!name || !abbreviation) {
      alert("Please fill all required fields");
      return;
    }

    if (!editData && !icon) {
      alert("Please select an icon image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("abbreviation", abbreviation);
      formData.append("status", status);

      // Only append icon if it's a File object (new upload)
      if (icon instanceof File) {
        formData.append("addIcon", icon);
      }

      const res = editData
        ? await updateServiceType(editData.id, formData)
        : await createServiceType(formData);

      if (!res.data.success) throw new Error("API failed");

      if (!editData) {
        onAdd(res.data.data); // ADD
      } else {
        onAdd(); //Edit
      }

      onClose();
    } catch (err) {
      console.error("Save failed:", err);
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setAbbreviation(editData.abbreviation);
      setStatus(editData.status);
      // For edit mode, set existing icon path if available
      if (editData.addIcon) {
        setImagePreview(
          `http://localhost:5000/uploads/services/${editData.addIcon}`,
        );
      }
    }
  }, [editData]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Modal */}
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 shadow-2xl">
        {/* Header */}
        <h2 className="mb-8 text-lg font-semibold text-gray-800">
          {/* Add Service Type */}
          {editData ? "Edit Service Type" : "Add Service Type"}
        </h2>

        {/* Form */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-8">
          <InputField
            label="Service Type Name"
            placeholder="Service Type Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <InputField
            label="Abbreviation"
            placeholder="Abbreviation"
            required
            value={abbreviation}
            onChange={(e) => setAbbreviation(e.target.value)}
          />
        </div>

        {/* Icon Upload */}
        <div className="mt-6 flex items-center gap-6">
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Add Icon {!editData && <span className="text-red-500">*</span>}
            </label>
            <button
              type="button"
              onClick={handleIconClick}
              className="w-full rounded-lg border-2 border-sky-200 bg-sky-50 px-4 py-2
              text-sm font-medium text-sky-600 hover:bg-sky-100
              focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400
              flex items-center justify-center gap-2 transition"
            >
              <span className="text-lg">+</span>
              Add Service Type Icon
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {imagePreview && (
            <div className="h-20 w-20 rounded-lg border bg-gray-100 p-1">
              <img
                src={imagePreview}
                alt="Icon Preview"
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3  mt-4 ">
          <ToggleButton
            label="Is Active"
            checked={status === 1}
            onChange={(val) => setStatus(val ? 1 : 0)}
          />
        </div>

        {/* Footer */}
        {/* <div className="mt-10 flex items-center justify-center gap-6">
         <Button btnText="Cancel" variant="outline" onClick={onClose} />
            <Button btnText="Save" variant="primary" />
        </div> */}

        <div className="mt-10 flex items-center justify-center gap-6">
          <Button btnText="Cancel" variant="outline" onClick={onClose} />
          <Button
            btnText={loading ? "Saving..." : "Save"}
            variant="primary"
            onClick={handleSave}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}

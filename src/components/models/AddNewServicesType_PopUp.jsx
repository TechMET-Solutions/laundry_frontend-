
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import ToggleButton from "../../components/ui/ToggleButton";
import { createServiceType, updateServiceType } from "../../api/servicesapi";
import { useState, useEffect } from "react";

export default function AddNewServicesType_PopUp({ onClose, onAdd, editData = null }) {
  const [name, setName] = useState(editData?.name || "");
  const [abbreviation, setAbbreviation] = useState(editData?.abbreviation || "");
  const [status, setStatus] = useState(editData?.status ?? 1);
  const [image, setImage] = useState(null); // Holds the file object
  const [preview, setPreview] = useState(editData?.image || null); // For UI preview
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show preview of selected image
    }
  };

  const handleSave = async () => {
    if (!name || !abbreviation) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      // USE FORMDATA FOR FILE UPLOADS
      const formData = new FormData();
      formData.append("name", name);
      formData.append("abbreviation", abbreviation);
      formData.append("status", status);
      if (image) {
        formData.append("image", image); // 'image' matches the name in upload.single('image')
      }

      const res = editData
        ? await updateServiceType(editData.id, formData) // Pass FormData
        : await createServiceType(formData); // Pass FormData

      if (!res.data.success) throw new Error("API failed");

      console.log("Response Data:", res.data);

      if (!editData) {
        onAdd(res.data.data);
      } else {
        onAdd();
      }

      onClose();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Error saving data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setAbbreviation(editData.abbreviation);
      setStatus(editData.status);
      setPreview(editData.image ? `http://localhost:5000/${editData.image}` : null); // Adjust base URL
    }
  }, [editData]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 shadow-2xl">
        <h2 className="mb-8 text-lg font-semibold text-gray-800">
          {editData ? "Edit Service Type" : "Add Service Type"}
        </h2>

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

        {/* IMAGE UPLOAD FIELD */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Image</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="h-12 w-12 rounded-md object-cover border"
              />
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <ToggleButton
            label="Is Active"
            checked={status === 1}
            onChange={(val) => setStatus(val ? 1 : 0)}
          />
        </div>

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
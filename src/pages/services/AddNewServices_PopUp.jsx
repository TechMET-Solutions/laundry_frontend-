import { useEffect, useState, useRef } from "react";
import Button from "../../components/ui/Button";
import { createNewServiceList, updateServiceList } from "../../api/servicelist";
import ToggleButton from "../../components/ui/ToggleButton";
import {
  getAllServicesType,
  getAllServicesCategory,
} from "../../api/servicesapi";
import { preview } from "vite";

const AddServices_PopUp = ({ mode, onClose, serviceData, setRefresh }) => {
  const isEditMode = mode === "edit";
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [serviceTypes, setServiceTypes] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    addIcon: "",
    category: "",
    type: "",
    price: "",
    status: 0,
  });

  // 🔹 If edit mode → prefill data
  useEffect(() => {
    if (serviceData) {
      setFormData({
        name: serviceData.name,
        addIcon: serviceData.addIcon,
        category: serviceData.category,
        type: serviceData.type,
        price: serviceData.price,
        status: serviceData.status || 0,
      });
       
    }
  }, [serviceData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      setFormData((prev) => ({ ...prev, addIcon: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    payload.append("name", formData.name);
    payload.append("category", formData.category);
    payload.append("type", formData.type);
    payload.append("price", formData.price);
    payload.append("status", formData.status);
    payload.append("addIcon", formData.addIcon);  

    // append file ONLY if user selected a new one
    // if (formData.addIcon instanceof File) {
    //   payload.append("addIcon", formData.addIcon);
    // }

    try {
      if (mode === "edit") {
        await updateServiceList(serviceData.id, payload);
         
      } else {
        await createNewServiceList(payload);
      }

      setRefresh((prev) => !prev);
      onClose();
    } catch (error) {
      console.error("Service save error:", error);
      alert(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const fetchServiceTypes = async () => {
      const getAllServicesTypesData = await getAllServicesType();
      setServiceTypes(getAllServicesTypesData.data.data || []);
      const getAllServicesCategoriesData = await getAllServicesCategory();
      setServiceCategories(getAllServicesCategoriesData.data.data || []);
    };

    fetchServiceTypes();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-lg font-semibold text-gray-800">
          {isEditMode ? "Edit Service" : "Add Service"}
        </h2>

        <form onSubmit={handleSubmit} className=" flex flex-col gap-6   ">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_160px_100px]">
            {/* // Service Name – grows */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Service Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={handleChange}
                name="name"
                placeholder="Service Name"
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm
                   focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            {/* // Add Icon Button – fixed width */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Add Icon
              </label>
              <button
                type="button"
                onClick={handleIconClick}
                className="w-full rounded-lg border-2 border-sky-200 bg-sky-50 px-4 py-2
                   text-sm font-medium text-sky-600 hover:bg-sky-100
                   focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400
                   flex items-center justify-center gap-2 transition-colors"
              >
                <span className="text-lg leading-none">+</span>
                <span>Add Icon</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {/* // Image Preview – fixed square */}
            {mode==="edit" ? (<div className="flex items-end justify-center ">
              
                <div className="h-18 w-18 flex items-center justify-center bg-white">
                  <img
                    src={`http://localhost:5000/uploads/services/${formData.addIcon}`}
                    alt="Icon Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              
            </div>) : imagePreview &&(<div className="flex items-end justify-center ">
              
                <div className="h-18 w-18 flex items-center justify-center bg-white">
                  <img
                    src={imagePreview}
                    alt="Icon Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              
            </div>)}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.category}
                onChange={handleChange}
                name="category"
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm text-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Choose Category
                </option>
                {serviceCategories.map((el) => {
                  return (
                    <option key={el.id} value={el.name}>
                      {el.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Service Type <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.type}
                onChange={handleChange}
                name="type"
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm text-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Choose Service Type
                </option>
                {serviceTypes.map((el) => {
                  return (
                    <option key={el.id} value={el.name}>
                      {el.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              pattern="^[0-9]+(\.[0-9]{1,2})?$"
              title="Enter a valid price (e.g., 100 or 100.50)"
              value={formData.price}
              onChange={handleChange}
              name="price"
              placeholder="0.00"
              className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm text-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Footer */}
          <div className="col-span-1 flex justify-between gap-6 md:col-span-2">
            <ToggleButton
              label="Active"
              checked={formData.status === 1}
              onChange={(isOn) =>
                setFormData((prev) => ({
                  ...prev,
                  status: isOn ? 1 : 0,
                }))
              }
            />
            <div className="flex gap-4">
              <Button onClick={onClose} btnText="Cancel" variant="outline" />
              <Button
                type="submit"
                btnText={isEditMode ? "Update" : "Save"}
                variant="primary"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServices_PopUp;

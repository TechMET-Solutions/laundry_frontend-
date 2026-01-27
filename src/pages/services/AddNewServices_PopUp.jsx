import { useEffect, useState, useRef } from "react";
import Button from "../../components/ui/Button";
import { createNewServiceList, updateServiceList } from "../../api/servicelist";
import ToggleButton from "../../components/ui/ToggleButton";
import {
  getAllServiceTypes,
  getAllServicesCategory,
} from "../../api/servicesapi";

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
    status: 1, // Default to Active
    sorting_order: "", // Added missing field
    sqf_status: 0      // Added missing field
  });

  const [services, setServices] = useState([{ type: "", price: "" }]);

  // Update useEffect for edit mode
  useEffect(() => {
    if (serviceData) {
      setFormData({
        name: serviceData.name || "",
        addIcon: serviceData.addIcon || "",
        category: serviceData.category || "",
        status: serviceData.status ?? 1,
        sorting_order: serviceData.sorting_order || "",
        sqf_status: serviceData.sqf_status ?? 0
      });
      setServices(serviceData.service_types || [{ type: "", price: "" }]);
    }
  }, [serviceData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addService = () => {
    setServices((prev) => [...prev, { type: "", price: "" }]);
  };

  const removeService = (index) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleServiceChange = (index, field, value) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
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
    payload.append("sorting_order", formData.sorting_order);
    payload.append("sqf_status", formData.sqf_status);
    payload.append("status", formData.status);

    // Send the array of services as a string
    payload.append("services", JSON.stringify(services));

    if (formData.addIcon instanceof File) {
      payload.append("addIcon", formData.addIcon);
    }

    try {
      if (mode === "edit") {
        await updateServiceList(serviceData.id, payload);
      } else {
        await createNewServiceList(payload);
      }
      setRefresh(prev => !prev);
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchServiceTypes = async () => {
      const getAllServicesTypesData = await getAllServiceTypes();
      // {console.log(getAllServicesTypesData);}
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
            {mode === "edit" ? (
              <div className="flex items-end justify-center ">
                <div className="h-18 w-18 flex items-center justify-center bg-white">
                  <img
                    src={`http://localhost:5000/uploads/services/${formData.addIcon}`}
                    alt={formData.name}
                  />
                </div>
              </div>
            ) : (
              imagePreview && (
                <div className="flex items-end justify-center ">
                  <div className="h-18 w-18 flex items-center justify-center bg-white">
                    <img
                      src={imagePreview}
                      alt="Icon Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                Shorting Order <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.shorting_order}
                onChange={handleChange}
                name="shorting_order"
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm text-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="" disabled>Choose Shorting Order</option>
                <option value="51">51</option>
                <option value="52">52</option>
                <option value="53">53</option>
                <option value="54">54</option>
                <option value="55">55</option>
              </select>
            </div>
             <ToggleButton
              label="Active SQF"
              checked={formData.sqf_status === 1}
              onChange={(isOn) => setFormData(p => ({ ...p, sqf_status: isOn ? 1 : 0 }))}
            />
          </div>

          
          {services.map((service, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr_1fr]"
            >
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Service Type <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={service.type}
                  onChange={(e) =>
                    handleServiceChange(index, "type", e.target.value)
                  }
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm text-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="" disabled>
                    Choose Service Type
                  </option>
                  {serviceTypes.map((el) => (
                    <option key={el.id} value={el.name}>
                      {el.name}
                    </option>
                  ))}
                </select>
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
                  value={service.price}
                  onChange={(e) =>
                    handleServiceChange(index, "price", e.target.value)
                  }
                  placeholder="0.00"
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm text-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-end gap-2">
                {/* REMOVE BUTTON (only show after add) */}
                {index === 0 && services.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="h-10 px-4 bg-red-500 text-white rounded-lg"
                  >
                    X Remove
                  </button>
                )}

                {/* ADD BUTTON (only last row) */}
                {index === services.length - 1 && (
                  <button
                    type="button"
                    onClick={addService}
                    className="px-4 h-10 bg-[#4845D2] text-white rounded-lg text-sm font-medium hover:bg-[#3b38c6] transition"
                  >
                    + Add Services
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="col-span-1 flex justify-between gap-6 md:col-span-2">
            <ToggleButton
              label="Overall Status (Active)"
              checked={formData.status === 1}
              onChange={(isOn) => setFormData(p => ({ ...p, status: isOn ? 1 : 0 }))}
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


// import { useEffect, useState, useRef } from "react";
// import Button from "../../components/ui/Button";
// import { createNewServiceList, updateServiceList } from "../../api/servicelist";
// import ToggleButton from "../../components/ui/ToggleButton";
// import {
//   getAllServiceTypes,
//   getAllServicesCategory,
// } from "../../api/servicesapi";

// const AddServices_PopUp = ({ mode, onClose, serviceData, setRefresh }) => {
//   const isEditMode = mode === "edit";
//   const fileInputRef = useRef(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   const [serviceTypes, setServiceTypes] = useState([]);
//   const [serviceCategories, setServiceCategories] = useState([]);

//   const [formData, setFormData] = useState({
//     name: "",
//     addIcon: "",
//     category: "",
//     status: 1,
//     sorting_order: "", 
//     sqf_status: 0      
//   });

//   const [services, setServices] = useState([{ type: "", price: "" }]);

//   useEffect(() => {
//     if (serviceData && isEditMode) {
//       setFormData({
//         name: serviceData.name || "",
//         addIcon: serviceData.addIcon || "",
//         category: serviceData.category || "",
//         status: serviceData.status ?? 1,
//         sorting_order: serviceData.sorting_order || "",
//         sqf_status: serviceData.sqf_status ?? 0
//       });
      
//       // Ensure service_types is an array
//       const types = Array.isArray(serviceData.service_types) 
//         ? serviceData.service_types 
//         : (typeof serviceData.service_types === 'string' 
//             ? JSON.parse(serviceData.service_types) 
//             : [{ type: "", price: "" }]);
            
//       setServices(types);
//     }
//   }, [serviceData, isEditMode]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleServiceChange = (index, field, value) => {
//     const updated = [...services];
//     updated[index][field] = value;
//     setServices(updated);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFormData((prev) => ({ ...prev, addIcon: file }));
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = new FormData();

//     payload.append("name", formData.name);
//     payload.append("category", formData.category);
//     payload.append("sorting_order", formData.sorting_order);
//     payload.append("sqf_status", formData.sqf_status);
//     payload.append("status", formData.status);
//     payload.append("services", JSON.stringify(services));

//     if (formData.addIcon instanceof File) {
//       payload.append("addIcon", formData.addIcon);
//     }

//     try {
//       if (isEditMode) {
//         await updateServiceList(serviceData.id, payload);
//       } else {
//         await createNewServiceList(payload);
//       }
//       setRefresh(prev => !prev);
//       onClose();
//     } catch (error) {
//       alert(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [typesRes, catsRes] = await Promise.all([
//           getAllServiceTypes(),
//           getAllServicesCategory()
//         ]);
//         setServiceTypes(typesRes.data.data || []);
//         setServiceCategories(catsRes.data.data || []);
//       } catch (err) {
//         console.error("Fetch Error:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
//       <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-xl max-h-[90vh] overflow-y-auto">
//         <h2 className="mb-6 text-xl font-bold text-gray-800">
//           {isEditMode ? "Edit Service" : "Add Service"}
//         </h2>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//           {/* Header Section */}
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_160px_100px]">
//             <div>
//               <label className="mb-1 block text-sm font-medium text-gray-700">Service Name *</label>
//               <input
//                 required
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="e.g. Cotton Shirt"
//                 className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 text-sm focus:border-indigo-500 outline-none"
//               />
//             </div>

//             <div>
//               <label className="mb-1 block text-sm font-medium text-gray-700">Add Icon</label>
//               <button
//                 type="button"
//                 onClick={() => fileInputRef.current?.click()}
//                 className="w-full rounded-lg border-2 border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-600 hover:bg-sky-100 transition-colors"
//               >
//                 + Upload
//               </button>
//               <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
//             </div>

//             <div className="flex items-end justify-center">
//               <div className="h-14 w-14 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
//                 {imagePreview ? (
//                   <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
//                 ) : isEditMode && formData.addIcon ? (
//                     <img
//                       src={`${ImageURL}/services/${formData.addIcon}`}
//                       alt="Current" className="h-full w-full object-cover" />
//                 ) : (
//                   <span className="text-gray-300 text-xs">No Icon</span>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Configuration Section */}
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-end">
//             <div>
//               <label className="mb-1 block text-sm font-medium text-gray-700">Category *</label>
//               <select
//                 required
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 text-sm outline-none focus:border-indigo-500"
//               >
//                 <option value="">Choose Category</option>
//                 {serviceCategories.map((el) => (
//                   <option key={el.id} value={el.name}>{el.name}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="mb-1 block text-sm font-medium text-gray-700">Sorting Order *</label>
//               <select
//                 required
//                 name="sorting_order"
//                 value={formData.sorting_order}
//                 onChange={handleChange}
//                 className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 text-sm outline-none focus:border-indigo-500"
//               >
//                 <option value="">Choose Order</option>
//                 {[51, 52, 53, 54, 55].map(val => <option key={val} value={val}>{val}</option>)}
//               </select>
//             </div>

//             <ToggleButton
//               label="Active SQF"
//               label2="Inactive SQF"
//               checked={formData.sqf_status === 1}
//               onChange={(isOn) => setFormData(p => ({ ...p, sqf_status: isOn ? 1 : 0 }))}
//             />
//           </div>

//           {/* Dynamic Services Section */}
//           <div className="space-y-4">
//             {/* <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Service Pricing</h3> */}
//             {services.map((service, index) => (
//               <div key={index} className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr_auto] items-end bg-gray-50 p-4 rounded-xl border border-gray-100">
//                 <div>
//                   <label className="mb-1 block text-xs font-bold text-gray-600">Service Type</label>
//                   <select
//                     required
//                     value={service.type}
//                     onChange={(e) => handleServiceChange(index, "type", e.target.value)}
//                     className="w-full rounded-lg border-2 border-white px-3 py-2 text-sm shadow-sm outline-none focus:border-indigo-500"
//                   >
//                     <option value="">Select Type</option>
//                     {serviceTypes.map((el) => <option key={el.id} value={el.name}>{el.name}</option>)}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-xs font-bold text-gray-600">Price</label>
//                   <input
//                     required
//                     type="number"
//                     step="0.01"
//                     value={service.price}
//                     onChange={(e) => handleServiceChange(index, "price", e.target.value)}
//                     placeholder="0.00"
//                     className="w-full rounded-lg border-2 border-white px-3 py-2 text-sm shadow-sm outline-none focus:border-indigo-500"
//                   />
//                 </div>

//                 <div className="flex gap-2">
//                   {services.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => setServices(prev => prev.filter((_, i) => i !== index))}
//                       className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
//                     >
//                       Delete
//                     </button>
//                   )}
//                   {index === services.length - 1 && (
//                     <button
//                       type="button"
//                       onClick={() => setServices(prev => [...prev, { type: "", price: "" }])}
//                       className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
//                     >
//                       + Add
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Footer Actions */}
//           <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4 border-t border-gray-100">
//             <ToggleButton
//               label="Overall Status (Active)"
//               checked={formData.status === 1}
//               onChange={(isOn) => setFormData(p => ({ ...p, status: isOn ? 1 : 0 }))}
//             />
//             <div className="flex gap-3 w-full md:w-auto">
//               <Button onClick={onClose} btnText="Cancel" variant="outline" className="flex-1 md:flex-none" />
//               <Button type="submit" btnText={isEditMode ? "Update Service" : "Save Service"} variant="primary" className="flex-1 md:flex-none" />
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddServices_PopUp;
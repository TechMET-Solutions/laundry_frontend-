// import { useRef, useState } from "react";
// import Button from "../../components/ui/Button";
// import InputWithDropdown from "../../components/ui/DropDownInputField";
// import InputField from "../../components/ui/InputField";
// import ToggleButton from "../../components/ui/ToggleButton";
// import { createServiceType } from "../../api/servicesapi";

// export default function AddNewServicesType_PopUp({ onClose }) {
//   const fileInputRef = useRef(null);
//   // const [selectedFileName, setSelectedFileName] = useState("");
//   const [imagePreview, setImagePreview] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     abbreviation: "",
//     icon: "",
//     status: 0,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleIconClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // setSelectedFileName(file.name);
//       setFormData((prev) => ({ ...prev, icon: file }));
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = new FormData();

//     payload.append("name", formData.name);
//     payload.append("abbreviation", formData.abbreviation);
//     payload.append("status", formData.status);

//     // append file ONLY if user selected a new one
//     if (formData.icon instanceof File) {
//       payload.append("icon", formData.icon);
//     }

//     try {
//       await createServiceType(payload);

//       onClose();
//     } catch (error) {
//       console.error("Service type save error:", error);
//       alert(error.response?.data?.message || error.message);
//     }
//   };
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       {/* Modal */}
//       <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
//         {/* Header */}
//         <h2 className="mb-6 text-lg font-semibold text-gray-800">
//           Add Service Type
//         </h2>

//         <form onSubmit={handleSubmit}>
//           {/* Inputs */}
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="mb-1 block text-sm font-medium text-gray-700">
//                 Service Type Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 required
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Service Type Name"
//                 className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm
//               focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
//               />
//             </div>

//             <div>
//               <label className="mb-1 block text-sm font-medium text-gray-700">
//                 Abbreviation <span className="text-red-500">*</span>
//               </label>
//               <input
//                 required
//                 type="text"
//                 name="abbreviation"
//                 value={formData.abbreviation}
//                 onChange={handleChange}
//                 placeholder="Abbreviation"
//                 className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm
//               focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
//               />
//             </div>
//           </div>

//           <div className="mt-6 grid grid-cols-[1fr_auto] items-center gap-6">
//             {/* Add Icon Button */}
//             <div>
//               <button
//                 type="button"
//                 onClick={handleIconClick}
//                 className="w-full rounded-lg border-2 border-sky-200 bg-sky-50 px-4 py-2
//       text-sm font-medium text-sky-600 hover:bg-sky-100
//       focus:border-sky-400 focus:outline-none
//       flex items-center justify-center gap-2 transition"
//               >
//                 <span className="text-lg">+</span>
//                 Add Service Type Icon
//               </button>

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//             </div>

//             {/* Image Preview */}
//             {imagePreview && (
//               <div className="h-20 w-20 rounded-lg border bg-gray-100 p-1 flex items-center justify-center">
//                 <img
//                   src={imagePreview}
//                   alt="Icon Preview"
//                   className="h-full w-full object-cover rounded-md"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Status */}
//           <div className="mt-6">
//             <ToggleButton
//               label="Is Active"
//               checked={formData.status === 1}
//               onChange={(isOn) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   status: isOn ? 1 : 0,
//                 }))
//               }
//             />
//           </div>

//           {/* Footer */}
//           <div className="mt-8 flex justify-end gap-4">
//             <Button btnText="Cancel" variant="outline" onClick={onClose} />
//             <Button type="submit" btnText="Save" variant="primary" />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

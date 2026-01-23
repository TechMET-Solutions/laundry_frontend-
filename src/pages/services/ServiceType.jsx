import React, { useState, useEffect } from "react";
import { FiSearch, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

import Setting_img from "../../assets/carbon_settings-services.png";
import AddNewServicesType_PopUp from "../../components/models/AddNewServicesType_PopUp.jsx";
import { getAllServiceTypes, deleteServiceType } from "../../api/servicesapi"; 
import DeleteModal from "../../components/models/DeleteModal.jsx";

const ServiceType = () => {
  const [open, setOpen] = useState(false);
  const [serviceTypes, setServiceTypes] = useState([]); // store table data
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  //edit
  const [editData, setEditData] = useState(null);
  // delete
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);


  // Fetch all service types on component mount
  const fetchServiceTypes = async () => {
    try {
      setLoading(true);
      const res = await getAllServiceTypes();

      if (res.data.success) {
        setServiceTypes(res.data.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }  
  };

  useEffect(() => {
    fetchServiceTypes();
  }, []);

  // const handleAddNewServiceType = (newType) => {
  // console.log("Received in parent:", newType);
  // setServiceTypes((prev) => [newType, ...prev]);
  // };



  // delete
  // const handleDelete = async (id) => {
  //   if (!window.confirm("Are you sure you want to delete this service type?")) {
  //     return;
  //   }
  //   try {
  //     const res = await deleteServiceType(id);

  //     if (res.data.success) {
  //       setServiceTypes((prev) => prev.filter((item) => item.id !== id));
  //     }
  //   } catch (error) {
  //     console.error("Delete failed:", error);
  //     alert("Failed to delete service type");
  //   }
  // };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteServiceType(deleteId);

      if (res.data.success) {
        setServiceTypes((prev) =>
          prev.filter((item) => item.id !== deleteId)
        );
        setDeleteId(null);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete service type");
    } 
  };


  const filteredServiceTypes = serviceTypes.filter((item) => {
    if (!searchTerm) return true; // show all if search empty
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.abbreviation.toLowerCase().includes(searchTerm.toLowerCase())
      );     
  });

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {/* Left: Back + Title */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded">
            <IoReturnUpBackOutline />
          </div>

          <h1 className="text-xl font-semibold text-gray-800">Service Type</h1>
        </div>

        <div className="flex items-center gap-2 cursor-pointer rounded-full bg-indigo-600 px-3 py-2 text-white" onClick={() => setOpen(true)}>
          <img
            src={Setting_img}
            alt="setting"
            className="h-4 w-4 object-contain"
          />
          <span className="text-sm font-medium">Add New Service Type</span>
        </div>

        
          <DeleteModal
            isOpen={isDeleteOpen}
            title="Are you sure?"
            description="Do you really want to continue? This action cannot be undone."
            onCancel={() => setIsDeleteOpen(false)}
            onConfirm={handleConfirmDelete}
          />

        {/* popup */}
        {open && (
          <AddNewServicesType_PopUp
            onClose={() => {
              setOpen(false);
              setEditData(null);
            }}
            onAdd={(newData) => {
              if (newData) {
                setServiceTypes((prev) => [newData, ...prev]); // ADD
              } else {
                fetchServiceTypes(); // EDIT
              }
            }}
            editData={editData}
          />
        )}
      </div>
 
      <div className="flex justify-end gap-4 mb-6">
        {/* Search */}
        <div className="relative w-64 ">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-2 bg-gray-200 rounded-lg text-sm outline-none "
          />
        </div>

      </div>

      {/* Table */}
        <div className="bg-[#f4f7fb]">
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <table className="w-full text-sm border-separate">
            <thead>
              <tr>
                {["Sr No", "Service Type", "Abbreviation", "Status", "Action"].map(
                  (head) => (
                    <th
                      key={head}
                      className="bg-[#56CCFF] px-4 py-3 text-left font-medium text-gray-800"
                    >
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {filteredServiceTypes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No service types found
                  </td>
                </tr>
              ) : (
                filteredServiceTypes.map((item, index) => (
                  <tr key={item.id} className="bg-[#f1f5fb] text-center">
                    <td className="px-4 py-3 font-medium text-gray-700 border-b text-center border-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-left border-b border-gray-300">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-left border-b border-gray-300">
                      {item.abbreviation}
                    </td>
                    <td className="px-4 py-3 border-b text-left border-gray-300">
                      <span className="flex items-center gap-2">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            item.status === 1 ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <span
                          className={`font-medium ${
                            item.status === 1
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {item.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b text-left border-gray-300">
                      <div className="flex gap-2">
                        <button
                          className="rounded-md bg-indigo-100 p-2 text-indigo-600 cursor-pointer"
                          onClick={() => {
                            setEditData(item);  
                            setOpen(true);      
                          }} >
                          <FiEdit />
                        </button>

                        <button
                          onClick={() => { 
                            setDeleteId(item.id);
                            setIsDeleteOpen(true); 
                          }}
                          className="rounded-md bg-red-100 p-2 text-red-500 cursor-pointer"
                        >
                          <FiTrash2 />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}


      </div>
    </div>
  );
};

export default ServiceType;

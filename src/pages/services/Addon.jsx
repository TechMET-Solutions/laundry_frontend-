import React, {useEffect, useState } from "react";
import { FiSearch, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

import Setting_img from "../../assets/carbon_settings-services.png";
import AddNewService_Addon_PopUp from "./AddNewService_Addon_PopUp";
import { getAllServicesAddon, deleteServiceAddon } from "../../api/servicesapi";
import DeleteModal from "../../components/models/DeleteModal";

const Addon = () => {
  const [open, setOpen] = useState(false);
  const [serviceAddons, setServiceAddons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState();

  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchServiceAddons = async () => {
    try {
      setLoading(true);
      const res = await getAllServicesAddon();
      if (res.data.success) {
        setServiceAddons(res.data.data);
      }} catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
      fetchServiceAddons();
    }, []);
  

    const handleConfirmDelete = async () => {
      try {
        const res = await deleteServiceAddon(deleteId);
          if (res.data.success) {
            setServiceAddons((prev) =>
              prev.filter((item) => item.id !== deleteId)
            );
            setDeleteId(null);
            setIsDeleteOpen(false);
          }
        } catch (error) {
          console.error("Delete failed:", error);
          alert("Failed to delete addon");
        }
      };

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 cursor-pointer">
          <div className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded">
            <IoReturnUpBackOutline />
          </div>

          <h1 className="text-xl font-semibold text-gray-800">
            Service Addons
          </h1>
        </div>

        <div className="flex items-center gap-2 cursor-pointer rounded-full bg-indigo-600 px-3 py-2 text-white" onClick={() => setOpen(true)}>
          <img
            src={Setting_img}
            alt="setting"
            className="h-4 w-4 object-contain"
          />

          <span className="text-sm font-medium">Add New Addon</span>
        </div>
      </div>
      {/* {open && (
        <AddNewService_Addon_PopUp  onClose={() => setOpen(false)} />
      )} */}

      {open && (
        <AddNewService_Addon_PopUp 
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}

        onAdd={(newData) => {
          if(newData) {
            setServiceAddons((prev) => [newData, ...prev])
          } else {
            fetchServiceAddons();
          } 
        }}
        editData={editData}
        />
      )}

      <DeleteModal 
        isOpen={isDeleteOpen}
        title="Are you sure"
        description="Do you really want to continue? this action cannot be undone."
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />

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


      <div className="bg-[#f4f7fb]  ">
        <table className="w-full text-sm border-separate  ">
          <thead>
            <tr>
              {["Sr No", "Add_on", "Price", "Status", "Action"].map((head) => (
                <th
                  key={head}
                  className="bg-[#56CCFF]  px-4 py-3 text-left font-medium text-gray-800 "
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {serviceAddons.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No service addons found
                </td>
              </tr>
            ) : (
              serviceAddons.map((item, index) => (
                <tr key={item.id} className="bg-[#f1f5fb] text-center">
                  <td className="px-4 py-3 font-medium text-gray-700 border-b text-center border-gray-300">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3 text-gray-700 text-left border-b border-gray-300">
                    {item.name}
                  </td>

                  <td className="px-4 py-3 text-gray-700 text-left border-b border-gray-300">
                    {item.price}
                  </td>

                  <td className="px-4 py-3 border-b text-left border-gray-300">
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          item.status === 1 ? 
                          "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          item.status === 1 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {item.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </span>
                  </td>

                  <td className="px-4 py-3 border-b text-left border-gray-300">
                    <div className="flex gap-2">
                      <button className="rounded-md bg-indigo-100 p-2 text-indigo-600 cursor-pointer"
                        onClick={() => {setEditData(item);
                           setOpen(true);
                          }}
                      >
                        <FiEdit />
                      </button>

                      {/* delete btn */}
                      <button className="rounded-md bg-red-100 p-2 text-red-500 cursor-pointer"
                      onClick={() => {
                        setDeleteId(item.id);
                        setIsDeleteOpen(true);
                      }} >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Addon;


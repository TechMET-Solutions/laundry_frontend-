import React, { useEffect, useState } from "react";
import { FiSearch, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import AddServices_PopUp from "./AddNewServices_PopUp";
import { deleteServiceList, getAllServicesList } from "../../api/servicelist";
import { PiClubLight } from "react-icons/pi";
import DeleteModal from "../../components/models/DeleteModal";

const ServiceList = () => {
  const [open, setOpen] = useState(false);
  // const [openDropdown, setOpenDropdown] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedService, setSelectedService] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const [servicesData, setServicesData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteService, setDeleteService] = useState(false);

   const [searchQuery, setSearchQuery] = useState("");


  const handleCloseModal = () => {
    setOpen(false);
    setSelectedService(null);
  };

  const fetchAllServices = async () => {
    try {
      const reponse = await getAllServicesList();
      setServicesData(reponse.data.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, [refresh]);

  //  console.log(servicesData);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteServiceList(deleteId);
      setDeleteId(null);
      fetchAllServices();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };


//Filter Dropdown

  const handleSelection = (value) => {
    setSelectedValue(value);
    setOpenDropdown(false);
  };

  const handleSearch = (query) => {
  setSearchQuery(query.toLowerCase());
};

// Common filtering logic search + dropdown
  const filteredServices = servicesData.filter((item) => {
    const matchesSearch =
    searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery) ||
      item.type.toLowerCase().includes(searchQuery) ||
      item.category.toLowerCase().includes(searchQuery);

    const matchesDropdown =
      selectedValue === "" ||
      selectedValue === "All" ||
      item.category === selectedValue ||
      item.type === selectedValue ||
      item.name === selectedValue;

    return matchesSearch && matchesDropdown;
  });

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded">
            <IoReturnUpBackOutline />
          </div>

          <h1 className="text-xl font-semibold text-gray-800">
            Add New Service
          </h1>
        </div>

        <button
          onClick={() => {
            setOpen(true);
            setMode("add");
            setSelectedService(null);
          }}
          className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-full  cursor-pointer"
        >
          + Add New Services
        </button>

        {open && (
          <AddServices_PopUp
            onClose={handleCloseModal}
            serviceData={selectedService}
            mode={mode}
            setRefresh={setRefresh}
          />
        )}
      </div>

      <div className="flex justify-end gap-4 mb-6">
        <div className="relative w-64 ">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-2 bg-gray-200 rounded-lg text-sm outline-none "
          />
        </div>

        <div className="relative w-56">
          <button
            type="button"
            onClick={() => setOpenDropdown((prev) => !prev)}
            className="flex h-9 w-full items-center justify-between rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-700"
          >
            <span>{selectedValue ? selectedValue : "Select Type"}</span>
            <RiArrowDropDownLine className="h-6 w-6 text-gray-600" />
          </button>

          {openDropdown && (
            <ul className="absolute left-0 top-full z-20 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-md">
              {["All", "Gendes", "Ladies", "Kids", "Other"].map((item) => (
                <li
                  key={item}
                  onClick={() => handleSelection(item)}
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="bg-[#f4f7fb]  ">
        <table className="w-full text-sm border-separate  ">
          <thead>
            <tr>
              {[
                "Sr No",
                "Service",
                "Service Type",
                "Service Category",
                "Status",
                "Action",
              ].map((head) => (
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
            {filteredServices.map((item, index) => (
              <tr key={item.id} className="bg-[#f1f5fb] text-center">
                <td className="px-4 py-3 font-medium text-gray-700 border-b text-center border-gray-300">
                  {index + 1}
                </td>

                <td className="px-4 py-4 font-medium flex items-center gap-4 text-left border-b border-gray-300">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={`http://localhost:5000/uploads/services/${item.addIcon}`}
                    alt={item.name}
                  />
                  <span className="text-lg text-gray-700">{item.name}</span>
                </td>

                <td className="px-4 py-3 text-gray-700 text-left border-b border-gray-300">
                  {item.type}
                </td>

                <td className="px-4 py-3 text-gray-700 text-left border-b border-gray-300">
                  {item.category}
                </td>

                <td className="px-4 py-3  border-b text-left border-gray-300">
                  <span className="flex items-center justify-start gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        item.status === 1 ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span
                      className={`text-md font-semibold ${
                        item.status === 1 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </span>
                </td>

                <td className="px-4 py-3  border-b text-left border-gray-300">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setOpen(true);
                        setMode("edit");
                        setSelectedService(item);
                      }}
                      className="rounded-md bg-indigo-100 p-2 text-indigo-600 cursor-pointer"
                    >
                      <FiEdit />
                    </button>

                    <button
                      onClick={() => {
                        setDeleteService(true);
                        setDeleteId(item.id);
                      }}
                      className="rounded-md bg-red-100 p-2 text-red-500 cursor-pointer"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteService && (
        <DeleteModal
          isOpen={deleteService}
          title="Delete Services"
          description="Are you sure you want to delete this service?"
          onCancel={() => {
            setDeleteService(false);
            setDeleteId(null);
          }}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default ServiceList;

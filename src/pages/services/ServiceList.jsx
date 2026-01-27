import React, { useEffect, useState } from "react";
import { FiSearch, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import AddServices_PopUp from "./AddNewServices_PopUp";
import { deleteServiceList, getAllServicesList } from "../../api/servicelist";
import DeleteModal from "../../components/models/DeleteModal";
import { ImageURL } from "../../api";
import { getAllServicesCategory } from "../../api/servicesapi";

const ServiceList = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedService, setSelectedService] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const [servicesData, setServicesData] = useState([]);
  const [categories, setCategories] = useState([]); // Store fetched categories
  const [refresh, setRefresh] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteService, setDeleteService] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedService(null);
  };

  // 1. Fetch Services and Active Categories
  const fetchData = async () => {
    try {
      const [serviceRes, catRes] = await Promise.all([
        getAllServicesList(),
        getAllServicesCategory()
      ]);

      setServicesData(serviceRes.data.data || []);

      // Filter categories to show only status !== 0 (assuming 1 is active)
      const activeCats = (catRes.data.data || []).filter(cat => cat.status !== 0);
      setCategories(activeCats);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteServiceList(deleteId);
      setDeleteId(null);
      setDeleteService(false);
      setRefresh(prev => !prev);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // 2. Corrected Filtering Logic
  const filteredServices = servicesData.filter((item) => {
    const searchLower = searchQuery.toLowerCase();

    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower);

    const matchesDropdown =
      selectedValue === "" ||
      selectedValue === "All Categories" ||
      item.category === selectedValue;

    return matchesSearch && matchesDropdown;
  });


  return (
    <div className="p-6 min-h-screen">
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
            <span>{selectedValue ? selectedValue : "Sort By Category"}</span>
            <RiArrowDropDownLine className="h-6 w-6 text-gray-600" />
          </button>

          {openDropdown && (
            <ul className="absolute left-0 top-full z-20 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-xl max-h-60 overflow-y-auto">
              <li
                onClick={() => { setSelectedValue(""); setOpenDropdown(false); }}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-indigo-50"
              >
                All Categories
              </li>
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  onClick={() => { setSelectedValue(cat.name); setOpenDropdown(false); }}
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-indigo-50"
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="bg-[#f4f7fb]  rounded-lg ">
        <table className="w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr>
              {["Sr No", "Service", "Service Type", "Service Category", "Status", "Action"].map((head) => (
                <th
                  key={head}
                  className="bg-[#56CCFF]  px-4 py-3 text-left font-semibold text-gray-800 border-r-2 border-gray-100"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredServices.length > 0 ? (
              filteredServices.map((item, index) => (
                <tr key={item.id} className="bg-[#f1f5fb] hover:bg-white transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-700 border-b border-gray-300 text-center">
                    {index + 1}
                  </td>

                  <td className="px-4 py-4 font-medium flex items-center gap-4 text-left border-b border-gray-300">
                    <img
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      src={`${ImageURL}/services/${item.addIcon}`}
                      alt={item.name}
                      onError={(e) => (e.target.src = "https://via.placeholder.com/40")}
                    />
                    <span className="text-gray-700">{item.name}</span>
                  </td>

                  <td className="px-4 py-3 text-gray-700 text-left border-b border-gray-300">
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(item.service_types) ? (
                        item.service_types.map((st, i) => (
                          <span key={i} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                            {st.type}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 italic text-xs">No types</span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-gray-700 text-left border-b border-gray-300">
                    {item.category}
                  </td>

                  <td className="px-4 py-3 border-b border-gray-300 text-left">
                    <span className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${item.status === 1 ? "bg-green-500" : "bg-red-500"}`} />
                      <span className={`font-semibold ${item.status === 1 ? "text-green-600" : "text-red-600"}`}>
                        {item.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </span>
                  </td>

                  <td className="px-4 py-3 border-b border-gray-300 text-left">
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setOpen(true); setMode("edit"); setSelectedService(item); }}
                        className="rounded-md bg-indigo-100 p-2 text-indigo-600 cursor-pointer hover:bg-indigo-200"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => { setDeleteService(true); setDeleteId(item.id); }}
                        className="rounded-md bg-red-100 p-2 text-red-500 cursor-pointer hover:bg-red-200"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              /* DATA NOT FOUND ROW */
              <tr>
                <td colSpan="6" className="px-4 py-20 text-center bg-white border-b border-gray-300">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="bg-gray-100 p-4 rounded-full">
                      <FiSearch className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-lg font-semibold text-gray-500">No Services Found</p>
                    <p className="text-sm text-gray-400">
                      Try adjusting your search or category filter.
                    </p>
                  </div>
                </td>
              </tr>
            )}
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
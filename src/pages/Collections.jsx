import React, { useEffect, useState } from "react";
import { FiEye, FiTrash2, FiEdit } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import AddCollectionModal from "../components/models/AddCollectionModal";
import ViewCollectionDetails from "../components/models/ViewCollectionDetails";
import { getAllCollections, deleteCollection } from "../api/collection";
import { getAllEmployees } from "../api/employee";
import { getAllCustomers } from "../api/customer";
import DeleteModal from "../components/models/DeleteModal";
import Pagination from "../components/Pagination";
import { formatDateForInput } from "../utils/formatDateForInput";
import { CiSearch } from "react-icons/ci";


function Collections() {
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState(null); // add | edit | view
  const [selectedData, setSelectedData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  // const [showModal, setShowModal] = useState(false);
   const [showDeleteCollection, setShowDeleteCollection] = useState(false);
  const [collections, setCollections] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState({}); // Store employees by ID
  const [customers, setCustomers] = useState({}); // Store customers by ID
  const [allCollections, setAllCollections] = useState([]); // master data
  const [filteredCollections, setFilteredCollections] = useState([]); // shown data
  const [allEmployeesList, setAllEmployeesList] = useState([]);


  const createdByEmail = (() => {
    try {
      const stored = localStorage.getItem("userData");
      if (!stored) return "";
      const parsed = JSON.parse(stored);
      return parsed?.email || "";
    } catch (error) {
      console.error("Failed to parse userData from localStorage", error);
      return "";
    }
  })();


  // Fetch all collections and employees for client-side filtering
  const fetchAllData = async () => {
    try {
      setLoading(true);

      // --- fetch collections (paginate) ---
      let collected = [];
      let pageNum = 1;
      const perPage = 50;
      while (true) {
        const res = await getAllCollections(pageNum, perPage);
        const data = res.data.data || res.data;
        const pagination = res.data.pagination;
        collected = collected.concat(data || []);
        if (!pagination || pageNum >= pagination.totalPages) break;
        pageNum += 1;
      }
      setAllCollections(collected);

      // --- fetch employees (paginate) ---
      let empCollected = [];
      pageNum = 1;
      const empPerPage = 100;
      while (true) {
        const res = await getAllEmployees(pageNum, empPerPage);
        const data = res.data.data || res.data;
        const pagination = res.data.pagination;
        empCollected = empCollected.concat(data || []);
        if (!pagination || pageNum >= pagination.totalPages) break;
        pageNum += 1;
      }
      // Filter only drivers
      const drivers = empCollected.filter((e) => e.role && e.role.toLowerCase() === "driver");
      setAllEmployeesList(drivers);
      const map = {};
      drivers.forEach((e) => (map[e.id] = e));
      setEmployees(map);

      // --- fetch customers (paginate) ---
      let custCollected = [];
      pageNum = 1;
      const custPerPage = 100;
      while (true) {
        const res = await getAllCustomers(pageNum, custPerPage);
        const data = res.data.data || res.data;
        const pagination = res.data.pagination;
        custCollected = custCollected.concat(data || []);
        if (!pagination || pageNum >= pagination.totalPages) break;
        pageNum += 1;
      }
      const custMap = {};
      custCollected.forEach((c) => (custMap[c.id] = c));
      setCustomers(custMap);

    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

   const [filters, setFilters] = useState({
  search: "",
  type: "",
  driver: "",
  customer:"",
  status: ""
});

 
   useEffect(() => {
     fetchAllData();
   }, []);
 
const handleDelete = async () => {
    if (!deleteId) return;
    await deleteCollection(deleteId);
    // setShowDeleteCollection(false);
    setDeleteId(null);
    fetchAllData();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setMode(null);
    setSelectedData(null);
  };

  useEffect(() => {
  let data = [...allCollections];

  // Search by collection code, customer name, or driver name
  if (filters.search) {
    data = data.filter(item => {
      const searchLower = filters.search.toLowerCase();
      const collectionCodeMatch = item.collection_code?.toLowerCase().includes(searchLower);
      
      // Get customer name from customers object
      const customerName = customers[item.customer_id]?.name || "";
      const customerMatch = customerName.toLowerCase().includes(searchLower);
      
      // Get driver name from employees object
      const driver = employees[item.driver_id];
      const driverName = driver ? `${driver.first_name || ""} ${driver.last_name || ""}`.trim() : "";
      const driverMatch = driverName.toLowerCase().includes(searchLower);
      
      return collectionCodeMatch || customerMatch || driverMatch;
    });
  }
  if (filters.type) {
    data = data.filter(item => String(item.collection_type).toLowerCase() === String(filters.type).toLowerCase());
  }
  if (filters.driver) {
    data = data.filter(item => String(item.driver_id) === String(filters.driver));
  }
  if (filters.status) {
    data = data.filter(item => String(item.status).toLowerCase() === String(filters.status).toLowerCase());
  }
  
  // console.log("Filters applied:", filters);
  // console.log("Filtered collections count:", data.length);
  
  setFilteredCollections(data);
  setPage(1);
}, [filters, allCollections]);

// update paginated `collections` when filteredCollections or page changes
useEffect(() => {
  const perPage = 10;
  const total = Math.max(1, Math.ceil(filteredCollections.length / perPage));
  setTotalPages(total);
  const start = (page - 1) * perPage;
  setCollections(filteredCollections.slice(start, start + perPage));
}, [filteredCollections, page]);


  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded">
            <IoReturnUpBackOutline />
          </div>
          <h1 className="text-xl font-semibold">Collections</h1>
        </div>

        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm"
          onClick={() => {
            setMode("add");
            setSelectedData(null);
            setOpenModal(true);
          }}
        >
          + Add New Collection
        </button>
      </div>
      <div className="flex flex-wrap justify-end items-center gap-3 mb-4">
        {/* Search
        <CiSearch className="text-gray-500" /> */}
        <input
          type="text"
          className=" bg-gray-200 focus:outline-none rounded-md px-4 py-2 w-64"
          placeholder="Search collections id..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
        />

        {/* Type */}
        <select
          name="type"
          value={filters.type}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, type: e.target.value }))
          }
          className="bg-gray-200 focus:outline-none rounded-md px-3 py-2 w-40"
        >
          <option value="">All Types</option>
          <option value="CLOTH">Cloth</option>
          <option value="PAYMENT">Payment</option>
        </select>

        {/* Driver */}
        <select
          name="driver"
          value={filters.driver}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, driver: e.target.value }))
          }
          className="bg-gray-200 focus:outline-none rounded-md px-3 py-2 w-44"
        >
          <option value="">All Drivers</option>
          {allEmployeesList.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {`${emp.first_name || ""} ${emp.last_name || ""}`.trim()}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          name="status"
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, status: e.target.value }))
          }
          className="bg-gray-200 focus:outline-none rounded-md px-3 py-2 w-44"
        >
          <option value="">All Collection</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Re-Scheduled">Re-Scheduled</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Collected">Collected</option>
        </select>
      </div>


      {/* Table */}
      <div className="bg-white rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-sky-300 text-left">
              <th className="p-3 border-r-2 border-gray-100 ">Collection ID</th>
              <th className="p-3 border-r-2 border-gray-100 ">Info</th>
              <th className="p-3 border-r-2 border-gray-100 ">Customer</th>
              <th className="p-3 border-r-2 border-gray-100 ">Status</th>
              <th className="p-3 border-r-2 border-gray-100 ">Driver</th>
              <th className="p-3 border-r-2 border-gray-100 ">Type</th>
              <th className="p-3 border-r-2 border-gray-100 ">Created By</th>
              <th className="p-3 border-r-2 border-gray-100 ">Action</th>
            </tr>
          </thead>

          <tbody>
            {collections.map((item) => (
              <tr key={item.id} className="border-b text-[#3A3D51] font-semibold border-gray-400">
                <td className="p-3  ">{item.collection_code}</td>
                <td className="p-3 text-xs">
                  <span className="   ">
                    Pickup Date:
                  </span>
                  <span className="ml-1 font-bold">
                  {formatDateForInput(item.pickup_date)}
                  </span>
                 
                  <br />
                  <span className="   ">
                    Time Slot:
                  </span>
                  <span className="ml-1 font-bold">{item.time_slot}  </span>
                </td>
                <td className="p-3 text-[12px]">{customers[item.customer_id]?.name || "N/A"}</td>
                <td className="p-3">{item.status}</td>
                <td className="p-3">{`${employees[item.driver_id]?.first_name || ""} ${employees[item.driver_id]?.last_name || ""}`.trim() || "N/A"}</td>
                <td className="p-3">{item.collection_type}</td>
                <td className="p-3">{createdByEmail}</td>
                <td className="p-3 flex gap-2">
                  {/* VIEW */}
                  <button
                    className="p-2 bg-sky-100 text-sky-600 rounded"
                    onClick={() => {
                      setMode("view");
                      setSelectedData(item);
                      setOpenModal(true);
                    }}
                  >
                    <FiEye />
                  </button>

                  {/* EDIT */}
                  <button
                    className="p-2 bg-indigo-100 text-indigo-600 rounded"
                    onClick={() => {
                      setMode("edit");
                      setSelectedData(item);
                      setOpenModal(true);
                    }}
                  >
                    <FiEdit />
                  </button>

                 <button
                   onClick={() => {
                     setDeleteId(item.id);
                    setShowDeleteCollection(true);
                     }}
                     className="p-2 bg-red-100 text-red-600 rounded"
                      >                      <MdDeleteOutline size={20} />
                      
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full flex justify-center my-6">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onChange={setPage}
         />
          </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {openModal &&  (
        <AddCollectionModal
          mode={mode}
          collection={selectedData}
          onClose={handleCloseModal}
          onSuccess={() => {
            fetchAllData(); // Refresh all data when collection is added/edited
          }}
        />
      )}

      {/* VIEW MODAL */}
      <ViewCollectionDetails
        isOpen={openModal && mode === "view"}
        onClose={handleCloseModal}
        data={selectedData}
      />

      {showDeleteCollection && (
              <DeleteModal
                isOpen={showDeleteCollection}
                onCancel={() => setShowDeleteCollection(false)}
                onConfirm={handleDelete}
              />
            )}
      
    </div>
  );
}

export default Collections;

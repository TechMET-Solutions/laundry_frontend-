import React, { useState,useEffect } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

import AddEmirates from "../../components/models/AddEmirates";
import Pagination from "../../components/Pagination";
// import EditEmirates from "./EditEmirates";
import { getAllEmirates, deleteEmirate } from "../../api/location_management";

function Emirates() { 
  const [search, setSearch] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const [selectedEmirate, setSelectedEmirate] = useState(null);
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);
  const [emirates, setEmirates] = useState([]);

  const fetchEmirates = async (p = page) => {
    try {
      const res = await getAllEmirates(p, 10);
      setEmirates(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error("API ERROR:", err);
    }
  };

  useEffect(() => {
    fetchEmirates(page);
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this emirate?")) return;

    try {
      await deleteEmirate(id);
      fetchEmirates(page);
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Failed to delete emirate");
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* Back Button */}
        <button className="flex items-center justify-center bg-indigo-800 w-10 h-10 md:w-11 md:h-11 rounded-sm cursor-pointer hover:bg-indigo-900 transition-colors flex-shrink-0">
          <TbArrowBackUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>

        {/* Search Bar */}
        <div className="w-full sm:w-80 md:w-96 flex-shrink-0">
          <div className="w-full h-10 md:h-12 rounded-lg bg-[#E2E8F0] flex items-center px-3 gap-2">
            <CiSearch className="w-5 h-5 text-slate-600 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none text-sm md:text-base"
            />
            {search && (
              <IoIosClose
                onClick={() => setSearch("")}
                className="w-6 h-6 md:w-7 md:h-7 cursor-pointer flex-shrink-0 hover:text-slate-800"
              />
            )}
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedEmirate(null);
            setModalMode("add");
          }}
          className="w-full sm:w-auto px-4 md:px-6 h-10 md:h-12 rounded-full flex items-center justify-center gap-2 md:gap-3 bg-[#4845D2] cursor-pointer hover:bg-[#3a349f] transition-colors flex-shrink-0"
        >
          <FaRegUser className="w-4 h-4 md:w-5 md:h-5 text-white flex-shrink-0" />
          <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">Add New Emirates</span>
        </button>
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-left font-semibold">Sr No</th>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-left font-semibold">Emirates</th>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-left font-semibold">Code</th>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-left font-semibold hidden sm:table-cell">Country</th>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-left font-semibold">Status</th>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-left font-semibold hidden md:table-cell">Created By</th>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-center font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {emirates.map((item, index) => (
                <tr key={item.id} className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-3 md:px-4 py-3 text-center">{index + 1}</td>
                  <td className="px-3 md:px-4 py-3">
                    <span className="font-medium text-gray-900">{item.emirate}</span>
                  </td>
                  <td className="px-3 md:px-4 py-3 text-gray-700">{item.code}</td>
                  <td className="px-3 md:px-4 py-3 text-gray-700 hidden sm:table-cell">{item.country}</td>
                  <td className="px-3 md:px-4 py-3">
                    <span className={`font-medium flex items-center justify-center gap-1 ${
                      item.status === 1 ? "text-green-600" : "text-red-600"
                    }`}>
                      ● {item.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-3 md:px-4 py-3 text-gray-700 hidden md:table-cell">{item.createdAt}</td>
                  <td className="px-3 md:px-4 py-3">
                    <div className="flex justify-center gap-2">
                      {/* View */}
                      <button 
                        onClick={() => {
                          setSelectedEmirate(item);
                          setModalMode("view");
                        }}
                        className="p-1.5 md:p-2 bg-cyan-100 text-cyan-700 rounded hover:bg-cyan-200 transition-colors" 
                        title="View"
                      >
                        <IoEyeOutline size={16} className="md:w-[18px] md:h-[18px]" />
                      </button>

                      {/* Edit */}
                      <button 
                        onClick={() => {
                          setSelectedEmirate(item);
                          setModalMode("edit");
                        }}
                        className="p-1.5 md:p-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors"
                        title="Edit"
                      >
                        <FiEdit size={16} className="md:w-[18px] md:h-[18px]" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 md:p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                        title="Delete"
                      >
                        <MdDeleteOutline size={16} className="md:w-[18px] md:h-[18px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {emirates.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm md:text-base">No emirates found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="w-full flex justify-center my-6">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </div>
      )}

      {/* Modal */}
      {modalMode && (
        <AddEmirates
          mode={modalMode}
          emirateData={selectedEmirate}
          onClose={() => setModalMode(null)}
          onSuccess={() => fetchEmirates(page)}
        />
      )}
    </div>
  );
}

export default Emirates;

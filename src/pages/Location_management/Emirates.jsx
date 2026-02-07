import React, { useState, useEffect, use } from "react";
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
import { useNavigate } from "react-router-dom";
import { formatDateTimeForInput } from "../../utils/formatDateForInput";

function Emirates() {
  const navigate = useNavigate();

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

  const filteredEmirates = emirates.filter(
    (item) =>
      item.emirate.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      item.country.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-4 md:p-6 min-h-screen">
       <div className="flex flex-col gap-4 mb-6">
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
           <button onClick={() => navigate(-1)} className="flex items-center justify-center bg-indigo-800 w-10 h-10 md:w-11 md:h-11 rounded-sm cursor-pointer hover:bg-indigo-900 transition-colors">
            <TbArrowBackUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

           <button
            onClick={() => {
              setSelectedEmirate(null);
              setModalMode("add");
            }}
            className="w-full sm:w-auto px-4 md:px-6 h-10 md:h-12 rounded-full flex items-center justify-center gap-2 bg-[#4845D2] cursor-pointer hover:bg-[#3a349f]"
          >
            <FaRegUser className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span className="text-white font-medium text-sm md:text-base">
              Add New Emirates
            </span>
          </button>
        </div>

        <div className="flex justify-end">
          <div className="w-full sm:w-80 md:w-96">
            <div className="h-10 md:h-10 rounded-lg bg-[#E2E8F0] flex items-center px-3 gap-2">
              <CiSearch className="w-5 h-5 text-slate-600  " />

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
                  className="w-6 h-6 md:w-6 md:h-4 cursor-pointer hover:text-slate-800"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden ">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate">
            <thead>
              <tr>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-left font-semibold">
                  Sr No
                </th>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-left font-semibold">
                  Emirates
                </th>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-left font-semibold">
                  Code
                </th>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-left font-semibold hidden sm:table-cell">
                  Country
                </th>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-left font-semibold">
                  Status
                </th>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-left font-semibold hidden md:table-cell">
                  Created By
                </th>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-center font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEmirates.map((item, index) => (
                <tr
                  key={item.id}
                  className="bg-white  hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 md:px-4 py-3 text-center border-b border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-3 md:px-4 py-3 border-b border-gray-300">
                    <span className="font-medium text-gray-900">
                      {item.emirate}
                    </span>
                  </td>
                  <td className="px-3 md:px-4 py-3 text-gray-700 border-b border-gray-300">
                    {item.code}
                  </td>
                  <td className="px-3 md:px-4 py-3 text-gray-700 hidden sm:table-cell border-b border-gray-300">
                    {item.country}
                  </td>
                  <td className="px-3 md:px-4 py-3 border-b border-gray-300">
                    <span
                      className={`font-medium flex items-center justify-center gap-1 ${
                        item.status === 1 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      ● {item.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-3 md:px-4 py-3 text-gray-700 hidden md:table-cell border-b border-gray-300  ">
                    {formatDateTimeForInput(item.createdAt)}
                  </td>
                  <td className="px-3 md:px-4  border-b border-gray-300">
                    <div className="flex justify-center gap-2">
                      {/* View */}
                      <button
                        onClick={() => {
                          setSelectedEmirate(item);
                          setModalMode("view");
                        }}
                        className="p-1   bg-cyan-100 text-cyan-700 rounded hover:bg-cyan-200 transition-colors"
                        title="View"
                      >
                        <IoEyeOutline
                          size={16}
                          className="md:w-[18px] md:h-[18px]"
                        />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => {
                          setSelectedEmirate(item);
                          setModalMode("edit");
                        }}
                        className="p-1   bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors"
                        title="Edit"
                      >
                        <FiEdit size={14} className="md:w-[16px] md:h-[16px]" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 md:p-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                        title="Delete"
                      >
                        <MdDeleteOutline
                          size={14}
                          className="md:w-[14px] md:h-[14px]"
                        />
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

import React, { useState, useEffect } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

import { getAllAreas, deleteArea } from "../../api/area";
import Pagination from "../../components/Pagination";
import AddArea from "../../components/models/AddArea";
import { IoEyeOutline } from "react-icons/io5";
//import { getAllAreas } from "../../api/location_management";

function Area() {
  const [areas, setAreas] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [modalMode, setModalMode] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  const fetchAreas = async (p = page) => {
    try {
      const res = await getAllAreas(p, 10);
      setAreas(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.error("API ERROR:", error);
    }
  };

  useEffect(() => {
    fetchAreas(page);
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this area?")) return;
    await deleteArea(id);
    fetchAreas(page);
  };

  const filteredAreas = areas.filter((item) => {
    const query = search.toLowerCase();

    return (
      item.area?.toLowerCase().includes(query) ||
      item.emirate?.toLowerCase().includes(query) ||
      item.country?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-4 md:p-6  min-h-screen">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button className="flex items-center justify-center bg-indigo-800 w-10 h-10 md:w-11 md:h-11 rounded-sm cursor-pointer hover:bg-indigo-900 transition-colors">
            <TbArrowBackUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
          <button
            onClick={() => {
              setSelectedArea(null);
              setModalMode("add");
            }}
            className="w-full sm:w-auto px-4 md:px-6 h-10 md:h-12 rounded-full flex items-center justify-center gap-2 bg-[#4845D2] hover:bg-[#3a349f]"
          >
            <FaRegUser className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span className="text-white font-medium text-sm md:text-base">
              Add New Area
            </span>
          </button>
        </div>
        <div className="flex justify-end">
          <div className="w-full sm:w-80 md:w-96">
            <div className="h-10   rounded-lg bg-[#E2E8F0] flex items-center px-3 gap-2">
              <CiSearch className="w-5 h-5 text-slate-600" />

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
                  className="w-5 h-5 cursor-pointer hover:text-slate-800"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="  overflow-hidden ">
        <div className="overflow-x-auto">
          <table  className="w-full">
            <thead className="w-full text-sm border-separate  border-spacing-y-0 border-spacing-x-1">
              <tr>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-left font-semibold">
                  Sr No
                </th>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-left font-semibold">
                  Area Name
                </th>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-left font-semibold hidden sm:table-cell">
                  Emirate
                </th>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-left font-semibold hidden md:table-cell">
                  Country
                </th>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-left font-semibold hidden lg:table-cell">
                  Radius
                </th>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-left font-semibold">
                  Status
                </th>
                <th className="bg-[#56CCF2] px-3 md:px-4 py-3 text-center font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {console.log(filteredAreas)}
              {filteredAreas.map((item, index) => (
                <tr
                  key={item.id}
                  className="bg-white  hover:bg-gray-50  transition-colors"
                >
                  <td className="px-3 md:px-4 py-3 text-center border-b border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-3 md:px-4 py-3 border-b border-gray-300">
                    <span className="font-medium text-gray-900">
                      {item.area}
                    </span>
                  </td>
                  <td className="px-3 md:px-4 py-3 hidden sm:table-cell border-b border-gray-300 text-gray-700">
                    {item.emirates}
                  </td>
                  <td className="px-3 md:px-4 py-3 hidden md:table-cell border-b border-gray-300 text-gray-700">
                    {item.country}
                  </td>
                  <td className="px-3 md:px-4 py-3 hidden lg:table-cell border-b border-gray-300 text-gray-700">
                    {item.radius}
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
                  <td className="px-3  border-b border-gray-300">
                    <div className="flex justify-center gap-1 md:gap-2">
                      {/* View */}
                      <button
                        onClick={() => {
                          setSelectedArea(item);
                          setModalMode("view");
                        }}
                        className="p-1   bg-cyan-100 text-cyan-700 rounded hover:bg-cyan-200 transition-colors"
                        title="View"
                      >
                        <IoEyeOutline
                          size={14}
                          className="md:w-[16px] md:h-[16px]"
                        />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => {
                          setSelectedArea(item);
                          setModalMode("edit");
                        }}
                        className="p-1  bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors"
                        title="Edit"
                      >
                        <FiEdit size={14} className="md:w-[16px] md:h-[16px]" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1  bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                        title="Delete"
                      >
                        <MdDeleteOutline
                          size={14}
                          className="md:w-[16px] md:h-[16px]"
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
        {areas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm md:text-base">No areas found</p>
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
        <AddArea
          mode={modalMode}
          areaData={selectedArea}
          onClose={() => setModalMode(null)}
          onSuccess={() => fetchAreas(page)}
        />
      )}
    </div>
  );
}

export default Area;

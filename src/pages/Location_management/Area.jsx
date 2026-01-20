import React, { useState,useEffect} from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

import AddEmirates from "../../components/models/AddEmirates";
import EditArea from "../../components/models/EditArea";
import { getAllAreas ,deleteArea } from "../../api/location_management";
import Pagination from "../../components/Pagination";
import AddArea from "../../components/models/AddArea";
function Area() {
  const [areas, setAreas] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddArea, setShowAddArea] = useState(false);
  const [showEditArea, setShowEditArea] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);



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

  // // ✅ Area data 
  // const data = [
  //   {
  //     id: 1,
  //     areaName: "Dubai",
  //     emirate: "Dubai",
  //     country: "Antigua And Barbuda",
  //     radius: "10 Km",
  //     status: "Active",
  //   },
  //   {
  //     id: 2,
  //     areaName: "Blur Dubai",
  //     emirate: "Dubai",
  //     country: "Antarctica",
  //     radius: "8 Km",
  //     status: "Active",
  //   },
  //   {
  //     id: 3,
  //     areaName: "Mussaffah",
  //     emirate: "Ajman",
  //     country: "United Arab Emirates",
  //     radius: "12 Km",
  //     status: "Active",
  //   },
  //   {
  //     id: 4,
  //     areaName: "Abu Dhabi",
  //     emirate: "Ajman",
  //     country: "United Arab Emirates",
  //     radius: "15 Km",
  //     status: "Active",
  //   },
  // ];

  return (
    <>
      {/* Back Button */}
      <div className="flex items-center justify-center bg-indigo-800 w-11 h-11 rounded-sm absolute top-[40px] left-[338px] cursor-pointer">
        <TbArrowBackUp className="w-6 h-6 text-white" />
      </div>

      {/* Add Area Button */}
      <div
        onClick={() => setShowAddArea(true)}
        className="w-[250px] h-12 absolute top-[40px] right-[60px] rounded-full flex items-center justify-center gap-3.5 bg-[#4845D2] cursor-pointer"
      >
        <FaRegUser className="w-5 h-5 text-white" />
        <span className="text-white font-medium">Add New Area</span>
      </div>

      {/* Add Modal */}
      {showAddArea && (
        <AddArea onClose={() => setShowAddArea(false)} />
      )}

      {/* Search */}
      <div className="absolute top-[120px] right-[60px]">
        <div className="w-[320px] h-12 rounded-lg bg-[#E2E8F0] flex items-center px-3 gap-2">
          <CiSearch className="w-5 h-5 text-slate-600" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="flex-1 bg-transparent outline-none text-[16px]"
          />
          {search && (
            <IoIosClose
              onClick={() => setSearch("")}
              className="w-7 h-7 cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Table */}
      <div className="absolute top-[238px] left-[338px] right-[60px]">
        <table className="w-full border-separate border-spacing-x-2 border-spacing-y-3">
          <thead>
            <tr>
              <th className="bg-[#56CCF2] rounded-md py-3">Sr No</th>
              <th className="bg-[#56CCF2] rounded-md py-3">Area Name</th>
              <th className="bg-[#56CCF2] rounded-md py-3">Emirate</th>
              <th className="bg-[#56CCF2] rounded-md py-3">Country</th>
              <th className="bg-[#56CCF2] rounded-md py-3">Radius</th>
              <th className="bg-[#56CCF2] rounded-md py-3">Status</th>
              <th className="bg-[#56CCF2] rounded-md py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {areas.map((item, index) => (
              <tr key={item.id} className="bg-white rounded-md">
                <td className="text-center py-3">{index + 1}</td>
                <td className="text-center py-3">{item.areaName}</td>
                <td className="text-center py-3">{item.emirate}</td>
                <td className="text-center py-3">{item.country}</td>
                <td className="text-center py-3">{item.radius}</td>
                <td className="text-center py-3">
                  <span className="text-green-600 font-medium flex items-center justify-center gap-1">
                    ● {item.status}
                  </span>
                </td>
                <td className="text-center py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setShowEditArea(true)}
                      className="p-2 bg-indigo-100 text-indigo-700 rounded"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button className="p-2 bg-red-100 text-red-600 rounded">
                      <MdDeleteOutline size={18} />
                    </button>
                  </div>
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

        {/* Edit Modal */}
        {showEditArea && (
          <EditArea onClose={() => setShowEditArea(false)} />
        )}
      </div>
    </>
  );
}

export default Area;

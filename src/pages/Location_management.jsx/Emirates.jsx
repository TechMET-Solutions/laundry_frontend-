import React, { useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

import AddEmirates from "./AddEmirates";

import EditEmirates from "./EditEmirates";

function Emirates() {
  const [search, setSearch] = useState("");
   const [showAddEmirates, setShowAddEmirates] = useState(false);
    const [showEditEmirates, setShowEditEmirates] = useState(false);
   



  // ✅ Emirates data 
  const emirates = [
    {
      id: 1,
      name: "Dubai",
      code: "DXB",
      country: "United Arab Emirates",
      status: "Active",
      createdBy: "30-12-2024",
    },
    {
      id: 2,
      name: "Ajman",
      code: "AJM",
      country: "United Arab Emirates",
      status: "Active",
      createdBy: "30-12-2024",
    },
    {
      id: 3,
      name: "Abu Dhabi",
      code: "AUX",
      country: "United Arab Emirates",
      status: "Active",
      createdBy: "03-01-2025",
    },
    {
      id: 4,
      name: "Sad",
      code: "ASD",
      country: "United Arab Emirates",
      status: "Active",
      createdBy: "03-01-2025",
    },
  ];

  return (
    <>
      {/* Back Button */}
      <div className="flex items-center justify-center bg-indigo-800 w-11 h-11 rounded-sm absolute top-[40px] left-[338px] cursor-pointer">
        <TbArrowBackUp className="w-6 h-6 text-white" />
      </div>

      {/* Add Emirates Button */}
      <div
        onClick={() => setShowAddEmirates(true)}
        className="w-[250px] h-12 absolute top-[40px] right-[60px] rounded-full flex items-center justify-center gap-3.5 bg-[#4845D2] cursor-pointer"
      >
        <FaRegUser className="w-5 h-5 text-white" />
        <span className="text-white font-medium">
          Add New Emirates
        </span>
      </div>

      {/* Modal */}
      {showAddEmirates && (
        <AddEmirates onClose={() => setShowAddEmirates(false)} />
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
              <th className="bg-[#56CCF2] rounded-md py-3">Emirates</th>
              <th className="bg-[#56CCF2] rounded-md py-3">Code</th>
              <th className="bg-[#56CCF2] rounded-md py-3">Country</th>
              <th className="bg-[#56CCF2] rounded-md py-3">Status</th>
              <th className="bg-[#56CCF2] rounded-md py-3">Created By</th>
              <th className="bg-[#56CCF2] rounded-md py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {emirates.map((item, index) => (
              <tr key={item.id} className="bg-white rounded-md">
                <td className="text-center py-3">{index + 1}</td>
                <td className="text-center py-3">{item.name}</td>
                <td className="text-center py-3">{item.code}</td>
                <td className="text-center py-3">{item.country}</td>
                <td className="text-center py-3">
                  <span className="text-green-600 font-medium flex items-center justify-center gap-1">
                    ● {item.status}
                  </span>
                </td>
                <td className="text-center py-3">{item.createdBy}</td>
                <td className="text-center py-3">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 bg-cyan-100 text-cyan-700 rounded">
                      <IoEyeOutline size={18} />
                    </button>
                    <button  onClick={() => setShowEditEmirates(true)} className="p-2 bg-indigo-100 text-indigo-700 rounded">
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

        {/* Edit Modal */}
      {showEditEmirates && (
        <EditEmirates onClose={() => setShowEditEmirates(false)} />
      )}

      </div>
    </>
  );
}

export default Emirates;

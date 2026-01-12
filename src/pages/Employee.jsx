import React, { useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import AddNewEmployee from "./services/AddNewEmployee";

function Employee() {
  const [showRoles, setShowRoles] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [search, setSearch] = useState("");
  const [showAddEmployee, setShowAddEmployee] = useState(false);



  const employees = [
    { id: 1, name: "Test", contact: "9718974583", address: "Arakkal", role: "Driver" },
    { id: 2, name: "sales team", contact: "9719588676", address: "KFC kochi", role: "Driver" },
    { id: 3, name: "Aswin VD", contact: "4578432187", address: "N/A", role: "Supervisor" },
    { id: 4, name: "Aleena Mary", contact: "9752576542", address: "N/A", role: "Driver" },
    { id: 5, name: "Sera VD", contact: "9125843579", address: "N/A", role: "Driver" },
    { id: 6, name: "Esther Jorry", contact: "8764259875", address: "N/A", role: "Driver" },
  ];

  return (
    <>
      {/* Back Button */}
      <div className="flex items-center justify-center bg-indigo-800 w-11 h-11 rounded-sm absolute top-[40px] left-[338px] cursor-pointer">
        <TbArrowBackUp className="w-6 h-6 text-white" />
      </div>

      {/* Add Employee Button (NO VALIDATION NOW) */}
      <div
        onClick={() => setShowAddEmployee(true)}
        className="w-[250px] h-12 absolute top-[40px] right-[60px] rounded-full flex items-center justify-center gap-3.5 bg-[#4845D2] cursor-pointer"
      >
        <FaRegUser className="w-5 h-5 text-white" />
        <span className="text-white font-medium">
          Add New Employee
        </span>
      </div>

      {/* Search + Roles */}
      <div className="flex gap-4 absolute top-[120px] right-[60px]">

        {/* Search */}
        <div className="w-[320px] h-12 rounded-lg bg-[#E2E8F0] flex items-center px-3 gap-2">
          <CiSearch className="w-5 h-5 text-slate-600" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="flex-1 bg-transparent outline-none text-[16px] text-slate-700 placeholder-slate-500"
          />
          {search && (
            <IoIosClose
              onClick={() => setSearch("")}
              className="w-7 h-7 text-slate-500 cursor-pointer hover:text-slate-700"
            />
          )}
        </div>

        {/* Roles Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoles(!showRoles)}
            className="w-[150px] h-12 rounded-lg bg-[#E2E8F0] flex items-center justify-between px-4 text-slate-600"
          >
            {selectedRole || "Roles"}
            <RiArrowDropDownLine size={24} />
          </button>

          {showRoles && (
            <div className="absolute top-12 left-0 w-full bg-white rounded-lg shadow-md border z-10">
              <p
                onClick={() => {
                  setSelectedRole("Supervisor");
                  setShowRoles(false);
                }}
                className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
              >
                Supervisor
              </p>
              <p
                onClick={() => {
                  setSelectedRole("Driver");
                  setShowRoles(false);
                }}
                className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
              >
                Driver
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="absolute top-[238px] left-[338px] right-[60px]">
        <table className="w-full border-separate border-spacing-x-2 border-spacing-y-3 border-[#898d96]">
          <thead>
            <tr>
              <th className="bg-[#56CCF2] rounded-md py-3">Sr No</th>
              <th className="bg-[#56CCF2] rounded-md py-3">Employee Name</th>
              <th className="bg-[#56CCF2] rounded-md py-3">Contact</th>
              <th className="bg-[#56CCF2] rounded-md py-3">Address</th>
              <th className="bg-[#56CCF2] rounded-md py-3">Role</th>
              <th className="bg-[#56CCF2] rounded-md py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp.id}>
                <td className="text-center py-3">{index + 1}</td>
                <td className="text-center py-3">{emp.name}</td>
                <td className="text-center py-3">{emp.contact}</td>
                <td className="text-center py-3">{emp.address}</td>
                <td className="text-center py-3">{emp.role}</td>
                <td className="text-center py-3">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 bg-cyan-100 text-cyan-700 rounded">
                      <IoEyeOutline size={20} />
                    </button>
                    <button className="p-2 bg-indigo-100 text-indigo-700 rounded">
                      <FiEdit size={20} />
                    </button>
                    <button className="p-2 bg-red-100 text-red-600 rounded">
                      <MdDeleteOutline size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showAddEmployee && (
        <AddNewEmployee onClose={() => setShowAddEmployee(false)} />
      )}
    </>
  );
}

export default Employee;

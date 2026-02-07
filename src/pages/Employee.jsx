import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline, IoReturnUpBackOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import AddNewEmployee from "../components/models/AddNewEmployee";
import { getAllEmployees, deleteEmployee } from "../api/employee";
import DeleteModal from "../components/models/DeleteModal";
import Pagination from "../components/Pagination";

function Employee() {
  const [showRoles, setShowRoles] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [search, setSearch] = useState("");
  const [showDeleteEmployee, setShowDeleteEmployee] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // const fetchEmployees = async () => {
  //   const res = await getAllEmployees();
  //   setEmployees(res.data.data);
  // };

  const fetchEmployees = async (p = page) => {
    const res = await getAllEmployees(p, 10);

    setEmployees(res.data.data);
    setTotalPages(res.data.pagination.totalPages);
  };

  useEffect(() => {
    fetchEmployees(page);
  }, [page]);


  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteEmployee(deleteId);
    // setShowDeleteEmployee(false);
    setDeleteId(null);
    fetchEmployees();
  };

  // Filtered data
  const filteredEmployees = employees.filter((emp) => {
    const fullName = `${emp.first_name} ${emp.last_name}`.toLowerCase();
    const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      emp.mobile_no?.includes(search);

    const matchesRole = selectedRole
      ? emp.role === selectedRole
      : true;

    return matchesSearch && matchesRole;
  });

  const roles = ["Supervisor", "Driver"];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto rounded-xl">

        {/* Header Section: Title & Add Button */}
        <div className="px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded">
              <IoReturnUpBackOutline />
            </div>
            <h1 className="text-xl font-semibold">Employee Management</h1>
          </div>

          <button
            onClick={() => {
              setMode("add");
              setSelectedEmployee(null);
              setShowModal(true);
            }}
            className="bg-indigo-800 text-white px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1"
          >
            <FaRegUser />
            <span>Add New Employee</span>
          </button>
        </div>

        {/* Filters Section: Search & Role Dropdown */}
        <div className="p-6 flex flex-wrap items-center justify-end gap-4">
          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-slate-200 px-3 py-2 rounded-lg w-64">
            <CiSearch className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or contact..."
              className="flex-1 bg-transparent outline-none text-[16px] text-slate-700 placeholder-slate-400"
            />
            {search && (
              <IoIosClose
                onClick={() => setSearch("")}
                className="w-7 h-7 text-slate-400 cursor-pointer hover:text-slate-600"
              />
            )}
          </div>

          {/* Roles Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowRoles((prev) => !prev)}
              className="flex items-center gap-2 bg-slate-200 px-4 py-2 rounded-lg w-32"
            >
              <span className="truncate">{selectedRole || "All Roles"}</span>
              <RiArrowDropDownLine size={24} />
            </button>

            {showRoles && (
              <div className="absolute top-14 left-0 w-full bg-white rounded-lg shadow-xl border z-20 overflow-hidden">
                <p
                  onClick={() => { setSelectedRole(""); setShowRoles(false); }}
                  className="px-4 py-2 text-slate-400 hover:bg-slate-100 cursor-pointer"
                >
                  All Roles
                </p>
                {roles.map((role) => (
                  <p
                    key={role}
                    onClick={() => { setSelectedRole(role); setShowRoles(false); }}
                    className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-slate-700"
                  >
                    {role}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate">
            <thead>
              <tr className="bg-[#56CCF2] text-black">
                <th className="bg-[#56CCFF] px-4 py-3 text-left font-medium">Sr No</th>
                <th className="bg-[#56CCFF] px-4 py-3 font-medium text-left">Employee Name</th>
                <th className="bg-[#56CCFF] px-4 py-3 text-left font-medium">Contact</th>
                <th className="bg-[#56CCFF] px-4 py-3 font-medium text-left">Address</th>
                <th className="bg-[#56CCFF] px-4 py-3 text-left font-medium">Role</th>
                <th className="bg-[#56CCFF] px-4 py-3 font-medium text-center max-w-[50px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp, index) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="text-center px-4 py-1 text-slate-600">
                    {(page - 1) * 10 + index + 1}
                  </td>
                  <td className="px-4 py-1 font-medium text-slate-700">
                    {emp.first_name} {emp.last_name}
                  </td>
                  <td className="text-center px-4 py-4 text-slate-600">{emp.mobile_no}</td>
                  <td className="px-4 py-1 text-slate-500 max-w-[350] truncate">
                    {emp.address}
                  </td>
                  <td className="text-center px-4 py-1">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                      {emp.role}
                    </span>
                  </td>
                  <td className="px-4 py-1 ">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => { setMode("view"); setSelectedEmployee(emp); setShowModal(true); }} className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-full transition-colors"><IoEyeOutline size={20} /></button>
                      <button onClick={() => { setMode("edit"); setSelectedEmployee(emp); setShowModal(true); }} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"><FiEdit size={20} /></button>
                      <button onClick={() => { setDeleteId(emp.id); setShowDeleteEmployee(true); }} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"><MdDeleteOutline size={20} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="py-6 border-t flex justify-center">
          <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>

      {/* Modals remain the same */}
      {showModal &&
        <AddNewEmployee
          employee={selectedEmployee}
          mode={mode}
          onClose={() => setShowModal(false)} onSuccess={fetchEmployees}
        />}

      {showDeleteEmployee &&
        <DeleteModal
          isOpen={showDeleteEmployee}
          onCancel={() => setShowDeleteEmployee(false)}
          onConfirm={handleDelete}
        />}
    </div>
  );
}

export default Employee;

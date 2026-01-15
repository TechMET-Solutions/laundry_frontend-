import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
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
    <div className="bg-indigo-800">
      {/* Add Employee Button */}
      <div
        onClick={() => {
          setMode("add");              // add mode force karo
          setSelectedEmployee(null);   // purana employee clear karo
          setShowModal(true);
        }}
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
            type="button"
            onClick={() => setShowRoles((prev) => !prev)}
            className="w-[150px] h-12 rounded-lg bg-[#E2E8F0] flex items-center justify-between px-4 text-slate-600"
          >
            {selectedRole || "Roles"}
            <RiArrowDropDownLine size={24} />
          </button>

          {showRoles && (
            <div className="absolute top-12 left-0 w-full bg-white rounded-lg shadow-md border z-10 overflow-hidden">
              <p
                onClick={() => {
                  setSelectedRole("");
                  setShowRoles(false);
                }}
                className="px-4 py-2 text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                Select Role
              </p>

              {roles.map((role) => (
                <p
                  key={role}
                  onClick={() => {
                    setSelectedRole(role);
                    setShowRoles(false);
                  }}
                  className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                >
                  {role}
                </p>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Table */}
      <div className="absolute top-[238px] left-[338px] right-[60px] overflow-x-auto">
        <table className="w-full border-collapse bg-white overflow-hidden">
          <thead>
            <tr>
              <th className="bg-[#56CCF2] px-4 py-3 border-2 border-gray-100 text-center">Sr No</th>
              <th className="bg-[#56CCF2] px-4 py-3 border-2 border-gray-100 text-center">Employee Name</th>
              <th className="bg-[#56CCF2] px-4 py-3 border-2 border-gray-100 text-center">Contact</th>
              <th className="bg-[#56CCF2] px-4 py-3 border-2 border-gray-100 text-center">Address</th>
              <th className="bg-[#56CCF2] px-4 py-3 border-2 border-gray-100 text-center">Role</th>
              <th className="bg-[#56CCF2] px-4 py-3 border-2 border-gray-100 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp, index) => (
              <tr key={emp.id} className="border-b hover:bg-gray-50">
                <td className="text-center px-4 py-3">
                  {(page - 1) * 10 + index + 1}
                </td>
                <td className="text-center px-4 py-3">
                  {emp.first_name} {emp.last_name}
                </td>
                <td className="text-center px-4 py-3">{emp.mobile_no}</td>
                <td className="text-center px-4 py-3 truncate max-w-[200px]">
                  {emp.address}
                </td>
                <td className="text-center px-4 py-3">{emp.role}</td>
                <td className="text-center px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setMode("view");
                        setSelectedEmployee(emp);
                        setShowModal(true);
                      }}
                      className="p-2 bg-cyan-100 text-cyan-700 rounded">
                      <IoEyeOutline size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setMode("edit");
                        setSelectedEmployee(emp);
                        setShowModal(true);
                      }}
                      className="p-2 bg-indigo-100 text-indigo-700 rounded">
                      <FiEdit size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(emp.id);
                        setShowDeleteEmployee(true);
                      }}
                      className="p-2 bg-red-100 text-red-600 rounded"
                    >
                      <MdDeleteOutline size={20} />
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
      </div>

      {/* Modals */}
      {showModal && (
        <AddNewEmployee
          employee={selectedEmployee}
          mode={mode}
          onClose={() => setShowModal(false)}
          onSuccess={fetchEmployees}
        />
      )}


      {showDeleteEmployee && (
        <DeleteModal
          isOpen={showDeleteEmployee}
          onCancel={() => setShowDeleteEmployee(false)}
          onConfirm={handleDelete}
        />
      )}

    </div>
  );
}

export default Employee;

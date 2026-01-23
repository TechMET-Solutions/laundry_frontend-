import React, { useState, useEffect } from "react";
import { FiSearch, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { FaRegAddressBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Excel from "../assets/excel.png";
import AddCustomerModal from "./services/AddCustomerModal";
import BillingDetailsModal from "./services/BillingDetailsModal";
import { getAllCustomers, deleteCustomers } from "../api/customer";
import Pagination from "../components/Pagination";

function Customer() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editCustomer, setEditCustomer] = useState(null);

  // ✅ Fetch customers from server (search + pagination)
  const fetchCustomers = async (p = page, s = searchTerm) => {
    try {
      const res = await getAllCustomers(p, 10, s);
      setCustomers(res.data.data || []);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.error("API ERROR:", error);
    }
  };

  // ✅ Reset to page 1 when searching
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  // ✅ Fetch when page or search changes
  useEffect(() => {
    fetchCustomers(page, searchTerm);
  }, [page, searchTerm]);

  const handleAddCustomer = async () => {
    await fetchCustomers(page, searchTerm);
    setEditCustomer(null);
    setShowAddModal(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewBilling = (customer) => {
    setSelectedCustomer(customer);
    setShowBillingModal(true);
  };

  const handleViewCustomerDetails = (customer) => {
    navigate(`/customers/${customer.id}/details`, {
      state: { customerData: customer },
    });
  };

  // ✅ Delete customer
  const handleDeleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      await deleteCustomers(id);
      fetchCustomers(page, searchTerm);
    } catch (error) {
      console.error("DELETE ERROR:", error);
      alert("Failed to delete customer");
    }
  };

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded">
            <IoReturnUpBackOutline />
          </div>
          <h1 className="text-xl font-semibold text-gray-800">
            Manage Customers
          </h1>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => {
              setEditCustomer(null);
              setShowAddModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
          >
            + Add New Customer
          </button>

          <button className="bg-white text-green-600 border border-green-600 px-4 py-2 rounded-lg text-sm hover:bg-green-50">
            <div className="flex items-center gap-2">
              <img src={Excel} alt="Excel" className="w-5 h-5" />
              Export Excel Sheet
            </div>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center mb-6">
        <div className="relative w-64">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-3 py-2 bg-gray-200 rounded-lg text-sm outline-none focus:bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#f4f7fb] rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-[#56CCFF] text-center">
              <th className="px-4 py-3">Sr No</th>
              <th className="px-4 py-3">Customer Name</th>
              <th className="px-4 py-3">Customer Type</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-center">
                  {(page - 1) * 10 + index + 1}
                </td>

                <td className="px-4 py-3 text-center font-medium">
                  {customer.name}
                </td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      customer.type === "Corporate"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {customer.type}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  {customer.mobile_no}
                </td>

                <td className="px-4 py-3 text-center truncate max-w-xs">
                  {customer.address}
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="p-2 bg-sky-100 text-sky-600 rounded"
                      onClick={() => handleViewCustomerDetails(customer)}
                    >
                      <FiEye />
                    </button>

                    <button
                      className="p-2 bg-indigo-100 text-indigo-600 rounded"
                      onClick={() => {
                        setEditCustomer(customer);
                        setShowAddModal(true);
                      }}
                    >
                      <FiEdit />
                    </button>

                    <button
                      className="p-2 bg-red-100 text-red-500 rounded"
                      onClick={() => handleViewBilling(customer)}
                    >
                      <FaRegAddressBook />
                    </button>

                    <button
                      className="p-2 bg-red-200 text-red-700 rounded"
                      onClick={() => handleDeleteCustomer(customer.id)}
                    >
                      <FiTrash2 />
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
      {showAddModal && (
        <AddCustomerModal
          onClose={() => {
            setShowAddModal(false);
            setEditCustomer(null);
          }}
          onSave={handleAddCustomer}
          editData={editCustomer}
        />
      )}

      {showBillingModal && selectedCustomer && (
        <BillingDetailsModal
          customer={selectedCustomer}
          onClose={() => setShowBillingModal(false)}
        />
      )}
    </div>
  );
}

export default Customer;

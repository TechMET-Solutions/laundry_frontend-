import React, { useState } from "react";
import { FiSearch, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import Excel from "../assets/excel.png";
import AddCustomerModal from "./services/AddCustomerModal";
import BillingDetailsModal from "./services/BillingDetailsModal";
import { FaRegAddressBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ADD THIS IMPORT

import { getAllCustomers, deleteCustomers } from "../api/customer";

function Customer() {
  const navigate = useNavigate(); // ADD THIS HOOK
  
  // State for customers data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      type: "Retail",
      contact: "123-456-7890",
      address: "123 Main St, Cityville",
    },
    {
      id: 2,
      name: "Jane Smith",
      type: "Corporate",
      contact: "987-654-3210",
      address: "456 Oak Ave, Townsville",
    },
    {
      id: 3,
      name: "Robert Johnson",
      type: "Retail",
      contact: "555-123-4567",
      address: "789 Pine Rd, Villageton",
    },
    {
      id: 4,
      name: "Sarah Williams",
      type: "Corporate",
      contact: "444-555-6666",
      address: "321 Elm St, Metropolis",
    },
    {
      id: 5,
      name: "Michael Brown",
      type: "Retail",
      contact: "777-888-9999",
      address: "654 Birch Ln, Hamletville",
    },
  ]);

  // State for modal
  const [showAddModal, setShowAddModal] = useState(false);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  
  // Billing Details Modal State
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Handle adding new customer
  const handleAddCustomer = (newCustomer) => {
    // Add new customer to the list
    setCustomers([...customers, newCustomer]);
    
    // Close modal
    setShowAddModal(false);
    
    // Optional: Show success message
    console.log("Customer added:", newCustomer);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle view billing details
  const handleViewBilling = (customer) => {
    setSelectedCustomer(customer);
    setShowBillingModal(true);
  };

  // NEW FUNCTION: Handle view customer details - navigate to CustomerD page
  const handleViewCustomerDetails = (customer) => {
    // Navigate to customer details page with customer ID
    navigate(`/customers/${customer.id}/details`, {
      state: { customerData: customer } // Pass customer data
    });
  };

  // Filter customers based on search
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contact.includes(searchTerm) ||
    customer.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {/* Left: Back + Title */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded">
            <IoReturnUpBackOutline />
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Manage Customers</h1>
        </div>
        
        {/* Right: Add Customer & Export Buttons */}
        <div className="flex gap-4">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition duration-300 cursor-pointer"
          >
            + Add New Customer
          </button>
          
          <button className="bg-white text-green-600 border border-green-600 px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-green-50 transition">
            <div className="flex items-center gap-2">
              <img src={Excel} alt="Excel" className="w-5 h-5" />
              Export Excel Sheet
            </div>
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative w-64">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-3 py-2 bg-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <select 
            className="px-4 py-2 rounded-lg text-sm bg-gray-200 cursor-pointer outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
            defaultValue=""
          >
            <option value="">All Customer Types</option>
            <option value="Retail">Retail</option>
            <option value="Corporate">Corporate</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#f4f7fb]  rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm border-separate border-spacing-x-0.5 border-spacing-y-2">
          <thead>
            <tr className="bg-[#56CCFF] text-center">
              <th className="px-4 py-3 text-center text-gray-800 font-medium">Sr No</th>
              <th className="px-4 py-3 text-center text-gray-800 font-medium">Customer Name</th>
              <th className="px-4 py-3 text-center text-gray-800 font-medium">Customer Type</th>
              <th className="px-4 py-3 text-center text-gray-800 font-medium">Contact</th>
              <th className="px-4 py-3 text-center text-gray-800 font-medium">Address</th>
              <th className="px-4 py-3 text-center text-gray-800 font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr 
                key={customer.id} 
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 text-center font-medium">{customer.id}</td>
                <td className="px-4 py-3 text-center font-medium text-gray-800">{customer.name}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    customer.type === "Corporate" 
                      ? "bg-blue-100 text-blue-800" 
                      : "bg-green-100 text-green-800"
                  }`}>
                    {customer.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-gray-600">{customer.contact}</td>
                <td className="px-4 py-3 text-center text-gray-600 max-w-xs truncate">{customer.address}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    {/* UPDATED EYE BUTTON - Now navigates to CustomerD */}
                    <button 
                      className="p-2 bg-sky-100 text-sky-600 rounded hover:bg-sky-200 transition cursor-pointer" 
                      onClick={() => handleViewCustomerDetails(customer)} // CHANGED HERE
                      title="View Details"
                    >
                      <FiEye />
                    </button>
                    
                    <button 
                      className="p-2 bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200 transition cursor-pointer"
                      onClick={() => setShowAddModal(true)}
                    >
                      <FiEdit />
                    </button>
                    
                    <button 
                      className="p-2 bg-red-100 text-red-500 rounded hover:bg-red-200 transition cursor-pointer" 
                      onClick={() => handleViewBilling(customer)}
                      title="View Billing Details"
                    >
                      <FaRegAddressBook />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render Add Customer Modal */}
      {showAddModal && (
        <AddCustomerModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddCustomer}
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


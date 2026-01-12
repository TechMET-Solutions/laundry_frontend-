import React from "react";
import { FiSearch, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { RiFileExcel2Line } from "react-icons/ri";
import Excel from "../assets/excel.png";


function Customer() {
  const customers = [
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
  ];

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
        <div className="flex gap-4">
          <button className="bg-white text-green px-4 py-2 rounded-full text-sm cursor-pointer  transition ">
         <div className="flex gap-2"> <img src={Excel} alt="" /> Export Excel Sheet </div> 
        </button>
        <button  onClick={() =>   <AddCustomerModal />} className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-indigo-700 transition">
          + Add New Customer
        </button>
        </div>
        

      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4 mb-6 justiy-end">
        {/* Search */}
        <div className="relative w-64 justify-end">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-2 bg-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <select className="px-4 py-2 rounded-lg text-sm bg-gray-200 cursor-pointer outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 justify-end">
          <option>Customer Types</option>
          <option>Retail</option>
          <option>Corporate</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white  shadow-sm overflow-hidden ">
        <table className="w-full text-sm   border-separate border-spacing-x-4 border-spacing-y-2 ">
          <thead>
            <tr className="bg-[#56CCFF] text-center " >
              <th className="px-4 py-3 text-center text-gray-800 font-medium ">Sr No</th>
              <th className="px-4 py-3 text-center text-gray-800 font-medium">Customer Name</th>
              <th className="px-4 py-3 text-center text-gray-800 font-medium">Customer Type</th>
              <th className="px-4 py-3 text-center text-gray-800 font-medium">Contact</th>
              <th className="px-4 py-3 text-center text-gray-800 font-medium">Address</th>
              <th className="px-4 py-3 text-center text-gray-800 font-medium ">Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr 
                key={customer.id} 
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 font-medium">{customer.id}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{customer.name}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    customer.type === "Corporate" 
                      ? "bg-blue-100 text-blue-800" 
                      : "bg-green-100 text-green-800"
                  }`}>
                    {customer.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{customer.contact}</td>
                <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{customer.address}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="p-2 bg-sky-100 text-sky-600 rounded hover:bg-sky-200 transition cursor-pointer">
                      <FiEye />
                    </button>
                    <button className="p-2 bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200 transition cursor-pointer">
                      <FiEdit />
                    </button>
                    <button className="p-2 bg-red-100 text-red-500 rounded hover:bg-red-200 transition cursor-pointer">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customer;
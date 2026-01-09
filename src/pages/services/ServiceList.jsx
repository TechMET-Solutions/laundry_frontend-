import React, { useState } from "react";
import { FiSearch, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

const ServiceList = ( ) => {
  

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Sort By Category");

  const handleSelect = () => { 
    setOpen(false);
  };
  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {/* Left: Back + Title */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded">
            <IoReturnUpBackOutline />
          </div>

          <h1 className="text-xl font-semibold text-gray-800">
            Add New Service
          </h1>
        </div>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm cursor-pointer">
          + Add New Collection
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex justify-end gap-4 mb-6">
        {/* Search */}
        <div className="relative w-64 ">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-2 bg-gray-200 rounded-lg text-sm outline-none "
          />
        </div>

        {/* Sort */}
        <div className="relative w-56 ">
          {/* Dropdown button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-9 cursor-pointer  w-full items-center justify-between rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-700"
          >
            <span>{selected}</span>
            <RiArrowDropDownLine className="h-6 w-6 text-gray-600" />
          </button>

          {/* Dropdown menu */}
          {open && (
            <ul className="absolute left-0 top-full z-20 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-md" onClick={handleSelect} >
              <li className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100">Gendes</li>
              <li className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100">Ladies</li>
              <li className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100">Kids</li>
              <li className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100">Other</li>
            </ul>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#f4f7fb]  ">
        <table className="w-full text-sm border-separate  ">
         <thead>
    <tr>
      {[
        "Sr No",
        "Service",
        "Service Type",
        "Service Category",
        "Status",
        "Action",
      ].map((head) => (
        <th
          key={head}
          className="bg-[#56CCFF]  px-4 py-3 text-left font-medium text-gray-800 "
        >
          {head}
        </th>
      ))}
    </tr>
  </thead>

          <tbody>
    {[
      {
        id: 1,
        service: "Shoe Services",
        type: "Shoe Cleaning",
        category: "Other",
        status: "Active",
      },
      {
        id: 2,
        service: "Shall",
        type: "Re-wash",
        category: "Ladies",
        status: "Inactive",
      },
      {
        id: 3,
        service: "New one",
        type: "Rewash",
        category: "Kids",
        status: "Active",
      },
      {
        id: 4,
        service: "Viewy Service",
        type: "Pressing",
        category: "Kids",
        status: "Inactive",
      },
      {
        id: 5,
        service: "Ghutra",
        type: "Pressing, Pressing & Washing",
        category: "Gents",
        status: "Active",
      },
      {
        id: 6,
        service: "Shirt",
        type: "Pressing, Pressing & Washing",
        category: "Gents",
        status: "Inactive",
      },
    ].map((item) => (
      <tr
        key={item.id}
        className="bg-[#f1f5fb] text-center"
      >
        {/* Sr No */}
        <td className="px-4 py-3 font-medium text-gray-700 border-b text-center border-gray-300">
          {item.id}
        </td>

        {/* Service */}
        <td className="px-4 py-4 flex   gap-2 text-left  border-b border-gray-300">
          <span className="text-lg">🧺</span>
          <span className="font-medium text-gray-800">
            {item.service}
          </span>
        </td>

        {/* Service Type */}
        <td className="px-4 py-3 text-gray-700 text-left border-b border-gray-300">
          {item.type}
        </td>

        {/* Category */}
        <td className="px-4 py-3 text-gray-700 text-left border-b border-gray-300">
          {item.category}
        </td>

        {/* Status */}
        <td className="px-4 py-3  border-b text-left border-gray-300">
          <span className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                item.status === "Active"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            />
            <span
              className={`font-medium ${
                item.status === "Active"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {item.status}
            </span>
          </span>
        </td>

        {/* Action */}
        <td className="px-4 py-3  border-b text-left border-gray-300">
          <div className="flex gap-2">
            <button className="rounded-md bg-indigo-100 p-2 text-indigo-600 cursor-pointer">
              <FiEdit />
            </button>
            <button className="rounded-md bg-red-100 p-2 text-red-500 cursor-pointer">
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
};

export default ServiceList;

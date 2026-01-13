import React, { useState } from "react";
import { IoReturnUpBackOutline, IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Status_Screen from "../../assets/Status_Screen.svg";

export default function Order_List() {
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [selected, setSelected] = useState("Sort by Category");
  const [edit, setEdit] = useState(false);
  const [deleteService, setDeleteService] = useState(false);

  const handleStatusScreenClick = () => {
    navigate("/orders/status_screen");
  };
  const handleDeleteScreenClick = () => {
    navigate("/orders/deleted_orders");
  };
  const handleAddOrderClick = () => {
    navigate("/orders/add_order");
  };

  const handleSelection = (value) => {
    setSelected(value);
    setOpenDropdown(false);
  };

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <IoReturnUpBackOutline />
          </div>
          <h2 className="font-semibold text-lg">Order List</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleStatusScreenClick}
            className="bg-[#FFD0C6] flex items-center gap-2 px-4 py-2 rounded-full font-semibold"
          >
            <img src={Status_Screen} alt="Status Screen" />
            Order Status Screen
          </button>

          <button onClick={handleDeleteScreenClick} className="bg-red-600 text-white flex items-center gap-2 px-4 py-2 rounded-full">
            <AiOutlineDelete />
            Deleted Orders
          </button>

          <button onClick={handleAddOrderClick} className="bg-indigo-600 text-white flex items-center gap-2 px-4 py-2 rounded-full">
            <IoAddCircleOutline />
            Add New Order
          </button>
        </div>
      </div>

      {/* Search & Sort */}
      <div className="flex justify-end gap-4 mb-6">
        <div className="relative w-64">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 py-2 bg-gray-200 rounded-lg outline-none"
          />
        </div>

        <div className="relative w-56">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex w-full items-center justify-between bg-gray-200 px-4 py-2 rounded-lg"
          >
            {selected}
            <RiArrowDropDownLine className="h-6 w-6" />
          </button>

          {openDropdown && (
            <ul className="absolute z-20 w-full bg-white border rounded-lg shadow-md">
              {["Gents", "Ladies", "Kids", "Other"].map((item) => (
                <li
                  key={item}
                  onClick={() => handleSelection(item)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm border-separate ">
        <thead >
          <tr>
            {[
              "Sr No",
              "Service",
              "Service Type",
              "Service Category",
              "Status",
              "Action",
            ].map((head) => (
              <th key={head} className="bg-[#56CCFF]  px-4 py-3 text-left font-medium text-gray-800">
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
          ].map((item) => (
            <tr key={item.id} className="bg-[#f1f5fb] border-b border-gray-400  ">
              <td className="px-4 py-3 border-b border-gray-400">{item.id}</td>
              <td className="px-4 py-3 border-b border-gray-400">{item.service}</td>
              <td className="px-4 py-3 border-b border-gray-400">{item.type}</td>
              <td className="px-4 py-3 border-b border-gray-400">{item.category}</td>
              <td className="px-4 py-3 border-b border-gray-400">
                <span
                  className={`font-semibold ${
                    item.status === "Active"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-3 flex gap-2">
                <button
                  onClick={() => setEdit(true)}
                  className="bg-indigo-100 p-2 rounded"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => setDeleteService(true)}
                  className="bg-red-100 p-2 rounded"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
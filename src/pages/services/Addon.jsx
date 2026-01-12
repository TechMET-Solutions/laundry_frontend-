import React, { useState } from "react";
import { FiSearch, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

import Setting_img from "../../assets/carbon_settings-services.png";

const Addon = () => {
  const [open, setOpen] = useState(false);

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
            Service Addons
          </h1>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-indigo-600 px-3 py-2 text-white">
          <img
            src={Setting_img}
            alt="setting"
            className="h-4 w-4 object-contain"
          />

          <span className="text-sm font-medium">Add New Addon</span>
        </div>
      </div>

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
      </div>


      <div className="bg-[#f4f7fb]  ">
        <table className="w-full text-sm border-separate  ">
          <thead>
            <tr>
              {["Sr No", "Add-on", "Price", "Status", "Action"].map((head) => (
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
                Add_on: "DeliveryCharge",
                price: "AED 25.00",
                status: "Active",
              },
              {
                id: 2,
                service: "Shall",
                type: "Re-wash",
                Add_on: "DeliveryCharge",
                price: "AED 25.00",
                category: "Ladies",
                status: "Inactive",
              },
            ].map((item) => (
              <tr key={item.id} className="bg-[#f1f5fb] text-center">
                {/* Sr No */}
                <td className="px-4 py-3 font-medium text-gray-700 border-b text-center border-gray-300">
                  {item.id}
                </td>

                {/* Service Type */}
                <td className="px-4 py-3 text-gray-700 text-left border-b border-gray-300">
                  {item.Add_on}
                </td>

                {/* Category */}
                <td className="px-4 py-3 text-gray-700 text-left border-b border-gray-300">
                  {item.price}
                </td>

                {/* Status */}
                <td className="px-4 py-3  border-b text-left border-gray-300">
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        item.status === "Active" ? "bg-green-500" : "bg-red-500"
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

export default Addon;

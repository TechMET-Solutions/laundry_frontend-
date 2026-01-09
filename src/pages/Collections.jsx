
import React from "react";
import { FiSearch, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";


function Collections() {
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
            Collections
            </h1>
        </div>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm cursor-pointer">
            + Add New Collection
        </button>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-4 mb-6">
            {/* Search */}
            <div className="relative w-64 ">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-3 py-2 bg-gray-200 rounded-lg text-sm outline-none "
            />
            </div>

            {/* Filters */}
            <select className="px-4 py-2  rounded-lg text-sm bg-gray-200 cursor-pointer">
            <option>All Types</option>
            <option>Cloth Collection</option>
            <option>Payment Collection</option>
            </select>

            <select className="px-4 py-2  rounded-lg text-sm bg-gray-200 cursor-pointer">
            <option>All Drivers</option>
            <option>Aswin VD</option>
            <option>Super Man</option>
            <option>Sales Team</option>
            </select>

            <select className="px-4 py-2 rounded-lg text-sm bg-gray-200">
            <option>All Collection</option>
            <option>Canceled</option>
            <option>Re-Scheduled</option>
            <option>Scheduled</option>
            <option>Collected</option>
            </select>
        </div>

      {/* Table */}
      <div className="bg-[#f4f7fb]  ">
        <table className="w-full text-sm border-separate border-spacing-x-2 ">
            <thead>
                <tr>
                    <th className="bg-[#56CCFF] px-4 py-3 text-left text-gray-800 font-medium ">
                    Collection Id
                    </th>
                    <th className="bg-[#56CCFF] px-4 py-3 text-left text-gray-800 font-medium">
                    Collection Info
                    </th>
                    <th className="bg-[#56CCFF] px-4 py-3 text-left text-gray-800 font-medium">
                    Customer
                    </th>
                    <th className="bg-[#56CCFF] px-4 py-3 text-left text-gray-800 font-medium ">
                    Status
                    </th>
                    <th className="bg-[#56CCFF] px-4 py-3 text-left text-gray-800 font-medium ">
                    Driver
                    </th>
                    <th className="bg-[#56CCFF] px-4 py-3 text-left text-gray-800 font-medium ">
                    Type
                    </th>
                    <th className="bg-[#56CCFF] px-4 py-3 text-left text-gray-800 font-medium ">
                    Created By
                    </th>
                    <th className="bg-[#56CCFF] px-4 py-3 text-left text-gray-800 font-medium">
                    Action
                    </th>
                </tr>
            </thead>


            <tbody> 
                {[
                {
                    id: "TMS/COL-06",
                    date: "29/11/25",
                    time: "05 PM - 06 PM",
                    customer: "Testing",
                    status: "Scheduled",
                    driver: "Aswin VD",
                    type: "Cloth",
                },
                {
                    id: "TMS/COL-05",
                    date: "28/11/25",
                    time: "10 AM - 11 AM",
                    customer: "As Laundry",
                    status: "Done",
                    driver: "adhil",
                    type: "Cloth",
                },
                {
                    id: "TMS/COL-04",
                    date: "25/11/25",
                    time: "09 AM - 10 AM",
                    customer: "Ahmadd",
                    status: "Cancelled",
                    driver: "Motorist SS",
                    type: "Payment",
                },
                ].map((item, index) => (
                <tr key={index} className="border-b">
                    <td className="p-3">{item.id}</td>

                    <td className="p-3 text-xs text-gray-600">
                    Pickup date: {item.date} <br />
                    Time Slot: {item.time}
                    </td>

                    <td className="p-3">{item.customer}</td>

                    <td className="p-3">
                    <span
                        className={`font-semibold ${
                        item.status === "Done"
                            ? "text-green-600"
                            : item.status === "Cancelled"
                            ? "text-red-500"
                            : "text-blue-500"
                        }`}
                    >
                        {item.status}
                    </span>
                    </td>

                    <td className="p-3">{item.driver}</td>

                    <td className="p-3 text-blue-600 font-medium">{item.type}</td>

                    <td className="p-3">Shop</td>

                    <td className="p-3 flex gap-2">
                    <button className="p-2 bg-sky-100 text-sky-600 rounded cursor-pointer">
                        <FiEye />
                    </button>
                    <button className="p-2 bg-indigo-100 text-indigo-600 rounded">
                        <FiEdit />
                    </button>
                    <button className="p-2 bg-red-100 text-red-500 rounded">
                        <FiTrash2 />
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

export default Collections;




{/* <thead className="bg-sky-400 text-white">
            <tr>
              <th className="p-3 text-left rounded-1-lg">Collection Id</th>
              <th className="p-3 text-left ">Collection Info</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Driver</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Created By</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead> */}





//         <div className=" relative w-[318px]">

//             <div>
//                 <button className="bg-blue-700 rounded-4xl text-white text-sm font-semibold cursor-pointer ml-[500px] h-[38px] w-[162px] mt-10 ">Add New Collection</button>
//             </div>

//             <h1 className="text-2xl font-semibold mb-4 ">
//                 Collections
//             </h1>

//             <div className= "  pl-[200px] flex space-x-4 mb-6">

//               <FiSearch
//                 className="absolute mt-16 text-gray-800 top-1/2 -translate-y-1/2 text-gray-400"
//                 size={16}
//                 /> 

//                 <input type="text" placeholder="Search..." 
//                 className="py-1 pl-8  h-[38px] rounded-md bg-gray-100 border-gray-300  text-sm focus:outline-none focus:ring-2 foucs:ring-indigo-500 "  
//                 />

            

//             {/* All Types */}

//                 <select className="h-[38px] w-[157px] pt-135px rounded-md text-sm bg-gray-100 border-gray-700 focus:outline-none focus:ring-indigo-500 text-gray-800">
//                     <option>All Types</option>
//                     <option>Cloth Collection</option>
//                     <option>Payment Collection</option>
//                     <option>Other</option>
//                 </select>

//                 <select className="h-[38px] w-[157px] rounded-md text-sm bg-gray-100 border-gray-700 text-gray-00 focus:outline-none focus:ring-indigo-500">
//                     <option>All Drivers</option>
//                     <option>Aswin VD</option>
//                     <option>Super Man</option>
//                     <option>Sales Team</option>
//                 </select>

//                 <select className="border-gray-700 rounded-ms text-sm bg-gray-100 text-gray-700">
//                     <option>All Collection</option>
//                     <option>Canceled</option>
//                     <option>Re-Scheduled</option>
//                     <option>Scheduled</option>
//                     <option>Collected</option>
//                 </select>  

//             <div/>
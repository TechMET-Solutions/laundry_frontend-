import React from 'react'
import logo from '../../assets/logo.png'
 import { LuLayoutDashboard } from "react-icons/lu";
// import { CiLocationOn } from "react-icons/ci";

function Sidebar() {
  return (
   <div className="h-screen w-64 bg-white flex flex-col">


      
     
      <div className="p-6">
        <img src={logo} alt="Logo" className="w-32 mx-auto" />
      </div>

     
      <nav className="flex-1 overflow-y-auto flex flex-col gap-1 px-2 text-gray-800 font-medium">

        <button className="flex items-center gap-3 px-4 py-2 rounded-lg text-left
                           hover:bg-blue-500 hover:text-white transition">
          <LuLayoutDashboard />
          Dashboard
        </button>

        <button className="px-4 py-2 rounded-lg text-left
                           hover:bg-blue-500 hover:text-white transition">
          POS
        </button>

        <button className="px-4 py-2 rounded-lg text-left
                           hover:bg-blue-500 hover:text-white transition">
          Orders
        </button>

        <button className="px-4 py-2 rounded-lg text-left
                           hover:bg-blue-500 hover:text-white transition">
          Products
        </button>

        <button className="px-4 py-2 rounded-lg text-left
                           hover:bg-blue-500 hover:text-white transition">
          Customers
        </button>

        <button className="px-4 py-2 rounded-lg text-left
                           hover:bg-blue-500 hover:text-white transition">
          Reports
        </button>

        <button className="px-4 py-2 rounded-lg text-left
                           hover:bg-blue-500 hover:text-white transition">
          Services
        </button>

        <button className="px-4 py-2 rounded-lg text-left
                           hover:bg-blue-500 hover:text-white transition">
          Employees
        </button>

        <button className="px-4 py-2 rounded-lg text-left
                           hover:bg-blue-500 hover:text-white transition">
          Payment Receipt
        </button>

        <button className="px-4 py-2 rounded-lg text-left
                           hover:bg-blue-500 hover:text-white transition">
          Time Slots
        </button>

        <button className="px-4 py-2 rounded-lg text-left
                           hover:bg-blue-500 hover:text-white transition">
                            {/* <CiLocationOn /> */}
          Location Management
        </button>

        <button className="px-4 py-2 rounded-lg text-left
                           hover:bg-blue-500 hover:text-white transition">
          Logout
        </button>

      </nav>
    </div>
  )
}

export default Sidebar

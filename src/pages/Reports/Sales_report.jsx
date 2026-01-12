import React, { useState } from "react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";

const reportitems = [
  { name: "Daily Reports", path: "/reports/daily_reports" },
  { name: "Order Reports", path: "/reports/order_reports" },
  { name: "Sales Reports", path: "/reports/sales_reports" },
  { name: "Cloth Wise Reports", path: "/reports/cloth_wise_reports" },
  { name: "Ledger Reports", path: "/reports/ledger_reports" },
  { name: "Outstanding Reports", path: "/reports/outstanding_reports" },
  { name: "Customer Outstanding Reports", path: "/reports/customer_outstanding_reports" },
  { name: "Expenses Reports", path: "/reports/expenses_reports" },
  { name: "Tax Reports", path: "/reports/tax_reports" },
];

function Sales_report() {
  const navigate = useNavigate();
  const location = useLocation();
   const [startDate, setStartDate] = useState("2025-12-01");
  const [endDate, setEndDate] = useState("2025-12-01");

  // find active report from URL
  const activeReport =
    reportitems.find((item) => item.path === location.pathname) ||
    reportitems[0];

  const [selectedReport, setSelectedReport] = useState(activeReport);

  const handleReportChange = (e) => {
    const report = reportitems.find(
      (item) => item.path === e.target.value
    );
    setSelectedReport(report);
    navigate(report.path);
  };

  return (
   <div className="p-6 bg-[#f4f7fb] min-h-screen">
   
         {/* HEADER */}
         <div className="flex items-center justify-between mb-6">
   
           {/* Left side */}
           <div className="flex items-center gap-3">
             <div
               className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded cursor-pointer"
               onClick={() => navigate(-1)}
             >
               <IoReturnUpBackOutline />
             </div>
   
             <h2 className="font-semibold text-lg">
               {selectedReport.name}
             </h2>
           </div>
   
           {/* Right side */}
           <div className="flex items-center gap-3">
             <select
               value={selectedReport.path}
               onChange={handleReportChange}
               className="px-4 py-2 rounded-lg text-sm bg-indigo-400 text-white cursor-pointer"
             >
               {reportitems.map((item, index) => (
                 <option key={index} value={item.path} className="text-black bg-white">
                   {item.name}
                 </option>
               ))}
             </select>
   
             <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm">
               Download Report
             </button>
   
             <button className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm">
               Print Report
             </button>
           </div>
         </div>
    <div className="flex items-center gap-6 mt-6 mb-6">
     {/* Total Debit */}
     <div className=" bg-white rounded-lg shadow-sm w-56">
       <div className="flex gap-4 px-4 py-3 border-b border-green-400">
         <p className="text-sm text-gray-600">Total Debit</p>
               <span className="text-2xl font-semibold text-gray-800">03</span>
   
       </div>
     </div> 
      <div className="bg-white rounded-lg shadow-sm w-56">
        <div className=" flex gap-4 py-3 border-b border-yellow-400">
          <p className="text-sm text-gray-600">Total Sales</p>
            <span className="text-2xl font-semibold text-gray-800">AED 398.75</span>
        </div>
      </div>
   
     {/* Total Credit */}
     <div className="bg-white rounded-lg shadow-sm w-56">
       <div className=" flex gap-4 px-4 py-3 border-b border-yellow-400">
         <p className="text-sm text-gray-600">Total Credit</p>
               <span className="text-2xl font-semibold text-gray-800">04</span>
       </div>
     </div>
   </div>
   
         {/* DATE FILTERS */}
   <div className="flex justify-center gap-6 mb-6">
    <div className="flex items-center bg-gray-200 rounded-lg px-3 py-2 w-64">
    <input
      type="text"
      placeholder="Search Customer..."
      className="bg-transparent outline-none text-sm w-full"
    />
    <span className="text-gray-500 cursor-pointer">✕</span>
  </div>

     <div className="flex items-center gap-2">
       <label className="text-sm font-medium text-gray-600">
         Start Date
       </label>
       <input
         type="date"
         value={startDate}
         onChange={(e) => setStartDate(e.target.value)}
         className="px-3 py-2 rounded-lg bg-gray-200 text-sm outline-none"
       />
     </div>
   
     <div className="flex items-center gap-2">
       <label className="text-sm font-medium text-gray-600">
         End Date
       </label>
       <input
         type="date"
         value={endDate}
         onChange={(e) => setEndDate(e.target.value)}
         className="px-3 py-2 rounded-lg bg-gray-200 text-sm outline-none"
       />
     </div>
     <select className="bg-gray-200 rounded-lg px-4 py-2 text-sm outline-none">
    <option>All Drivers</option>
    <option>Aswin VD</option>
    <option>Super Man</option>
    <option>Sles Team</option>
  </select>

   </div>
   
   
         {/* TABLE */}
          <div className="bg-[#f4f7fb]  ">
                 <table className="w-full text-sm border-separate  ">
                  <thead>
             <tr>
               {[
                 "Date",
                 "Order ID",
                 "Costomer",
                 "Driver",
                 "Sub Total",
                 "Addon Total",
                 "Discount",
                 "Tax Amount",
                 "Gross Total",
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
    "Date": "01/12/2025",
    "Order Id": "TMS/ORD-03",
    "Customer": "AB devilliers",
    "Driver": "Aswin VD",
    "Sub Total": "AED 3.50",
    "Addon Total": "AED 30.00",
    "Discount": "AED 0.00",
    "Tax Amount": "AED 1.68",
    "Gross Total": "AED 35.25"
  },
  {
    "Date": "01/12/2025",
    "Order Id": "TMS/ORD-02",
    "Customer": "adithi",
    "Driver": "Aswin VD",
    "Sub Total": "AED 10.50",
    "Addon Total": "AED 5.00",
    "Discount": "AED 0.00",
    "Tax Amount": "AED 0.62",
    "Gross Total": "AED 30.00"
  },
  {
    Date: "01/12/2025",
    "Order Id": "TMS/ORD-01",
    Customer: "Test 1",
    Driver: "Aswin VD",
    "Sub Total": "AED 3.50",
    "Addon Total": "AED 0.00",
    Discount: "AED 0.00",
    "Tax Amount": "AED 0.18",
    "Gross Total": "AED 30.00"
  }
]
.map((item, index) => (
           <tr
             key={index}
             className="bg-[#f1f5fb] border-b"
           >
             <td className="px-4 py-3 text-left">
               {item.Date}
             </td>
             <td className="px-4 py-3 text-left font-medium">
               {item["Order ID"]}
             </td>
             <td className="px-4 py-3 text-left">
               {item.Customer}
             </td>
             <td className="px-4 py-3 text-left font-medium">
               {item.Driver}
             </td>
             <td className="px-4 py-3 text-left">
               {item["Sub Total"]}
             </td>
             <td className="px-4 py-3 text-left font-medium">
               {item["Addon Total"]}
             </td>
             <td className="px-4 py-3 text-left">
               {item.Discount}
             </td>
             <td className="px-4 py-3 text-left font-medium">
               {item["Tax Amount"]}
             </td>
             <td className="px-4 py-3 text-left">
               {item["Gross Total"]}
             </td>
             
           </tr>
         ))}
       </tbody>
   
                 </table>
               </div>
             </div>
           
     );  
   }
   

export default Sales_report;

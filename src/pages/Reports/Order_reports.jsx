import React, { useState } from "react";
import { reportitems } from "../../constants/reportitems";
import NavButton from "../../components/ui/NavButton";
import ReportHeader from "../../components/ReportHeader";


function Order_reports() {

  const [startDate, setStartDate] = useState("2025-12-01");
  const [endDate, setEndDate] = useState("2025-12-01");



  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">

      {/* HEADER */}
      <ReportHeader
        reportItems={reportitems}
        actions={
          <>
            <NavButton
              // onClick={handleDownloadPDF}
              variant="download">
              Download Report
            </NavButton>

            <NavButton
              // onClick={handlePrintPDF}
              variant="print">
              Print Report
            </NavButton>
          </>
        }
      />
      <div className="flex items-center gap-6 mt-6 mb-6">
        {/* Total Debit */}
        <div className=" bg-white rounded-lg shadow-sm w-56">
          <div className="flex gap-4 px-4 py-3 border-b border-green-400">
            <p className="text-sm text-gray-600">Total Order</p>
            <span className="text-2xl font-semibold text-gray-800">08</span>

          </div>
        </div>

        {/* Total Credit */}
        <div className="bg-white rounded-lg shadow-sm w-56">
          <div className="flex gap-4 px-4 border-b border-yellow-400">
            <p className="text-sm text-gray-600">Total Order Amount</p>
            <span className="text-2xl font-semibold text-gray-800">AED 15.82</span>
          </div>
        </div>
      </div>
      {/* FILTER BAR */}
      <div className="flex items-center gap-4 bg-[#f4f7fb] p-4 rounded-lg mb-6">

        {/* Search Customer */}
        <div className="flex items-center bg-gray-200 rounded-lg px-3 py-2 w-64">
          <input
            type="text"
            placeholder="🔍Search Customer..."
            className="bg-transparent outline-none text-sm w-full"
          />
          <span className="text-gray-500 cursor-pointer">✕</span>
        </div>

        {/* Start Date */}
        <div className="flex items-center gap-2 bg-gray-200 rounded-lg px-3 py-2">
          <span className="text-sm text-gray-600">Start Date</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-transparent outline-none text-sm"
          />
        </div>

        {/* End Date */}
        <div className="flex items-center gap-2 bg-gray-200 rounded-lg px-3 py-2">
          <span className="text-sm text-gray-600">End Date</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-transparent outline-none text-sm"
          />
        </div>

        {/* Driver Filter */}
        <select className="bg-gray-200 rounded-lg px-4 py-2 text-sm outline-none">
          <option>All Drivers</option>
          <option>Aswin VD</option>
          <option>Super Man</option>
          <option>Sles Team</option>
        </select>

        {/* Order Filter */}
        <select className="bg-gray-200 rounded-lg px-4 py-2 text-sm outline-none">
          <option>All Orders</option>
          <option>Order Recieved</option>
          <option>Processing</option>
          <option>Ready to deliver</option>
          <option>Out Of Delivery</option>
          <option >Partially Delivery</option>
          <option >Delivered</option>
          <option >Returned</option>
          <option >Pending Delivery </option>
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
                "Customer ",
                "Driver",
                "Order Amount",
                "Status"
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
                Date: "01/12/2025",
                "Order ID": "TMS/ORD-01",
                Customer: "Test 1",
                Driver: "Aswin VD",
                "Order Amount": "AED 30.00",
                Status: "Order Received",
              },
            ].map((item, index) => (
              <tr key={index} className="bg-[#f1f5fb] border-b">
                <td className="px-4 py-3">{item.Date}</td>
                <td className="px-4 py-3">{item["Order ID"]}</td>
                <td className="px-4 py-3">{item.Customer}</td>
                <td className="px-4 py-3">{item.Driver}</td>
                <td className="px-4 py-3 font-medium">{item["Order Amount"]}</td>
                <td className="px-4 py-3 font-semibold">{item.Status}</td>


              </tr>
            ))}
          </tbody>


        </table>
      </div>
    </div>

  );
}

export default Order_reports;

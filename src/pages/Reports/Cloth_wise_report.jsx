import React, { useState } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { reportitems } from "../../constants/reportitems";
import NavButton from "../../components/ui/NavButton";
import ReportHeader from "../../components/ReportHeader";

function Cloth_wise_report() {

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
              variant="download">
              {/* onClick={downloadExcel} */}
              Download Report
            </NavButton>

            <NavButton
              // onClick={downloadPDF} 
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
            <p className="text-sm text-gray-600">Total Debit</p>
            <span className="text-2xl font-semibold text-gray-800">03</span>

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
      <div className="flex justify-end gap-6 mb-6">
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
          <option>All Services</option>
          <option>Shirt</option>
          <option>T shirt</option>
          <option>Trouser</option>
          <option>Short</option>
          <option>Carpet</option>
          <option >Jacket Men</option>
          <option >Pajama</option>

        </select>
        <select className="bg-gray-200 rounded-lg px-4 py-2 text-sm outline-none">
          <option>All Drivers</option>
          <option>Aswin VD</option>
          <option>Super Man</option>
          <option>Sles Team</option>
        </select>
        <select className="bg-gray-200 rounded-lg px-4 py-2 text-sm outline-none">
          <option>All Service type</option>
          <option>Shirt</option>
          <option>Washing & folding</option>
          <option>Trouser</option>
          <option>Short</option>
          <option>Carpet</option>
          <option >Jacket Men</option>
          <option >Pajama</option>

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
                "Driver",
                "Service Name",
                "Service Quality",
                "Service Type",
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
            {[{
              Date: "01/12/2025",
              "Order ID": "TMS/ORD-03",
              Driver: "Aswin VD",
              "Service Name": "Shirt",
              "Service Quantity": 1,
              "Service Type": "Pressing",
            },
            {
              Date: "01/12/2025",
              "Order ID": "TMS/ORD-02",
              Driver: "Aswin VD",
              "Service Name": "T-Shirt",
              "Service Quantity": 2,
              "Service Type": "Pressing and Washing",
            },
            {
              Date: "01/12/2025",
              "Order ID": "TMS/ORD-01",
              Driver: "Aswin VD",
              "Service Name": "Shirt",
              "Service Quantity": 1,
              "Service Type": "Ironing",
            },
            ].map((item, index) => (
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
                  {item.Driver}
                </td>
                <td className="px-4 py-3 text-left font-medium">
                  {item["Service Name"]}
                </td>
                <td className="px-4 py-3 text-left">
                  {item["Service Quantity"]}
                </td>
                <td className="px-4 py-3 text-left font-medium">
                  {item["Service Type"]}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>

  );
}


export default Cloth_wise_report;
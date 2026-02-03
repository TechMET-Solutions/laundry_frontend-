import React, { useState } from "react";
import { reportitems } from "../../constants/reportitems";
import NavButton from "../../components/ui/NavButton";
import ReportHeader from "../../components/ReportHeader";
import SummaryCard from "../../components/SummaryCard";


function Sales_report() {

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

      <div className="flex gap-6 mb-6">
        <SummaryCard
          label="Total Debit"
          value="10"
          borderColor="border-green-400"
        />
        <SummaryCard
          label="Total Sales"
          currency="AED"
          value="398.75"
          borderColor="border-yellow-400"
        />
        <SummaryCard
          label="Total Credit"
          value="04"
          borderColor="border-yellow-400"
        />
      </div>

      {/* DATE FILTERS */}
      <div className="flex justify-center gap-6 mb-6">
        <div className="flex items-center bg-gray-200 rounded-lg px-3 py-2 w-64">
          <input
            type="text"
            placeholder="🔍Search Customer..."
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

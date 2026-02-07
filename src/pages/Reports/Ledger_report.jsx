import React, { useState } from "react";
import { reportitems } from "../../constants/reportitems";
import NavButton from "../../components/ui/NavButton";
import ReportHeader from "../../components/ReportHeader";


function Ledger_report() {

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
              className="rounded-lg"
              // onClick={handleDownloadPDF}
              variant="download">
              Download Report
            </NavButton>

            <NavButton
              className="rounded-lg"
              // onClick={handlePrintPDF}
              variant="print">
              Print Report
            </NavButton>
          </>
        }
      />
      <div className="flex gap-6 mt-6">
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
      </div>


      {/* TABLE */}
      <div className="bg-[#f4f7fb]  ">
        <table className="w-full text-sm border-separate  ">
          <thead>
            <tr>
              {[
                "Date",
                "Form",
                "Order ID",
                "Debit",
                "Credit",
                "Balance",

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
              From: "Order",
              "Order ID": "TMS/ORD-01",
              Debit: "AED 30.00",
              Credit: "AED 0.00",
              Balance: "AED 30.00",
            },
            {
              Date: "03/12/2025",
              From: "Payment",
              "Order ID": "TMS/ORD-01",
              Debit: "AED 0.00",
              Credit: "AED 20.00",
              Balance: "AED 10.00",
            },
            {
              Date: "04/12/2025",
              From: "Payment",
              "Order ID": "TMS/ORD-01",
              Debit: "AED 0.00",
              Credit: "AED 10.00",
              Balance: "AED 0.00",
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
                  {item["From"]}
                </td>
                <td className="px-4 py-3 text-left">
                  {item["Order ID"]}
                </td>
                <td className="px-4 py-3 text-left font-medium">
                  {item["Debit"]}
                </td>
                <td className="px-4 py-3 text-left">
                  {item["Credit"]}
                </td>
                <td className="px-4 py-3 text-left font-medium">
                  {item["Balance"]}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>

  );
}


export default Ledger_report;
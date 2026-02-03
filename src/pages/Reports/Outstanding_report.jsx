import React, { useState } from "react";
import { reportitems } from "../../constants/reportitems";
import ReportHeader from "../../components/ReportHeader";
import NavButton from "../../components/ui/NavButton";
import SummaryCard from "../../components/SummaryCard";


function Outstanding_report() {

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
          value="03"
          borderColor="border-green-400"
        />
        <SummaryCard
          label="Total Credit"
          currency="AED"
          value="04"
          borderColor="border-yellow-400"
        />
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
        <div className="flex items-center bg-gray-200 rounded-lg px-3 py-2 w-64">
          <input
            type="text"
            placeholder="🔍Search Customer..."
            className="bg-transparent outline-none text-sm w-full"
          />
          <span className="text-gray-500 cursor-pointer">✕</span>
        </div>
        <select className="bg-gray-200 rounded-lg px-4 py-2 text-sm outline-none">
          <option>All Drivers</option>
          <option>Aswin VD</option>
          <option>Super Man</option>
          <option>Sles Team</option>
        </select>
        <select className="bg-gray-200 rounded-lg px-4 py-2 text-sm outline-none">
          <option>All Payments</option>
          <option>Pending</option>
          <option>Partially Paid</option>
          <option>Fully Paid</option>
        </select>


      </div>


      {/* TABLE */}
      <div className="bg-[#f4f7fb]  ">
        <table className="w-full text-sm border-separate  ">
          <thead>
            <tr>
              {[
                "Sr No",
                "Date",
                "Ordered ID",
                "Customer",
                "Driver",
                "Gross amt",
                "Received Amt",
                "Discount",
                "Outstanding Amount",
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
                "Sr No": 1,
                Date: "05/11/2025",
                "Order ID": "TMS/ORD-06",
                Customer: "dinil",
                Driver: "sourav kk",
                "Gross Amt.": "AED 0.00",
                "Received Amt.": "AED 0.00",
                Discount: "AED 0.00",
                "Outstanding Amt.": "AED 0.00",
              },
              {
                "Sr No": 2,
                Date: "05/11/2025",
                "Order ID": "TMS/ORD-05",
                Customer: "vivek",
                Driver: "sourav kk",
                "Gross Amt.": "AED 30.00",
                "Received Amt.": "AED 27.00",
                Discount: "AED 0.00",
                "Outstanding Amt.": "AED 3.00",
              },
              {
                "Sr No": 3,
                Date: "05/11/2025",
                "Order ID": "TMS/ORD-04",
                Customer: "dinil",
                Driver: "sourav kk",
                "Gross Amt.": "AED 30.00",
                "Received Amt.": "AED 0.00",
                Discount: "AED 0.00",
                "Outstanding Amt.": "AED 30.00",
              },
              {
                "Sr No": 4,
                Date: "05/11/2025",
                "Order ID": "TMS/ORD-03",
                Customer: "Asvi",
                Driver: "sourav kk",
                "Gross Amt.": "AED 105.00",
                "Received Amt.": "AED 43.17",
                Discount: "AED 0.00",
                "Outstanding Amt.": "AED 61.83",
              },
              {
                "Sr No": 5,
                Date: "05/11/2025",
                "Order ID": "TMS/ORD-02",
                Customer: "Asvi",
                Driver: "sourav kk",
                "Gross Amt.": "AED 0.00",
                "Received Amt.": "AED 6.83",
                Discount: "AED 0.00",
                "Outstanding Amt.": "AED 0.00",
              },
              {
                "Sr No": 6,
                Date: "05/11/2025",
                "Order ID": "TMS/ORD-01",
                Customer: "Asvi",
                Driver: "sourav kk",
                "Gross Amt.": "AED 33.25",
                "Received Amt.": "AED 33.25",
                Discount: "AED 3.50",
                "Outstanding Amt.": "AED 0.00",
              },
            ].map((item, index) => (
              <tr
                key={index}
                className="bg-[#f1f5fb] border-b"
              >
                <td className="px-4 py-3 text-left">
                  {item["Sr No"]}
                </td>
                <td className="px-4 py-3 text-left font-medium">
                  {item.Date}
                </td>
                <td className="px-4 py-3 text-left">
                  {item["Order ID"]}
                </td>
                <td className="px-4 py-3 text-left">
                  {item.Customer}
                </td>
                <td className="px-4 py-3 text-left">
                  {item.Driver}
                </td>
                <td className="px-4 py-3 text-left font-medium">
                  {item["Gross Amt."]}
                </td>
                <td className="px-4 py-3 text-left">
                  {item["Received Amt."]}
                </td>
                <td className="px-4 py-3 text-left">
                  {item.Discount}
                </td>
                <td className="px-4 py-3 text-left font-medium">
                  {item["Outstanding Amt."]}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>

  );
}


export default Outstanding_report;

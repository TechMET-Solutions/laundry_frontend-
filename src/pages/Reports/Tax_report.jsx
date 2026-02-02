import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { reportitems } from "../../constants/reportitems";
import { getTaxReport } from "../../api/report";
import { formatDateForInput } from "../../utils/formatDateForInput";


function Tax_report() {
  const navigate = useNavigate();
  const location = useLocation();

  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);



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

  const fetchTaxReport = async () => {
    try {
      setLoading(true);

      const response = await getTaxReport(startDate, endDate);

      const data = response.data;

      setReportData(data.data || []);
      setTotalDebit(data.summary.total_debit || 0);
      setTotalCredit(data.summary.total_credit || 0);

    } catch (error) {
      console.error(
        "Failed to fetch tax report",
        error?.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaxReport();
  }, [startDate, endDate]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Tax Report", 14, 15);

    doc.setFontSize(10);
    doc.text(`From: ${startDate}`, 14, 22);
    doc.text(`To: ${endDate}`, 60, 22);

    doc.text(`Total Debit: AED ${totalDebit}`, 14, 30);
    doc.text(`Total Credit: AED ${totalCredit}`, 60, 30);

    autoTable(doc, {
      startY: 38,
      head: [[
        "Sr No",
        "Date",
        "Order ID",
        "Before Tax",
        "Tax Amount",
        "Total Amount",
      ]],
      body: reportData.map((item, index) => ([
        index + 1,
        formatDateForInput(item.order_date),
        item.order_code,
        `AED ${item.sub_total}`,
        `AED ${item.tax}`,
        `AED ${item.gross_total}`,
      ])),
      styles: { fontSize: 9 },
      headStyles: {
        fillColor: [86, 204, 255],
        textColor: 0,
      },
    });

    doc.save(`tax-report-${startDate}-to-${endDate}.pdf`);
  };



  const handlePrintPDF = () => {
    const printWindow = window.open("", "_blank");

    const tableRows = reportData.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${formatDateForInput(item.order_date)}</td>
      <td>${item.order_code}</td>
      <td>AED ${item.sub_total}</td>
      <td>AED ${item.tax}</td>
      <td>AED ${item.gross_total}</td>
    </tr>
  `).join("");

    printWindow.document.write(`
    <html>
      <head>
        <title>Tax Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 { margin-bottom: 5px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #56CCFF; }
        </style>
      </head>
      <body>
        <h2>Tax Report</h2>
        <p><strong>From:</strong> ${startDate} &nbsp;&nbsp; <strong>To:</strong> ${endDate}</p>
        <p><strong>Total Debit:</strong> AED ${totalDebit}</p>
        <p><strong>Total Credit:</strong> AED ${totalCredit}</p>

        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Date</th>
              <th>Order ID</th>
              <th>Before Tax</th>
              <th>Tax Amount</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.print();
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

          <button
            onClick={handleDownloadPDF}
            className="bg-green-600 text-white px-4 py-2 rounded-full text-sm"
          >
            Download Report
          </button>

          <button
            onClick={handlePrintPDF}
            className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm"
          >
            Print Report
          </button>

        </div>
      </div>
      <div className="flex gap-6 mt-6">
        {/* Total Debit */}
        <div className="bg-white rounded-lg shadow-sm w-56">
          <div className="flex items-center justify-between px-4 py-3 border-b border-green-400">
            <p className="text-sm text-gray-600">Total Debit</p>
            <span className="text-lg font-semibold text-gray-800">
              AED {totalDebit}
            </span>
          </div>
        </div>

        {/* Total Credit */}
        <div className="bg-white rounded-lg shadow-sm w-56">
          <div className="flex items-center justify-between px-4 py-3 border-b border-yellow-400">
            <p className="text-sm text-gray-600">Total Credit</p>
            <span className="text-lg font-semibold text-gray-800">
              AED {totalCredit}
            </span>
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
          <option>Sales</option>
          <option>Sales</option>
          <option>Expenses</option>

        </select>
      </div>

      <div className="bg-[#f4f7fb]  ">
        <table className="w-full text-sm border-separate  ">
          <thead>
            <tr>
              {[
                "Sr No",
                "Date",
                "Order ID",
                "Before Tax",
                "Tax Amount",
                "Total Amount",

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
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : reportData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No records found
                </td>
              </tr>
            ) : (
              reportData.map((item, index) => (
                <tr key={index} className="bg-[#f1f5fb] border-b">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{formatDateForInput(item.order_date)}</td>
                  <td className="px-4 py-3">{item.order_code}</td>
                  <td className="px-4 py-3">AED {item.sub_total}</td>
                  <td className="px-4 py-3">AED {item.tax}</td>
                  <td className="px-4 py-3">AED {item.gross_total}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default Tax_report;

import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { reportitems } from "../../constants/reportitems";
import { getExpensesReport } from "../../api/expences";



function Expenses_report() {
  const navigate = useNavigate();
  const location = useLocation();

  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);


  // State for expenses data
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // find active report from URL
  const activeReport =
    reportitems.find((item) => item.path === location.pathname) ||
    reportitems[0];

  const [selectedReport, setSelectedReport] = useState(activeReport);

  const fetchExpenses = async () => {
    if (!startDate || !endDate) return;

    try {
      setLoading(true);
      setError(null);

      const res = await getExpensesReport(startDate, endDate);
      setExpenses(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load expenses report");
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchExpenses();
  }, [startDate, endDate]);


  const handleReportChange = (e) => {
    const report = reportitems.find(
      (item) => item.path === e.target.value
    );
    setSelectedReport(report);
    navigate(report.path);
  };

  // Download Report PDF
  const handleDownloadPDF = () => {
    if (!expenses.length) {
      alert("No data to export");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Expenses Report", 14, 15);

    doc.setFontSize(10);
    doc.text(`From: ${startDate}  To: ${endDate}`, 14, 22);

    const tableColumn = [
      "Sr No",
      "Date",
      "Category",
      "Amount (AED)",
      "Tax %",
      "Tax Amount",
      "Payment Mode",
    ];

    const tableRows = expenses.map((expense, index) => [
      index + 1,
      new Date(expense.date).toLocaleDateString("en-GB"),
      expense.category,
      Number(expense.amount).toFixed(2),
      expense.tax ? `${expense.tax}%` : "-",
      expense.tax
        ? (expense.amount * expense.tax / 100).toFixed(2)
        : "0.00",
      expense.payment_mode,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 28,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [86, 204, 255] },
    });

    const totalAmount = expenses.reduce(
      (sum, e) => sum + Number(e.amount || 0),
      0
    );

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Total Expenses: ${expenses.length}`, 14, finalY);
    doc.text(
      `Total Amount: AED ${totalAmount.toFixed(2)}`,
      14,
      finalY + 6
    );

    doc.save(`Expenses_Report_${startDate}_to_${endDate}.pdf`);
  };

  const handlePrintPDF = () => {
    if (!expenses.length) {
      alert("No data to print");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Expenses Report", 14, 15);
    doc.setFontSize(10);
    doc.text(`From: ${startDate}  To: ${endDate}`, 14, 22);

    const tableColumn = [
      "Sr No",
      "Date",
      "Category",
      "Amount (AED)",
      "Tax %",
      "Tax Amount",
      "Payment Mode",
    ];

    const tableRows = expenses.map((expense, index) => [
      index + 1,
      new Date(expense.date).toLocaleDateString("en-GB"),
      expense.category,
      Number(expense.amount).toFixed(2),
      expense.tax ? `${expense.tax}%` : "-",
      expense.tax
        ? (expense.amount * expense.tax / 100).toFixed(2)
        : "0.00",
      expense.payment_mode,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 28,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [86, 204, 255] },
    });

    // 👇 Open print dialog instead of saving
    doc.autoPrint();
    window.open(doc.output("bloburl"), "_blank");
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
            className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm">
            Print Report
          </button>
        </div>
      </div>
      <div className="flex gap-6 mt-6">
        {/* Total Debit */}
        <div className=" bg-white rounded-lg shadow-sm w-56">
          <div className="flex gap-4 px-4 py-3 border-b border-green-400">
            <p className="text-sm text-gray-600">Total Expenses</p>
            <span className="text-2xl font-semibold text-gray-800">
              {expenses.length}
            </span>
          </div>
        </div>

        {/* Total Credit */}
        <div className="bg-white rounded-lg shadow-sm w-56">
          <div className=" flex gap-4 px-4 py-3 border-b border-yellow-400">
            <p className="text-sm text-gray-600">Total Amount</p>
            <span className="text-2xl font-semibold text-gray-800">
              AED {expenses.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0).toFixed(2)}
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
      </div>


      {/* TABLE */}
      <div className="bg-[#f4f7fb]  ">
        <table className="w-full text-sm border-separate  ">
          <thead>
            <tr>
              {[
                "Sr No",
                "Date",
                "Towards",
                "Expense Amount",
                "Tax%",
                "Tax amount",
                "Payment Mode",
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
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  Loading expenses data...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : expenses.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  No expenses found
                </td>
              </tr>
            ) : (
              expenses.map((expense, index) => (
                <tr
                  key={expense.id}
                  className="bg-[#f1f5fb] border-b"
                >
                  <td className="px-4 py-3 text-left">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-left font-medium">
                    {new Date(expense.date).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-4 py-3 text-left font-medium">
                    {expense.category}
                  </td>
                  <td className="px-4 py-3 text-left font-medium">
                    AED {parseFloat(expense.amount).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-left font-medium">
                    {expense.tax ? `${expense.tax}%` : '-'}
                  </td>
                  <td className="px-4 py-3 text-left font-medium">
                    AED {expense.tax ? (parseFloat(expense.amount) * parseFloat(expense.tax) / 100).toFixed(2) : '0.00'}
                  </td>
                  <td className="px-4 py-3 text-left font-medium">
                    {expense.payment_mode}
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>

  );
}


export default Expenses_report;

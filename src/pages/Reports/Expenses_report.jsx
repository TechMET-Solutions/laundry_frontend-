import React, { useState, useEffect } from "react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllExpenses } from "../../api/expences";

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

function Expenses_report() {
  const navigate = useNavigate();
  const location = useLocation();
  const [startDate, setStartDate] = useState("2025-12-01");
  const [endDate, setEndDate] = useState("2025-12-01");
  
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
    try {
      setLoading(true);
      setError(null);
      const res = await getAllExpenses();
      if (res.data.success) {
        setExpenses(res.data.data || []);
      } else {
        setError("Failed to fetch expenses data");
      }
    } catch (error) {
      console.error("API ERROR:", error);
      setError("Failed to fetch expenses data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

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

import React, { useState, useEffect } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { getAllPaymentReceipts } from "../api/paymentReport";
import { formatDateForInput } from "../utils/formatDateForInput";

function Payment_Receipt() {
  const navigate = useNavigate();

  // States for Data
  const [paymentReceipts, setPaymentReceipts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // States for Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [driver, setDriver] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchPaymentReceipts = async () => {
    try {
      // Pass all filters to your API function
      const params = {
        page,
        limit: 10,
        search,
        status,
        driver,
        startDate,
        endDate
      };

      const res = await getAllPaymentReceipts(params);

      if (res.data) {
        setPaymentReceipts(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("API ERROR:", error);
    }
  };

  // Trigger fetch when page or any filter changes
  useEffect(() => {
    fetchPaymentReceipts();
  }, [page, status, driver, startDate, endDate]);

  // Handle Search on "Enter" or clear
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <IoReturnUpBackOutline />
          </div>
          <h2 className="font-semibold text-lg">Payment Receipt</h2>
        </div>
      </div>

      {/* FILTERS SECTION */}
      <div className="flex flex-wrap justify-end gap-4 mb-6">
        {/* Search Box */}
        <div className="flex items-center bg-gray-200 rounded-lg px-3 py-2 w-64">
          <input
            type="text"
            placeholder="🔍 Search Customer..."
            value={search}
            onChange={handleSearchChange}
            className="bg-transparent outline-none text-sm w-full"
          />
          {search && (
            <span
              className="text-gray-500 cursor-pointer"
              onClick={() => setSearch("")}
            >✕</span>
          )}
        </div>

        {/* Payment Status Filter */}
        <select
          className="bg-gray-200 rounded-lg px-4 py-2 text-sm outline-none"
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
        >
          <option value={""} disabled>
            Payment Method
          </option>
          <option value="Settlement">Settlement</option>
          <option value="Advance">Advance</option>
          <option value="Cash">Cash</option>
          <option value="Online">Online</option>
          <option value="Card">Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>

        {/* Driver Filter */}
        <select
          className="bg-gray-200 rounded-lg px-4 py-2 text-sm outline-none"
          value={driver}
          onChange={(e) => { setDriver(e.target.value); setPage(1); }}
        >
          <option value="">All Drivers</option>
          <option value="Nilesh Pathak">Nilesh Pathak</option>
          <option value="Pk Nawaz">Pk Nawaz</option>
        </select>

        {/* Date Filters */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-lg bg-gray-200 text-sm outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-lg bg-gray-200 text-sm outline-none"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm border-separate">
          <thead>
            <tr>
              {["Sr No", "Date", "Order ID", "Customer", "Driver", "Amount", "Payment Type", "Note"].map((head) => (
                <th key={head} className="bg-[#56CCFF] px-4 py-3 text-left font-medium text-gray-800">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paymentReceipts.length > 0 ? (
              paymentReceipts.map((item, index) => (
                <tr key={item.id || index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{(page - 1) * 10 + (index + 1)}</td>
                  <td className="px-4 py-3">{formatDateForInput(item.date)}</td>
                  <td className="px-4 py-3 font-medium text-blue-600">{item.order_id}</td>
                  <td className="px-4 py-3">{item.customer}</td>
                  <td className="px-4 py-3">{item.driver}</td>
                  <td className="px-4 py-3 font-semibold">AED {item.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${item.payment_type === 'Cash' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {item.payment_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{item.note || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-10 text-gray-500">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="w-full flex justify-center my-6">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Payment_Receipt;
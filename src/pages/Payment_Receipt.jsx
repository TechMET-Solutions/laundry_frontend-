import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { getAllPaymentReceipts } from "../api/paymentReport";
import { formatDateForInput } from "../utils/formatDateForInput";
import { getEmployeeSearch } from "../api/employee";
import { CiSearch } from "react-icons/ci";
import NavButton from "../components/ui/NavButton";
import PageHeader from "../components/pageHeader";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


function Payment_Receipt() {
  const navigate = useNavigate();

  // States for Data
  const [paymentReceipts, setPaymentReceipts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allDrivers, setAllDrivers] = useState([]);

  // States for Filters
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("");
  const [driver, setDriver] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const fetchPaymentReceipts = async () => {
    try {
      const params = {
        page,
        limit: 10,
        search: searchQuery,
        status,
        driver,
        startDate,
        endDate,
      };

      const res = await getAllPaymentReceipts(params);

      if (res.data) {
        let filtered = res.data.data || [];

        // Apply client-side filtering for Order ID
        if (searchQuery && searchQuery.trim()) {
          filtered = filtered.filter((item) =>
            item.order_id
              ?.toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
          );
        }

        // Apply client-side filtering for Payment Type
        if (status && status.trim()) {
          filtered = filtered.filter(
            (item) => item.payment_type?.toLowerCase() === status.toLowerCase(),
          );
        }

        // Apply client-side filtering for Driver
        if (driver && driver.trim()) {
          filtered = filtered.filter((item) =>
            item.driver?.toLowerCase().includes(driver.toLowerCase()),
          );
        }

        // Apply client-side filtering for Start Date
        if (startDate) {
          filtered = filtered.filter((item) => {
            if (!item.date) return false;
            // Parse the item date - handle various formats
            const itemDateStr = item.date.split('T')[0]; // Get just the date part
            const itemDateObj = new Date(itemDateStr);
            const startDateObj = new Date(startDate);
            return itemDateObj >= startDateObj;
          });
        }

        // Apply client-side filtering for End Date
        if (endDate) {
          filtered = filtered.filter((item) => {
            if (!item.date) return false;
            // Parse the item date - handle various formats
            const itemDateStr = item.date.split('T')[0]; // Get just the date part
            const itemDateObj = new Date(itemDateStr);
            const endDateObj = new Date(endDate);
            return itemDateObj <= endDateObj;
          });
        }

        setPaymentReceipts(filtered);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("API ERROR:", error);
    }
  };

  // Debounce search - wait 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Trigger fetch when page or any filter changes
  useEffect(() => {
    fetchPaymentReceipts();
  }, [page, status, driver, startDate, endDate, searchQuery]);

  // Fetch drivers from employee API
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await getEmployeeSearch();
        const drivers = response.data.data.filter(
          (employee) => employee.role === "Driver",
        );
        setAllDrivers(drivers);
      } catch (error) {
        console.error("Failed to fetch drivers:", error);
      }
    };
    fetchDrivers();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(search);
      setPage(1);
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    setSearchQuery("");
    setPage(1);
  };


    const handleDownloadPDF = () => {
      const doc = new jsPDF();
  
      doc.setFontSize(16);
      doc.text("Payment Report", 14, 15);
  
      doc.setFontSize(10);
      doc.text(`From: ${startDate}`, 14, 22);
      doc.text(`To: ${endDate}`, 60, 22);

  
      autoTable(doc, {
        startY: 38,
        head: [[
          "Sr No",
          "Date",
          "Order ID",
          "Customer",
          "Driver",
          "Order Amount",
          "Payment Type",
          "Notes"
        ]],
        body: paymentReceipts.map((item, index) => ([
          index + 1,
          formatDateForInput(item.date),
          item.order_id,
          item.customer,
          item.driver,
          item.amount,
          item.payment_type,
          item.note,
        ])),
        styles: { fontSize: 9 },
        headStyles: {
          fillColor: [86, 204, 255],
          textColor: 0,
        },
      });
  
      doc.save(`tax-report-${startDate}-to-${endDate}.pdf`);
  };
  

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      {/* HEADER */}
      <PageHeader
        title="Payment Receipt"
        actions={
          <>
            <NavButton
              variant="download"
            onClick={handleDownloadPDF}
            >
              Download Report
            </NavButton>

            <NavButton
              variant="print"
              // onClick={handleDownloadPDF}
            >
              Print Report

            </NavButton>
          </>
        }
      />

      {/* FILTERS SECTION */}
      <div className="flex flex-wrap justify-end gap-4 mb-6">
        {/* Search Box */}
        <div className="flex items-center bg-gray-200 rounded-lg px-3 py-2 w-64">
          <CiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Order ID..."
            value={search}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
            className="bg-transparent outline-none text-sm w-full"
          />
          {search && (
            <span
              className="text-gray-500 cursor-pointer"
              onClick={handleClearSearch}
            >
              ✕
            </span>
          )}
        </div>

        {/* Payment Status Filter */}
        <select
          className="bg-gray-200 rounded-lg px-4 py-2 text-sm outline-none"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Payment Methods</option>
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
          onChange={(e) => {
            setDriver(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Drivers</option>
          {allDrivers.map((driverItem) => (
            <option
              key={driverItem.id}
              value={`${driverItem.first_name} ${driverItem.last_name}`}
            >
              {driverItem.first_name} {driverItem.last_name}
            </option>
          ))}
        </select>

        {/* Date Filters */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-lg bg-gray-200 text-sm outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-lg bg-gray-200 text-sm outline-none"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm border-separate">
          <thead>
            <tr>
              {[
                "Sr No",
                "Date",
                "Order ID",
                "Customer",
                "Driver",
                "Amount",
                "Payment Type",
                "Note",
              ].map((head) => (
                <th
                  key={head}
                  className="bg-[#56CCFF] px-4 py-3 text-left font-medium text-gray-800"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paymentReceipts.length > 0 ? (
              paymentReceipts.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{(page - 1) * 10 + (index + 1)}</td>
                  <td className="px-4 py-3">{formatDateForInput(item.date)}</td>
                  <td className="px-4 py-3 font-medium text-blue-600">
                    {item.order_id}
                  </td>
                  <td className="px-4 py-3">{item.customer}</td>
                  <td className="px-4 py-3">{item.driver}</td>
                  <td className="px-4 py-3 font-semibold">AED {item.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${item.payment_type === "Cash" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                    >
                      {item.payment_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {item.note || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-10 text-gray-500">
                  No records found.
                </td>
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

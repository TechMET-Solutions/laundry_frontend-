import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { FiTruck } from "react-icons/fi";
import { reportitems } from "../../constants/reportitems";
import { getEmployeeSearch } from "../../api/employee";
import { getCustomersSearch } from "../../api/customer";
import NavButton from "../../components/ui/NavButton";
import ReportHeader from "../../components/ReportHeader";
import DateFilter from "../../components/DateFilter";
import SummaryCard from "../../components/SummaryCard";
import SearchSelectInput from "../../components/ui/SearchSelectInput";
import { getOrderReport } from "../../api/report";
import { formatDateForInput } from "../../utils/formatDateForInput";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function OrderReports() {
  const today = new Date().toISOString().split("T")[0];

  // Dates
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  // Customers
  const [allCustomers, setAllCustomers] = useState([]);
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);

  // Drivers
  const [allDrivers, setAllDrivers] = useState([]);
  const [isLoadingDrivers, setIsLoadingDrivers] = useState(false);
  // Driver search states
  const [driverSearchTerm, setDriverSearchTerm] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null);
  // Errors (used in SearchSelectInput)
  const [errors, setErrors] = useState({});

  // Fetch customers & drivers

  const fetchDrivers = async () => {
    try {
      setIsLoadingDrivers(true);
      const response = await getEmployeeSearch();

      const drivers = response.data.data
        .filter((emp) => emp.role === "Driver")
        .map((driver) => ({
          ...driver,
          name: `${driver.first_name} ${driver.last_name}`, // ✅ ADD THIS
        }));

      setAllDrivers(drivers);
    } catch (error) {
      console.error("Driver fetch error:", error);
    } finally {
      setIsLoadingDrivers(false);
    }
  };


  const fetchCustomers = async () => {
    try {
      setIsLoadingCustomers(true);
      const response = await getCustomersSearch();
      setAllCustomers(response.data.data || []);
    } catch (error) {
      console.error("Customer fetch error:", error);
    } finally {
      setIsLoadingCustomers(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchDrivers();
  }, []);

  // Filter customers
  const filteredCustomerList = allCustomers.filter((customer) =>
    customer.name
      ?.toLowerCase()
      .includes(customerSearchTerm.toLowerCase())
  );

  const filteredDriverList = allDrivers.filter((driver) =>
    driver.name
      ?.toLowerCase()
      .includes(driverSearchTerm.toLowerCase())
  );


  // Report data
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);


  // Summary
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Order Status
  const [orderStatus, setOrderStatus] = useState("");

  const fetchOrderReport = async () => {
    try {
      setLoading(true);

      const response = await getOrderReport({
        start_date: startDate,
        end_date: endDate,
        customer_name: selectedCustomer?.name,
        driver_name: selectedDriver?.name,
      });

      const result = response.data;

      setOrders(result.data || []);
      setTotalOrder(result.summary.total_order || 0);
      setTotalAmount(result.summary.total_amount || 0);

    } catch (error) {
      console.error("Order report fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderReport();
  }, [
    startDate,
    endDate,
    selectedCustomer,
    selectedDriver,
    orderStatus,
  ]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const accentColor = [26, 86, 219]; // Modern Blue

    // --- Header Section ---
    doc.setFontSize(22);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text("SALES ORDER REPORT", 14, 20);

    // Shop Details (Mock Address)
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("123 Business Way, Dubai, UAE", 14, 27);
    doc.text("Contact: +971 00 000 0000", 14, 32);

    // --- Summary Box ---
    doc.setDrawColor(230);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, 38, 182, 18, 2, 2, 'FD');

    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.setFont("helvetica", "bold");
    doc.text(`DATE RANGE:`, 18, 45);
    doc.text(`TOTAL ORDERS:`, 85, 45);
    doc.text(`TOTAL REVENUE:`, 140, 45);

    doc.setFont("helvetica", "normal");
    doc.text(`${startDate} to ${endDate}`, 18, 51);
    doc.text(`${totalOrder}`, 85, 51);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text(`AED ${Number(totalAmount).toFixed(2)}`, 140, 51);

    // --- Table Section ---
    autoTable(doc, {
      startY: 62,
      head: [["Sr No", "Date", "Order ID", "Customer", "Driver", "Amount", "Status"]],
      body: orders.map((item, index) => [
        index + 1,
        formatDateForInput(item.order_date),
        item.order_code,
        item.customer_name,
        item.driver_name || 'N/A',
        `AED ${item.gross_total}`,
        item.order_status.toUpperCase(),
      ]),
      styles: { fontSize: 9, cellPadding: 4 },
      headStyles: {
        fillColor: accentColor,
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: { fillColor: [250, 250, 250] },
      margin: { top: 20 },
    });

    doc.save(`order-report-${startDate}.pdf`);
  };


  const handlePrintPDF = () => {
    const printWindow = window.open("", "_blank");

    const tableRows = orders.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${formatDateForInput(item.order_date)}</td>
      <td class="bold">${item.order_code}</td>
      <td>${item.customer_name}</td>
      <td>${item.driver_name || '-'}</td>
      <td class="amount">AED ${Number(item.gross_total).toFixed(2)}</td>
      <td><span class="status-badge">${item.order_status}</span></td>
    </tr>
  `).join("");

    printWindow.document.write(`
    <html>
      <head>
        <title>Order Report</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
          body { font-family: 'Inter', sans-serif; color: #334155; padding: 40px; }
          
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px; }
          .shop-info h1 { margin: 0; color: #1e40af; font-size: 24px; }
          .shop-info p { margin: 5px 0; font-size: 12px; color: #64748b; }
          
          .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
          .stat-card { background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; }
          .stat-card label { display: block; font-size: 10px; color: #64748b; text-transform: uppercase; font-weight: bold; }
          .stat-card value { font-size: 16px; font-weight: bold; color: #0f172a; }

          table { width: 100%; border-collapse: collapse; }
          th { background: #f1f5f9; color: #475569; font-size: 11px; text-transform: uppercase; padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0; }
          td { padding: 12px; font-size: 12px; border-bottom: 1px solid #f1f5f9; }
          
          .amount { font-weight: bold; color: #1e293b; }
          .bold { font-weight: bold; }
          .status-badge { background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; text-transform: uppercase; }
          
          @media print {
            body { padding: 0; }
            .stat-card { border: 1px solid #ddd; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="shop-info">
            <h1> DEMO LAUNDRY </h1>
            <p>Main Street, Business Bay, Dubai</p>
            <p>Date Generated: ${new Date().toLocaleDateString()}</p>
          </div>
          <div style="text-align: right">
            <h2 style="margin:0">Order Report</h2>
            <p style="color:#64748b">${startDate} to ${endDate}</p>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card"><label>Total Orders</label><value>${totalOrder}</value></div>
          <div class="stat-card"><label>Report Period</label><value>${startDate} - ${endDate}</value></div>
          <div class="stat-card"><label>Total Revenue</label><value style="color:#16a34a">AED ${Number(totalAmount).toFixed(2)}</value></div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Date</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Driver</th>
              <th>Amount</th>
              <th>Status</th>
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
    // Wait for fonts to load before printing
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };


  return (
    <div className="p-6 min-h-screen">
      {/* HEADER */}
      <ReportHeader
        reportItems={reportitems}
        actions={
          <>
            <NavButton
              variant="download"
              onClick={handleDownloadPDF}>
              Download Report
            </NavButton>

            <NavButton 
            variant="print"
            onClick={handlePrintPDF}
            >
              Print Report
              
            </NavButton>
          </>
        }
      />

      {/* SUMMARY */}
      <div className="flex gap-6 mt-6">
        <SummaryCard
          label="Total Order"
          value={totalOrder}
          borderColor="border-green-400"
        />
        <SummaryCard
          label="Total Order Amount"
          value={Number(totalAmount).toFixed(2)}
          borderColor="border-yellow-400"
        />
      </div>

      <div className="flex gap-6 mt-6 justify-end mb-6 items-center">
        <div className="">
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            onStartChange={setStartDate}
            onEndChange={setEndDate}
          />
        </div>

        <div className="">
          <SearchSelectInput
            icon={FiUser}
            value={customerSearchTerm}
            placeholder="Search customer"
            items={filteredCustomerList}
            isLoading={isLoadingCustomers}
            displayKey="name"
            onSearchChange={(value) => {
              setCustomerSearchTerm(value);
              setErrors((prev) => ({ ...prev, customerName: "" }));
            }}
            onSelect={(customer) => {
              setSelectedCustomer(customer);
              setCustomerSearchTerm(customer.name);
            }}
          />
        </div>
        <div className="">
          <SearchSelectInput
            icon={FiTruck}
            value={driverSearchTerm}
            placeholder="Search driver"
            items={filteredDriverList}
            isLoading={isLoadingDrivers}
            displayKey="name"
            onSearchChange={(value) => {
              setDriverSearchTerm(value);
            }}
            onSelect={(driver) => {
              setSelectedDriver(driver);
              setDriverSearchTerm(driver.name);
            }}
          />

        </div>
        <div className="">
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="bg-gray-200 rounded-lg px-4 py-2 text-sm outline-none"
          >
            <option value="">All Orders</option>
            <option value="Order Received">Order Received</option>
            <option value="Processing">Processing</option>
            <option value="Ready to Deliver">Ready to Deliver</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Partially Delivered">Partially Delivered</option>
            <option value="Delivered">Delivered</option>
            <option value="Returned">Returned</option>
            <option value="Pending Delivery">Pending Delivery</option>
          </select>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#f4f7fb]">
        <table className="w-full text-sm border-separate">
          <thead>
            <tr>
              {[
                "Date",
                "Order ID",
                "Customer",
                "Driver",
                "Order Amount",
                "Status",
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
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No records found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="bg-[#f1f5fb] border-b">
                  <td className="px-4 py-3">{formatDateForInput(order.order_date)}</td>
                  <td className="px-4 py-3">{order.order_code}</td>
                  <td className="px-4 py-3">{order.customer_name}</td>
                  <td className="px-4 py-3">{order.driver_name}</td>
                  <td className="px-4 py-3 font-medium">
                    AED {order.gross_total}
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {order.order_status}
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

export default OrderReports;

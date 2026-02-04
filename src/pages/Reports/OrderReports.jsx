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

    doc.setFontSize(16);
    doc.text("Order Report", 14, 15);

    doc.setFontSize(10);
    doc.text(`From: ${startDate}`, 14, 22);
    doc.text(`To: ${endDate}`, 60, 22);

    doc.text(`Total Orders : ${totalOrder}`, 14, 30);
    doc.text(`Total Order Amount: AED ${totalAmount}`, 60, 30);

    autoTable(doc, {
      startY: 38,
      head: [[
        "Sr No",
        "Date",
        "Order ID",
        "Customer",
        "Driver",
        "Order Amount",
        "Status",
      ]],
      body: orders.map((item, index) => ([
        index + 1,
        formatDateForInput(item.order_date),
        item.order_code,
        item.customer_name,
        item.driver_name,
        `AED ${item.gross_total}`,
        item.order_status,
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
  
      const tableRows = orders.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${formatDateForInput(item.order_date)}</td>
        <td>${item.order_code}</td>
        <td>${item.customer_name}</td>
        <td>${item.driver_name}</td>
        <td>AED ${item.gross_total}</td>
        <td>${item.order_status}</td>
      </tr>
    `).join("");
  
      printWindow.document.write(`
      <html>
        <head>
          <title>Order Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { margin-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background: #56CCFF; }
          </style>
        </head>
        <body>
          <h2>Order Report</h2>
          <p><strong>From:</strong> ${startDate} &nbsp;&nbsp; <strong>To:</strong> ${endDate}</p>
          <p><strong>Total Orders:</strong> ${totalOrder}</p>
          <p><strong>Total Amount:</strong> AED ${totalAmount}</p>
  
          <table>
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Date</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Driver</th>
                <th>Order Amount</th>
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
      printWindow.print();
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
          value={totalAmount}
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

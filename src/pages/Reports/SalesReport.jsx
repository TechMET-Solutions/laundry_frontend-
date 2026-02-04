import { useEffect, useState } from "react";
import { FiTruck, FiUser } from "react-icons/fi";

import { getCustomersSearch } from "../../api/customer";
import { getEmployeeSearch } from "../../api/employee";
import { reportitems } from "../../constants/reportitems";

import DateFilter from "../../components/DateFilter";
import ReportHeader from "../../components/ReportHeader";
import SummaryCard from "../../components/SummaryCard";
import NavButton from "../../components/ui/NavButton";
import SearchSelectInput from "../../components/ui/SearchSelectInput";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getSalesReport } from "../../api/report";
import { formatDateForInput } from "../../utils/formatDateForInput";

function SalesReport() {

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

  // Sales Report Data
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Summary
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalTax, setTotalTax] = useState(0);

  const fetchSalesReport = async () => {
    try {
      setLoading(true);

      const response = await getSalesReport({
        start_date: startDate,
        end_date: endDate,
        customer_name: selectedCustomer?.name,
        driver_name: selectedDriver?.name,
      });

      const result = response.data;

      setSalesData(result.data || []);
      setTotalOrder(result.summary?.total_order || 0);
      setTotalSales(result.summary?.total_amount || 0);
      setTotalTax(result.summary?.total_tax || 0);

    } catch (error) {
      console.error("Sales report fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesReport();
  }, [
    startDate,
    endDate,
    selectedCustomer,
    selectedDriver,
  ]);

  // Handle Download PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Sales Report", 14, 22);

    // Date range
    doc.setFontSize(11);
    doc.text(`Date Range: ${startDate} to ${endDate}`, 14, 32);

    // Summary
    doc.setFontSize(12);
    doc.text(`Total Orders: ${totalOrder}`, 14, 42);
    doc.text(`Total Sales: AED ${totalSales}`, 14, 50);
    doc.text(`Total Tax: AED ${totalTax}`, 14, 58);

    // Table
    const tableColumn = [
      "Date",
      "Order ID",
      "Customer",
      "Driver",
      "Sub Total",
      "Addon Total",
      "Discount",
      "Tax Amount",
      "Gross Total",
    ];

    const tableRows = salesData.map((item) => [
      formatDateForInput(item.order_date),
      item.order_code,
      item.customer_name,
      item.driver_name,
      `AED ${item.sub_total}`,
      `AED ${item.addon || 0}`,
      `AED ${item.discount}`,
      `AED ${item.tax}`,
      `AED ${item.gross_total}`,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 65,
    });

    // Download
    doc.save(`sales_report_${startDate}_${endDate}.pdf`);
  };

  // Handle Print PDF
  const handlePrintPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Sales Report", 14, 22);

    // Date range
    doc.setFontSize(11);
    doc.text(`Date Range: ${startDate} to ${endDate}`, 14, 32);

    // Summary
    doc.setFontSize(12);
    doc.text(`Total Orders: ${totalOrder}`, 14, 42);
    doc.text(`Total Sales: AED ${totalSales}`, 14, 50);
    doc.text(`Total Tax: AED ${totalTax}`, 14, 58);

    // Table
    const tableColumn = [
      "Date",
      "Order ID",
      "Customer",
      "Driver",
      "Sub Total",
      "Addon Total",
      "Discount",
      "Tax Amount",
      "Gross Total",
    ];

    const tableRows = salesData.map((item) => [
      formatDateForInput(item.order_date),
      item.order_code,
      item.customer_name,
      item.driver_name,
      `AED ${item.sub_total}`,
      `AED ${item.addon || 0}`,
      `AED ${item.discount}`,
      `AED ${item.tax}`,
      `AED ${item.gross_total}`,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 65,
    });

    // Print
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, "_blank");
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">

      {/* HEADER */}
      <ReportHeader
        reportItems={reportitems}
        actions={
          <>
            <NavButton
              onClick={handleDownloadPDF}
              variant="download">
              Download Report
            </NavButton>

            <NavButton
              onClick={handlePrintPDF}
              variant="print">
              Print Report
            </NavButton>
          </>
        }
      />

      <div className="flex gap-6 mb-6">
        <SummaryCard
          label="Total Orders"
          value={totalOrder}
          borderColor="border-green-400"
        />

        <SummaryCard
          label="Total Sales"
          value={totalSales}
          borderColor="border-yellow-400"
        />

        <SummaryCard
          label="Total Tax"
          value={totalTax}
          borderColor="border-blue-400"
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
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : salesData.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-6">
                  No records found
                </td>
              </tr>
            ) : (
              salesData.map((item) => (
                <tr key={item.id} className="bg-[#f1f5fb] border-b">
                  <td className="px-4 py-3">{formatDateForInput(item.order_date)}</td>
                  <td className="px-4 py-3 font-medium">{item.order_code}</td>
                  <td className="px-4 py-3">{item.customer_name}</td>
                  <td className="px-4 py-3 font-medium">{item.driver_name}</td>
                  <td className="px-4 py-3">AED {item.sub_total}</td>
                  <td className="px-4 py-3 font-medium">
                    AED {item.addon || 0}
                  </td>
                  <td className="px-4 py-3">AED {item.discount}</td>
                  <td className="px-4 py-3 font-medium">AED {item.tax}</td>
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


export default SalesReport;

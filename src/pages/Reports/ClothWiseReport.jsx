import React, { useEffect, useState } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { reportitems } from "../../constants/reportitems";
import NavButton from "../../components/ui/NavButton";
import ReportHeader from "../../components/ReportHeader";
import { getEmployeeSearch } from "../../api/employee";
import DateFilter from "../../components/DateFilter";
import SearchSelectInput from "../../components/ui/SearchSelectInput";
import { FiTruck } from "react-icons/fi";
import { getAllServiceListSelect } from "../../api/servicelist";
import { getAllServiceTypes } from "../../api/servicesapi";
import { getClothWiseReport } from "../../api/report";

function ClothWiseReport() {
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [allDrivers, setAllDrivers] = useState([]);
  const [isLoadingDrivers, setIsLoadingDrivers] = useState(false);
  const [driverSearchTerm, setDriverSearchTerm] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null);
  // Errors (used in SearchSelectInput)
  const [errors, setErrors] = useState({});

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

  useEffect(() => {
    fetchDrivers();
  }, []);

  const filteredDriverList = allDrivers.filter((driver) =>
    driver.name
      ?.toLowerCase()
      .includes(driverSearchTerm.toLowerCase())
  );

  const [allServices, setAllServices] = useState([]);
  const [allServicesTypes, setAllServicesTypes] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState("");


  const fetchServicesList = async () => {
    try {
      const response = await getAllServiceListSelect();
      setAllServices(response.data.data || []);
    } catch (error) {
      console.error("Services List fetch error:", error);
    }
  };


  const fetchServicesTypes = async () => {
    try {
      const response = await getAllServiceTypes();
      setAllServicesTypes(response.data.data || []);
    } catch (error) {
      console.error("Services List fetch error:", error);
    }
  };


  useEffect(() => {
    fetchDrivers();
    fetchServicesList();
    fetchServicesTypes();
  }, []);

  const [reportData, setReportData] = useState([]);
  const [summary, setSummary] = useState({
    total_records: 0,
    total_qty: 0
  });
  const [loadingReport, setLoadingReport] = useState(false);

  const fetchClothWiseReport = async () => {
  try {
    setLoadingReport(true);

    const params = {
      start_date: startDate,
      end_date: endDate,
      services_list: selectedService || undefined,
      services_types: selectedServiceType || undefined,
      driver_name: selectedDriver?.name || undefined
    };

    const res = await getClothWiseReport(params);

    if (res.data.success) {
      setReportData(res.data.data);
      setSummary(res.data.summary);
    }
  } catch (error) {
    console.error("Cloth wise report error:", error);
  } finally {
    setLoadingReport(false);
  }
};

  useEffect(() => {
    fetchClothWiseReport();
  }, [startDate, endDate, selectedService, selectedServiceType, selectedDriver]);


  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">

      {/* HEADER */}

      <ReportHeader
        reportItems={reportitems}
        actions={
          <>
            <NavButton
              variant="download">
              {/* onClick={downloadExcel} */}
              Download Report
            </NavButton>

            <NavButton
              // onClick={downloadPDF} 
              variant="print">
              Print Report
            </NavButton>
          </>
        }
      />
      <div className="flex items-center gap-6 mt-6 mb-6">
        {/* Total Debit */}
        <div className=" bg-white rounded-lg shadow-sm w-56">
          <div className="flex gap-4 px-4 py-3 border-b border-green-400">
            <p className="text-sm text-gray-600">Total Quantity:</p>
            <span className="text-2xl font-semibold text-gray-800">
              {summary.total_records}
            </span>

          </div>
        </div>

        {/* Total Credit */}
        <div className="bg-white rounded-lg shadow-sm w-56">
          <div className=" flex gap-4 px-4 py-3 border-b border-yellow-400">
            <p className="text-sm text-gray-600">Total Orders:</p>
            <span className="text-2xl font-semibold text-gray-800">
              {summary.total_qty}
            </span>
          </div>
        </div>
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
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="bg-gray-200 rounded-lg px-4 py-2 text-sm outline-none"
          >
            <option value="">All Services</option>

            {allServices.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>

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

        <select
          value={selectedServiceType}
          onChange={(e) => setSelectedServiceType(e.target.value)}
          className="bg-gray-200 rounded-lg px-4 py-2 text-sm outline-none"
        >
          <option value="">All Service Types</option>

          {allServicesTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

      </div>


      {/* TABLE */}
      <div className="bg-[#f4f7fb]  ">
        <table className="w-full text-sm border-separate  ">
          <thead>
            <tr>
              {[
                "Date",
                "Order ID",
                "Driver",
                "Service Name",
                "Service Quality",
                "Service Type",
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
            {loadingReport ? (
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
                  <td className="px-4 py-3">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {item.order_code}
                  </td>
                  <td className="px-4 py-3">
                    {item.driver_name}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {item.service_name}
                  </td>
                  <td className="px-4 py-3">
                    {item.service_qty}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {item.service_type}
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


export default ClothWiseReport;
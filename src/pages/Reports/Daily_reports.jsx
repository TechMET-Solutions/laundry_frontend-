import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { reportitems } from "../../constants/reportitems";




function Daily_reports() {
  const navigate = useNavigate();
  const location = useLocation();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState([]);


  // find active report from URL
  const activeReport =
    reportitems.find((item) => item.path === location.pathname) ||
    reportitems[0];

  const [selectedReport, setSelectedReport] = useState(activeReport);

  // 1. Fetch Table Data
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/api/reports/daily`, {
  //       params: { startDate, endDate }
  //     });
  //     // Assuming your API returns an array of { Particulars, Value }
  //     setReportData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data", error);
  //   }
  // };

  const fetchData = async () => {
    try {
      if (!startDate || !endDate) {
        setReportData([]);
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/reports/daily`,
        { params: { startDate, endDate } }
      );

      setReportData(
        Array.isArray(response.data?.data)
          ? response.data.data
          : []
      );
    } catch (error) {
      console.error("Error fetching data", error);
      setReportData([]);
    }
  };


  useEffect(() => {
    fetchData();
  }, [startDate, endDate]); // Re-run when dates change

  // 2. Download Excel
  const downloadExcel = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reports/download`, {
        params: { startDate, endDate },
        responseType: 'blob', // Important for files
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Daily_Report_${startDate}.xlsx`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert("Failed to download Excel");
    }
  };

  // 3. Download/Print PDF
  const downloadPDF = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reports/print`, {
        params: { startDate, endDate },
        responseType: 'blob', // REQUIRED: Tells axios to handle binary data
      });

      // Create a Blob from the PDF Stream
      const file = new Blob([response.data], { type: 'application/pdf' });

      // Create a URL for the blob and open it
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");

    } catch (error) {
      console.error("PDF Display Error:", error);
    }
  };

  const handleReportChange = (e) => {
    const report = reportitems.find((item) => item.path === e.target.value);
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

          <button
            onClick={downloadExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-full text-sm">
            Download Report
          </button>

          <button onClick={downloadPDF} className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm">
            Print Report
          </button>
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
                "Particulars",
                "Value"
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
          {/* <tbody>
            {[
              {
                Particulars: "Orders",
                Value: "9",
              },
              {
                Particulars: "No. of Orders Delivered",
                Value: "0",
              },
              {
                Particulars: "Total Sales",
                Value: "AED 418.25",
              },
              {
                Particulars: "Total Payment",
                Value: "AED 121.43",
              },
              {
                Particulars: "Total Expense",
                Value: "AED 0.00",
              },
              {
                Particulars: "Total Outstanding",
                Value: "AED 296.82",
              },
            ].map((item, index) => (
              <tr
                key={index}
                className="bg-[#f1f5fb] border-b"
              >
                <td className="px-4 py-3 text-left">
                  {item.Particulars}
                </td>
                <td className="px-4 py-3 text-left font-medium">
                  {item.Value}
                </td>
              </tr>
            ))}
          </tbody> */}
          <tbody>
            {reportData.length > 0 ? (
              reportData.map((item, index) => (
                <tr key={index} className="bg-[#f1f5fb] border-b">
                  <td className="px-4 py-3 text-left">
                    {item?.Particulars || "-"}
                  </td>
                  <td className="px-4 py-3 text-left font-medium">
                    {item?.Value || "0"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="px-4 py-3 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>



        </table>
      </div>
    </div>
  );
}

export default Daily_reports;

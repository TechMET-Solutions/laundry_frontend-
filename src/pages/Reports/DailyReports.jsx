import axios from "axios";
import React, { useEffect, useState } from "react";
import { reportitems } from "../../constants/reportitems";
import NavButton from "../../components/ui/NavButton";
import ReportHeader from "../../components/ReportHeader";
import DateFilter from "../../components/DateFilter";




function DailyReports() {

  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [reportData, setReportData] = useState([]);



  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">

      {/* HEADER */}
      <ReportHeader
        reportItems={reportitems}
        actions={
          <>
            <NavButton
              className="rounded-lg"
              // onClick={downloadExcel} 
              variant="download">
              Download Report
            </NavButton>

            <NavButton
              className="rounded-lg"
              // onClick={downloadPDF} 
              variant="print">
              Print Report
            </NavButton>
          </>
        }
      />

      {/* DATE FILTERS */}
      <div className="flex justify-end gap-6 mb-6">
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          onStartChange={setStartDate}
          onEndChange={setEndDate}
        />
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

export default DailyReports;

import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { reportitems } from "../../constants/reportitems";
import NavButton from "../../components/ui/NavButton";
import ReportHeader from "../../components/ReportHeader";
import { getTaxReport } from "../../api/report";
import { formatDateForInput } from "../../utils/formatDateForInput";
import SummaryCard from "../../components/SummaryCard";
import DateFilter from "../../components/DateFilter";
import ReportTable from "../../components/ReportTable";


function TaxReport() {


  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);


  const fetchTaxReport = async () => {
    try {
      setLoading(true);

      const response = await getTaxReport(startDate, endDate);

      const data = response.data;

      setReportData(data.data || []);
      setTotalDebit(data.summary.total_debit || 0);
      setTotalCredit(data.summary.total_credit || 0);

    } catch (error) {
      console.error(
        "Failed to fetch tax report",
        error?.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaxReport();
  }, [startDate, endDate]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Tax Report", 14, 15);

    doc.setFontSize(10);
    doc.text(`From: ${startDate}`, 14, 22);
    doc.text(`To: ${endDate}`, 60, 22);

    doc.text(`Total Debit: AED ${totalDebit}`, 14, 30);
    doc.text(`Total Credit: AED ${totalCredit}`, 60, 30);

    autoTable(doc, {
      startY: 38,
      head: [[
        "Sr No",
        "Date",
        "Order ID",
        "Before Tax",
        "Tax Amount",
        "Total Amount",
      ]],
      body: reportData.map((item, index) => ([
        index + 1,
        formatDateForInput(item.order_date),
        item.order_code,
        `AED ${item.sub_total}`,
        `AED ${item.tax}`,
        `AED ${item.gross_total}`,
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

    const tableRows = reportData.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${formatDateForInput(item.order_date)}</td>
      <td>${item.order_code}</td>
      <td>AED ${item.sub_total}</td>
      <td>AED ${item.tax}</td>
      <td>AED ${item.gross_total}</td>
    </tr>
  `).join("");

    printWindow.document.write(`
    <html>
      <head>
        <title>Tax Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 { margin-bottom: 5px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #56CCFF; }
        </style>
      </head>
      <body>
        <h2>Tax Report</h2>
        <p><strong>From:</strong> ${startDate} &nbsp;&nbsp; <strong>To:</strong> ${endDate}</p>
        <p><strong>Total Debit:</strong> AED ${totalDebit}</p>
        <p><strong>Total Credit:</strong> AED ${totalCredit}</p>

        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Date</th>
              <th>Order ID</th>
              <th>Before Tax</th>
              <th>Tax Amount</th>
              <th>Total Amount</th>
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
    <div className="p-6 bg-[#f4f7fb] min-h-screen">

      {/* HEADER */}
      <ReportHeader
        reportItems={reportitems}
        actions={
          <>
            <NavButton
              className="rounded-lg"
              onClick={handleDownloadPDF}
              variant="download">
              Download Report
            </NavButton>

            <NavButton
              className="rounded-lg"
              onClick={handlePrintPDF}
              variant="print">
              Print Report
            </NavButton>
          </>
        }
      />
      <div className="flex gap-6 mt-6">
        <SummaryCard
          label="Total Debit"
          currency="AED"
          value={Number(totalDebit).toFixed(2)}
          borderColor="border-green-400"
        />
        <SummaryCard
          label="Total Credit"
          currency="AED"
          value={Number(totalCredit).toFixed(2)}
          borderColor="border-yellow-400"
        />
      </div>

      {/* DATE FILTERS */}
      <div className="flex justify-end gap-6 mb-2">
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          onStartChange={setStartDate}
          onEndChange={setEndDate}
        />
        {/* <select className="bg-gray-200 rounded-lg px-4 py-2 text-sm outline-none">
          <option>Sales</option>
          <option>Sales</option>
          <option>Expenses</option>

        </select> */}
      </div>

      <ReportTable
        headers={[
          "Sr No",
          "Date",
          "Order ID",
          "Before Tax",
          "Tax Amount",
          "Total Amount",
        ]}
        data={reportData}
        loading={loading}
        renderRow={(item, index) => (
          <tr key={index} className="bg-[#f1f5fb] border-b">
            <td className="px-4 py-3">{index + 1}</td>
            <td className="px-4 py-3">
              {formatDateForInput(item.order_date)}
            </td>
            <td className="px-4 py-3">{item.order_code}</td>
            <td className="px-4 py-3">AED {item.sub_total}</td>
            <td className="px-4 py-3">AED {item.tax}</td>
            <td className="px-4 py-3">AED {item.gross_total}</td>
          </tr>
        )}
      />
    </div>

  );
}

export default TaxReport;


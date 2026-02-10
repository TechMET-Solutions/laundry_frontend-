import React, { useEffect, useState } from "react";
import axios from "axios";

import ReportHeader from "../../components/ReportHeader";
import NavButton from "../../components/ui/NavButton";
import { reportitems } from "../../constants/reportitems";
import { API_URL } from "../../api";

function AttendanceReport() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");

    const [attendance, setAttendance] = useState([]);
    const today = new Date().toISOString().split("T")[0];

    const [from, setFrom] = useState(today);
    const [to, setTo] = useState(today);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ================= FETCH EMPLOYEES =================
    const fetchEmployees = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/employees/list`
            );

            if (res.data?.success) {
                const list = res.data.data || [];

                setEmployees(list);

                // auto-select first employee safely
                if (list.length > 0) {
                    setSelectedEmployee(list[0].id);
                }
            }
        } catch (err) {
            console.error("Employee fetch failed:", err);
            setEmployees([]); // prevent crash
        }
    };


    // ================= FETCH ATTENDANCE =================
    const fetchAttendance = async () => {
        if (!selectedEmployee || !from || !to) return;

        try {
            setLoading(true);
            setError("");

            const res = await axios.get(`${API_URL}/api/reports/attedence`, {
                params: {
                    employeeId: selectedEmployee,
                    from,
                    to,
                },
            });

            if (res.data.success) {
                setAttendance(res.data.attendance);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load attendance");
        } finally {
            setLoading(false);
        }
    };

    // ================= DOWNLOAD =================
    const downloadReport = () => {
        if (!selectedEmployee || !from || !to) return;

        const url = `${API_URL}/api/reports/attendance/download?employeeId=${selectedEmployee}&from=${from}&to=${to}`;
        window.open(url, "_blank");
    };

    const printReport = () => {
        if (!selectedEmployee || !from || !to) return;

        const url = `${API_URL}/api/reports/attedence/print?employeeId=${selectedEmployee}&from=${from}&to=${to}`;
        window.open(url, "_blank");
    };

    // ================= INITIAL LOAD =================
    useEffect(() => {
        fetchEmployees();

        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
            .toISOString()
            .split("T")[0];

        const lastDay = today.toISOString().split("T")[0];

        setFrom(firstDay);
        setTo(lastDay);
    }, []);

    // ================= AUTO FETCH =================
    useEffect(() => {
        if (selectedEmployee && from && to) {
            fetchAttendance();
        }
    }, [selectedEmployee, from, to]);

    // ================= RENDER =================
    return (
        <div className="p-6 bg-[#f4f7fb] min-h-screen space-y-6">
            {/* HEADER */}
            <ReportHeader
                reportItems={reportitems}
                actions={
                    <div className="flex gap-3">
                        <NavButton variant="download" onClick={downloadReport}>
                            Download Report
                        </NavButton>

                        <NavButton variant="print" onClick={printReport}>
                            Print Report
                        </NavButton>
                    </div>
                }
            />

            {/* FILTERS */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap gap-4 items-end">
                {/* Employee Dropdown */}
                <div>
                    <label className="text-sm font-medium text-gray-600">Employee</label>
                    <select
                        value={selectedEmployee || ""}
                        onChange={(e) => setSelectedEmployee(Number(e.target.value))}
                        disabled={employees.length === 0}
                        className="border rounded-lg px-3 py-2 block min-w-[200px] bg-white disabled:bg-gray-100"
                    >
                        <option value="">
                            {employees.length === 0 ? "No Employees Found" : "Select Employee"}
                        </option>

                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                                {emp.first_name} {emp.last_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date From */}
                <div>
                    <label className="text-sm font-medium text-gray-600">From</label>
                    <input
                        type="date"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="border rounded-lg px-3 py-2 block"
                    />
                </div>

                {/* Date To */}
                <div>
                    <label className="text-sm font-medium text-gray-600">To</label>
                    <input
                        type="date"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="border rounded-lg px-3 py-2 block"
                    />
                </div>

                <NavButton onClick={fetchAttendance}>Apply Filter</NavButton>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {loading ? (
                    <p className="p-6 text-center">Loading attendance...</p>
                ) : error ? (
                    <p className="p-6 text-center text-red-500">{error}</p>
                ) : attendance.length === 0 ? (
                    <p className="p-6 text-center text-gray-500">No attendance found</p>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Punch In</th>
                                <th className="p-3 text-left">Punch Out</th>
                                <th className="p-3 text-left">Verified</th>
                            </tr>
                        </thead>

                        <tbody>
                            {attendance.map((row, i) => (
                                <tr key={i} className="border-t">
                                    <td className="p-3">{row.attendance_date}</td>
                                    <td className="p-3">{row.punch_in || "-"}</td>
                                    <td className="p-3">{row.punch_out || "-"}</td>
                                    <td className="p-3">
                                        {row.is_verified ? (
                                            <span className="text-green-600 font-semibold">Yes</span>
                                        ) : (
                                            <span className="text-red-500 font-semibold">No</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AttendanceReport;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../api";

function Attendance() {
    const { user } = useAuth();

    const [currentStatus, setCurrentStatus] = useState(""); // READY | IN | COMPLETED
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // 🔹 Load today's attendance status
    const fetchInitialData = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${API_URL}/api/employees/status/${user.id}`
            );

            if (res.data.success) {
                setCurrentStatus(res.data.status);
            }
        } catch (err) {
            console.error("Dashboard Load Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.id) fetchInitialData();
    }, [user]);

    // 🔹 Punch handler
    const handlePunch = async (type) => {
        setLoading(true);
        setMessage("");

        try {
            const url =
                type === "IN"
                    ? `${API_URL}/api/employees/punch-in`
                    : `${API_URL}/api/employees/punch-out`;

            const res = await axios.post(url, {
                employeeId: user.id,
                image: null, // later selfie/base64
            });

            setMessage(res.data.message);

            if (type === "IN") setCurrentStatus("IN");
            else setCurrentStatus("COMPLETED");
        } catch (err) {
            setMessage(err.response?.data?.message || "Punch failed");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 COMPLETED VIEW
    if (currentStatus === "COMPLETED") {
        return (
            <div className="bg-green-50 border border-green-200 px-6 py-3 rounded-2xl flex items-center gap-3 text-green-700 font-bold shadow-sm">
                <CheckCircle size={20} />
                <span>Work Finished for Today</span>
            </div>
        );
    }

    // 🔹 DEFAULT VIEW
    return (
        <div className="space-y-3">
            {/* Punch Buttons */}
            <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-slate-200 gap-3 w-[400px]">
                {/* PUNCH IN */}
                <button
                    disabled={loading || currentStatus !== "READY"}
                    onClick={() => handlePunch("IN")}
                    className={`flex-1 px-2 py-2 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${currentStatus !== "READY"
                            ? "bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-100"
                            : "bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-100"
                        }`}
                >
                    {currentStatus !== "READY" && <CheckCircle size={18} />}
                    {currentStatus === "READY" ? "Punch In" : "Already Punched In"}
                </button>

                {/* PUNCH OUT */}
                <button
                    disabled={loading || currentStatus !== "IN"}
                    onClick={() => handlePunch("OUT")}
                    className={`flex-1 px-2 py-2 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${currentStatus !== "IN"
                            ? "bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-100"
                            : "bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-100"
                        }`}
                >
                    <span>
                        {currentStatus === "COMPLETED" ? "Shift Completed" : "Punch Out"}
                    </span>
                </button>
            </div>

            {/* Message */}
            {message && (
                <p className="text-sm text-center text-slate-600">{message}</p>
            )}
        </div>
    );
}

export default Attendance;

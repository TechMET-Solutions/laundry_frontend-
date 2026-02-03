import { IoReturnUpBackOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

const ReportHeader = ({
    reportItems,
    actions = null, // 👈 NEW (buttons go here)
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const activeReport = useMemo(() => {
        return (
            reportItems.find((item) => item.path === location.pathname) ||
            reportItems[0]
        );
    }, [location.pathname, reportItems]);

    const [selectedReport, setSelectedReport] = useState(activeReport);

    const handleReportChange = (e) => {
        const report = reportItems.find(
            (item) => item.path === e.target.value
        );
        setSelectedReport(report);
        navigate(report.path);
    };

    return (
        <div className="mb-6">
            <div className="flex items-center justify-between">
                {/* Left */}
                <div className="flex items-center gap-3">
                    <div
                        className="h-8 w-8 flex items-center justify-center
                       bg-blue-600 text-white rounded cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                        <IoReturnUpBackOutline />
                    </div>

                    <h2 className="font-semibold text-lg">
                        {selectedReport.name}
                    </h2>
                </div>

                {/* Right */}
                <div className="flex items-end gap-2">
                    <select
                        value={selectedReport.path}
                        onChange={handleReportChange}
                        className="px-4 py-2 rounded-lg text-sm
                       bg-indigo-400 text-white cursor-pointer"
                    >
                        {reportItems.map((item, index) => (
                            <option
                                key={index}
                                value={item.path}
                                className="bg-white text-black"
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>

                    {/* 👇 Buttons appear UNDER the select */}
                    {actions && (
                        <div className="flex gap-2">
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportHeader;

const SummaryCard = ({ label, value, currency, borderColor = "border-blue-400" }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm w-56">
            <div
                className={`flex items-center justify-between px-4 py-3 border-b ${borderColor}`}
            >
                <p className="text-sm text-gray-600">{label}</p>
                <span className="text-lg font-semibold text-gray-800">
                    {currency} {value}
                </span>
            </div>
        </div>
    );
};

export default SummaryCard;

const DateFilter = ({
    startDate,
    endDate,
    onStartChange,
    onEndChange,
}) => {
    return (
        <div className="flex justify-end gap-6">
            <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-600">
                    Start Date
                </label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => onStartChange(e.target.value)}
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
                    onChange={(e) => onEndChange(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-gray-200 text-sm outline-none"
                />
            </div>
        </div>
    );
};

export default DateFilter;

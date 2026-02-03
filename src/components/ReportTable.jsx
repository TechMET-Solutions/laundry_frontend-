const ReportTable = ({
    headers,
    data,
    loading,
    renderRow,
}) => {
    return (
        <div className="bg-[#f4f7fb]">
            <table className="w-full text-sm border-separate">
                <thead>
                    <tr>
                        {headers.map((head) => (
                            <th
                                key={head}
                                className="bg-[#56CCFF] px-4 py-3 text-left font-medium text-gray-800"
                            >
                                {head}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={headers.length} className="text-center py-6">
                                Loading...
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={headers.length} className="text-center py-6">
                                No records found
                            </td>
                        </tr>
                    ) : (
                        data.map(renderRow)
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ReportTable;

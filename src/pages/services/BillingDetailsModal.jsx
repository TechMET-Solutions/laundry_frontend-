import React from 'react';


const BillingDetailsModal = ({ customer, onClose }) => {
  // Sample billing data - in real app, fetch this from API based on customer.id
  const billingData = {
    customerName: customer?.name || "Test Customer",
    debitAmount: "AED 30.00",
    creditAmount: "AED 20.00",
    balanceAmount: "AED 10.00",
    transactions: [
      {
        date: "01/12/2025",
        type: "Order",
        orderId: "TMSJOR0-01",
        debit: "AED 30.00",
        credit: "AED 0.00",
        balance: "AED 30.00"
      },
      {
        date: "03/12/2025",
        type: "Payment",
        orderId: "TMSJOR0-01",
        debit: "AED 0.00",
        credit: "AED 20.00",
        balance: "AED 10.00"
      }
    ]
  };

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Pure blur backdrop - no black overlay */}
    <div 
      className="absolute inset-0 backdrop-blur-sm bg-transparent"
      onClick={onClose}
    ></div>

      
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Billing Details
            </h2>
            <p className="text-gray-600">Customer: {billingData.customerName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <p className="text-gray-600 text-sm mb-1">Debit Amount</p>
              <p className="text-2xl font-bold text-red-700">{billingData.debitAmount}</p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <p className="text-gray-600 text-sm mb-1">Credit Amount</p>
              <p className="text-2xl font-bold text-green-700">{billingData.creditAmount}</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-gray-600 text-sm mb-1">Balance Amount</p>
              <p className="text-2xl font-bold text-blue-700">{billingData.balanceAmount}</p>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-hidden border border-blue-200 ">
            <table className="min-w-full divide-y divide-blue-300">
              <thead className="bg-blue-100 gap-0.5 px-1 py-1 border-separate border-spacing-x-0.5 border-spacing-y-2">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Debit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {billingData.transactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-700">
                      {transaction.debit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-700">
                      {transaction.credit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700">
                      {transaction.balance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingDetailsModal;
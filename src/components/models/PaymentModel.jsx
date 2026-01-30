import { useState } from "react";
import { FiX } from "react-icons/fi";

const AddPaymentModal = ({ onClose, onSave, orderData }) => {
  const [formData, setFormData] = useState({
    paidAmount: "",
    advancePayment: false,
    advanceAmount: "",
    paymentMethod: "",
    note: ""
  });

  // Static order data
  const staticOrderData = {
    orderId: "TMS/ORD-01",
    orderDetail: "04/12/2025",
    deliveryDate: "06/12/2025",
    orderAmount: "30.00"
  };

  // Calculate balance
  const calculateBalance = () => {
    const orderAmt = parseFloat(staticOrderData.orderAmount) || 0;
    const paidAmt = parseFloat(formData.paidAmount) || 0;
    const advanceAmt = formData.advancePayment ? (parseFloat(formData.advanceAmount) || 0) : 0;
    const balance = orderAmt - paidAmt - advanceAmt;
    return Math.max(0, balance).toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    
    if (!formData.paidAmount) {
      alert("Please enter paid amount");
      return;
    }
    
    const paymentData = {
      order_id: staticOrderData.orderId,
      order_detail: staticOrderData.orderDetail,
      delivery_date: staticOrderData.deliveryDate,
      order_amount: staticOrderData.orderAmount,
      paid_amount: formData.paidAmount,
      advance_amount: formData.advanceAmount || "0",
      payment_method: formData.paymentMethod,
      note: formData.note
    };
    
    console.log("Payment data:", paymentData);
    alert("Payment saved successfully!");
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50"></div>

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white w-[420px] rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-center border-b px-4 py-3">
            <h2 className="font-medium text-gray-800">Add Payment</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <FiX className="text-gray-500 text-sm" />
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            {/* Financial Summary */}
            <div>
              <h3 className="font-medium text-gray-700 text-sm mb-2">Financial Summary</h3>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Id:</span>
                  <span className="font-medium">{staticOrderData.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Detail:</span>
                  <span className="font-medium">{staticOrderData.orderDetail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Date:</span>
                  <span className="font-medium">{staticOrderData.deliveryDate}</span>
                </div>
              </div>
            </div>

            {/* Order Amount */}
            <div className="bg-gray-50 p-2 rounded border">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 text-sm">Order Amount</span>
                <span className="font-bold">AED {staticOrderData.orderAmount}</span>
              </div>
            </div>

            {/* Paid Amount */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Paid Amount (AED)
              </label>
              <input
                type="number"
                name="paidAmount"
                value={formData.paidAmount}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                min="0"
                max={staticOrderData.orderAmount}
                step="0.01"
              />
            </div>
             {/* Balance Summary */}
            <div className="bg-blue-50 p-2 rounded border border-blue-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 text-sm">Balance Summary</span>
                <span className="font-bold text-blue-700">
                  AED {calculateBalance()}
                </span>
              </div>
            </div>

            {/* Advance Amount */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="advancePayment"
                checked={formData.advancePayment}
                onChange={handleChange}
                className="w-3.5 h-3.5"
                id="advanceCheckbox"
              />
              <label htmlFor="advanceCheckbox" className="text-xs text-gray-700">
                Advance Amount
              </label>
              {formData.advancePayment && (
                <input
                  type="number"
                  name="advanceAmount"
                  value={formData.advanceAmount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  min="0"
                  max={staticOrderData.orderAmount}
                  step="0.01"
                />
              )}
            </div>

           

            {/* Payment Method */}
            <div className="flex gap-31">
                
             
              
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="  text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Choose Payment Method</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="bank">Bank Transfer</option>
              </select>
              {/* Paid Amount */}
            <div>
              <label className=" text-xs font-medium text-gray-700 mb-1">
                
              </label>
              <input
                type="number"
                name="paidAmount"
                value={formData.paidAmount}
                onChange={handleChange}
                placeholder="0.00"
                className=" px-4.5 py-4.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                min="0"
                max={staticOrderData.orderAmount}
                step="0.01"
              />
            </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 ">
                Notes / Remarks
              </label>
              <textarea
                rows="3"
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                placeholder="Enter comments..."
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPaymentModal;
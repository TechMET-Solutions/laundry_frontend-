// import { useState } from "react";
// import { FiX } from "react-icons/fi";

// const AddPaymentModal = ({ onClose, onSave, orderData }) => {
//   const [formData, setFormData] = useState({
//     paidAmount: "",
//     advancePayment: false,
//     advanceAmount: "",
//     paymentMethod: "",
//     note: "",
//   });

//   // Order data (fallback to defaults when unavailable)
//   const staticOrderData = {
//     orderId: orderData?.order_code || "N/A",
//     orderDetail: orderData?.order_date
//       ? orderData.order_date.split("T")[0]
//       : "N/A",
//     deliveryDate: orderData?.delivery_date
//       ? orderData.delivery_date.split("T")[0]
//       : "N/A",
//     orderAmount:
//       orderData?.gross_total ?? orderData?.sub_total ?? orderData?.total ?? 0,
//   };

//   // Calculate balance
//   const calculateBalance = () => {
//     const orderAmt = parseFloat(staticOrderData.orderAmount) || 0;
//     const paidAmt = parseFloat(formData.paidAmount) || 0;
//     const advanceAmt = formData.advancePayment
//       ? parseFloat(formData.advanceAmount) || 0
//       : 0;
//     const balance = orderAmt - paidAmt - advanceAmt;
//     return Math.max(0, balance).toFixed(2);
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.paymentMethod) {
//       alert("Please select a payment method");
//       return;
//     }

//     if (!formData.paidAmount) {
//       alert("Please enter paid amount");
//       return;
//     }

//     const paymentData = {
//       order_id: staticOrderData.orderId,
//       order_detail: staticOrderData.orderDetail,
//       delivery_date: staticOrderData.deliveryDate,
//       order_amount: staticOrderData.orderAmount,
//       paid_amount: formData.paidAmount,
//       advance_amount: formData.advanceAmount || "0",
//       payment_method: formData.paymentMethod,
//       note: formData.note,
//     };

//     console.log("Payment data:", paymentData);
//     alert("Payment saved successfully!");
//     onClose();
//   };

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/40 z-50"></div>

//       <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//         <div className="bg-white w-[420px] rounded-lg shadow-xl">
//           {/* Header */}
//           <div className="flex justify-between items-center   px-4 py-3">
//             <h2 className="font-medium text-gray-800">Add Payment</h2>
//             <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
//               <FiX className="text-gray-500 text-sm" />
//             </button>
//           </div>
//           <hr className="text-gray-600" />

//           <form onSubmit={handleSubmit} className=" space-y-3">
//             <div>
//               {/* <h3 className="font-medium text-gray-700 text-sm mb-2">Financial Summary</h3> */}
//               <div className="p-4 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Order Id:</span>
//                   <span className="font-medium">{staticOrderData.orderId}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Order Detail:</span>
//                   <span className="font-medium">
//                     {staticOrderData.orderDetail}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Delivery Date:</span>
//                   <span className="font-medium">
//                     {staticOrderData.deliveryDate}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <hr className="text-gray-400" />

//             {/* Order Amount */}
//             <div className="bg-gray-50 p-4    ">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 text-sm">Order Amount</span>
//                 <span className="font-semibold text-gray-800 text-sm">
//                   AED {staticOrderData.orderAmount}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 text-sm">Paid Amount</span>
//                 <span className="font-bold text-gray-800 text-sm">
//                   AED {staticOrderData.paidAmount}
//                 </span>
//               </div>
//             </div>

//             <hr className="text-gray-400" />

//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">
//                 Paid Amount (AED)
//               </label>
//               <input
//                 type="number"
//                 name="paidAmount"
//                 value={formData.paidAmount}
//                 onChange={handleChange}
//                 placeholder="0.00"
//                 className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 min="0"
//                 max={staticOrderData.orderAmount}
//                 step="0.01"
//               />
//             </div>
//             {/* Balance Summary */}
//             <div className="bg-blue-50 p-2 rounded border border-blue-100">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-700 text-sm">Balance Summary</span>
//                 <span className="font-bold text-blue-700">
//                   AED {calculateBalance()}
//                 </span>
//               </div>
//             </div>

//             {/* Advance Amount */}
//             <div className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 name="advancePayment"
//                 checked={formData.advancePayment}
//                 onChange={handleChange}
//                 className="w-3.5 h-3.5"
//                 id="advanceCheckbox"
//               />
//               <label
//                 htmlFor="advanceCheckbox"
//                 className="text-xs text-gray-700"
//               >
//                 Advance Amount
//               </label>
//               {formData.advancePayment && (
//                 <input
//                   type="number"
//                   name="advanceAmount"
//                   value={formData.advanceAmount}
//                   onChange={handleChange}
//                   placeholder="0.00"
//                   className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                   min="0"
//                   max={staticOrderData.orderAmount}
//                   step="0.01"
//                 />
//               )}
//             </div>

//             {/* Payment Method */}
//             <div className="flex gap-31">
//               <select
//                 name="paymentMethod"
//                 value={formData.paymentMethod}
//                 onChange={handleChange}
//                 className="  text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//               >
//                 <option value="">Choose Payment Method</option>
//                 <option value="cash">Cash</option>
//                 <option value="card">Card</option>
//                 <option value="bank">Bank Transfer</option>
//               </select>
//               {/* Paid Amount */}
//               <div>
//                 <label className=" text-xs font-medium text-gray-700 mb-1"></label>
//                 <input
//                   type="number"
//                   name="paidAmount"
//                   value={formData.paidAmount}
//                   onChange={handleChange}
//                   placeholder="0.00"
//                   className=" px-4.5 py-4.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                   min="0"
//                   max={staticOrderData.orderAmount}
//                   step="0.01"
//                 />
//               </div>
//             </div>

//             {/* Notes */}
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1 ">
//                 Notes / Remarks
//               </label>
//               <textarea
//                 rows="3"
//                 name="note"
//                 value={formData.note}
//                 onChange={handleChange}
//                 className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
//                 placeholder="Enter comments..."
//               />
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end gap-2 pt-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-1.5 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddPaymentModal;

import { useState } from "react";
import { FiX } from "react-icons/fi";

const AddPaymentModal = ({ onClose, orderData, onSave }) => {
  // Order data with fallback values
  const orderCode = orderData?.order_code || "N/A";
  const orderDate = orderData?.order_date
    ? new Date(orderData.order_date).toLocaleDateString()
    : "N/A";
  const deliveryDate = orderData?.delivery_date
    ? new Date(orderData.delivery_date).toLocaleDateString()
    : "N/A";
  const totalAmount = orderData?.gross_total || orderData?.total || 0;
  const paidAmount = orderData?.paid_amount || 0;
  const pendingAmount = totalAmount - paidAmount;

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSave = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    const paymentData = {
      order_code: orderCode,
      payment_method: paymentMethod,
      pending_amount: pendingAmount,
    };

    if (onSave) {
      onSave(paymentData);
    }
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white w-full max-w-md rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Payment Details
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiX className="text-gray-500 text-xl" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Order Information */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Order Code:</span>
                <span className="text-sm font-medium text-gray-900">
                  {orderCode}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Order Date:</span>
                <span className="text-sm font-medium text-gray-900">
                  {orderDate}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Delivery Date:</span>
                <span className="text-sm font-medium text-gray-900">
                  {deliveryDate}
                </span>
              </div>
            </div>

            {/* Gray HR Line */}
            <hr className="border-gray-400" />

            {/* Payment Information */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Amount:</span>
                <span className="text-sm font-semibold text-gray-900">
                  AED {parseFloat(totalAmount).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Paid Amount:</span>
                <span className="text-sm font-semibold text-green-600">
                  AED {parseFloat(paidAmount).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Gray HR Line */}
            <hr className="border-gray-400" />

            <div className="flex items-center justify-between gap-4">
              <input type="number" value={pendingAmount.toFixed(2)  } className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              <select
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value={""} disabled>
                  Payment Method
                </option>
                <option value="Settlement">Settlement</option>
                <option value="Advance">Advance</option>
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
                <option value="Card">Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>

              {/* <div className="min-w-[150px] text-right">
                <div className="text-xs text-gray-500">Pending Amount</div>
                <div className="text-sm font-semibold text-red-600">
                  AED {parseFloat(pendingAmount).toFixed(2)}
                </div>
              </div> */}
            </div>
          </div>
          <div  >
            <span className="p-4 text-gray-600" >Remark</span>
            <textarea
              rows="3"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none m-6"
              placeholder="Enter comments..."
            ></textarea>  
          </div>

          {/* Footer - Optional */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-400 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPaymentModal;

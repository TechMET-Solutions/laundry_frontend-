// import { useState } from "react";
// import { FiX } from "react-icons/fi";

// const AddPaymentModal = ({ onClose, orderData, onSave }) => {
//   // Order data with fallback values
//   const orderCode = orderData?.order_code || "N/A";
//   const orderDate = orderData?.order_date
//     ? new Date(orderData.order_date).toLocaleDateString()
//     : "N/A";
//   const deliveryDate = orderData?.delivery_date
//     ? new Date(orderData.delivery_date).toLocaleDateString()
//     : "N/A";
//   const totalAmount = orderData?.gross_total || orderData?.total || 0;
//   const paidAmount = orderData?.paid_amount || 0;
//   const pendingAmount = totalAmount - paidAmount;

//   const [paymentMethod, setPaymentMethod] = useState("");

//   const handleSave = () => {
//     if (!paymentMethod) {
//       alert("Please select a payment method");
//       return;
//     }

//     const paymentData = {
//       order_code: orderCode,
//       payment_method: paymentMethod,
//       pending_amount: pendingAmount,
//     };

//     if (onSave) {
//       onSave(paymentData);
//     }
//     onClose();
//   };

//   return (
//     <>
//       {/* Overlay */}
//       <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}></div>

//       {/* Modal */}
//       <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//         <div className="bg-white w-full max-w-md rounded-lg shadow-xl">
//           {/* Header */}
//           <div className="flex justify-between items-center px-6 py-4 border-b">
//             <h2 className="text-lg font-semibold text-gray-800">
//               Payment Details
//             </h2>
//             <button
//               onClick={onClose}
//               className="p-1 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <FiX className="text-gray-500 text-xl" />
//             </button>
//           </div>

//           {/* Content */}
//           <div className="p-6 space-y-4">
//             {/* Order Information */}
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Order Code:</span>
//                 <span className="text-sm font-medium text-gray-900">
//                   {orderCode}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Order Date:</span>
//                 <span className="text-sm font-medium text-gray-900">
//                   {orderDate}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Delivery Date:</span>
//                 <span className="text-sm font-medium text-gray-900">
//                   {deliveryDate}
//                 </span>
//               </div>
//             </div>

//             {/* Gray HR Line */}
//             <hr className="border-gray-400" />

//             {/* Payment Information */}
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Total Amount:</span>
//                 <span className="text-sm font-semibold text-gray-900">
//                   AED {parseFloat(totalAmount).toFixed(2)}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Paid Amount:</span>
//                 <span className="text-sm font-semibold text-green-600">
//                   AED {parseFloat(paidAmount).toFixed(2)}
//                 </span>
//               </div>
//             </div>

//             {/* Gray HR Line */}
//             <hr className="border-gray-400" />

//             <div className="flex items-center justify-between gap-4">
//               <input type="number" value={pendingAmount.toFixed(2)  } className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" />
//               <select
//                 name="paymentMethod"
//                 value={paymentMethod}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//                 className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
//               >
//                 <option value={""} disabled>
//                   Payment Method
//                 </option>
//                 <option value="Settlement">Settlement</option>
//                 <option value="Advance">Advance</option>
//                 <option value="Cash">Cash</option>
//                 <option value="Online">Online</option>
//                 <option value="Card">Card</option>
//                 <option value="Bank Transfer">Bank Transfer</option>
//               </select>

//               {/* <div className="min-w-[150px] text-right">
//                 <div className="text-xs text-gray-500">Pending Amount</div>
//                 <div className="text-sm font-semibold text-red-600">
//                   AED {parseFloat(pendingAmount).toFixed(2)}
//                 </div>
//               </div> */}
//             </div>
//           </div>
//           <div  >
//             <span className="p-4 text-gray-600" >Remark</span>
//             <textarea
//               rows="3"
//               className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none m-6"
//               placeholder="Enter comments..."
//             ></textarea>
//           </div>

//           {/* Footer - Optional */}
//           <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex gap-3 justify-end">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 bg-indigo-400 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddPaymentModal;




import { useState } from "react";
import { FiX } from "react-icons/fi";
import axios from "axios";
import { API_URL } from "../../api";

const AddPaymentModal = ({ onClose, orderData, onSuccess }) => {
  const orderId = orderData?.id;
  const orderCode = orderData?.order_code || "N/A";

  const orderDate = orderData?.order_date
    ? new Date(orderData.order_date).toLocaleDateString()
    : "N/A";

  const deliveryDate = orderData?.delivery_date
    ? new Date(orderData.delivery_date).toLocaleDateString()
    : "N/A";

  const totalAmount = Number(orderData?.gross_total || 0);
  const paidAmount = Number(orderData?.paid_amount || 0);
  const pendingAmount = Number(orderData?.pending_amount || (totalAmount - paidAmount));

  const [amount, setAmount] = useState(pendingAmount);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    if (!paymentMethod) {
      alert("Select payment method");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_URL}/api/orders/addpayment`, {
        orderId,
        amount,
        paymentMethod,
        paymentStage: amount === pendingAmount ? "final" : "partial",
        note: remark
      });

      alert("Payment added successfully");

      if (onSuccess) onSuccess(); // refresh order/payment list
      onClose();

    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}></div>

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white w-full max-w-md rounded-lg shadow-xl">

          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Payment Details</h2>
            <button onClick={onClose}>
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Order Code</span><span>{orderCode}</span></div>
              <div className="flex justify-between"><span>Order Date</span><span>{orderDate}</span></div>
              <div className="flex justify-between"><span>Delivery Date</span><span>{deliveryDate}</span></div>
            </div>

            <hr />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total</span>
                <span>AED {totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Paid</span>
                <span className="text-green-600">AED {paidAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Balance</span>
                <span className="text-red-600">AED {pendingAmount.toFixed(2)}</span>
              </div>
            </div>

            <hr />

            <div className="flex gap-3">
              <input
                type="number"
                value={amount}
                max={pendingAmount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full border px-3 py-2 rounded text-sm"
              />

              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border px-3 py-2 rounded text-sm"
              >
                <option value="">Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
                <option value="Card">Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>

            <textarea
              rows="3"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Remarks"
              className="w-full border px-3 py-2 rounded text-sm"
            />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default AddPaymentModal;

import { FiUser } from "react-icons/fi";
import { useState } from "react";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { GrCycle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";

function OrderSummary({
  orders,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
}) {
  const navigate = useNavigate();

  const [orderDate, setOrderDate] = useState("2025-11-28");
  const [deliveryDate, setDeliveryDate] = useState("2025-11-30");

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // ---- CALCULATIONS ----
  const subtotal = orders.reduce(
    (sum, item) => sum + item.quantity * (item.price || 0),
    0,
  );

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-xl  p-4 flex flex-col gap-4 h-full">
       
      <div className="flex justify-between items-center gap-6">
       
        <div className="flex items-center gap-2 text-[12px]">
          <span className="text-gray-700">Order Date</span>

          <input
            type="date"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            className="
        bg-transparent
        text-indigo-600
        text-[12px]
        font-semibold
        outline-none
        cursor-pointer
      "
          />
        </div>

         <div className="flex items-center gap-2 text-[12px]">
          <span className="text-gray-700">Delivery Date</span>

          <input
            type="date"
            value={deliveryDate}
            min={orderDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="
        bg-transparent
        text-indigo-600
        text-[12px]
        font-semibold
        outline-none
        cursor-pointer
      "
          />
        </div>
      </div>

       <div className="flex gap-4 items-center">
        <button className="flex items-center gap-2 h-10 bg-indigo-50 rounded-lg px-3 font-medium">
          <FiUser /> Select Driver
        </button>

        <button className="flex items-center gap-2 h-10 bg-indigo-50 rounded-lg px-3 font-medium">
          <FiUser /> Select Customer
        </button>

        <button className="flex items-center justify-center h-10 w-10 bg-blue-500 rounded-lg text-white">
          <MdOutlinePersonAddAlt />
        </button>
      </div>

      {/* ORDER ITEMS */}
      <div className="border rounded-lg p-3 text-sm space-y-2 ">
        {orders.length === 0 && (
          <p className="text-gray-400 text-center">No items added</p>
        )}

        {orders.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_auto] gap-4 bg-[#E5E9FF] h-[70px] rounded p-3"
          >
            <div>
              <span className="font-medium text-lg">{item.name}</span>
              <p>{item.price}</p>
            </div>
            <div className="flex items-center gap-2 ">
              <button
                onClick={() => decreaseQuantity(index)}
                className="w-7 h-7 bg-[#D2D5E8] rounded shadow cursor-pointer"
                disabled={item.quantity === 1}
              >
                -
              </button>

              <span className="font-medium">{item.quantity}</span>

              <button
                onClick={() => increaseQuantity(index)}
                className="w-7 h-7 bg-[#D2D5E8] rounded shadow cursor-pointer"
              >
                +
              </button>

              <button
                onClick={() => removeItem(index)}
                className="text-red-500 text-lg cursor-pointer"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TOTALS */}
      <div className="mt-auto bg-indigo-50 rounded-xl p-4 text-sm space-y-2">
        <div className="flex justify-between">
          <span>Sub Total</span>
          <span className="text-right">{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (5%)</span>
          <span className="text-right">{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-right">{total.toFixed(2)}</span>
        </div>
      </div>

      {/* PAYMENT */}
      <div className="flex justify-center gap-1 items-center">
        <input
          type="text"
          placeholder="Enter payment"
          className="flex-1 h-10 bg-gray-200 rounded-lg px-2 text-sm outline-none"
        />

        <select className="h-10 bg-gray-200 rounded-lg px-4 text-sm outline-none">
          <option>Payment Method</option>
          <option>Settlement</option>
          <option>Advance</option>
          <option>Cash</option>
          <option>Online</option>
          <option>Card</option>
          <option>Bank Transfer</option>
        </select>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end items-center gap-4 mt-6 mb-6">
        <button
          onClick={() => navigate("/orders")}
          className="h-10 bg-green-600 text-white px-4 rounded-full text-sm"
        >
          Save
        </button>

        <button className="h-10 bg-orange-600 text-white px-4 rounded-full text-sm">
          Print
        </button>

        <button className="h-10 w-10 bg-red-400 rounded-full text-white flex items-center justify-center">
          <GrCycle />
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;

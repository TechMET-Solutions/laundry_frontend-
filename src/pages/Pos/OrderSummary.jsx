import { FiUser } from "react-icons/fi";
import { useState } from "react";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { GrCycle } from "react-icons/gr";

function OrderSummary({ orders }) {
  const [startDate, setStartDate] = useState("2025-12-01");
  const [endDate, setEndDate] = useState("2025-12-01");

  // ---- CALCULATIONS ----
  const subtotal = orders.reduce(
    (sum, item) => sum + item.quantity * (item.price || 0),
    0
  );

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col gap-4 h-full">
      {/* DATES */}
      <div className="flex justify-between items-end text-sm gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-gray-500">Order Date</p>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-200 text-sm outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-gray-500">Delivery Date</p>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-200 text-sm outline-none"
          />
        </div>
      </div>

      {/* CUSTOMER / DRIVER */}
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
      <div className="border rounded-lg p-3 text-sm space-y-2">
        {orders.length === 0 && (
          <p className="text-gray-400 text-center">No items added</p>
        )}

        {orders.map((item, index) => (
          <div key={index} className="grid grid-cols-[1fr_auto] gap-4">
            <span className="truncate">{item.name}</span>
            <span className="font-medium">x{item.quantity}</span>
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
      <div className="flex gap-1 items-center">
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
        <button className="h-10 bg-green-600 text-white px-4 rounded-full text-sm">
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

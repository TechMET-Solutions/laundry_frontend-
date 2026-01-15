import React, { useState } from "react";
import { IoReturnUpBackOutline, IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Status_Screen from "../../assets/Status_Screen.svg";
import { GrView } from "react-icons/gr";

export default function Order_List() {
  const navigate = useNavigate();

  const [paymentDropdown, setPaymentDropdown] = useState(false);
  const [driversDropdown, setDriversDropdown] = useState(false);
  const [ordersDropdown, setOrdersDropdown] = useState(false);


  const [paymentSelected, setPaymentSelected] = useState("All Payment");
  const [driverSelected, setDriverSelected] = useState(" All Drivers");
  const [orderSelected, setOrderSelected] = useState("All Orders");
  const [edit, setEdit] = useState(false);
  const [deleteOrder, setDeleteOrder] = useState(false);

  const handleDeleteOrder = () => {
    // Implement delete order logic here
    setDeleteOrder(false);
  }

  return (
    <div className="p-4 sm:p-6 bg-[#f4f7fb] min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <IoReturnUpBackOutline />
          </div>
          <h2 className="font-semibold text-lg">Order List</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate("/orders/status_screen")}
            className="bg-[#FFD0C6] flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-sm"
          >
            <img src={Status_Screen} alt="Status Screen" />
            Order Status Screen
          </button>

          <button
            onClick={() => navigate("/orders/deleted_orders")}
            className="bg-red-600 text-white flex items-center gap-2 px-4 py-3 rounded-full text-sm"
          >
            <AiOutlineDelete />
            Deleted Orders
          </button>

          <button
            onClick={() => navigate("/orders/add_order")}
            className="bg-indigo-600 text-white flex items-center gap-2 px-4 py-3 rounded-full text-sm"
          >
            <IoAddCircleOutline />
            Add New Order
          </button>
        </div>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-wrap justify-end gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 py-2 bg-gray-200 rounded-lg outline-none"
          />
        </div>

        <div className="relative w-full sm:w-56">
          <button
            onClick={() => setPaymentDropdown(!paymentDropdown)}
            className="flex w-full items-center justify-between bg-gray-200 px-4 py-2 rounded-lg"
          >
            {paymentSelected}
            <RiArrowDropDownLine className="h-6 w-6" />
          </button>

          {paymentDropdown && (
            <ul className="absolute z-20 w-full bg-white border rounded-lg shadow-md">
              {["All Payment", "Pending", "Partialy Paid", "Fully Paid"].map(
                (item) => (
                  <li
                    key={item}
                    onClick={() => {
                      setPaymentSelected(item);
                      setPaymentDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
        <div className="relative w-full sm:w-56">
          <button
            onClick={() => setDriversDropdown(!driversDropdown)}
            className="flex w-full items-center justify-between bg-gray-200 px-4 py-2 rounded-lg"
          >
            {driverSelected}
            <RiArrowDropDownLine className="h-6 w-6" />
          </button>

          {driversDropdown && (
            <ul className="absolute z-20 w-full bg-white border rounded-lg shadow-md">
              {["All Drivers", "Aswin VD", "Super Man", "Sales Team"].map(
                (item) => (
                  <li
                    key={item}
                    onClick={() => {
                      setDriverSelected(item);
                      setDriversDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
        <div className="relative w-full sm:w-56">
          <button
            onClick={() => setOrdersDropdown(!ordersDropdown)}
            className="flex w-full items-center justify-between bg-gray-200 px-4 py-2 rounded-lg"
          >
            {orderSelected}
            <RiArrowDropDownLine className="h-6 w-6" />
          </button>

          {ordersDropdown && (
            <ul className="absolute z-20 w-full bg-white border rounded-lg shadow-md">
              {[
                "All Orders",
                "Order Received",
                "Processing",
                "Ready To Deliver",
                "Out for Delivery",
                "Partial Delivery",
                "Delivered",
                "Returned",
              ].map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setOrderSelected(item);
                    setOrdersDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[1100px] w-full text-sm border-separate">
          <thead>
            <tr>
              {[
                "Order Id",
                "Order Info",
                "Customer",
                "Driver",
                "Amount",
                "Status",
                "Payment",
                "Created By",
                "Payment",
                "Action",
              ].map((head) => (
                <th
                  key={head}
                  className="bg-[#56CCFF] px-2 py-2 sm:px-3 whitespace-nowrap text-left font-medium text-gray-800"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {[
              {
                id: "TMS/ORD-06",
                OrderInfo: {
                  Orderdate: "28/11/25",
                  DeliveryDate: "30/11/25",
                },
                customer: "Testing",
                driver: "Aswin VD",
                Amount: "AED 40.25",
                Status: "Received",
                PaymentStatus: {
                  TotalAmount: "Total Amount: AED 40.25",
                  PaidAmount: "Paid Amount: AED 0.00",
                },
                CreatedBy: "Shop",
              },
              {
                id: "TMS/ORD-06",
                OrderInfo: {
                  Orderdate: "28/11/25",
                  DeliveryDate: "30/11/25",
                },
                customer: "Testing",
                driver: "Aswin VD",
                Amount: "AED 40.25",
                Status: "Received",
                PaymentStatus: {
                  TotalAmount: "Total Amount: AED 40.25",
                  PaidAmount: "Paid Amount: AED 0.00",
                },
                CreatedBy: "Shop",
              },
              {
                id: "TMS/ORD-06",
                OrderInfo: {
                  Orderdate: "28/11/25",
                  DeliveryDate: "30/11/25",
                },
                customer: "Testing",
                driver: "Aswin VD",
                Amount: "AED 40.25",
                Status: "Received",
                PaymentStatus: {
                  TotalAmount: "Total Amount: AED 40.25",
                  PaidAmount: "Paid Amount: AED 0.00",
                },
                CreatedBy: "Shop",
              },
            ].map((item, index) => (
              <tr key={index} className="bg-[#f1f5fb]">
                {/* Order ID */}
                <td className="px-2 py-2 sm:px-4 border-b border-gray-400 font-semibold whitespace-normal break-words">
                  {item.id}
                </td>

                {/* Order Info */}
                <td className="px-2 py-2 sm:px-4 border-b border-gray-400 text-[#3A3D51]">
                  <div className="flex flex-col gap-1 text-sm leading-tight">
                    <span>
                      <span className="font-medium">Order date :</span>{" "}
                      <span className="font-bold">
                        {item.OrderInfo.Orderdate}
                      </span>
                    </span>
                    <span>
                      <span className="font-medium">Delivered :</span>{" "}
                      <span className="font-bold">
                        {item.OrderInfo.DeliveryDate}
                      </span>
                    </span>
                  </div>
                </td>

                {/* Customer */}
                <td className="px-2 py-2 sm:px-4 border-b border-gray-400 whitespace-normal break-words">
                  {item.customer}
                </td>

                {/* Driver */}
                <td className="hidden md:table-cell px-2 py-2 sm:px-4 border-b border-gray-400 whitespace-normal break-words">
                  {item.driver}
                </td>

                {/* Amount */}
                <td className="px-2 py-2 sm:px-4 border-b border-gray-400 font-semibold whitespace-normal">
                  {item.Amount}
                </td>

                {/* Status */}
                <td className="px-2 py-2 sm:px-4 border-b border-gray-400 text-[#707070]">
                  {item.Status}
                </td>

                {/* Payment Info */}
                <td className="px-2 py-2 sm:px-4 border-b border-gray-400">
                  <div className="flex flex-col gap-1 text-sm leading-tight whitespace-normal">
                    <span>{item.PaymentStatus.TotalAmount}</span>
                    <span>{item.PaymentStatus.PaidAmount}</span>
                  </div>
                </td>

                {/* Created By */}
                <td className="hidden md:table-cell px-2 py-2 sm:px-4 border-b border-gray-400">
                  {item.CreatedBy}
                </td>

                {/* Add Payment */}
                <td className="px-2 py-2 border-b border-gray-400">
                  <button className="bg-[#27AE60] px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-white font-bold whitespace-nowrap">
                    Add Payment
                  </button>
                </td>

                {/* Actions */}
                <td className="px-2 py-6 sm:px-4 border-b border-gray-400 flex gap-2">
                  <button
                    className="p-2 bg-[#56CCF291] rounded"
                    onClick={() => navigate("/orders/detailed_order")}
                  >
                    <GrView />
                  </button>
                  <button  className="p-2 bg-[#FFD0C6] text-[#C32300] rounded"
                  onClick={() => setDeleteOrder(true)} onClose={() => setDeleteOrder(false)}
                  >
                    <FiTrash2  />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    {deleteOrder && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-80">   
          <h2 className="text-lg font-semibold mb-4">Delete Order</h2>
          <p className="mb-6">Are you sure you want to delete this order?</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setDeleteOrder(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button 
              onClick={handleDeleteOrder}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >   
              Delete
            </button>
          </div>
        </div>
      </div>
    )}
         
    </div>

  );
}

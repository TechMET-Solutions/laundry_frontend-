import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { IoReturnUpBackOutline } from "react-icons/io5";

import { BsFilePersonFill } from "react-icons/bs";
import { FaSquarePhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { BsFilePerson } from "react-icons/bs";
import { RiPagesLine } from "react-icons/ri";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";
import { GrMoney } from "react-icons/gr";
import { getTodaysOrdesrs } from "../api/order";
import AddPaymentModal from "../components/models/PaymentModel";

function CustomerD() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get customer ID from URL
  const location = useLocation();
  const [customerOrders, setCustomerOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState(null);
  const [activeTab, setActiveTab] = useState("invoices");

  // Get customer data from navigation state or use default
  const customer = location.state?.customerData;

  const fetchCustomerOrders = async () => {
    if (!id) return;
    try {
      setOrdersLoading(true);
      const response = await getTodaysOrdesrs();
      const orders = response.data?.data || [];
      const filtered = orders.filter((order) => {
        const orderCustomerId = order.customerId ?? order.customer_id;
        return String(orderCustomerId) === String(id);
      });
      setCustomerOrders(filtered);
    } catch (error) {
      console.error("Failed to load customer orders:", error);
      setCustomerOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerOrders();
  }, [id]);

  // Function to go back
  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
    // OR navigate to specific route:
    // navigate("/customers");
  };

  return (
    // <div className="p-6 bg-[#f4f7fb] min-h-screen">
    //   {/* Header with Back Button */}
    //   <div className="flex items-center justify-between mb-6">
    //     <div className="flex items-center gap-3">
    //       <button
    //         onClick={handleGoBack}
    //         className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
    //       >
    //         <IoReturnUpBackOutline />
    //       </button>
    //       <h1 className="text-xl font-semibold text-gray-800">Customer Details</h1>
    //     </div>
    //   </div>
    //     {/* Customer Basic Information */}

    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 h-120 p-2">
    //     <div className="bg-white rounded-lg shadow-md p-6">
    //       <h3 className="font-bold text-gray-800 mb-4">
    //         Customer Information
    //       </h3>

    //       <div className="space-y-4 text-lg">
    //         <div className="flex items-start gap-3">
    //           <BsFilePersonFill className="text-gray-500 mt-0.5" />
    //           <span className="font-medium text-gray-800">
    //             {customer.name}
    //           </span>
    //         </div>

    //         <div className="flex items-start gap-3">
    //           <BsFilePerson className="text-gray-500 mt-0.5" />
    //           <span className="font-medium text-gray-800">
    //             {customer.mobile_no}
    //           </span>
    //         </div>

    //         <div className="flex items-start gap-3">
    //           <MdOutlineEmail className="text-gray-500 mt-0.5" />
    //           <span className="font-medium text-gray-800 break-all">
    //             {customer.email}
    //           </span>
    //         </div>

    //         <div className="flex items-start gap-3">
    //           <RiPagesLine className="text-gray-500 mt-0.5" />
    //           <span className="font-medium text-gray-800">
    //             {customer.tax_number}
    //           </span>
    //         </div>

    //         <div className="flex items-start gap-3">
    //           <MdOutlineLocationOn className="text-gray-500 mt-0.5" />
    //           <span className="font-medium text-gray-800">
    //             {customer.address}
    //           </span>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="bg-white rounded-lg shadow-md p-6 mb-6 h-60 w-150   ">
    //     <div className=" space-x-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-30 mb-9  m-7 flex">
    //       <div  className="m-5 ">
    //         <div className="text-sm text-gray-500  "> <TbFileInvoice /> Invoice Total</div>
    //         <p className="text-lg font-semibold">{customer.invoiceTotal1 || 0}</p>
    //       </div>

    //       <div className="m-5">
    //         <div className="text-sm text-gray-500"> <GrMoney />Total Payments</div>
    //         <p className="text-lg font-semibold">AED {customer.totalPayments?.toFixed(2) || "0.00"}</p>
    //       </div>

    //       <div className="m-5">
    //         <div className="text-sm text-gray-500"> <GrMoney />Total Balance</div>
    //         <p className="text-lg font-semibold text-red-600">AED {customer.totalBalance?.toFixed(2) || "0.00"} Dr</p>
    //       </div>

    //       <div className="m-5">
    //         <div className="text-sm text-gray-500"> <GrMoney /> Advance Amount</div>
    //         <p className="text-lg font-semibold">AED {customer.advanceAmount?.toFixed(2) || "0.00"}</p>
    //       </div>
    //     </div>

    //     {/* Email and Tax Number */}

    //   </div>
    //   </div>

    //   {/* Orders Table */}
    //   <div className="bg-white rounded-lg shadow-md overflow-hidden">
    //     <div className="px-6 py-4 border-b">
    //       <h2 className="text-lg font-semibold">Orders</h2>
    //     </div>

    //     <div className="overflow-x-auto">
    //       <table className="min-w-full divide-y divide-blue-300">
    //         <thead className="bg-blue-100">
    //           <tr>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Order Id
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Order Information
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Order Amt.
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Status
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Payment
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Pay
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Action
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody className="bg-white divide-y divide-gray-200">
    //           {customer.orders?.map((order) => (
    //             <tr key={order.id} className="hover:bg-gray-50">
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <div className="font-medium text-gray-900">{order.id}</div>
    //               </td>
    //               <td className="px-6 py-4">
    //                 <div className="space-y-1">
    //                   <div className="flex items-center">
    //                     <Calendar className="h-4 w-4 text-gray-400 mr-2" />
    //                     <span className="text-sm">Order date: {order.orderDate}</span>
    //                   </div>
    //                   <div className="flex items-center">
    //                     <Package className="h-4 w-4 text-gray-400 mr-2" />
    //                     <span className="text-sm">Delivery Date: {order.deliveryDate}</span>
    //                   </div>
    //                 </div>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <div className="font-semibold">AED {order.amount?.toFixed(2)}</div>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <span className={`px-2 py-1 text-xs rounded-full ${
    //                   order.status === 'Received' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
    //                 }`}>
    //                   {order.status}
    //                 </span>
    //               </td>
    //               <td className="px-6 py-4">
    //                 <div className="text-sm">
    //                   <div>Total Amount: AED {order.totalAmount?.toFixed(2)}</div>
    //                   <div>Paid Amount: AED {order.paidAmount?.toFixed(2)}</div>
    //                 </div>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 AED {(order.totalAmount - order.paidAmount)?.toFixed(2)}
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
    //                   Add Payment
    //                 </button>
    //               </td>
    //             </tr>
    //           )) || (
    //             <tr>
    //               <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
    //                 No orders found for this customer.
    //               </td>
    //             </tr>
    //           )}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={handleGoBack}
            className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
          >
            <IoReturnUpBackOutline />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            Customer Details
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {/* Left Panel */}
        <div className="col-span-3 bg-white rounded-lg shadow p-5 space-y-5">
          <div className="flex items-start  gap-3">
            <span className="p-1 rounded-lg bg-gray-200">
              <BsFilePersonFill size={20} className="text-gray-500 mt-0.5" />
            </span>
            <div className="flex-col">
              <h2 className="text-lg font-semibold">{customer.name}</h2>
              <p className="text-green-500 text-sm font-medium">Active</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-600">
            <div className="flex items-start gap-3">
              <BsFilePerson className="text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Phone Number</p>
                <p className="text-slate-900 font-semibold">
                  {customer.mobile_no}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MdOutlineEmail className="text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-slate-400">{customer.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <RiPagesLine className="text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Tax Number</p>
                <p className="text-slate-400">{customer.tax_number}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MdOutlineLocationOn className="text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-slate-400">{customer.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="col-span-9 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Invoice Total", value: "1" },
              { label: "Total Payments", value: "AED 0.00" },
              { label: "Total Balance", value: "AED 40.25 Dr" },
              { label: "Advance Amount", value: "AED 0.00" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
              >
                <span className="text-sm text-slate-500">{item.label}</span>
                <span className="text-blue-600 font-semibold">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex gap-6 border-b mb-4">
              <button
                onClick={() => setActiveTab("invoices")}
                className={`pb-2 cursor-pointer ${
                  activeTab === "invoices"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-slate-500"
                } font-medium`}
              >
                Invoices
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`pb-2 cursor-pointer ${
                  activeTab === "history"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-slate-500"
                } font-medium`}
              >
                History
              </button>
            </div>

            {/* Invoices Table */}
            {activeTab === "invoices" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-left text-white">
                      <th className="bg-sky-500 px-3 py-2 rounded-l">
                        Order Id
                      </th>
                      <th className="bg-sky-500 px-3 py-2">
                        Order Information
                      </th>
                      <th className="bg-sky-500 px-3 py-2">Order Amt.</th>
                      <th className="bg-sky-500 px-3 py-2">Status</th>
                      <th className="bg-sky-500 px-3 py-2">Payment</th>
                      <th className="bg-sky-500 px-3 py-2">Pay</th>
                      <th className="bg-sky-500 px-3 py-2 rounded-r">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersLoading && (
                      <tr className="bg-slate-50">
                        <td className="px-3 py-3 text-slate-500" colSpan={7}>
                          Loading orders...
                        </td>
                      </tr>
                    )}

                    {!ordersLoading && customerOrders.length === 0 && (
                      <tr className="bg-slate-50">
                        <td className="px-3 py-3 text-slate-500" colSpan={7}>
                          No orders found for this customer.
                        </td>
                      </tr>
                    )}

                    {!ordersLoading &&
                      customerOrders.map((order) => {
                        // console.log(order);
                        const orderId = order.order_code || " ";
                        const orderDate = order.order_date || "";
                        const deliveryDate = order.delivery_date || "";
                        const totalAmount = Number(order.gross_total ?? 0);
                        const paidAmount = Number(order.paid_amount ?? 0);
                        const status = order.order_status || "";
                        const pendingAmount = Number(
                          order.pending_amount ?? totalAmount - paidAmount,
                        );

                        return (
                          <tr key={orderId} className="bg-slate-50">
                            <td className="px-3 py-3 font-medium">{orderId}</td>
                            <td className="px-3 py-3 text-slate-600">
                              <div>
                                Order date:{" "}
                                {orderDate
                                  .split("T")[0]
                                  .split("-")
                                  .reverse()
                                  .join("/")}
                              </div>
                              <div>
                                Delivery Date:{" "}
                                {deliveryDate
                                  .split("T")[0]
                                  .split("-")
                                  .reverse()
                                  .join("/")}
                              </div>
                            </td>
                            <td className="px-3 py-3 font-semibold">
                              AED {totalAmount.toFixed(2)}
                            </td>
                            <td className="px-3 py-3 text-slate-700">
                              {status}
                            </td>
                            <td className="px-3 py-3 text-slate-600">
                              <div>
                                Total Amount:{" "}
                                <span className="font-medium">
                                  AED {totalAmount.toFixed(2)}
                                </span>
                              </div>
                              <div>
                                Paid Amount:{" "}
                                <span className="font-medium">
                                  AED {paidAmount.toFixed(2)}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-3">
                              {pendingAmount > 0 ? (
                                <button
                                  onClick={() => {
                                    setSelectedOrderForPayment(order);
                                    setShowPaymentModal(true);
                                  }}
                                  className="bg-[#27AE60] px-3 py-1 sm:px-2 sm:py-2 cursor-pointer rounded-lg text-white font-bold whitespace-nowrap hover:bg-[#219653]"
                                >
                                  Add Payment
                                </button>
                              ) : (
                                <button className="bg-[gray] px-3 py-1 sm:px-2 sm:py-2 rounded-lg text-white font-bold whitespace-nowrap ">
                                  Fully Paid
                                </button>
                              )}
                            </td>
                            <td className="px-3 py-3">
                              <button
                                onClick={() => {
                                  navigate("/orders/deleted_orders", {
                                    state: { orderData: order },
                                  });
                                }}
                                className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center hover:bg-sky-200 transition"
                              >
                                👁
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}

            {/* History Tab */}
            {activeTab === "history" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-left text-white">
                      <th className="bg-sky-500 px-3 py-2 rounded-l">
                        Date
                      </th>
                      <th className="bg-sky-500 px-3 py-2">
                        Invoice
                      </th>
                      <th className="bg-sky-500 px-3 py-2">Payment Type</th>
                       
                      <th className="bg-sky-500 px-3 py-2 rounded-r">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersLoading && (
                      <tr className="bg-slate-50">
                        <td className="px-3 py-3 text-slate-500" colSpan={7}>
                          Loading orders...
                        </td>
                      </tr>
                    )}

                    {!ordersLoading && customerOrders.length === 0 && (
                      <tr className="bg-slate-50">
                        <td className="px-3 py-3 text-slate-500" colSpan={7}>
                          No orders found for this customer.
                        </td>
                      </tr>
                    )}

                    {!ordersLoading &&
                      customerOrders.map((order) => {
                        console.log(order);
                        const orderId = order.order_code || " ";
                        const orderDate = order.order_date || "";
                        const deliveryDate = order.delivery_date || ""; 
                        const totalAmount = Number(order.gross_total ?? 0);
                        const status = order.order_status || "";
                        const paymentType = order.payment_type || "N/A";
                        

                        return (
                          <tr key={orderId} className="bg-slate-50">
                            {/* <td className="px-3 py-3 font-medium">{orderId}</td> */}
                            <td className="px-3 py-3 text-slate-600">
                              <div>
                                Order date:{" "}
                                {orderDate
                                  .split("T")[0]
                                  .split("-")
                                  .reverse()
                                  .join("/")}
                              </div>
                              <div>
                                Delivery Date:{" "}
                                {deliveryDate
                                  .split("T")[0]
                                  .split("-")
                                  .reverse()
                                  .join("/")}
                              </div>
                            </td>
                            {/* <td className="px-3 py-3 font-semibold">
                              AED {totalAmount.toFixed(2)}
                            </td> */}
                            <td className="px-3 py-3 text-slate-700">
                              {status}
                            </td>
                            <td className="px-3 py-3 text-slate-600">
                               {paymentType}
                            </td>
                            {/* <td className="px-3 py-3">
                              {pendingAmount > 0 ? (
                                <button
                                  onClick={() => {
                                    setSelectedOrderForPayment(order);
                                    setShowPaymentModal(true);
                                  }}
                                  className="bg-[#27AE60] px-3 py-1 sm:px-2 sm:py-2 cursor-pointer rounded-lg text-white font-bold whitespace-nowrap hover:bg-[#219653]"
                                >
                                  Add Payment
                                </button>
                              ) : (
                                <button className="bg-[gray] px-3 py-1 sm:px-2 sm:py-2 rounded-lg text-white font-bold whitespace-nowrap ">
                                  Fully Paid
                                </button>
                              )}
                            </td> */}
                            <td className="px-3 py-3">
                               {totalAmount.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Payment Modal */}
      {showPaymentModal && (
        <AddPaymentModal
          orderData={selectedOrderForPayment}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => {
            fetchCustomerOrders();
            setShowPaymentModal(false);
          }}
        />
      )}
    </div>
  );
}

export default CustomerD;

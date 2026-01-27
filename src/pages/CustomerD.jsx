import React from "react";
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

function CustomerD() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get customer ID from URL
  const location = useLocation();

  // Get customer data from navigation state or use default
  const customer = location.state?.customerData || {
    id: id || "N/A",
    name: "Customer Name",
    type: "Retail",
    contact: "123-456-7890",
    address: "123 Main St, Cityville",
    email: "customer@example.com",
    taxNumber: "TAX123456789",
    textingActive: true,
    invoiceTotal1: 1,
    totalPayments: 0.00,
    totalBalance: 40.25,
    advanceAmount: 0.00,
    orders: [
      {
        id: "TMS/ORD-01",
        orderDate: "28/11/23",
        deliveryDate: "30/11/23",
        amount: 40.25,
        status: "Received",
        totalAmount: 40.25,
        paidAmount: 0.00
      }
    ]
  };

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
          <h1 className="text-xl font-semibold text-gray-800">Customer Details</h1>
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
                <span className="text-sm text-slate-500">
                  {item.label}
                </span>
                <span className="text-blue-600 font-semibold">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex gap-6 border-b mb-4">
              <button className="pb-2 border-b-2 border-blue-600 text-blue-600 font-medium">
                Invoices
              </button>
              <button className="pb-2 text-slate-500">History</button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-left text-white">
                    <th className="bg-sky-500 px-3 py-2 rounded-l">Order Id</th>
                    <th className="bg-sky-500 px-3 py-2">Order Information</th>
                    <th className="bg-sky-500 px-3 py-2">Order Amt.</th>
                    <th className="bg-sky-500 px-3 py-2">Status</th>
                    <th className="bg-sky-500 px-3 py-2">Payment</th>
                    <th className="bg-sky-500 px-3 py-2">Pay</th>
                    <th className="bg-sky-500 px-3 py-2 rounded-r">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-slate-50">
                    <td className="px-3 py-3 font-medium">TMS/ORD-01</td>
                    <td className="px-3 py-3 text-slate-600">
                      <div>Order date: 28/11/25</div>
                      <div>Delivery Date: 30/11/25</div>
                    </td>
                    <td className="px-3 py-3 font-semibold">AED 40.25</td>
                    <td className="px-3 py-3 text-slate-700">Received</td>
                    <td className="px-3 py-3 text-slate-600">
                      <div>Total Amount: <span className="font-medium">AED 40.25</span></div>
                      <div>Paid Amount: <span className="font-medium">AED 0.00</span></div>
                    </td>
                    <td className="px-3 py-3">
                      <button className="bg-green-500 text-white px-3 py-1.5 rounded text-xs font-medium">
                        Add Payment
                      </button>
                    </td>
                    <td className="px-3 py-3">
                      <button className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
                        👁
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerD;

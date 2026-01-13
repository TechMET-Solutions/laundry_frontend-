import React from 'react'
import { useNavigate } from 'react-router-dom';
import { TbArrowBackUp } from "react-icons/tb";

function Order_Status_Screen() {

  const navigate=useNavigate();

  const HandlerOrderList= ()=>{

    navigate("/orders");

  }



  const orders = [
  {
    id: "TMS/ORD-01",
    status: "Order Received",
    statusColor: "bg-gray-200 text-gray-600",
    borderColor: "border-slate-300",
  },
  {
    id: "TMS/ORD-02",
    status: "Order Received",
    statusColor: "bg-gray-200 text-gray-600",
    borderColor: "border-slate-300",
  },
  {
    id: "TMS/ORD-03",
    status: "Processing",
    statusColor: "bg-orange-100 text-orange-600",
    borderColor: "border-slate-300",
  },
  {
    id: "TMS/ORD-04",
    status: "Processing",
    statusColor: "bg-orange-100 text-orange-600",
    borderColor: "border-slate-300",
  },
  {
    id: "TMS/ORD-05",
    status: "Ready To Deliver",
    statusColor: "bg-green-100 text-green-600",
    borderColor: "border-slate-300",
  },
  {
    id: "TMS/ORD-06",
    status: "Ready To Deliver",
    statusColor: "bg-green-100 text-green-600",
    borderColor: "border-slate-300",
  },
];

  return (
    <>
    {/* Back Button */}
         <div onClick={HandlerOrderList} className="flex items-center justify-center bg-indigo-800 w-11 h-11 rounded-sm absolute top-[40px] left-[338px] cursor-pointer">
          
           <TbArrowBackUp className="w-6 h-6 text-white" />
          
         </div>

         <div>
          <p className="absolute w-[148px] h-[21px] top-[50px] left-[450px] 
           font-[Poppins] text-5xl text-[16px] 
           leading-[100%] tracking-[0.2px] opacity-100 font-bold text-[#000000]">Order Status screen</p>
         </div>

         {/* Cards Section */}
<div className="absolute top-[150px] left-[338px] w-[1000px]">

  <div className="grid grid-cols-3 gap-x-6">

    {/* Column 1 - Order Received */} 
    <div className="flex flex-col gap-4">
      {orders
        .filter(o => o.status === "Order Received")
        .map((item, index) => (
          <div
            key={index}
            className={`w-[309px] h-[153px] bg-white rounded-md border ${item.borderColor} p-4 shadow-sm`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-[Poppins] font-semibold text-sm">
                SN Group
              </h3>
              <span className={`px-3 py-1 text-xs rounded-full ${item.statusColor}`}>
                {item.status}
              </span>
            </div>

            <p className="text-blue-600 text-sm mt-2 font-medium">
              6 Items Wash + In Iron
            </p>

            <p className="text-xs text-gray-500 mt-2">
              Delivery Date: 30/11/25
            </p>

            <p className="text-xs text-gray-500">
              Driver: Sales Team
            </p>

            <p className="text-xs text-blue-600 font-semibold mt-2">
              {item.id}
            </p>
          </div>
        ))}
    </div>

    {/* Column 2 - Processing */}
    <div className="flex flex-col gap-4">
      {orders
        .filter(o => o.status === "Processing")
        .map((item, index) => (
          <div
            key={index}
            className={`w-[309px] h-[153px] bg-white rounded-md border ${item.borderColor} p-4 shadow-sm`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-[Poppins] font-semibold text-sm">
                SN Group
              </h3>
              <span className={`px-3 py-1 text-xs rounded-full ${item.statusColor}`}>
                {item.status}
              </span>
            </div>

            <p className="text-blue-600 text-sm mt-2 font-medium">
              6 Items Wash + In Iron
            </p>

            <p className="text-xs text-gray-500 mt-2">
              Delivery Date: 30/11/25
            </p>

            <p className="text-xs text-gray-500">
              Driver: Sales Team
            </p>

            <p className="text-xs text-blue-600 font-semibold mt-2">
              {item.id}
            </p>
          </div>
        ))}
    </div>

    {/* Column 3 - Ready To Deliver */}
    <div className="flex flex-col gap-4">
      {orders
        .filter(o => o.status === "Ready To Deliver")
        .map((item, index) => (
          <div
            key={index}
            className={`w-[309px] h-[153px] bg-white rounded-md border ${item.borderColor} p-4 shadow-sm`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-[Poppins] font-semibold text-sm">
                SN Group
              </h3>
              <span className={`px-3 py-1 text-xs rounded-full ${item.statusColor}`}>
                {item.status}
              </span>
            </div>

            <p className="text-blue-600 text-sm mt-2 font-medium">
              6 Items Wash + In Iron
            </p>

            <p className="text-xs text-gray-500 mt-2">
              Delivery Date: 30/11/25
            </p>

            <p className="text-xs text-gray-500">
              Driver: Sales Team
            </p>

            <p className="text-xs text-blue-600 font-semibold mt-2">
              {item.id}
            </p>
          </div>
        ))}
    </div>

  </div>
</div>


    </>
  )
}

export default Order_Status_Screen

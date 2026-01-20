import React, { useState ,useEffect} from "react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";
// import { getAllPaymentReceipts } from "../api/payment_receipt";

function Payment_Receipt () {
  const navigate = useNavigate();
   const [startDate, setStartDate] = useState("2025-12-01");
  const [endDate, setEndDate] = useState("2025-12-01");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const fetchPaymentReceipts = async (p = page) => {
    try {
      const res = await getAllPaymentReceipts(p, 10);

      setPaymentReceipts(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.error("API ERROR:", error);
    }
  };

  useEffect(() => {
    fetchPaymentReceipts(page);
  }, [page]);

  return (
   <div className="p-6 bg-[#f4f7fb] min-h-screen">
   
         {/* HEADER */}
         <div className="flex items-center justify-between mb-6">
   
           {/* Left side */}
           <div className="flex items-center gap-3">
             <div
               className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded cursor-pointer"
               onClick={() => navigate(-1)}
             >
               <IoReturnUpBackOutline />
             </div>
   
             <h2 className="font-semibold text-lg">
              Payment Receipt
             </h2>
           </div>
         </div>
         <div className="flex items-center gap-6 mt-6 mb-6">
     
   </div>
   
         {/* DATE FILTERS */}
   <div className="flex justify-end gap-6 mb-6">
    <div className="flex items-center bg-gray-200 rounded-lg px-3 py-2 w-64">
    <input
      type="text"
      placeholder="🔍Search Customer..."
      className="bg-transparent outline-none text-sm w-full"
    />
    <span className="text-gray-500 cursor-pointer">✕</span>
  </div>
      <select className="bg-gray-200 rounded-lg px-4 py-2 text-sm outline-none">
    <option>All Payment</option>
    <option>Pending</option>
    <option>Partially paid</option>
    <option>Fully Paid</option>
    
  </select>
      <select className="bg-gray-200 rounded-lg px-4 py-2 text-sm outline-none">
    <option>All Drivers</option>
    <option>Aswin VD</option>
    <option>Super Man</option>
    <option>Sles Team</option>
  </select>
  <div className="flex items-center gap-2">
       <label className="text-sm font-medium text-gray-600">
         Start Date
       </label>
       <input
         type="date"
         value={startDate}
         onChange={(e) => setStartDate(e.target.value)}
         className="px-3 py-2 rounded-lg bg-gray-200 text-sm outline-none"
       />
     </div>
   
     <div className="flex items-center gap-2">
       <label className="text-sm font-medium text-gray-600">
         End Date
       </label>
       <input
         type="date"
         value={endDate}
         onChange={(e) => setEndDate(e.target.value)}
         className="px-3 py-2 rounded-lg bg-gray-200 text-sm outline-none"
       />
     </div>
  

   </div>
   
   
         {/* TABLE */}
          <div className="bg-[#f4f7fb]  ">
                 <table className="w-full text-sm border-separate  ">
                  <thead>
             <tr>
               {[
                 "Sr No",
                 "Date",
                 "Order ID",
                 "Customer",
                 "Driver",
                 "Amount",
                 "Payment Type",
                 "Note",
               ].map((head) => (
                 <th
                   key={head}
                   className="bg-[#56CCFF]  px-4 py-3 text-left font-medium text-gray-800 "
                 >
                   {head}
                 </th>
               ))}
             </tr>
           </thead>
             <tbody>
            {[{
              "Sr No":1,
    Date: "01/12/2025",
    "Order ID": "#ORD-1132",
    "Customer":"Test",
    Driver: "Pk Nawaz",
    "Amount": "AED 121.43",
    "Payment Type": "Cash",
  },
  
].map((item, index) => (
           <tr
             key={index}
             className="bg-[#f1f5fb] border-b"
           >
            <td className="px-4 py-3 text-left font-medium">
               {item["Sr No"]}
             </td>
             <td className="px-4 py-3 text-left">
               {item.Date}
             </td>
             <td className="px-4 py-3 text-left font-medium">
               {item["Order ID"]}
             </td>
             <td className="px-4 py-3 text-left font-medium">
               {item.Customer}
             </td>
             <td className="px-4 py-3 text-left">
               {item.Driver}
             </td>
             <td className="px-4 py-3 text-left font-medium">
               {item.Amount}
             </td>
             <td className="px-4 py-3 text-left">
               {item["Payment Type"]}
             </td>
            
           </tr>
         ))}
       </tbody>
   
                 </table>
                 <div className="w-full flex justify-center my-6">
                               <Pagination
                                 currentPage={page}
                                 totalPages={totalPages}
                                 onChange={setPage}
                               />
                               </div>
               </div>
             </div>
           
     );  
   }
   

export default Payment_Receipt;
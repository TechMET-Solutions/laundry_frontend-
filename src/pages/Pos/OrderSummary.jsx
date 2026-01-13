import { FiUser } from "react-icons/fi";
import { useState } from "react";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { GrCycle } from "react-icons/gr";


function OrderSummary() {
  
 const [startDate, setStartDate] = useState("2025-12-01");
const [endDate, setEndDate] = useState("2025-12-01");
  return (
    <>
    <div className="bg-white rounded-xl p-4 flex flex-col gap-4">
      
      <div className="flex justify-between text-sm">
        <div>
          <p className="text-gray-500">Order Date</p>
         <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="px-3 py-2 rounded-lg bg-gray-200 text-sm outline-none"
        />
        </div>
        <div>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="px-3 py-2 rounded-lg bg-gray-200 text-sm outline-none"
        />
        </div>
      </div>
      <div className="flex gap-4">
      <button className="flex items-center justify-center gap-2 bg-indigo-50 rounded-lg py-2 font-medium">
        <FiUser />
        Select Driver
      </button>

      <button className="flex items-center justify-center gap-2 bg-indigo-50 rounded-lg py-2 font-medium">
        <FiUser />
        Select Customer
      </button>
      <button className="flex items-center justify-center gap-2 bg-blue-500 rounded-lg py-2 ">
        <MdOutlinePersonAddAlt />
      </button>
`     </div>
      <div className="mt-auto bg-indigo-50 rounded-xl p-4 text-sm space-y-2">
        <div className="flex justify-between">
          <span>Sub Total</span>
          <span>0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (5%)</span>
          <span>0.00</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>0.00</span>
        </div>
      </div>
       <div className="flex gap-6">
    <input type="text"
    placeholder="Enter payment" className="bg-gray-200 rounded-lg px-4 py-2 text-sm outline-none" />
      
       <select className="bg-gray-200 rounded-lg px-4 py-2 text-sm outline-none">
    <option>Payment Method</option>
    <option>Settlement</option>
    <option>Advance</option>
    <option>Cash</option>
    <option >online</option>
    <option >Card</option>
    <option >Bank Tranfer</option>
  </select>
   </div>
  <div className="flex justify-content-right gap-6 mt-6 mb-6">
    <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm">
           Save
          </button>

          <button className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm">
            Print 
          </button>
          <button className=" bg-red-400"><GrCycle /></button>

    </div>
          

   

    </div>
   
    </>
  );
}
export default OrderSummary;
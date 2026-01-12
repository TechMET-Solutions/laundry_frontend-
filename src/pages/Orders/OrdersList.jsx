import React from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import Status_Screen from "../../assets/Status_Screen.svg";
import { useNavigate } from "react-router-dom";

export default function Order_List() {
  const navigate = useNavigate();
  const handleStatusScreenClick = () => {
    navigate('/order-status-screen');
  };



  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <IoReturnUpBackOutline />
          </div>

          <h2 className="font-semibold text-lg">Order List</h2>
        </div>

        {/* Right side */}
        <div onClick={()=>handleStatusScreenClick()} className="flex items-center gap-3">
          <button className="bg-[#FFD0C6] flex justify-center items-center gap-2 text-[#1E293B] font-semibold px-4 py-2 rounded-full text-lg">
            <img src={Status_Screen} alt="Status_Screen" />
            <span>Order Status Screen</span>
          </button>
          <button className="bg-[#FF0000] flex justify-center items-center gap-2 text-white font-semibold px-4 py-2 rounded-full text-lg">
            <AiOutlineDelete />
           <span className="text-lg"> Deleted Orders</span>
          </button>

          <button className="bg-[#4845D2] flex justify-center items-center gap-2 text-white font-semibold px-4 py-2 rounded-full text-lg">
            <IoAddCircleOutline />
            <span className="text-lg">Add New Order</span>
          </button>
        </div>
      </div>
    </div>
  );
}

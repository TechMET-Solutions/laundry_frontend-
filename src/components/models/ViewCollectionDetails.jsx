import React from "react";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";

const ViewCollectionDetails = ({ isOpen, onClose, data }) => {
 if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <RiArrowLeftRightLine size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Collection Details
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <select
              className="bg-gray-200 rounded px-3 py-2 text-sm outline-none cursor-pointer"
              value={data.status}
              disabled
            >
              <option>{data.status}</option>
            </select>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <MdClose size={28} />
            </button>
          </div>
        </div>

        {/* Customer Header */}
        <div className="px-6 py-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex justify-between items-center">
            <span className="text-black uppercase tracking-wide">
              {data.customer_id || "Demo Laundry"}
            </span>
            <span className="font-bold">
              #{data.collection_code}
            </span>
          </div>
        </div>

        <div className="px-6 pb-6 max-h-[70vh] overflow-y-auto">
          <div className="border-t border-gray-400 my-4"></div>

          {/* Order Summary */}
          <div className="mb-8">
            <h3 className="font-bold mb-4 pb-1">
              Order Summary & Timeline
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex">
                <span className="w-32 font-medium">Status</span>
                <span className="text-blue-500 font-semibold">
                  {data.status}
                </span>
              </div>

              <div className="flex">
                <span className="w-32 font-medium">Pickup Date</span>
                <span>{data.pickup_date}</span>
              </div>

              <div className="flex">
                <span className="w-32 font-medium">Time Slot</span>
                <span>{data.time_slot}</span>
              </div>

              <div className="flex">
                <span className="w-32 font-medium">Created By</span>
                <span>{data.created_by}</span>
              </div>
            </div>
          </div>

          {/* Logistics */}
          <div className="border-t border-gray-400 my-4"></div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="font-semibold mb-2">Customer Details</p>
              <div className=" justify-between">
                <span>Name {data.customer_id || "Shubham"}</span>
               </div>
                <div className="flex justify-between">
                <span>phone</span>
                <span>{data.phone || "1234567892"}</span>
              </div>
              <div className="flex justify-between">
                <span>Email</span>
                <span>{data.email || "as@kdkw"}</span>
              </div>
                 <div className="flex justify-between">
                <span>Address</span>
                <span>{data.Address || "Dubai"}</span>
              </div>

            </div>

            <div>
              <p className="font-semibold mb-2">Driver Details</p>
              <div className="flex justify-between">
                <span>Name</span>
                <span>{data.driver_id || "N/A"}</span>

              </div>
               <div className="flex justify-between">
                <span>Phone</span>
                <span>{data.Phone || "1234567892"}</span>
              </div>
            </div>
           
              
          






          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewCollectionDetails;

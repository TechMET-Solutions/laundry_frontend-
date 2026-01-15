import React, { useEffect, useState } from "react";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";

const ViewCollectionDetails = ({ isOpen = false, onClose, data = {} }) => {
  const [status, setStatus] = useState("Scheduled");

  useEffect(() => {
    if (data?.status) {
      setStatus(data.status);
    }
  }, [data]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl animate-in fade-in zoom-in duration-200">

        {/* Header Section */}
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
               value={status}
               onChange={(e) => setStatus(e.target.value)}
              className="bg-gray-200 rounded px-3 py-2 text-sm outline-none cursor-pointer"
            >
              <option>Scheduled</option>
              <option >Done</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Re-Scheduled">Re-Scheduled</option>
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
              {data?.customer || "Demo Laundry"}
            </span>
            <span className="font-bold">
              #{data?.id || "TMS/COL-06"}
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
                <span className="w-32 font-medium">
                  Collection Status
                </span>
                <span className="text-blue-500 font-semibold">
                  {status}
                </span>
              </div>

              <div className="flex">
                <span className="w-32 font-medium">
                  Pickup Date
                </span>
                <span className="text-gray-800">
                  {data?.date || "04/12/2025"}
                </span>
              </div>

              <div className="flex">
                <span className="w-32 font-medium">
                  Time Slot
                </span>
                <span className="text-gray-800">
                  {data?.time || "09:00 AM - 10:00 AM"}
                </span>
              </div>

              <div className="flex">
                <span className="w-32 font-medium">
                  Created On
                </span>
                <span className="text-gray-800">
                  {data?.createdOn || "02/12/2025"}
                </span>
              </div>
            </div>
          </div>

          {/* Collection Logistics */}
          <div className="border-t border-gray-400 my-4"></div>

          <div>
            <h3 className="font-bold text-gray-800 mb-4 pb-1">
              Collection Logistics
            </h3>

            <div className="grid grid-cols-2 gap-8 text-sm">
              {/* Customer Details */}
              <div className="space-y-2">
                <p className="font-semibold mb-2">
                  Customer Details
                </p>

                <div className="flex justify-between">
                  <span className="font-medium">Name</span>
                  <span>{data?.customer || "Test"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Phone</span>
                  <span>{data?.phone || "9876543210"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Email</span>
                  <span>{data?.email || "test@gmail.com"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Address</span>
                  <span>{data?.address || "Dubai"}</span>
                </div>
              </div>

              {/* Driver Details */}
              <div className="space-y-2">
                <p className="font-semibold mb-2">
                  Driver Details
                </p>

                <div className="flex justify-between">
                  <span className="font-medium">Name</span>
                  <span>{data?.driver || "Test"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Phone</span>
                  <span>{data?.driverPhone || "9876543210"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="ml-10 mb-10">
          <span className="font-medium">
            Order Comments
          </span>
          <span className="ml-4 text-gray-800">
            {data?.comments || "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
          </span>

          <br /><br />

          <span className="font-medium">
            Status Notes
          </span>
          <span className="ml-4">
            {data?.statusNotes || "New Cloth"}
          </span>
        </div>

      </div>
    </div>
  );
};

export default ViewCollectionDetails;

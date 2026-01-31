import React, { use, useEffect, useState } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderById } from "../../api/order";
import { getCustomersById } from "../../api/customer";
import { getEmployeeById } from "../../api/employee";
import { QRCodeCanvas } from "qrcode.react";
import AddPaymentModal from "../../components/models/PaymentModel";

function DetailedOrderPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [orderDetails, setOrderDetails] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [driverDetails, setDriverDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const fetchOrdersData = async () => {
    if (state.orderId) {
      try {
        setLoading(true);
        const order = await getOrderById(state.orderId);
        const orderData = order.data.data;
        setOrderDetails(orderData);

        // Fetch customer details
        if (orderData.customer_id) {
          try {
            const customerRes = await getCustomersById(orderData.customer_id);
            setCustomerDetails(customerRes.data.data);
          } catch (err) {
            console.error("Failed to fetch customer details:", err);
          }
        }

        // Fetch driver details
        if (orderData.driver_id) {
          try {
            const driverRes = await getEmployeeById(orderData.driver_id);
            setDriverDetails(driverRes.data.data);
          } catch (err) {
            console.error("Failed to fetch driver details:", err);
          }
        }
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchOrdersData();
  }, []);

  // console.log(orderDetails);

  return (
    <div className="p-4 sm:p-4 bg-[#f4f7fb] min-h-screen ">
      <div className=" flex items-center gap-4 mb-4">
        <div
          className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <IoReturnUpBackOutline />
        </div>
        <h2 className="font-semibold text-lg">Order Details</h2>
      </div>

      <div className="bg-[#E9EDFA] rounded-lg p-2 px-4 flex flex-col sm:flex-row justify-between gap-6 mb-5    shadow-sm">
        {/* Left Section */}
        <div className="flex flex-col gap-1 text-[#1F2937]">
          <h3 className="font-semibold text-base">Demo Laundry</h3>

          <p className="text-sm text-gray-700">97170125518</p>

          <p className="text-sm text-gray-700">demo@laundry.com</p>

          <p className="text-sm text-gray-700">
            Demo Laundry Dubai, UAE - 683578
          </p>
        </div>

        {/* Right Section */}
        {orderDetails && (
          <div className="flex flex-col items-start sm:items-end gap-1 ">
            <h2 className="font-bold text-lg text-[#1F2937]">
              #{orderDetails?.order_code}
            </h2>

            <div className="text-sm text-gray-700 flex gap-6">
              <span className="font-medium">Pickup Date</span>
              <span>{orderDetails?.order_date.split("T")[0]}</span>
            </div>

            <div className="text-sm text-gray-700 flex gap-6">
              <span className="font-medium">Delivery Date</span>
              <span>{orderDetails?.delivery_date.split("T")[0]}</span>
            </div>
          </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* LEFT SIDE */}
        <div className="flex-1 bg-white rounded-lg border border-blue-200 shadow-sm p-6">
          {/* Customer Details */}
          <h2 className="font-semibold text-lg mb-2 text-[#1F2937]">
            Customer Details
          </h2>

          <div className="grid grid-cols-[90px_auto] gap-y-1 text-sm text-[#1F2937] mb-6">
            <span className="font-medium">Name</span>
            <span>{orderDetails?.customer_name || "N/A"}</span>

            <span className="font-medium">Phone</span>
            <span>{customerDetails?.mobile_no || "N/A"}</span>

            <span className="font-medium">Email</span>
            <span>{customerDetails?.email || "N/A"}</span>

            <span className="font-medium">Address</span>
            <span>{customerDetails?.address || "N/A"}</span>
          </div>

          {/* Order Item Header */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-base">Order item</h3>

            <button className="bg-[#4F46E5] text-white px-5 py-2 rounded-full text-sm font-medium">
              Add New Service
            </button>
          </div>

          {/* Order Table */}
          <div className="max-h-[220px] overflow-y-auto">
            <table className="w-full text-sm border-separate border-spacing-1">
              <thead>
                <tr className="bg-[#56CCF2] text-[#1F2937]">
                  {[
                    "Sr No",
                    "Item Name",
                    "Service Type",
                    "Color",
                    "Rate",
                    "Qty",
                    "Total",
                  ].map((head) => (
                    <th key={head} className="px-3 py-2 text-left font-medium ">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              {/* {console.log(orderDetails)} */}
              <tbody>
                {orderDetails?.item_list &&
                  orderDetails.item_list?.map((item, index) => (
                    <tr key={index} className="bg-[#EEF2F8]">
                      <td className="px-3 py-2">{index + 1}</td>
                      <td className="px-3 py-2">{item.name}</td>

                      <td className="px-3 py-2 flex gap-1  ">
                        {/* {item.item_list.length > 0
                          ? item.item_list.map((s) => (
                              <div
                                className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs "
                                key={s.type}
                              >
                                {s.type}
                              </div>
                            ))
                          : "--"} */}
                          <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                            {item.type}
                          </div>
                          
                      </td>

                      <td className="px-3 py-2">
                        <div className="w-5 h-5 text-black rounded">
                          {item.color}
                        </div>
                      </td>

                      <td className="px-3 py-2">{item.rate}</td>
                      <td className="px-3 py-2">{item.qty}</td>
                      <td className="px-3 py-2">{item.total}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          <div className="mt-6 flex items-center gap-2 text-sm">
            <span className="text-red-600 font-semibold">Notes:</span>
            <span className="text-[#1F2937]">{orderDetails?.remark}</span>
          </div>
        </div>

        {/* RIGHT SIDE (VERTICAL SUMMARY PANEL) */}
        <div className="w-full lg:w-72 bg-white rounded-lg border border-blue-200   shadow-lg p-6 flex flex-col gap-6">
          <div>
            <h3 className="font-semibold text-base mb-4">Payment Summary</h3>

            <div className=" text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Addon:</span>
                <span className="font-medium">AED {orderDetails?.addon?.addonPrice}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Sub Total:</span>
                <span className="font-medium">AED  {orderDetails?.sub_total}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax (5%):</span>
                <span className="font-medium">AED  {orderDetails?.tax}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Discount %:</span>
                <span className="font-medium"> {orderDetails?.discount} %</span>
              </div>

              <div className="flex justify-between font-semibold  border-t">
                <span>Gross Total:</span>
                <span>AED  {orderDetails?.gross_total}</span>
              </div>
            </div>

            <div className="flex justify-between  text-sm font-semibold">
              <span>Outstanding's</span>
              <span>AED 100.00</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button className="flex-1 bg-[#F2994A] text-white py-2 rounded-lg font-medium text-sm">
                Print Invoice
              </button>
              <button
                className="flex-1 bg-[#27AE60] text-white py-2 rounded-lg font-medium text-sm"
                onClick={() => setIsPaymentModalOpen(true)}
              >
                Add Payment
              </button>
            </div>
          </div>

          {/* Driver Details */}
          <div>
            <h3 className="font-semibold text-base mb-3">Driver Details</h3>

            <div className="text-sm space-y-2">
              <div className="flex gap-2">
                <span className="font-medium">Name</span>
                <span>
                  {driverDetails
                    ? `${driverDetails.first_name} ${driverDetails.last_name}`
                    : orderDetails?.driver_name || "N/A"}
                </span>
              </div>

              <div className="flex gap-2">
                <span className="font-medium">Phone</span>
                <span>{driverDetails?.mobile_no || "N/A"}</span>
              </div>

              <div className="flex gap-2">
                <span className="font-medium">Email</span>
                <span>{driverDetails?.email || "N/A"}</span>
              </div>
            </div>

            <button className="mt-4 w-full bg-[#4F46E5] text-white py-2 rounded-lg font-medium text-sm">
              Change Driver
            </button>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="font-semibold text-base">Order QR Code</h3>
            <QRCodeCanvas
              value={orderDetails?.order_code || "N/A"}
              size={120}
              bgColor="#ffffff"
              fgColor="#000000"
              level="M"
              includeMargin={true}
            />
          </div>
        </div>
      </div>

      {isPaymentModalOpen && (
        <AddPaymentModal
          onClose={() => setIsPaymentModalOpen(false)}
          orderData={orderDetails}
        />
      )}
    </div>
  );
}

export default DetailedOrderPage;

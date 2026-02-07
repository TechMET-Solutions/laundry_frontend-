import React, { useEffect, useRef, useState } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderById, updateDriver } from "../../api/order";
import { getCustomersById } from "../../api/customer";
import { getAllEmployees, getEmployeeById } from "../../api/employee";
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
  const [isChangeDriverOpen, setIsChangeDriverOpen] = useState(false);
  const [driverSearchTerm, setDriverSearchTerm] = useState("");
  const [filteredDriverList, setFilteredDriverList] = useState([]);
  const [isDriverSearchDropdownOpen, setIsDriverSearchDropdownOpen] =
    useState(false);
  const [isLoadingDrivers, setIsLoadingDrivers] = useState(false);
  const [allDrivers, setAllDrivers] = useState([]);
  const [isUpdatingDriver, setIsUpdatingDriver] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [driverSelectionError, setDriverSelectionError] = useState("");
  const [driverUpdateError, setDriverUpdateError] = useState("");
  const isSelectingDriverRef = useRef(false);

  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState(null);

  const fetchOrdersData = async () => {
    if (state.orderId) {
      try {
        setLoading(true);
        const order = await getOrderById(state.orderId);
        const orderData = order.data;
        setOrderDetails(orderData);

        console.log(orderData)

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

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setIsLoadingDrivers(true);
        const response = await getAllEmployees();
        const drivers = (response.data.data || []).filter(
          (employee) => employee.role === "Driver",
        );
        setAllDrivers(drivers);
      } catch (error) {
        console.error("Driver fetch error:", error);
      } finally {
        setIsLoadingDrivers(false);
      }
    };

    fetchDrivers();
  }, []);

  useEffect(() => {
    if (!driverSearchTerm.trim()) {
      setFilteredDriverList([]);
      setIsDriverSearchDropdownOpen(false);
      return;
    }

    if (isSelectingDriverRef.current) {
      isSelectingDriverRef.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const filtered = allDrivers.filter((driver) => {
        const fullName =
          `${driver.first_name} ${driver.last_name}`.toLowerCase();
        return fullName.includes(driverSearchTerm.toLowerCase());
      });
      setFilteredDriverList(filtered);
      setIsDriverSearchDropdownOpen(filtered.length > 0);
    }, 700);

    return () => clearTimeout(timer);
  }, [driverSearchTerm, allDrivers]);

  const handleDriverUpdate = async () => {
    if (!selectedDriver) {
      setDriverSelectionError("Please select a driver");
      return;
    }
    const orderId =
      orderDetails?.id ||
      orderDetails?._id ||
      orderDetails?.order_id ||
      orderDetails?.orderId ||
      state?.orderId;
    if (!orderId) {
      setDriverUpdateError("Order id not found");
      return;
    }

    try {
      setIsUpdatingDriver(true);
      setDriverUpdateError("");
      const fullName = `${selectedDriver.first_name} ${selectedDriver.last_name}`;
      const driverId = selectedDriver.id || selectedDriver._id;
      if (!driverId) {
        setDriverUpdateError("Driver id not found");
        return;
      }
      await updateDriver(orderId, {
        driverId,
        driverName: fullName,
      });
      await fetchOrdersData();
      setIsChangeDriverOpen(false);
      setDriverSearchTerm("");
      setFilteredDriverList([]);
      setIsDriverSearchDropdownOpen(false);
      setSelectedDriver(null);
      setDriverSelectionError("");
    } catch (error) {
      console.error("Failed to update driver:", error);
      setDriverUpdateError("Failed to update driver");
    } finally {
      setIsUpdatingDriver(false);
    }
  };

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
              <span>{orderDetails?.order_date?.split("T")[0] || "N/A"}</span>
            </div>

            <div className="text-sm text-gray-700 flex gap-6">
              <span className="font-medium">Delivery Date</span>
              <span>{orderDetails?.delivery_date?.split("T")[0] || "N/A"}</span>
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

            <button
              onClick={() =>
                navigate("/pos", {
                  state: {
                    orderDetails: orderDetails,
                    orderId: state.orderId,
                  },
                })
              }
              className="bg-[#4F46E5] text-white px-5 py-2 rounded-full text-sm font-medium"
            >
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
                <span className="font-medium">
                  AED {orderDetails?.addon?.addonPrice}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Sub Total:</span>
                <span className="font-medium">
                  AED {orderDetails?.sub_total}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax (5%):</span>
                <span className="font-medium">AED {orderDetails?.tax}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Discount %:</span>
                <span className="font-medium"> {orderDetails?.discount} %</span>
              </div>

              <div className="flex justify-between font-semibold  border-t">
                <span>Gross Total:</span>
                <span>AED {orderDetails?.gross_total}</span>
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
              {orderDetails?.pending_amount > 0 ? (
                <button
                  onClick={() => {
                    setSelectedOrderForPayment(orderDetails);
                    setIsPaymentModalOpen(true);
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

            <div className="mt-4 flex items-center  justify-center gap-2">
              {isChangeDriverOpen && (
                <div className="relative flex-1">
                  <div
                    onClick={() => setIsDriverSearchDropdownOpen(true)}
                    className="flex items-center gap-2 bg-[#E1E3F3] rounded-lg px-2 py-2 cursor-pointer"
                  >
                    <input
                      type="text"
                      value={driverSearchTerm}
                      placeholder="Search driver"
                      onClick={() => setIsDriverSearchDropdownOpen(true)}
                      onChange={(e) => setDriverSearchTerm(e.target.value)}
                      className="w-full bg-[#E1E3F3] rounded-lg text-[12px] outline-none font-medium"
                    />
                  </div>

                  {isDriverSearchDropdownOpen && (
                    <ul className="absolute left-0 top-full mt-2 w-full bg-white rounded-lg shadow-lg z-50 max-h-48 overflow-auto">
                      {isLoadingDrivers && (
                        <li className="p-2 text-sm text-gray-400">
                          Loading drivers...
                        </li>
                      )}

                      {!isLoadingDrivers &&
                        filteredDriverList.length === 0 &&
                        driverSearchTerm && (
                          <li className="p-2 text-sm text-gray-400">
                            No drivers found
                          </li>
                        )}

                      {!isLoadingDrivers &&
                        filteredDriverList.map((driver) => (
                          <li
                            key={driver.id || driver._id}
                            className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              const fullName = `${driver.first_name} ${driver.last_name}`;
                              isSelectingDriverRef.current = true;
                              setIsDriverSearchDropdownOpen(false);
                              setDriverSearchTerm(fullName);
                              setSelectedDriver(driver);
                              setDriverSelectionError("");
                            }}
                          >
                            {driver.first_name} {driver.last_name}
                          </li>
                        ))}
                    </ul>
                  )}
                  {driverSelectionError && (
                    <span className="absolute left-0 top-full mt-2 text-red-500 text-xs">
                      {driverSelectionError}
                    </span>
                  )}
                </div>
              )}

              <button
                className="flex-none bg-[#4F46E5]  text-white py-2 px-4 rounded-lg font-medium text-sm whitespace-nowrap"
                onClick={() => {
                  if (!isChangeDriverOpen) {
                    setIsChangeDriverOpen(true);
                    setDriverSelectionError("");
                    setDriverUpdateError("");
                    setSelectedDriver(null);
                    return;
                  }
                  handleDriverUpdate();
                }}
                disabled={isUpdatingDriver}
              >
                {isUpdatingDriver
                  ? "Updating..."
                  : isChangeDriverOpen
                    ? "Save"
                    : "Change Driver"}
              </button>
            </div>
            {driverUpdateError && (
              <div className="mt-2 text-xs text-red-500">
                {driverUpdateError}
              </div>
            )}
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
          orderData={selectedOrderForPayment}
        />
      )}
    </div>
  );
}

export default DetailedOrderPage;


{/* <div className="flex flex-col md:flex-row justify-between items-start gap-8 p-6 ">

  <div className="flex-1">
    <h3 className="text-lg font-bold text-gray-800 uppercase  mb-4">Customer Details</h3>
    <div className="grid grid-cols-[80px_auto] gap-y-3 text-sm text-[#1F2937]">
      <span className="font-medium text-gray-500">Name</span>
      <span className="font-semibold">{orderDetails?.customer_name || "N/A"}</span>

      <span className="font-medium text-gray-500">Phone</span>
      <span>{customerDetails?.mobile_no || "N/A"}</span>

      <span className="font-medium text-gray-500">Email</span>
      <span className="text-blue-600">{customerDetails?.email || "N/A"}</span>

      <span className="font-medium text-gray-500">Address</span>
      <span className="leading-tight">{customerDetails?.address || "N/A"}</span>
    </div>
  </div>

  <div className="flex flex-col items-end justify-end gap-4 w-full md:w-auto">
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="relative">
        <select
          className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg block w-full p-2.5 pr-10 outline-none transition-all"
          name="service"
        >
          <option value="">Quick Select Service</option>
          <option value="wash">Wash & Fold</option>
          <option value="dry">Dry Cleaning</option>
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>

      <button
        onClick={() =>
          navigate("/pos", {
            state: { orderDetails, orderId: state.orderId },
          })
        }
        className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
      >
        + Add New Service
      </button>
    </div>
  </div>
</div> */}
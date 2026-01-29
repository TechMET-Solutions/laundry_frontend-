import { FiUser } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { GrCycle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import { getAllCustomers } from "../../api/customer";
import { getAllEmployees } from "../../api/employee";
import AddCustomerModal from "../services/AddCustomerModal";
import { createOrder } from "../../api/order";
import { formatDateForInput } from "../../utils/formatDateForInput";
import { MdOutlineEdit } from "react-icons/md";

function OrderSummary({
  orders,
  setOrders,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
}) {
  const navigate = useNavigate();

  const isSelectingCustomerRef = useRef(false);
  const isSelectingDriverRef = useRef(false);

  const [orderDate, setOrderDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState("");

  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  // const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);

  const [driverSearchTerm, setDriverSearchTerm] = useState("");
  const [filteredDriverList, setFilteredDriverList] = useState([]);
  const [isDriverSearchDropdownOpen, setIsDriverSearchDropdownOpen] =
    useState(false);
  const [isLoadingDrivers, setIsLoadingDrivers] = useState(false);

  const [openAddCustomerModal, setOpenAddCustomerModal] = useState(false);
  const [allCustomers, setAllCustomers] = useState([]);
  const [allDrivers, setAllDrivers] = useState([]);

  const [openPickerIndex, setOpenPickerIndex] = useState(null);
  const [orderColors, setOrderColors] = useState("");

  const [errors, setErrors] = useState({
    deliveryDate: "",
    driverName: "",
    customerName: "",
    items: "",
    paymentMethod: "",
    paidAmount: "",
  });

  const [orderObject, setOrderObject] = useState({
    orderDate: new Date().toISOString(),
    // orderDate: toDubaiISOString(new Date()),

    deliveryDate: "",
    // deliveryDate: toDubaiISOString(date),

    customerName: "",
    driverName: "",
    colorCodes: "#2563eb", // default blue

    amount: 0,
    totalAmount: 0,
    paidAmount: 0,

    currency: "AED",
    status: "PENDING",
    createdBy: "Admin",
    paymentMethod: "Payment Method",
    allItems: [],
  });

  const formatDate = (date) => {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const getNextDay = (date) => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    return d;
  };

  //   const toDubaiISOString = (date) => {
  //   return new Date(
  //     date.toLocaleString("en-US", { timeZone: "Asia/Dubai" })
  //   ).toISOString().replace("Z", "");
  // };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoadingCustomers(true);
        const response = await getAllCustomers();
        setAllCustomers(response.data.data || []);
      } catch (error) {
        console.error("Customer fetch error:", error);
      } finally {
        setIsLoadingCustomers(false);
      }
    };

    fetchCustomers();
  }, []);

  // Fetch all drivers (employees with role = driver)
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setIsLoadingDrivers(true);
        const response = await getAllEmployees();

        const drivers = response.data.data.filter(
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

  // Filter customers based on search term
  useEffect(() => {
    if (!customerSearchTerm.trim()) {
      setFilteredCustomerList([]);
      setIsSearchDropdownOpen(false);
      return;
    }

    // Don't reopen dropdown if user just selected
    if (isSelectingCustomerRef.current) {
      isSelectingCustomerRef.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const filtered = allCustomers.filter((customer) =>
        customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()),
      );
      setFilteredCustomerList(filtered);
      setIsSearchDropdownOpen(filtered.length > 0);
    }, 700);

    return () => clearTimeout(timer);
  }, [customerSearchTerm, allCustomers]);

  // Filter drivers based on search term
  useEffect(() => {
    if (!driverSearchTerm.trim()) {
      setFilteredDriverList([]);
      setIsDriverSearchDropdownOpen(false);
      return;
    }

    // Don't reopen dropdown if user just selected
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

  // ---- CALCULATIONS ----
  const subtotal = orders.reduce(
    (sum, item) => sum + item.quantity * (item.price || 0),
    0,
  );

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  useEffect(() => {
    setOrderObject((prev) => ({
      ...prev,
      amount: subtotal,
      totalAmount: total,
    }));
  }, [subtotal, total]);

  // Clear items error when items are added
  useEffect(() => {
    if (orders.length > 0) {
      setErrors((prev) => ({ ...prev, items: "" }));
    }
  }, [orders.length]);

  const handleSaveOrder = async () => {
    const newErrors = {
      deliveryDate: "",
      driverName: "",
      customerName: "",
      items: "",
      paymentMethod: "",
      paidAmount: "",
    };

    // Validate delivery date
    if (!deliveryDate) {
      newErrors.deliveryDate = "Select a delivery date";
    }

    // Validate customer name
    if (!orderObject.customerName.trim()) {
      newErrors.customerName = "Please select a customer";
    }

    // Validate driver name
    if (!orderObject.driverName.trim()) {
      newErrors.driverName = "Please select a driver";
    }

    // Validate items
    if (orders.length === 0) {
      newErrors.items = "Please add at least one item";
    }

    // Validate payment method
    if (
      !orderObject.paymentMethod ||
      orderObject.paymentMethod === "Payment Method"
    ) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    if (parseFloat(orderObject.paidAmount) > orderObject.totalAmount) {
      newErrors.paidAmount = "Paid amount cannot exceed total";
    }

    setErrors(newErrors);

    // If any errors, don't save
    if (
      newErrors.deliveryDate ||
      newErrors.driverName ||
      newErrors.customerName ||
      newErrors.items ||
      newErrors.paymentMethod ||
      newErrors.paidAmount
    ) {
      return;
    }

    console.log("Saving order:", orderObject); // allItems included
    await createOrder(orderObject);
    navigate("/orders");
  };

  // backend me update ho jb qutity or color change ho
  useEffect(() => {
    const updatedAllItems = orders.map((item) => ({
      id: item.id,
      itemName: item.name || item.category.name,
      serviceType: item.serviceType || [],
      color: item.color || "#2563eb",
      rate: item.pricePerItem,
      qty: item.quantity,
      total: item.quantity * item.pricePerItem,
    }));

    setOrderObject((prev) => ({
      ...prev,
      allItems: updatedAllItems,
    }));
  }, [orders]);

  const handleCustomerData = (customerData) => {
    // Handle new customer data if needed
    console.log("New customer added:", customerData);
  };

  return (
    <div className="bg-white rounded-xl  p-4 flex flex-col gap-4 h-full">
      {/* Date */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-[12px] whitespace-nowrap">
          <span className="text-gray-700">Order Date</span>

          <span className="text-indigo-600 font-semibold">
            {formatDate(orderDate)}
          </span>

          {/* Calendar Icon + Hidden Input */}
          <div className="relative w-4 h-4 cursor-pointer">
            <FiCalendar className="text-gray-800" />

            <input
              type="date"
              value={formatDateForInput(orderDate)}
              onChange={(e) => {
                const date = new Date(e.target.value);
                setOrderDate(date);
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
              // onChange={(e) => {
              //   const date = new Date(e.target.value);

              //   setOrderDate(date);
              //   setOrderObject((prev) => ({
              //     ...prev,
              //     orderDate: toDubaiISOString(date),
              //   }));
              // }}
            />
          </div>
        </div>

        <div className="relative flex items-center gap-2 text-[12px] whitespace-nowrap">
          <span className="text-gray-700">Delivery Date</span>

          <span className="text-indigo-600 font-semibold">
            {deliveryDate ? formatDate(deliveryDate) : ""}
          </span>

          {/* Calendar Icon + Hidden Input */}
          <div className="w-4 h-4 cursor-pointer">
            <FiCalendar className="text-gray-800 cursor-pointer" />

            <input
              type="date"
              min={formatDateForInput(getNextDay(orderDate))}
              value={deliveryDate ? formatDateForInput(deliveryDate) : ""}
              onChange={(e) => {
                const date = new Date(e.target.value);

                setDeliveryDate(date);
                setErrors((prev) => ({ ...prev, deliveryDate: "" }));
                setOrderObject((prev) => ({
                  ...prev,
                  deliveryDate: date.toISOString(),
                }));
              }}
              // onChange={(e) => {
              //   const date = new Date(e.target.value);

              //   setDeliveryDate(date);
              //   setErrors((prev) => ({ ...prev, deliveryDate: "" }));

              //   setOrderObject((prev) => ({
              //     ...prev,
              //     deliveryDate: toDubaiISOString(date),
              //   }));
              // }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          {errors.deliveryDate && (
            <span className="absolute left-0 top-3 text-red-500 font-semibold text-[10px] whitespace-nowrap mt-1">
              {errors.deliveryDate}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-4 items-center">
        {/* Driver Search */}
        <div className="relative w-full">
          <div
            onClick={() => setIsDriverSearchDropdownOpen(true)}
            className="flex items-center gap-2 bg-[#E1E3F3] rounded-lg p-2 cursor-pointer"
          >
            <FiUser />

            <input
              type="text"
              value={driverSearchTerm}
              placeholder="Search driver"
              onClick={() => setIsDriverSearchDropdownOpen(true)}
              onChange={(e) => {
                setDriverSearchTerm(e.target.value);
              }}
              className="w-full bg-[#E1E3F3] rounded-lg  text-[12px] outline-none font-medium"
            />
          </div>

          {/* DRIVER DROPDOWN */}
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
                    key={driver.id}
                    className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      const fullName = `${driver.first_name} ${driver.last_name}`;
                      isSelectingDriverRef.current = true;
                      setIsDriverSearchDropdownOpen(false);
                      setDriverSearchTerm(fullName);
                      setOrderObject((prev) => ({
                        ...prev,
                        driverName: fullName,
                      }));
                    }}
                  >
                    {driver.first_name} {driver.last_name}
                  </li>
                ))}
            </ul>
          )}
          {errors.driverName && (
            <span className="absolute left-0 top-7 text-red-500 font-semibold text-[12px] whitespace-nowrap mt-1">
              {errors.driverName}
            </span>
          )}
        </div>

        {/* Customer Search */}
        <div className="relative w-full ">
          <div
            onClick={() => setIsSearchDropdownOpen(true)}
            className="flex items-center gap-2 bg-[#E1E3F3] rounded-lg p-2 cursor-pointer"
          >
            <FiUser />

            <input
              type="text"
              value={customerSearchTerm}
              placeholder="Search customer"
              onClick={() => setIsSearchDropdownOpen(true)}
              onChange={(e) => {
                setCustomerSearchTerm(e.target.value);
                setErrors((prev) => ({ ...prev, customerName: "" }));
              }}
              className="w-full bg-[#E1E3F3] rounded-lg  text-[12px] outline-none font-medium"
            />
          </div>

          {/* CUSTOMER DROPDOWN */}
          {isSearchDropdownOpen && (
            <ul className="absolute left-0 top-full mt-2 w-full bg-white rounded-lg shadow-lg z-50 max-h-48 overflow-auto">
              {isLoadingCustomers && (
                <li className="p-2 text-sm text-gray-400">Searching...</li>
              )}

              {!isLoadingCustomers &&
                filteredCustomerList.map((customer) => (
                  <li
                    key={customer.id}
                    className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      isSelectingCustomerRef.current = true;
                      setIsSearchDropdownOpen(false);
                      // setSelectedCustomerName(customer.name);
                      setCustomerSearchTerm(customer.name);
                      setErrors((prev) => ({ ...prev, customerName: "" }));

                      setOrderObject((prev) => ({
                        ...prev,
                        customerName: customer.name,
                      }));
                    }}
                  >
                    {customer.name}
                  </li>
                ))}
            </ul>
          )}

          {errors.customerName && (
            <span className="absolute left-0 top-7 text-red-500 font-semibold text-[12px] whitespace-nowrap mt-1">
              {errors.customerName}
            </span>
          )}
        </div>

        <button
          onClick={() => {
            setOpenAddCustomerModal(true);
          }}
          className="flex items-center   p-2 bg-blue-500 rounded-lg text-white"
        >
          <MdOutlinePersonAddAlt />
        </button>
        {openAddCustomerModal && (
          <AddCustomerModal
            onClose={() => {
              setOpenAddCustomerModal(false);
            }}
            onSave={handleCustomerData}
          />
        )}
      </div>

      {/* ORDER ITEMS */}
      <div className="relative rounded-lg min-h-[300px] text-sm  ">
        {orders.length === 0 && (
          <p className="text-gray-400 text-center">No items added</p>
        )}

        <div>
          {orders.map((item, index) => {
            const totalPrice = item.quantity * Number(item.pricePerItem); // quantity × pricePerItem
            {
              console.log(orders);
            }
            return (
              <div
                key={index}
                className="grid grid-cols-[1fr_auto] gap-4 bg-[#E5E9FF] mb-6 rounded p-3"
              >
                {/* LEFT */}
                <div>
                  <span className="font-medium text-lg">
                    {item.category.name}
                  </span>
                  <p className="text-[12px] mt-2 felx gap-1 font-semibold">
                    <span>AED </span>

                    <span className=" ">{totalPrice.toFixed(2)}</span>
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-end gap-2">
                  {/* qty + delete */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(index)}
                      disabled={item.quantity === 1}
                      className="w-7 h-7 bg-[#D2D5E8] rounded"
                    >
                      -
                    </button>

                    <span className="font-medium">{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(index)}
                      className="w-7 h-7 bg-[#D2D5E8] rounded"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 text-lg"
                    >
                      🗑
                    </button>
                  </div>

                  {/* color + edit */}
                  <div className="flex items-center gap-2 relative">
                    {/* COLOR PREVIEW */}
                    <div
                      className="w-16 h-7 rounded-lg border"
                      style={{ backgroundColor: orderObject.colorCodes }}
                    />

                    {/* EDIT BUTTON */}
                    <button
                      onClick={() =>
                        setOpenPickerIndex(
                          openPickerIndex === index ? null : index,
                        )
                      }
                      className="px-2 py-1 bg-white rounded shadow text-sm"
                    >
                      <MdOutlineEdit />
                    </button>

                    {/* COLOR PICKER */}
                    {/* COLOR PICKER */}
                    {openPickerIndex === index && (
                      <input
                        type="color"
                        value={orders[index].color || "#2563eb"} // item color
                        onChange={(e) => {
                          const updatedOrders = [...orders];
                          updatedOrders[index].color = e.target.value;
                          setOrders(updatedOrders);

                          // also update orderObject.allItems
                          setOrderObject((prev) => ({
                            ...prev,
                            allItems: updatedOrders.map((item) => ({
                              id: item.id,
                              itemName: item.name || item.category.name,
                              serviceType: item.serviceType || [],
                              color: item.color || "#2563eb",
                              rate: item.pricePerItem,
                              qty: item.quantity,
                              total: item.quantity * item.pricePerItem,
                            })),
                          }));

                          setOpenPickerIndex(null); // auto close
                        }}
                        className="absolute top-8 right-0 cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {errors.items && (
          <span className="absolute left-0 top-full text-red-500 font-semibold text-[12px] whitespace-nowrap mt-1">
            {errors.items}
          </span>
        )}
      </div>

      {/* TOTALS */}
      <div className="mt-auto bg-indigo-50 rounded-xl p-4 text-sm space-y-2">
        <div className="flex justify-between">
          <span>Sub Total</span>
          <span className="text-right">{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (5%)</span>
          <span className="text-right">{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-right">{total.toFixed(2)}</span>
        </div>
      </div>

      {/* PAYMENT */}
      <div className="relative flex justify-center gap-1 items-center">
        <div className="relative flex-1">
          <input
            type="number"
            placeholder="Enter payment"
            value={orderObject.paidAmount}
            onChange={(e) => {
              setOrderObject((prev) => ({
                ...prev,
                paidAmount: e.target.value,
              }));
              setErrors((prev) => ({ ...prev, paidAmount: "" }));
            }}
            className="w-full h-10 bg-gray-200 rounded-lg px-2 text-sm outline-none"
          />
          {errors.paidAmount && (
            <span className="absolute left-0 top-full text-red-500 font-semibold text-[10px] whitespace-nowrap mt-1">
              {errors.paidAmount}
            </span>
          )}
        </div>

        <select
          value={orderObject.paymentMethod}
          onChange={(e) => {
            setOrderObject((prev) => ({
              ...prev,
              paymentMethod: e.target.value,
            }));
            setErrors((prev) => ({ ...prev, paymentMethod: "" }));
          }}
          className="h-10 bg-gray-200 rounded-lg px-4 text-sm outline-none"
        >
          <option>Payment Method</option>
          <option>Settlement</option>
          <option>Advance</option>
          <option>Cash</option>
          <option>Online</option>
          <option>Card</option>
          <option>Bank Transfer</option>
        </select>

        {errors.paymentMethod && (
          <span className="absolute right-0 top-full text-red-500 font-semibold text-[12px] whitespace-nowrap mt-1">
            {errors.paymentMethod}
          </span>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end items-center gap-4 mt-6 mb-6">
        <button
          onClick={handleSaveOrder}
          className="h-10 bg-green-600 text-white px-4 rounded-full text-sm"
        >
          Save
        </button>

        <button className="h-10 bg-orange-600 text-white px-4 rounded-full text-sm">
          Print
        </button>

        <button className="h-10 w-10 bg-red-400 rounded-full text-white flex items-center justify-center">
          <GrCycle />
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;

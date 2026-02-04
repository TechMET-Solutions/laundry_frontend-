import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Search,
  Calendar,
  User,
  UserPlus,
  Trash2,
  Edit3,
  RotateCcw,
  ArrowLeft,
  X,
} from "lucide-react";
import axios from "axios";
import { FiCalendar, FiUser } from "react-icons/fi";
import { getEmployeeSearch } from "../api/employee";
import { getCustomersSearch } from "../api/customer";
import { createOrder, updateOrder } from "../api/order";
import { getAllServicesCategory } from "../api/servicesapi";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import AddCustomerModal from "./services/AddCustomerModal";
import { useNavigate, useLocation } from "react-router-dom";

const POS = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Edit mode state - true if coming from OrderDetails
  const [isEditMode] = useState(!!state?.orderDetails);
  const [existingOrderData] = useState(state?.orderDetails || null);
  const [orderId] = useState(state?.orderId || null);

  // --- State Management ---
  const [services, setServices] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [length, setLength] = useState(1);
  const [width, setWidth] = useState(1);
  const [openPickerIndex, setOpenPickerIndex] = useState(null);
  const [serviceSearchTerm, setServiceSearchTerm] = useState("");
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState("");

  // Selection State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [deliveryType, setDeliveryType] = useState("normal");
  const [qty, setQty] = useState(1);

  // Pricing/Addon State
  const [prices, setPrices] = useState({ normal: 0, express: 0, urgent: 0 });
  const [editingType, setEditingType] = useState(null);
  const [addons, setAddons] = useState([]);
  const [selectedAddon, setSelectedAddon] = useState(null);
  const [addonModal, setAddonModal] = useState(false);

  // Remarks
  const [remarkModal, setRemarkModal] = useState(false);
  const [remarks, setRemarks] = useState("");

  //  Date
  const [orderDate, setOrderDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [deliveryDate, setDeliveryDate] = useState("");

  // Driver Search
  const [allDrivers, setAllDrivers] = useState([]);
  const [isDriverSearchDropdownOpen, setIsDriverSearchDropdownOpen] =
    useState(false);
  const [driverSearchTerm, setDriverSearchTerm] = useState("");
  const [isLoadingDrivers, setIsLoadingDrivers] = useState(false);
  const [filteredDriverList, setFilteredDriverList] = useState([]);
  const isSelectingDriverRef = useRef(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Customer Search
  const [allCustomers, setAllCustomers] = useState([]);
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [isCustomerSearchDropdownOpen, setIsCustomerSearchDropdownOpen] =
    useState(false);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const isSelectingCustomerRef = useRef(false);

  // Selected Customer/Driver
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paidAmount, setPaidAmount] = useState("");

  // Customer Modal
  const [openAddCustomerModal, setOpenAddCustomerModal] = useState(false);

  const [errors, setErrors] = useState({
    deliveryDate: "",
    driverName: "",
    customerName: "",
    items: "",
    paymentMethod: "",
    paidAmount: "",
  });

  // Discount State
  const [discount, setDiscount] = useState(0);
  const [editingDiscount, setEditingDiscount] = useState(false);
  const [discountInput, setDiscountInput] = useState(0);

  // --- Fetch Data ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [srvRes, addonRes] = await Promise.all([
          axios.get("http://localhost:5000/api/service_list/list"),
          axios.get("http://localhost:5000/api/service/service_addon/list"),
        ]);
        setServices(srvRes.data.data || []);
        setAddons(addonRes.data.data.filter((a) => a.status === 1) || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const fetchServiceCategories = async () => {
      try {
        const response = await getAllServicesCategory();
        setServiceCategories(response.data.data || []);
      } catch (error) {
        console.error("Service categories fetch error:", error);
      }
    };

    fetchServiceCategories();
  }, []);

  // Logic: Update pricing grid when a service type is selected
  useEffect(() => {
    if (!selectedType) return;
    const base = Number(selectedType.price);
    setPrices({
      normal: base,
      express: base * 1.5,
      urgent: base * 2.0,
    });
    setEditingType(null);
  }, [selectedType]);

  // --- Fetch Driver & Customer Data  ---
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setIsLoadingDrivers(true);
        const response = await getEmployeeSearch();
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

    const fetchCustomers = async () => {
      try {
        setIsLoadingCustomers(true);
        const response = await getCustomersSearch();
        setAllCustomers(response.data.data || []);
      } catch (error) {
        console.error("Customer fetch error:", error);
      } finally {
        setIsLoadingCustomers(false);
      }
    };

    fetchCustomers();

    fetchDrivers();
  }, []);

  // Driver Search Effect with Debounce

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

  // Customer Search  Logic with Debounce

  useEffect(() => {
    if (!customerSearchTerm.trim()) {
      setFilteredCustomerList([]);
      setIsCustomerSearchDropdownOpen(false);
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
      setIsCustomerSearchDropdownOpen(filtered.length > 0);
    }, 700);

    return () => clearTimeout(timer);
  }, [customerSearchTerm, allCustomers]);

  // Pre-fill form data when editing existing order
  useEffect(() => {
    if (
      isEditMode &&
      existingOrderData &&
      allDrivers.length > 0 &&
      allCustomers.length > 0
    ) {
      // Set delivery date
      if (existingOrderData.delivery_date) {
        const formattedDate = existingOrderData.delivery_date.split("T")[0];
        setDeliveryDate(formattedDate);
      }

      // Set customer
      if (existingOrderData.customer_name) {
        isSelectingCustomerRef.current = true;
        setCustomerSearchTerm(existingOrderData.customer_name);
        const customer = allCustomers.find(
          (c) =>
            c.id === existingOrderData.customer_id ||
            c.name === existingOrderData.customer_name,
        );
        if (customer) {
          setSelectedCustomer(customer);
        }
      }

      // Set driver
      if (existingOrderData.driver_name) {
        isSelectingDriverRef.current = true;
        setDriverSearchTerm(existingOrderData.driver_name);
        const driver = allDrivers.find(
          (d) =>
            d.id === existingOrderData.driver_id ||
            `${d.first_name} ${d.last_name}` === existingOrderData.driver_name,
        );
        if (driver) {
          setSelectedDriver(driver);
        }
      }

      // Set addon - Check multiple possible field names
      if (existingOrderData.addon && addons.length > 0) {
        const addonId =
          existingOrderData.addon.addonId || existingOrderData.addon.id;
        const addon = addons.find((a) => a.id === addonId);
        if (addon) {
          setSelectedAddon(addon);
        }
      }

      // Set discount
      if (existingOrderData.discount) {
        setDiscount(Number(existingOrderData.discount));
        setDiscountInput(Number(existingOrderData.discount));
      }

      // Set remarks
      if (existingOrderData.remark) {
        setRemarks(existingOrderData.remark);
      }

      // Set payment method and paid amount
      if (existingOrderData.payment_method) {
        setPaymentMethod(existingOrderData.payment_method);
      }
      if (existingOrderData.paid_amount) {
        setPaidAmount(existingOrderData.paid_amount);
      }

      // Pre-fill cart items
      if (
        existingOrderData.item_list &&
        existingOrderData.item_list.length > 0
      ) {
        const prefillCart = existingOrderData.item_list.map((item, idx) => ({
          id: idx,
          name: item.name,
          type: item.type,
          color: item.color || "#2563eb",
          price: item.rate,
          qty: item.qty,
          deliveryType: "normal",
          length: item.height || 1,
          width: item.width || 1,
          sqft: (item.height || 1) * (item.width || 1),
        }));
        setCart(prefillCart);
      }
    }
  }, [isEditMode, existingOrderData, allDrivers, allCustomers]);

  // Re-try addon matching when addons list loads
  useEffect(() => {
    if (
      isEditMode &&
      existingOrderData &&
      existingOrderData.addon &&
      addons.length > 0 &&
      !selectedAddon
    ) {
      const addonId =
        existingOrderData.addon.addonId || existingOrderData.addon.id;
      const addon = addons.find((a) => a.id === addonId);
      if (addon) {
        setSelectedAddon(addon);
      }
    }
  }, [addons, isEditMode, existingOrderData, selectedAddon]);

  // --- Handlers ---

  const handleCustomerData = (customerData) => {
    // console.log("New customer added:", customerData);
  };

  // Order Validation and Save

  const handleSaveOrder = async () => {
    const newErrors = {
      deliveryDate: "",
      driverName: "",
      customerName: "",
      items: "",
      paymentMethod: "",
      paidAmount: "",
    };
    if (!deliveryDate) {
      newErrors.deliveryDate = "Select a delivery date";
    }
    if (!customerSearchTerm.trim() || !selectedCustomer?.id) {
      newErrors.customerName = "Please select a customer";
    }
    if (!driverSearchTerm.trim() || !selectedDriver?.id) {
      newErrors.driverName = "Please select a driver";
    }
    if (cart.length === 0) {
      newErrors.items = "Please add at least one item";
    }
    if (!paymentMethod || paymentMethod === "") {
      newErrors.paymentMethod = "Please select a payment method";
    }

    if (paidAmount && parseFloat(paidAmount) > grandTotal) {
      newErrors.paidAmount = "Paid amount cannot exceed total";
    }

    setErrors(newErrors);
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

    const orderObject = {
      orderDate,
      deliveryDate,
      customerName: selectedCustomer?.name || customerSearchTerm,
      customerId: selectedCustomer?.id || null,
      driverName: selectedDriver
        ? `${selectedDriver.first_name} ${selectedDriver.last_name}`
        : driverSearchTerm,
      driverId: selectedDriver?.id || null,
      subTotal,
      addon: selectedAddon
        ? {
            addonId: selectedAddon.id,
            addonName: selectedAddon.name,
            addonPrice: Number(selectedAddon.price),
          }
        : 0,
      tax,
      discount,
      grossTotal: grandTotal,
      paidAmount: paidAmount ? Number(paidAmount) : 0,
      pendingAmount: grandTotal - (paidAmount ? Number(paidAmount) : 0),
      paymentMethod,
      status: "Pending",
      itemList: cart.map((item) => {
        const sqftFactor = item.sqft ? Number(item.sqft) : 1;
        const rate = Number(item.price);
        const qtyValue = Number(item.qty);
        return {
          name: item.name,
          type: item.type,
          color: item.color,
          rate,
          qty: qtyValue,
          total: rate * qtyValue * sqftFactor,
          height: item.length ? Number(item.length) : null,
          width: item.width ? Number(item.width) : null,
        };
      }),
      remark: remarks,
      height: null,
      width: null,
    };

    // console.log("Saving order:", orderObject);
    try {
      if (isEditMode && existingOrderData) {
        // UPDATE existing order
        const orderId = existingOrderData.id || existingOrderData._id;
        await updateOrder(orderId, orderObject);
        navigate(`/orders/detailed_order`, {
          state: { orderId },
          replace: true,
        });
      } else {
        // CREATE new order
        await createOrder(orderObject);
        navigate("/orders");
      }
    } catch (error) {
      console.error("Order create/update error:", error);
    }
  };
  // --- Actions ---
  const handleServiceClick = (service) => {
    const firstType = service.service_types?.[0];
    setSelectedService(service);
    setSelectedType(firstType);
    setDeliveryType("normal");
    setQty(1);
    setIsModalOpen(true);
  };

  const handleResetOrder = () => {
    setCart([]);
    setSelectedAddon(null);
    setRemarks("");
    setPaidAmount("");
    setPaymentMethod("");
    setDriverSearchTerm("");
    setCustomerSearchTerm("");
    setSelectedDriver(null);
    setSelectedCustomer(null);
    setDeliveryDate("");
    setDiscount(0);
    setDiscountInput(0);
    setEditingDiscount(false);
    setErrors({
      deliveryDate: "",
      driverName: "",
      customerName: "",
      items: "",
      paymentMethod: "",
      paidAmount: "",
    });
  };

  const addToCart = () => {
    const item = {
      id: Date.now(),
      name: selectedService.name,
      type: selectedType.type,
      deliveryType,
      price: prices[deliveryType],
      qty,
      color: "#2563eb", // default blue
      length: isSqfEnabled ? length : null,
      width: isSqfEnabled ? width : null,
      sqft: isSqfEnabled ? sqft : 1,
    };

    setCart((prev) => [...prev, item]);
    setIsModalOpen(false);
  };

  const updateQty = (id, direction) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty:
                direction === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1),
            }
          : item,
      ),
    );
  };

  // --- Calculations ---
  const subTotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const sqftFactor = item.sqft ? item.sqft : 1;
      return sum + item.price * item.qty * sqftFactor;
    }, 0);
  }, [cart]);

  const tax = useMemo(() => subTotal * 0.05, [subTotal]);

  const addonPrice = selectedAddon ? Number(selectedAddon.price) : 0;

  const grandTotal = useMemo(() => {
    const total = subTotal + tax + addonPrice;
    const discountAmount = (total * discount) / 100;
    return total - discountAmount;
  }, [subTotal, tax, addonPrice, discount]);

  const isSqfEnabled = selectedService?.sqf_status === 1;
  const sqft = isSqfEnabled ? length * width : 1;

  const modalTotal = prices[deliveryType] * qty * (isSqfEnabled ? sqft : 1);

  // --- Filtered Services ---

  const filteredServices = useMemo(() => {
    const term = serviceSearchTerm.trim().toLowerCase();
    const filterValue = serviceCategoryFilter.trim().toLowerCase();

    return services.filter((service) => {
      const nameMatch = term
        ? service?.name?.toLowerCase().includes(term)
        : true;
      if (!filterValue || filterValue === "all") return nameMatch;
      const categoryValue = service?.category
        ? service.category.toLowerCase()
        : "";
      const categoryMatch = categoryValue.includes(filterValue);
      return nameMatch && categoryMatch;
    });
  }, [serviceSearchTerm, serviceCategoryFilter, services]);

  return (
    <div className="min-h-screen bg-[#f0f4f9] p-3 md:p-6 font-sans text-slate-700">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button className="p-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg md:text-xl font-bold text-slate-800">
          {isEditMode ? "Edit Order" : "Create New Order"}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Left Side: Product Selection */}
        <div className="col-span-1 lg:col-span-8">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search services..."
                value={serviceSearchTerm}
                onChange={(e) => setServiceSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <select
              value={serviceCategoryFilter}
              onChange={(e) => setServiceCategoryFilter(e.target.value)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm font-medium hover:bg-slate-50 whitespace-nowrap"
            >
              <option value="" disabled>
                Sort by Category
              </option>
              <option value="All">All</option>
              {serviceCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="text-center py-20">Loading services...</div>
          ) : (
            <ServiceGrid
              services={filteredServices}
              onServiceClick={handleServiceClick}
            />
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="col-span-1 lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col lg:h-[calc(100vh-120px)]">
            {/* Dates */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:justify-between mb-4 md:mb-6 text-xs uppercase tracking-wider font-semibold text-slate-400">
              <div className="flex items-center gap-2">
                <div>
                  Order Date:{" "}
                  <span className="text-indigo-600 block text-sm">
                    {orderDate.split("-").reverse().join("-")}
                  </span>
                </div>

                <div className="relative w-4 h-4 cursor-pointer">
                  <FiCalendar className="text-indigo-600 w-5 h-5" />
                  <input
                    type="date"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div>
                  Delivery Date:{" "}
                  <span className="text-indigo-600 block text-sm">
                    {deliveryDate
                      ? deliveryDate.split("-").reverse().join("-")
                      : "--"}
                  </span>
                </div>

                <div className="relative w-4 h-4 cursor-pointer">
                  <FiCalendar className="text-indigo-600 w-5 h-5" />
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => {
                      setDeliveryDate(e.target.value);
                      setErrors((prev) => ({ ...prev, deliveryDate: "" }));
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {errors.deliveryDate && (
                    <span className="absolute right-0 top-4 text-red-500 font-bold text-[10px] whitespace-nowrap mt-1">
                      {errors.deliveryDate}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Customer & Driver Selection Inputs */}
            <div className="flex flex-col md:flex-row gap-2 mb-4">
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
                            setErrors((prev) => ({
                              ...prev,
                              driverName: "",
                            }));

                            setDriverSearchTerm(fullName);
                            setSelectedDriver(driver);
                            // setOrderObject((prev) => ({
                            //   ...prev,
                            //   driverName: fullName,
                            // }));
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
              <div className="relative w-full ">
                <div
                  onClick={() => setIsCustomerSearchDropdownOpen(true)}
                  className="flex items-center gap-2 bg-[#E1E3F3] rounded-lg p-2 cursor-pointer"
                >
                  <FiUser />
                  <input
                    type="text"
                    value={customerSearchTerm}
                    placeholder="Search customer"
                    onClick={() => setIsCustomerSearchDropdownOpen(true)}
                    onChange={(e) => {
                      setCustomerSearchTerm(e.target.value);
                      setErrors((prev) => ({ ...prev, customerName: "" }));
                    }}
                    className="w-full bg-[#E1E3F3] rounded-lg  text-[12px] outline-none font-medium"
                  />
                </div>

                {/* CUSTOMER DROPDOWN */}
                {isCustomerSearchDropdownOpen && (
                  <ul className="absolute left-0 top-full mt-2 w-full bg-white rounded-lg shadow-lg z-50 max-h-48 overflow-auto">
                    {isLoadingCustomers && (
                      <li className="p-2 text-sm text-gray-400">
                        Searching...
                      </li>
                    )}

                    {!isLoadingCustomers &&
                      filteredCustomerList.map((customer) => (
                        <li
                          key={customer.id}
                          className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            isSelectingCustomerRef.current = true;
                            setIsCustomerSearchDropdownOpen(false);
                            setCustomerSearchTerm(customer.name);
                            setSelectedCustomer(customer);
                            // setErrors((prev) => ({
                            //   ...prev,
                            //   customerName: "",
                            // }));
                            //   setOrderObject((prev) => ({
                            //     ...prev,
                            //     customerName: customer.name,
                            //   }));
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
                <MdOutlinePersonAddAlt className="cursor-pointer" />
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

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-2 md:space-y-3 mb-4 pr-0 md:pr-2 relative">
              {cart.length === 0 && (
                <div className="text-center mt-10">
                  <p className="text-slate-400 text-sm mb-2">
                    No items in cart
                  </p>
                  {errors.items && (
                    <p className="text-red-500 font-semibold text-[12px]">
                      {errors.items}
                    </p>
                  )}
                </div>
              )}
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-indigo-50/40 p-3 rounded-xl border border-indigo-100"
                >
                  <div className="flex justify-between items-start gap-3">
                    {/* LEFT INFO */}
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 text-sm truncate">
                        {item.name}
                      </h4>

                      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full uppercase">
                        {item.type}
                      </span>

                      <p className="text-xs font-bold mt-1">
                        AED {item.price.toFixed(2)}
                      </p>

                      {item.sqft > 1 && (
                        <p className="text-[11px] text-slate-500">
                          {item.length}ft × {item.width}ft = {item.sqft} sq.ft
                        </p>
                      )}
                    </div>

                    {/* RIGHT CONTROLS */}
                    <div className="flex flex-col items-end gap-2">
                      {/* QTY */}
                      <div className="flex items-center bg-white rounded-lg border border-slate-200">
                        <button
                          onClick={() => updateQty(item.id, "dec")}
                          className="px-2 py-1 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="px-2 font-bold text-sm">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, "inc")}
                          className="px-2 py-1 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>

                      {/* COLOR PICKER */}
                      <div className="relative flex items-center gap-2">
                        <div
                          className="w-14 h-6 rounded border"
                          style={{ backgroundColor: item.color }}
                        />

                        <button
                          onClick={() =>
                            setOpenPickerIndex(
                              openPickerIndex === index ? null : index,
                            )
                          }
                          className="px-2 py-1 bg-white rounded shadow text-xs"
                        >
                          <Edit3 size={14} />
                        </button>

                        {openPickerIndex === index && (
                          <input
                            type="color"
                            value={item.color}
                            onChange={(e) => {
                              const newColor = e.target.value;
                              setCart((prev) =>
                                prev.map((it, i) =>
                                  i === index ? { ...it, color: newColor } : it,
                                ),
                              );
                              setOpenPickerIndex(null);
                            }}
                            className="absolute top-8 right-0 cursor-pointer"
                          />
                        )}
                      </div>

                      {/* REMOVE */}
                      <button
                        onClick={() =>
                          setCart((prev) =>
                            prev.filter((c) => c.id !== item.id),
                          )
                        }
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals Section */}
            <div className="bg-indigo-50/30 p-3 md:p-4 rounded-xl space-y-2 text-xs md:text-sm mb-4 border border-indigo-50">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Order ID:{" "}
                  <span className="font-bold text-[#3A3D51]">
                    {isEditMode ? `TMS/ORD-${orderId}` : "New Order"}
                  </span>
                </span>
                <span className="font-bold">
                  Addon:
                  <span className="ml-4">
                    <button
                      onClick={() => setAddonModal(true)}
                      className="text-indigo-600 font-bold hover:underline"
                    >
                      {selectedAddon ? (
                        `AED ${addonPrice.toFixed(2)}`
                      ) : (
                        <Edit3 className="cursor-pointer" size={14} />
                      )}
                    </button>
                  </span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-slate-500 flex-1 min-w-0 text-left">
                  <div className="flex items-center">
                    <span>Remarks:</span>
                    <button
                      onClick={() => setRemarkModal(true)}
                      className="ml-4 text-indigo-600 font-bold hover:underline"
                    >
                      <Edit3 className="cursor-pointer" size={14} />
                    </button>
                  </div>
                  <p className="text-slate-700 wrap-break-word whitespace-normal mt-1">
                    {remarks}
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex justify-between w-full md:w-40">
                    <span>Sub Total:</span> <b>AED {subTotal.toFixed(2)}</b>
                  </div>
                  <div className="flex justify-between w-full md:w-40">
                    <span>Tax (5%):</span> <b>AED {tax.toFixed(2)}</b>
                  </div>
                  <div className="flex justify-between w-full md:w-40 relative">
                    <span>Discount %:</span>
                    {editingDiscount ? (
                      <div className="flex items-center box-border  gap-1 absolute right-0">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={discountInput}
                          onChange={(e) => {
                            let val = Number(e.target.value);
                            if (val > 100) val = 100;
                            if (val < 0) val = 0;
                            setDiscountInput(val);
                          }}
                          className="no-spinner border  outline-none focus:ring-0 w-8 px-1   bg-indigo-200"
                          autoFocus
                        />
                        <button
                          onClick={() => {
                            setDiscount(discountInput);
                            setEditingDiscount(false);
                          }}
                          className="p-0.5 bg-indigo-600 text-white rounded text-xs font-bold hover:bg-indigo-700"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => setEditingDiscount(false)}
                          className=" p-0.5 bg-gray-400 text-white rounded text-xs font-bold hover:bg-gray-500"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <b
                        onClick={() => {
                          setDiscountInput(discount);
                          setEditingDiscount(true);
                        }}
                        className="cursor-pointer hover:text-indigo-600 transition"
                      >
                        {discount} %
                      </b>
                    )}
                  </div>
                  <div className="flex justify-between w-full md:w-40 text-sm md:text-base mt-1 text-slate-800">
                    <span>Gross Total:</span> <b>AED {grandTotal.toFixed(2)}</b>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4">
              <div className="relative">
                <input
                  value={paidAmount}
                  onChange={(e) => {
                    setPaidAmount(e.target.value);
                    setErrors((prev) => ({ ...prev, paidAmount: "" }));
                  }}
                  type="text"
                  placeholder="Enter Payment"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-1 focus:ring-indigo-400 outline-none"
                />
                {errors.paidAmount && (
                  <span className="block text-red-500 font-semibold text-[11px] mt-1">
                    {errors.paidAmount}
                  </span>
                )}
              </div>
              <div className="relative">
                <select
                  value={paymentMethod}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    setErrors((prev) => ({ ...prev, paymentMethod: "" }));
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white text-slate-500 outline-none"
                >
                  <option value={""} disabled>
                    Payment Method
                  </option>
                  <option value="Settlement">Settlement</option>
                  <option value="Advance">Advance</option>
                  <option value="Cash">Cash</option>
                  <option value="Online">Online</option>
                  <option value="Card">Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
                {errors.paymentMethod && (
                  <span className="block text-red-500 font-semibold text-[11px] mt-1">
                    {errors.paymentMethod}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <button
                onClick={handleSaveOrder}
                className="flex-1 bg-indigo-600 text-white py-2 md:py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-md text-sm md:text-base"
              >
                {isEditMode ? "Update Order" : "Save"}
              </button>
              <button className="flex-1 bg-emerald-500 text-white py-2 md:py-3 rounded-xl font-bold hover:bg-emerald-600 shadow-md text-sm md:text-base">
                Print
              </button>
              <button
                onClick={handleResetOrder}
                className="flex-1 md:flex-none p-2 md:p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 shadow-md"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Service Configuration */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 md:p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>

            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-slate-800">
              {selectedService.name}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
              {selectedService.service_types.map((type) => (
                <button
                  key={type.type}
                  onClick={() => setSelectedType(type)}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    selectedType?.type === type.type
                      ? "border-indigo-600 bg-indigo-50 shadow-inner"
                      : "border-slate-100 hover:border-indigo-200"
                  }`}
                >
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-slate-100">
                    <img
                      src={`http://localhost:5000/${type.image}`}
                      alt=""
                      className="h-10 object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-slate-800 capitalize">
                      {type.type}
                    </div>
                    <div className="text-indigo-600 font-bold">
                      AED {type.price}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {isSqfEnabled && (
              <div className="bg-indigo-50 p-4 md:p-5 rounded-2xl mb-6">
                <h4 className="font-bold text-slate-700 mb-3 text-sm md:text-base">
                  Square Footage Calculator
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500">
                      Length (ft)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={length}
                      onChange={(e) => setLength(Number(e.target.value))}
                      className="w-full p-2 rounded-lg border mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-500">
                      Width (ft)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="w-full p-2 rounded-lg border mt-1"
                    />
                  </div>
                </div>

                <div className="mt-3 text-sm font-bold text-indigo-600">
                  Total Area: {sqft} sq.ft
                </div>
              </div>
            )}

            <div className="space-y-3 mb-8">
              {["normal", "express", "urgent"].map((key) => (
                <div
                  key={key}
                  className={`flex items-center justify-between p-4 rounded-xl border ${deliveryType === key ? "bg-indigo-50 border-indigo-200" : "border-slate-100"}`}
                >
                  <label className="flex items-center gap-3 cursor-pointer flex-1">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryType === key}
                      onChange={() => setDeliveryType(key)}
                      className="w-5 h-5 accent-indigo-600"
                    />
                    <span className="font-bold capitalize">{key} Delivery</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      disabled={editingType !== key}
                      value={prices[key]}
                      onChange={(e) =>
                        setPrices((prev) => ({
                          ...prev,
                          [key]: Number(e.target.value),
                        }))
                      }
                      className={`w-20 text-right font-bold p-1 rounded ${editingType === key ? "border-indigo-400 bg-white" : "bg-transparent border-transparent"}`}
                    />
                    <button
                      onClick={() => setEditingType(key)}
                      className="text-slate-400 hover:text-indigo-600"
                    >
                      <Edit3 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 bg-slate-50 p-3 md:p-4 rounded-2xl">
              <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
                <span className="font-bold text-sm md:text-base text-slate-500">
                  Quantity:
                </span>
                <div className="flex items-center bg-white border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 md:px-4 py-2 hover:bg-slate-50 text-sm md:text-base"
                  >
                    -
                  </button>
                  <span className="px-3 md:px-4 font-bold text-sm md:text-base">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-3 md:px-4 py-2 hover:bg-slate-50 text-sm md:text-base"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={addToCart}
                className="w-full md:w-auto bg-indigo-600 text-white px-6 md:px-8 py-2 md:py-4 rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition text-sm md:text-base whitespace-nowrap"
              >
                Add to Cart — AED {modalTotal.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}

      {remarkModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-3 md:p-4 z-50">
          <div className="bg-white p-4 md:p-5 rounded-xl w-full max-w-sm md:max-w-md">
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full border p-2 h-20 text-sm"
              placeholder="Enter remarks"
            />
            <button
              className="w-full bg-indigo-600 text-white py-2 md:py-3 rounded-xl font-bold mt-3 text-sm md:text-base"
              onClick={() => setRemarkModal(false)}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* MODAL: Addon Selection */}
      {addonModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-60 p-3 md:p-4">
          <div className="bg-white p-4 md:p-6 rounded-2xl w-full max-w-sm shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm md:text-lg">Select Addon</h3>
              <button onClick={() => setAddonModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="space-y-2 mb-6">
              <label className="flex items-center justify-between p-3 border rounded-xl hover:bg-slate-50 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="addon"
                    onChange={() => setSelectedAddon(null)}
                    checked={!selectedAddon}
                  />
                  <span>None</span>
                </div>
              </label>
              {addons.map((a) => (
                <label
                  key={a.id}
                  className="flex items-center justify-between p-3 border rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="addon"
                      onChange={() => setSelectedAddon(a)}
                      checked={selectedAddon?.id === a.id}
                    />
                    <span>{a.name}</span>
                  </div>
                  <b className="text-indigo-600">AED {a.price}</b>
                </label>
              ))}
            </div>
            <button
              onClick={() => setAddonModal(false)}
              className="w-full bg-indigo-600 text-white py-2 md:py-3 rounded-xl font-bold text-sm md:text-base"
            >
              Apply Addon
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ServiceGrid = ({ services = [], onServiceClick }) => {
  const BASE_URL = "http://localhost:5000/uploads/services";
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
      {services.map((item) => (
        <div
          key={item.id}
          onClick={() => onServiceClick(item)}
          className="bg-white p-3 md:p-4 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer text-center group"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
            <img
              src={`${BASE_URL}/${item.addIcon}`}
              alt={item.name}
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/150")
              }
            />
          </div>
          <p className="font-bold text-xs md:text-sm text-slate-700">
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default POS;

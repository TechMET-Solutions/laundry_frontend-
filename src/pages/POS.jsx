import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Search,
  ChevronDown,
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
import { MdOutlinePersonAddAlt } from "react-icons/md";
import AddCustomerModal from "./services/AddCustomerModal";

const POS = () => {
  // --- State Management ---
  const [services, setServices] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Customer Search
  const [allCustomers, setAllCustomers] = useState([]);
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [isCustomerSearchDropdownOpen, setIsCustomerSearchDropdownOpen] =
    useState(false);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const isSelectingCustomerRef = useRef(false);

  // Customer Modal
    const [openAddCustomerModal, setOpenAddCustomerModal] = useState(false);


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

    // --- Handlers ---

  const handleCustomerData = (customerData) => { 
    console.log("New customer added:", customerData);
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

  const addToCart = () => {
    const item = {
      id: Date.now(),
      name: selectedService.name,
      type: selectedType.type,
      deliveryType,
      price: prices[deliveryType],
      qty,
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
  const subTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart],
  );
  const tax = subTotal * 0.05;
  const addonPrice = selectedAddon ? Number(selectedAddon.price) : 0;
  const grandTotal = subTotal + tax + addonPrice;

  return (
    <div className="min-h-screen bg-[#f0f4f9] p-6 font-sans text-slate-700">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button className="p-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-slate-800">Create New Order</h1>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Side: Product Selection */}
        <div className="col-span-8">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search services..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm font-medium hover:bg-slate-50">
              Sort By Category <ChevronDown size={16} />
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20">Loading services...</div>
          ) : (
            <ServiceGrid
              services={services}
              onServiceClick={handleServiceClick}
            />
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="col-span-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-[calc(100vh-120px)]">
            {/* Dates */}
            <div className="flex justify-between mb-6 text-xs uppercase tracking-wider font-semibold text-slate-400">
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
                    {deliveryDate.split("-").reverse().join("-")}
                  </span>
                </div>

                <div className="relative w-4 h-4 cursor-pointer">
                  <FiCalendar className="text-indigo-600 w-5 h-5" />
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Customer & Driver Selection Inputs */}
            <div className="flex gap-2 mb-4">
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
                    //   setErrors((prev) => ({ ...prev, customerName: "" }));
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

                {/* {errors.customerName && (
            <span className="absolute left-0 top-7 text-red-500 font-semibold text-[12px] whitespace-nowrap mt-1">
              {errors.customerName}
            </span>
          )} */}
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
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
              {cart.length === 0 && (
                <p className="text-center text-slate-400 mt-10 text-sm">
                  No items in cart
                </p>
              )}
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-indigo-50/40 p-3 rounded-xl border border-indigo-100 relative group"
                >
                  <div className="flex justify-between items-start">
                    <div className="max-w-[60%]">
                      <h4 className="font-bold text-slate-800 text-sm truncate">
                        {item.name}
                      </h4>
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full uppercase">
                        {item.type}
                      </span>
                      <p className="text-xs font-bold mt-1">
                        AED {item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
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
                      <button
                        onClick={() =>
                          setCart(cart.filter((c) => c.id !== item.id))
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
            <div className="bg-indigo-50/30 p-4 rounded-xl space-y-2 text-sm mb-4 border border-indigo-50">
              <div className="flex justify-between">
                <span className="text-slate-500">Order ID:</span>
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
                        <Edit3 size={14} />
                      )}
                    </button>
                  </span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">
                  Remarks:
                  <button
                    onClick={() => setRemarkModal(true)}
                    className="ml-2 text-indigo-600 font-bold hover:underline"
                  >
                    <Edit3 size={14} />
                  </button>
                </span>
                <div className="text-right">
                  <div className="flex justify-between w-40">
                    <span>Sub Total:</span> <b>AED {subTotal.toFixed(2)}</b>
                  </div>
                  <div className="flex justify-between w-40">
                    <span>Tax (5%):</span> <b>AED {tax.toFixed(2)}</b>
                  </div>
                  <div className="flex justify-between w-40">
                    <span>Discount %:</span> <b>0 %</b>
                  </div>
                  <div className="flex justify-between w-40 text-base mt-1 text-slate-800">
                    <span>Gross Total:</span> <b>AED {grandTotal.toFixed(2)}</b>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <input
                type="text"
                placeholder="Enter Payment"
                className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-1 focus:ring-indigo-400 outline-none"
              />
              <select className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white text-slate-500 outline-none">
                <option>Payment Method</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button className="flex-[2] bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-md">
                Save
              </button>
              <button className="flex-[2] bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 shadow-md">
                Print
              </button>
              <button className="flex-none p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 shadow-md">
                <RotateCcw size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Service Configuration */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold mb-6 text-slate-800">
              {selectedService.name}
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-8">
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

            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl">
              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-500">Quantity:</span>
                <div className="flex items-center bg-white border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-2 hover:bg-slate-50"
                  >
                    -
                  </button>
                  <span className="px-4 font-bold">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-4 py-2 hover:bg-slate-50"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={addToCart}
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition"
              >
                Add to Cart — AED {(prices[deliveryType] * qty).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}

      {remarkModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-96">
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full border p-2"
              placeholder="Enter remarks"
            />
            <button onClick={() => setRemarkModal(false)}>Save</button>
          </div>
        </div>
      )}

      {/* MODAL: Addon Selection */}
      {addonModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Select Addon</h3>
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
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold"
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {services.map((item) => (
        <div
          key={item.id}
          onClick={() => onServiceClick(item)}
          className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer text-center group"
        >
          <div className="w-16 h-16 mx-auto mb-3 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
            <img
              src={`${BASE_URL}/${item.addIcon}`}
              alt={item.name}
              className="w-10 h-10 object-contain"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/150")
              }
            />
          </div>
          <p className="font-bold text-sm text-slate-700">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default POS;

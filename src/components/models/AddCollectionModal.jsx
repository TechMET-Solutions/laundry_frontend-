import React, { use, useEffect, useState } from "react";
import { createCollection, updateCollection } from "../../api/collection";
import { getAllCustomers } from "../../api/customer";
import { getAllEmployees } from "../../api/employee";
import { getAllTimeSlot } from "../../api/timeslot";
import { FiUser } from "react-icons/fi";

const AddCollectionModal = ({ mode, collection, onClose, onSuccess }) => {
  const isView = mode === "view";
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    collection_type: "CLOTH",
    customer_type: "",
    customer_id: "",
    customer_name: "",
    pickup_date: "",
    time_slot: "",
    phone_number: "",
    driver_id: "",
    comments: "",
  });

  // Customer search state
  const [allCustomers, setAllCustomers] = useState([]);
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [manuallyClosedCustomerDropdown, setManuallyClosedCustomerDropdown] =
    useState(false);

  //employee driver search state
  const [allEmployees, setAllEmployees] = useState([]);
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState("");
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);
  const [isEmployeeSearchDropdownOpen, setIsEmployeeSearchDropdownOpen] =
    useState(false);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(false);
  const [manuallyClosedEmployeeDropdown, setManuallyClosedEmployeeDropdown] =
    useState(false);

  const [allTimeSlots, setAllTimeSlots] = useState([]);
  const [isLoadingTimeSlots, setIsLoadingTimeSlots] = useState(false);
  const [timeSlotSearchTerm, setTimeSlotSearchTerm] = useState("");
  const [filteredTimeSlotList, setFilteredTimeSlotList] = useState([]);
  const [isTimeSlotSearchDropdownOpen, setIsTimeSlotSearchDropdownOpen] =
    useState(false);

  // Fetch timeslots on mount
  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        setIsLoadingTimeSlots(true);
        const response = await getAllTimeSlot();
        console.log("Timeslots fetched:", response.data.data);
        setAllTimeSlots(response.data.data || []);
      } catch (error) {
        console.error("Timeslot fetch error:", error);
      } finally {
        setIsLoadingTimeSlots(false);
      }
    };
    fetchTimeSlots();
  }, []);

  // Filter timeslots as search term changes - show only timeslots with type "time"
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("All timeslots:", allTimeSlots);
      const timeSlots = allTimeSlots.filter(
        (slot) =>
          slot.type &&
          typeof slot.type === "string" &&
          slot.type.toLowerCase() === "time",
      );
      console.log("Filtered timeslots (type=time):", timeSlots);

      // if search empty: show all time type slots
      if (!timeSlotSearchTerm.trim()) {
        setFilteredTimeSlotList(timeSlots);
        setIsTimeSlotSearchDropdownOpen(timeSlots.length > 0);
        return;
      }

      const filtered = timeSlots.filter((slot) => {
        const slotName = slot.time_slot || slot.name || "";
        return slotName
          .toLowerCase()
          .includes(timeSlotSearchTerm.toLowerCase().trim());
      });
      console.log("Filtered timeslots (search):", filtered);

      setFilteredTimeSlotList(filtered);
      setIsTimeSlotSearchDropdownOpen(filtered.length > 0);
    }, 300);

    return () => clearTimeout(timer);
  }, [timeSlotSearchTerm, allTimeSlots]);

  // Fetch employees on mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoadingEmployees(true);
        const response = await getAllEmployees();
        setAllEmployees(response.data.data || []);
      } catch (error) {
        console.error("Employee fetch error:", error);
      } finally {
        setIsLoadingEmployees(false);
      }
    };
    fetchEmployees();
  }, []);

  // Filter employees as search term changes - show only drivers and allow empty-search to list all drivers
  useEffect(() => {
    const timer = setTimeout(() => {
      const drivers = allEmployees.filter(
        (emp) =>
          emp.role &&
          typeof emp.role === "string" &&
          emp.role.toLowerCase() === "driver",
      );

      // if search empty: don't show dropdown
      if (!employeeSearchTerm.trim()) {
        setFilteredEmployeeList(drivers);
        setIsEmployeeSearchDropdownOpen(false);
        setManuallyClosedEmployeeDropdown(false);
        return;
      }

      const filtered = drivers.filter((employee) => {
        const fullName =
          `${employee.first_name || ""} ${employee.last_name || ""}`.trim();
        return fullName
          .toLowerCase()
          .includes(employeeSearchTerm.toLowerCase().trim());
      });

      setFilteredEmployeeList(filtered);
      // Only reopen if not manually closed
      if (!manuallyClosedEmployeeDropdown) {
        setIsEmployeeSearchDropdownOpen(filtered.length > 0);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [employeeSearchTerm, allEmployees, manuallyClosedEmployeeDropdown]);

  // Fetch customers on mount
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

  // Filter customers as search term changes - trim the search
  useEffect(() => {
    if (!customerSearchTerm.trim()) {
      setFilteredCustomerList([]);
      setIsSearchDropdownOpen(false);
      setManuallyClosedCustomerDropdown(false);
      return;
    }

    const timer = setTimeout(() => {
      const filtered = allCustomers.filter((customer) =>
        customer.name && typeof customer.name === "string"
          ? customer.name
              .toLowerCase()
              .includes(customerSearchTerm.toLowerCase().trim())
          : false,
      );

      setFilteredCustomerList(filtered);
      // Only reopen if not manually closed
      if (!manuallyClosedCustomerDropdown) {
        setIsSearchDropdownOpen(filtered.length > 0);
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [customerSearchTerm, allCustomers, manuallyClosedCustomerDropdown]);

  useEffect(() => {
    if (collection) {
      setForm({
        collection_type: collection.collection_type || "CLOTH",
        customer_type: collection.customer_type || "",
        customer_id: collection.customer_id || "",
        pickup_date: collection.pickup_date || "",
        time_slot: collection.time_slot || "",
        phone_number: collection.phone_number || "",
        driver_id: collection.driver_id || "",
        comments: collection.comments || "",
      });

      // Set driver name in search term if driver_id exists
      if (collection.driver_id && allEmployees.length > 0) {
        const driver = allEmployees.find(
          (emp) => emp.id === collection.driver_id,
        );
        if (driver) {
          const fullName =
            `${driver.first_name || ""} ${driver.last_name || ""}`.trim();
          setEmployeeSearchTerm(fullName);
        }
      }
    }
  }, [collection, allEmployees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Trim string inputs for text fields
    const trimmedValue = [
      "customer_type",
      "phone_number",
      "driver_id",
      "comments",
    ].includes(name)
      ? value.trim()
      : value;
    setForm((prev) => ({ ...prev, [name]: trimmedValue }));
  };

  const handleTypeChange = (type) => {
    setForm((prev) => ({
      ...prev,
      collection_type: type,
      customer_type: type === "PAYMENT" ? "" : prev.customer_type,
    }));
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".relative")) {
        setIsEmployeeSearchDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsSearchDropdownOpen(false);
      setIsEmployeeSearchDropdownOpen(false);
      setIsTimeSlotSearchDropdownOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.customer_name || !form.customer_name.trim()) {
      alert("Please select a customer");
      return;
    }
    if (!form.phone_number || !form.phone_number.trim()) {
      alert("Please enter a phone number");
      return;
    }
    if (!form.driver_id) {
      alert("Please select a driver");
      return;
    }
    if (!form.time_slot) {
      alert("Please select a time slot");
      return;
    }

    try {
      let response;
      console.log("Form data being submitted:", form);

      if (isEdit) {
        response = await updateCollection(collection.id, form);
      } else {
        response = await createCollection(form);
      }

      console.log("Response from backend:", response);
      // send the REAL collection returned by backend
      onSuccess?.(response.data.data || response.data);

      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "Error: " +
          (error.response?.data?.message ||
            error.message ||
            "Failed to save collection"),
      );
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"></div>

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-[520px] rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-lg font-semibold mb-4">
            {isView
              ? "View Collection"
              : isEdit
                ? "Edit Collection"
                : "Add Collection"}
          </h2>

          {/* Collection Type */}
          <div className="flex gap-6 mb-4 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={form.collection_type === "CLOTH"}
                onChange={() => handleTypeChange("CLOTH")}
                disabled={isView}
              />
              Cloth Collection
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={form.collection_type === "PAYMENT"}
                onChange={() => handleTypeChange("PAYMENT")}
                disabled={isView}
              />
              Payment Collection
            </label>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {form.collection_type === "CLOTH" && (
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Customer Type
                </label>
                <select
                  name="customer_type"
                  value={form.customer_type}
                  onChange={handleChange}
                  disabled={isView}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select Customer Type</option>
                  <option value="Individual">Individual</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>
            )}

            {/* Customer Search Dropdown */}
            <div className="relative">
              <label className="block text-gray-600 font-medium mb-1">
                Customer <span className="text-red-500">*</span>
              </label>
              <div
                onClick={() => setIsSearchDropdownOpen(true)}
                className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 cursor-pointer border"
              >
                <FiUser className="text-gray-600" />
                <input
                  type="text"
                  value={customerSearchTerm}
                  placeholder="Search customer"
                  onClick={() => setIsSearchDropdownOpen(true)}
                  onChange={(e) => {
                    setCustomerSearchTerm(e.target.value);
                  }}
                  disabled={isView}
                  className="w-full bg-gray-100 rounded-lg text-sm outline-none font-medium"
                />
              </div>

              {/* DROPDOWN */}
              {isSearchDropdownOpen && (
                <ul className="absolute left-0 top-full mt-2 w-full bg-white rounded-lg shadow-lg z-50 max-h-48 overflow-auto border">
                  {isLoadingCustomers && (
                    <li className="p-2 text-sm text-gray-400">Searching...</li>
                  )}

                  {!isLoadingCustomers && filteredCustomerList.length > 0
                    ? filteredCustomerList.map((customer) => (
                        <li
                          key={customer.id}
                          className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setCustomerSearchTerm(customer.name);
                            setForm((prev) => ({
                              ...prev,
                              customer_name: customer.name,
                              customer_id: customer.id,
                            }));
                            setIsSearchDropdownOpen(false);
                            setManuallyClosedCustomerDropdown(true);
                          }}
                        >
                          {customer.name}
                        </li>
                      ))
                    : !isLoadingCustomers && (
                        <li className="p-2 text-sm text-gray-400">
                          No customers found
                        </li>
                      )}
                </ul>
              )}
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Pickup Date
              </label>
              <input
                type="date"
                name="pickup_date"
                value={form.pickup_date}
                onChange={handleChange}
                disabled={isView}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <label className="block text-gray-600 font-medium mb-1">
                Time Slot
              </label>
              <div
                onClick={() => setIsTimeSlotSearchDropdownOpen(true)}
                className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 cursor-pointer border"
              >
                <select
                  className="w-full bg-gray-100 rounded-lg text-sm outline-none font-medium"
                  name="time_slot"
                  id="time_slot"
                  value={form.time_slot}
                  onChange={handleChange}
                  disabled={isView}
                >
                  <option value="">Select Time Slot</option>
                  {allTimeSlots.map((slot) => (
                    <option key={slot.id} value={slot.time_slot || slot.name}>
                      {slot.time_slot || slot.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                disabled={isView}
                placeholder="10-digit phone number"
                pattern="^[0-9]{10}$"
                inputMode="numeric"
                maxLength={10}
                required
                title="Phone number must be exactly 10 digits"
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Driver <span className="text-red-500">*</span>
              </label>

              {/* THIS becomes positioning parent */}
              <div className="relative">
                <input
                  type="text"
                  value={employeeSearchTerm}
                  placeholder="Search driver"
                  onFocus={() => setIsEmployeeSearchDropdownOpen(true)}
                  onChange={(e) => setEmployeeSearchTerm(e.target.value)}
                  disabled={isView}
                  className="w-full bg-gray-100 rounded-lg text-sm outline-none font-medium p-2 border cursor-pointer"
                />

                {/* DROPDOWN */}
                {isEmployeeSearchDropdownOpen && (
                  <ul className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg z-50 max-h-48 overflow-auto border">
                    {isLoadingEmployees ? (
                      <li className="p-2 text-sm text-gray-400">
                        Searching...
                      </li>
                    ) : filteredEmployeeList.length > 0 ? (
                      filteredEmployeeList.map((employee) => (
                        <li
                          key={employee.id}
                          className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            const fullName = `${employee.first_name || ""} ${employee.last_name || ""}`;
                            setEmployeeSearchTerm(fullName);
                            setForm((prev) => ({
                              ...prev,
                              driver_id: employee.id,
                            }));
                            setIsEmployeeSearchDropdownOpen(false);
                            setManuallyClosedEmployeeDropdown(true);
                          }}
                        >
                          {`${employee.first_name || ""} ${employee.last_name || ""}`.trim()}
                        </li>
                      ))
                    ) : (
                      <li className="p-2 text-sm text-gray-400">
                        No drivers found
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-600 font-medium mb-1">
              Comments
            </label>
            <textarea
              name="comments"
              value={form.comments}
              onChange={handleChange}
              disabled={isView}
              className="border w-full p-2 rounded"
              placeholder="Comments"
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>

            {!isView && (
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                {isEdit ? "Update" : "Save"}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCollectionModal;

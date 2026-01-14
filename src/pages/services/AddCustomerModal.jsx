import { useState } from "react";
import { FiX } from "react-icons/fi";

const AddCustomerModal = ({ onClose, onSave }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    typeofcustomer: "",
    phonenumber: "",
    whatsappnumber: "",
    email: "",
    emirates: "",
    area: "",
    appartmentnumber: "",
    buildingname: "",
    maplocation: "",
    taxnumber: "",
    address: "",
    notes: "",
    active: true,
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Handle switch toggle
  const handleSwitchToggle = () => {
    setFormData({
      ...formData,
      active: !formData.active,
    });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.name.trim()) {
      newErrors.name = "Customer name is required";
    }
    
    if (!formData.typeofcustomer) {
      newErrors.typeofcustomer = "Customer type is required";
    }
    
    if (!formData.phonenumber.trim()) {
      newErrors.phonenumber = "Phone number is required";
    } else if (!/^[\d\s\-+()]{8,}$/.test(formData.phonenumber.replace(/\D/g, ''))) {
      newErrors.phonenumber = "Please enter a valid phone number";
    }
    
    if (!formData.emirates.trim()) {
      newErrors.emirates = "Emirates is required";
    }
    
    if (!formData.area.trim()) {
      newErrors.area = "Area is required";
    }
    
    // Email validation (if provided)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // WhatsApp number validation (if provided)
    if (formData.whatsappnumber && !/^[\d\s\-+()]{8,}$/.test(formData.whatsappnumber.replace(/\D/g, ''))) {
      newErrors.whatsappnumber = "Please enter a valid WhatsApp number";
    }
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Format the data for parent component
    const customerData = {
      ...formData,
      id: Date.now(),
      status: formData.active ? "Active" : "Inactive",
    };
    
    // Pass data to parent
    onSave(customerData);
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"></div>

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 text-gray-700">
        <div className="bg-white w-[600px] rounded-2xl shadow-xl p-6">
          
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Add New Customer</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
            >
              <FiX className="text-gray-500 text-lg" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              
              {/* Row 1: 3 Fields - Name, Customer Type, Phone */}
              <div className="grid grid-cols-3 gap-4">
                {/* Customer Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Customer Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Type *
                  </label>
                  <select
                    name="typeofcustomer"
                    value={formData.typeofcustomer}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                      errors.typeofcustomer ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Choose Type</option>
                    <option value="Individual">Individual</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Retail">Retail</option>
                  </select>
                  {errors.typeofcustomer && (
                    <p className="mt-1 text-xs text-red-500">{errors.typeofcustomer}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phonenumber"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                      errors.phonenumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Phone number"
                  />
                  {errors.phonenumber && (
                    <p className="mt-1 text-xs text-red-500">{errors.phonenumber}</p>
                  )}
                </div>
              </div>

              {/* Row 2: 3 Fields - WhatsApp, Email, Emirates */}
              <div className="grid grid-cols-3 gap-4">
                {/* WhatsApp Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="whatsappnumber"
                    value={formData.whatsappnumber}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                      errors.whatsappnumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="WhatsApp number"
                  />
                  {errors.whatsappnumber && (
                    <p className="mt-1 text-xs text-red-500">{errors.whatsappnumber}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Emirates */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Emirates *
                  </label>
                  <select
                    name="emirates"
                    value={formData.emirates}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                      errors.emirates ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Emirates</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman">Ajman</option>
                    <option value="Umm Al Quwain">Umm Al Quwain</option>
                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                    <option value="Fujairah">Fujairah</option>
                  </select>
                  {errors.emirates && (
                    <p className="mt-1 text-xs text-red-500">{errors.emirates}</p>
                  )}
                </div>
              </div>

              {/* Row 3: 3 Fields - Area, Apartment, Building */}
              <div className="grid grid-cols-3 gap-4">
                {/* Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Area *
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                      errors.area ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Area"
                  />
                  {errors.area && (
                    <p className="mt-1 text-xs text-red-500">{errors.area}</p>
                  )}
                </div>

                {/* Apartment Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apartment/Villa #
                  </label>
                  <input
                    type="text"
                    name="appartmentnumber"
                    value={formData.appartmentnumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Apt/Villa #"
                  />
                </div>

                {/* Building Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Building Name
                  </label>
                  <input
                    type="text"
                    name="buildingname"
                    value={formData.buildingname}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Building name"
                  />
                </div>
              </div>

              {/* Row 4: 2 Fields - Map Location & Tax Number */}
              <div className="grid grid-cols-2 gap-4">
                {/* Map Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Map Location
                  </label>
                  <input
                    type="text"
                    name="maplocation"
                    value={formData.maplocation}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Map location link"
                  />
                </div>

                {/* Tax Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax Number (TRN)
                  </label>
                  <input
                    type="text"
                    name="taxnumber"
                    value={formData.taxnumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Tax registration number"
                  />
                </div>
              </div>

              {/* Row 5: Address (full width) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                  placeholder="Complete address details"
                />
              </div>

              {/* Row 6: Notes (full width) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                  placeholder="Any additional information"
                />
              </div>

              {/* Active/Inactive Status */}
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm font-medium text-gray-700">
                  Status:
                </span>
                <button
                  type="button"
                  onClick={handleSwitchToggle}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formData.active ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                      formData.active ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <button
                  type="button"
                  onClick={handleSwitchToggle}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition cursor-pointer ${
                    formData.active 
                      ? 'bg-green-100 text-green-700 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 border border-gray-300'
                  }`}
                >
                  {formData.active ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>

            {/* Buttons - Cancel & Save */}
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition cursor-pointer text-sm"
              >
                Save Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCustomerModal; 
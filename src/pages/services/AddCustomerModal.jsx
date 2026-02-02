import { useState, useEffect,} from "react";
import { FiX } from "react-icons/fi";
import { createCustomers, updateCustomers } from "../../api/customer";
import { getAllEmiratesFetch } from "../../api/location_management"; 
//import { getAllAreas } from "../../api/location_management";
import { getAllAreas } from "../../api/area";
import { useAsyncError } from "react-router-dom";

const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

const AddCustomerModal = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    name: "",
    typeofcustomer: "",
    phonenumber: "",
    whatsappnumber: "",
    email: "",
    emirate: "",
    area: "",
    appartmentnumber: "",
    buildingname: "",
    maplocation: "",
    taxnumber: "",
    address: "",
    notes: "",
    active: true,
  });

  // filtered dropdown data
  const [emirates, setEmirates] = useState([]);
  const [areas, setAreas] = useState([]);

  const [errors, setErrors] = useState({});

// emirates fetch
  useEffect(() => {
    const fetchEmirates = async () => {
      try {
        const res = await getAllEmiratesFetch(); // get all
        const allEmirates = res.data.data || [];

        // status == 0 ko remove karo
        const activeEmirates = allEmirates.filter(
          (item) => item.status !== 0
        );

        console.log("ACTIVE EMIRATES:", activeEmirates);
        setEmirates(activeEmirates);
      } catch (error) {
        console.error("Failed to fetch emirates", error);
      }
    };

    fetchEmirates();
  }, []);


  // areas fetch
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const res = await getAllAreas(1, 100);
        // console.log("ALL AREAS:", res.data.data);
        setAreas(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch areas", error);
      }
    };
    fetchAreas();
  }, []);


  /* ✅ ADDED */
  const [loading, setLoading] = useState(false);

  /* ===============================
     AUTO FILL FORM ON EDIT
     =============================== */
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        typeofcustomer: capitalize(editData.type), // ✅ FIX
        phonenumber: editData.mobile_no || "",
        whatsappnumber: editData.whatsapp_no || "",
        email: editData.email || "",
        //emirates: editData.emirates || "",
        emirate: editData.emirates || "",
        area: editData.area || "",
        appartmentnumber: editData.apartment_number || "",
        buildingname: editData.building_name || "",
        maplocation: editData.map_location || "",
        taxnumber: editData.tax_number || "",
        address: editData.address || "",
        notes: editData.notes || "",
        active: editData.status === 1,
      });
    }
  }, [editData]);

  const validateForm = () => {
    let newErrors = {};

    if(!formData.name.trim()) {
      newErrors.name = "Customer name Required";
    }

    if(!formData.emirate.trim()) {
      newErrors.emirate = "Emirates required"
    }

    if(!formData.area.trim()) {
      newErrors.area = "Area required"
    }

    if(!formData.email.trim()) {
      newErrors.email = "email required"
    }

    if(!formData.typeofcustomer.trim()) {
      newErrors.typeofcustomer = "Customer type required"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  }

  /* ===============================
     EXISTING LOGIC (UNCHANGED)
     =============================== */
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    // Apply numeric + length restriction for both numbers
    if (name === "phonenumber" || name === "whatsappnumber") {
      const numericValue = value.replace(/\D/g, "");

      if (numericValue.length > 10) {
        alert("Mobile number must be 10 digits only.");
        return;
      }

      updatedValue = numericValue;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name] : "",
    }))
  };

  const handleSwitchToggle = () => {
    setFormData({ ...formData, active: !formData.active });
  };

//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!validatePhoneNumbers()) {
//     return;
//   }

//   const customerData = {
//     name: formData.name,
//     type: formData.typeofcustomer.toLowerCase(),
//     mobile_no: formData.phonenumber,
//     whatsapp_no: formData.whatsappnumber,
//     email: formData.email,
//     emirates: formData.emirate,
//     area: formData.area,
//     apartment_number: formData.appartmentnumber,
//     building_name: formData.buildingname,
//     map_location: formData.maplocation,
//     tax_number: formData.taxnumber,
//     address: formData.address,
//     status: formData.active ? 1 : 0,
//   };

//   try {
//     setLoading(true);

//     if (editData) {
//       await updateCustomers(editData.id, customerData);
//     } else {
//       await createCustomers(customerData);
//     }

//     await onSave();  
//     onClose();
//   } catch (error) {
//     alert("Failed to save customer");
//   } finally {
//     setLoading(false);
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return; // Stop API call
  }

  if (!validatePhoneNumbers()) {
    return;
  }

  const customerData = {
    name: formData.name,
    type: formData.typeofcustomer.toLowerCase(),
    mobile_no: formData.phonenumber,
    whatsapp_no: formData.whatsappnumber,
    email: formData.email,
    emirates: formData.emirate,
    area: formData.area,
    apartment_number: formData.appartmentnumber,
    building_name: formData.buildingname,
    map_location: formData.maplocation,
    tax_number: formData.taxnumber,
    address: formData.address,
    status: formData.active ? 1 : 0,
  };

  try {
      setLoading(true);

      if (editData) {
        await updateCustomers(editData.id, customerData);
      } else {
        await createCustomers(customerData);
      }

      await onSave();
      onClose();
    } catch (error) {
      alert("Failed to save customer");
    } finally {
      setLoading(false);
    }
  };


  const validatePhoneNumbers = () => {
  if (formData.phonenumber.length !== 10) {
    alert("Phone number must be 10 digits");
    return false;
  }

  if (
    formData.whatsappnumber &&
    formData.whatsappnumber.length !== 10
  ) {
    return false;
  }
  return true;
};

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50"></div>

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-[800px] rounded-xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {editData ? "Edit Customer" : "Add New Customer"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FiX className="text-gray-500 text-lg" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1 */}
            <div className="grid grid-cols-3 gap-4">
              <Field label="Customer Name" required>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Customer Name"
                  className="w-full px-3 py-2 border rounded-lg text-sm border border-[#BEC3E4]"
                />
                {errors.name && (
                  <span className="text-xs text-red-500">{errors.name}</span>
                )}
              </Field>

              <Field label="Type of Customer" required>
                <select
                  name="typeofcustomer"
                  value={formData.typeofcustomer}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm border border-[#BEC3E4]"
                >
                  <option value="">Choose Customer Type</option>
                  <option value="Individual">Individual</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Retail">Retail</option>
                </select>
                {errors.typeofcustomer && (
                  <span className="text-xs text-red-500">{errors.typeofcustomer}</span>
                )}
              </Field>

              <Field label="Phone Number" required>
                <input
                  type="tel"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm border border-[#BEC3E4]"
                />
              </Field>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-3 gap-4">
              <Field label="WhatsApp Number">
                <input
                  type="tel"
                  name="whatsappnumber"
                  value={formData.whatsappnumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm border border-[#BEC3E4]"
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm border border-[#BEC3E4]"
                />
                {errors.email && (
                  <span className="text-xs text-red-500">{errors.email}</span>
                )}
              </Field>

              {/* <Field label="Emirates" required>
                  <select
                    name="emirates"
                    value={formData.emirates}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm border border-[#BEC3E4]"
                  >
                    <option value="">Emirates</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman">Ajman</option>
                  </select>
                </Field> */}

                <Field label="Emirates" required>
                  <select
                    name="emirate"
                    value={formData.emirate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm border border-[#BEC3E4]"
                  >
                    <option value="">Emirates</option>
                    {emirates.map((item) => (
                      <option key={item.id} value={item.emirate}>
                        {item.emirate}
                      </option>
                    ))}
                  </select>
                  {errors.emirate && (
                    <span className="text-xs text-red-500">{errors.emirate}</span>
                  )}
                </Field>

            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-3 gap-4">
              {/* <Field label="Area" required>
                <input
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm border border-[#BEC3E4]"
                />
              </Field> */}

              <Field label="Area" required>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm border border-[#BEC3E4]"
                >
                  <option value="">Select Area</option>
                  {areas.map((item) => (
                    <option key={item.id} value={item.area}>
                      {item.area}
                    </option>
                  ))}
                </select>
                {errors.area && (
                  <span className="text-xs text-red-500">{errors.area}</span>
                )}
              </Field>

              <Field label="Apartment Number">
                <input
                  name="appartmentnumber"
                  value={formData.appartmentnumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm border border-[#BEC3E4]"
                />
              </Field>

              <Field label="Building Name">
                <input
                  name="buildingname"
                  value={formData.buildingname}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm border border-[#BEC3E4]"
                />
              </Field>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Map Location">
                <input
                  name="maplocation"
                  value={formData.maplocation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm border border-[#BEC3E4]"
                />
              </Field>

              <Field label="Tax Number (VAT)">
                <input
                  name="taxnumber"
                  value={formData.taxnumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm border border-[#BEC3E4]"
                />
              </Field>
            </div>

            {/* Address */}
            <Field label="Address">
              <textarea
                rows="2"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-sm border border-[#BEC3E4] resize-none "
              />
            </Field>

            {/* Status */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Is Active?</span>
              <button
                type="button"
                onClick={handleSwitchToggle}
                className={`w-11 h-6 rounded-full ${formData.active ? "bg-green-500" : "bg-gray-300"
                  } relative`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${formData.active ? "right-1" : "left-1"
                    }`}
                />
              </button>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

/* ---------- Reusable Label Wrapper ---------- */
const Field = ({ label, required, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

/* ---------- Input Style ---------- */
const inputStyle =
  "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

export default AddCustomerModal;

import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { createEmployee, updateEmployee } from "../../api/employee";
import { formatDateForInput } from "../../utils/formatDateForInput";

function AddNewEmployee({ onClose, role, mode = "add", employee, onSuccess }) {
  const [selectedRole, setSelectedRole] = useState(employee?.role || "");

  const [form, setForm] = useState({
    first_name: employee?.first_name || "",
    last_name: employee?.last_name || "",
    role: employee?.role || "",
    mobile_no: employee?.mobile_no || "",
    email: employee?.email || "",
    password: "",
    dob: employee?.dob || "",
    hire_date: employee?.hire_date || "",
    address: employee?.address || "",
    vehicle_id: employee?.vehicle_id || "",
    license_no: employee?.license_no || "",
    status: employee?.status ?? 1,
  });

  useEffect(() => {
    if (employee) {
      setForm({
        first_name: employee.first_name || "",
        last_name: employee.last_name || "",
        role: employee.role || "",
        mobile_no: employee.mobile_no || "",
        email: employee.email || "",
        password: "",
        dob: employee.dob || "",
        hire_date: employee.hire_date || "",
        address: employee.address || "",
        vehicle_id: employee.vehicle_id || "",
        license_no: employee.license_no || "",
        status: employee.status ?? 1,
      });
      setSelectedRole(employee.role || "");
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    // Apply mobile-specific logic
    if (name === "mobile_no") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 10) {
        alert("Mobile number must be 10 digits only.");
        return;
      }
      updatedValue = numericValue;
    }

    setForm((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };


  const handleRoleChange = (e) => {
    const value = e.target.value;
    setSelectedRole(value);
    setForm((prev) => ({ ...prev, role: value }));
  };

  const isView = mode === "view";
  const isEdit = mode === "edit";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateEmployee(employee.id, form);
    } else {
      await createEmployee(form);
    }
    onSuccess?.();
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] max-h-[90vh] overflow-y-auto rounded-[10px] p-6 shadow-lg relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            {isView ? "View Employee" : isEdit ? "Edit Employee" : "Add Employee"}
          </h2>
          <button onClick={onClose}>
            <IoIosClose className="w-9 h-9 text-gray-500 hover:text-black" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <label className="text-sm text-gray-600 font-medium">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                name="first_name"
                type="text"
                placeholder="First Name"
                value={form.first_name}
                disabled={isView}
                onChange={handleChange}
                className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                name="last_name"
                type="text"
                placeholder="Last Name"
                value={form.last_name}
                disabled={isView}
                onChange={handleChange}
                className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">
                Select Role <span className="text-red-500">*</span>
              </label>

              <select
                name="role"
                value={form.role}
                onChange={handleRoleChange}
                disabled={isView}
                className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px] bg-white"
              >
                <option value="">Select Role</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Driver">Driver</option>
              </select>

            </div>


            <div>
              <label className="text-sm text-gray-600 font-medium">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                name="mobile_no"
                type="text"
                placeholder="Phone Number"
                value={form.mobile_no}
                disabled={isView}
                onChange={handleChange}
                maxLength={10}
                pattern="[0-9]{10}"
                className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
                disabled={isView}
                className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="********"
                onChange={handleChange}
                value={form.password}
                disabled={isView}
                className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">D.O.B</label>
              <input
                name="dob"
                type="date"
                onChange={handleChange}
                value={formatDateForInput(form.dob)}
                disabled={isView}
                className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">Hire Date</label>
              <input
                name="hire_date"
                type="date"
                onChange={handleChange}
                value={formatDateForInput(form.hire_date)}
                disabled={isView}
                className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px]"
              />
            </div>


            {form.role === "Driver" && (
              <>
                <div>
                  <label className="text-sm text-gray-600 font-medium">
                    Vehicle ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="vehicle_id"
                    type="text"
                    onChange={handleChange}
                    value={form.vehicle_id}
                    disabled={isView}
                    className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 font-medium">
                    License Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="license_no"
                    type="text"
                    onChange={handleChange}
                    value={form.license_no}
                    disabled={isView}
                    className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px]"
                  />
                </div>
              </>
            )}


            <div className="col-span-2">
              <label className="text-sm text-gray-600 font-medium">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                name="address"
                type="text"
                onChange={handleChange}
                value={form.address}
                disabled={isView}
                className="mt-1 w-full h-[38px] px-3 text-sm border border-[#E2E8F0] rounded-[8px]"
              />
            </div>
          </div>

          <div className="flex justify-end items-center mt-8 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm border border-indigo-500 text-indigo-600 rounded-[8px]"
            >
              Cancel
            </button>
            {/* <button
              type="submit"
              className="px-6 py-2 text-sm bg-indigo-600 text-white rounded-[8px]"
            >
              Save
            </button> */}
            {!isView && (
              <button type="submit" className="px-6 py-2 bg-indigo-600 text-white">
                {isEdit ? "Update" : "Save"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewEmployee;

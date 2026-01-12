import Button from "../../components/ui/Button";
import InputWithDropdown from "../../components/ui/DropDownInputField";
import InputField from "../../components/ui/InputField";
import ToggleButton from "../../components/ui/ToggleButton";

function AddServices_PopUp({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Modal */}
      <div className="w-full max-w-3xl rounded-2xl bg-white p-10 shadow-2xl">
        {/* Header */}
        <h2 className="mb-8 text-lg font-semibold text-gray-800">
          Add Service
        </h2>

        {/* Form */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-8">
          <InputField label="Service Name" placeholder="Service Name" required={false} />

          {/* Add Icon */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Add Icon
            </label>
            <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700">
              <span className="text-lg leading-none">+</span>
              Add Service Icon
            </button>
          </div>

          <InputWithDropdown
            label="Choose Category"
            placeholder="Choose Category"
             required={false}
          />

          {/* Sorting Order + SQF */}
          <div className="grid grid-cols-[1fr_auto] gap-6 items-end">
            <InputWithDropdown label="Sorting Order" placeholder="55"  required={false} />

            <ToggleButton label="Is Active SQF" />
          </div>

          <InputWithDropdown
            label="Select Service type"
            placeholder="Select Service type"
             required={false}
          />

          {/* Service Price */}
          <div className="grid grid-cols-[1fr_auto] gap-6 items-end">
            <InputField label="Service Price" placeholder="Service Price" />

            <button className="flex items-center gap-1 rounded-xl bg-indigo-600 px-4  py-3 text-sm font-medium text-white hover:bg-indigo-700">
              <span className="text-lg leading-none">+</span>
              <span className="leading-none">Add Service</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ToggleButton label="Is Active" />
          </div>

          <div className="flex gap-4">
            <Button btnText="Cancel" variant="outline" onClick={onClose} />
            <Button btnText="Save" variant="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddServices_PopUp;

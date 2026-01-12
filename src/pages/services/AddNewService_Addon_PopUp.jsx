import Button from "../../components/ui/Button";
import InputWithDropdown from "../../components/ui/DropDownInputField";
import InputField from "../../components/ui/InputField";
import ToggleButton from "../../components/ui/ToggleButton";
export default function AddNewService_Addon_PopUp({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Modal */}
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 shadow-2xl">
        {/* Header */}
        <h2 className="mb-8 text-lg font-semibold text-gray-800">Add Addon</h2>

        {/* Form */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-8">
          <InputField
            label="Addon Name"
            placeholder="Addon Name"
            required={true}
          />
          <InputField
            label="Addon Price"
            placeholder="Addon Price"
            required={true}
          />
        </div>

          
          <div className="flex items-center gap-3 mt-3">
            <ToggleButton label="Is Active" />
          </div>
          {/* Footer */}

          <div className="mt-10 flex items-center justify-center gap-6">
            <Button btnText="Cancel" variant="outline" onClick={onClose} />
            <Button btnText="Save" variant="primary" />
          </div>
        
      </div>
    </div>
  );
}

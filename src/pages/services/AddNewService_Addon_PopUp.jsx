import { use, useState } from "react";
import Button from "../../components/ui/Button";
import InputWithDropdown from "../../components/ui/DropDownInputField";
import InputField from "../../components/ui/InputField";
import ToggleButton from "../../components/ui/ToggleButton";
export default function AddNewService_Addon_PopUp({ onClose }) {

  const [serviceAddons, setServiceAddons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState(1);
  const [addOn, setAddOn] = useState(""); 

  const handleSave = async () => {
  
    if (!name || !price) {
      alert("Please fill all required fields");
      return;
    } 
    try {
      setLoading(true);

      const res = editData
      ? await updateServiceType(editData.id, { name, price, status })
      : await createServiceType({ name, price, status });
      // API call to save addon
      // const res = await createServiceAddon({ name, price, status });

      if (res.data.data) {
        setServiceAddons((prev) => [res.data.data, ...prev]);
      }

      const result = await createServiceAddon({ name, price, status });
      

      if (res.data.success) throw new Error("API failed");

      if(!editData) {
        onAdd(res.data.data); // ADD
      } else {
        onAdd(); //Edit
      }

      onClose();
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setLoading(false);
    }
  }




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
            <Button btnText="Save" variant="primary" onClick={handleSave} />
          </div>
        
      </div>
    </div>
  );
}

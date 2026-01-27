import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import InputWithDropdown from "../../components/ui/DropDownInputField";
import InputField from "../../components/ui/InputField";
import ToggleButton from "../../components/ui/ToggleButton";
import { createNewServiceAddon, createServiceType, updateServiceAddon } from "../../api/servicesapi";
import { updateServiceType } from "../../api/servicesapi";  



export default function AddNewService_Addon_PopUp({ onClose, onAdd, editData = null}) {

  const [name, setName] = useState(editData?.name ||"");
  const [price, setPrice] = useState(editData?.price !== undefined ? String(editData.price) : "");
  const [status, setStatus] = useState(editData?.status ?? 1);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
  
    if (!name || !price) {
      alert("Please fill all required fields");
      return;
    } 
    try {
        setLoading(true);

        const payload = {
          name,
          price: Number(price),
          status
        };

    
        const res = editData
          ? await updateServiceAddon(editData.id, { name, price, status })
          : await createNewServiceAddon({ name,price, status });
    
        if (!res.data.success) throw new Error("API failed");
       
        if (!editData) {
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
        };
        
    useEffect(() => {
      if (editData) {
        setName(editData.name || "");
        setPrice(String(editData.price || ""));
        setStatus(editData.status ?? 1);
      }
    }, [editData]);

      


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
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            label="Addon Price"
            placeholder="Addon Price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

          
          <div className="flex items-center gap-3 mt-3">
            <ToggleButton label="Is Active"
            checked = {status === 1}
            onChange={(val) => setStatus(val)} />
          </div>
          {/* Footer */}

          <div className="mt-10 flex items-center justify-center gap-6">
            <Button btnText="Cancel" variant="outline" onClick={onClose} />
            <Button btnText="Save" variant="primary" onClick={handleSave} disabled={loading} />
          </div>
        
      </div>
    </div>
  );
}

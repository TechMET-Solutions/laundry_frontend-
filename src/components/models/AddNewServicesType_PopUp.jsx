import Button from "../../components/ui/Button";
import InputWithDropdown from "../../components/ui/DropDownInputField";
import InputField from "../../components/ui/InputField";
import ToggleButton from "../../components/ui/ToggleButton";
import { createServiceType } from "../../api/servicesapi";
import { updateServiceType } from "../../api/servicesapi";  
import { useState, useEffect } from "react";


export default function AddNewServicesType_PopUp({ onClose, onAdd, editData = null}) {

  const [name, setName] = useState(editData?.name ||"");
  const [abbreviation, setAbbreviation] = useState(editData?.abbreviation || "");
  const [status, setStatus] = useState(editData?.status ?? 1);
  const [loading, setLoading] = useState(false);


  const handleSave = async () => {
  if (!name || !abbreviation) {
    alert("Please fill all required fields");
    return;
  }

  try {
    setLoading(true);

    const res = editData
      ? await updateServiceType(editData.id, { name, abbreviation, status })
      : await createServiceType({ name, abbreviation, status });

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
        setName(editData.name);
        setAbbreviation(editData.abbreviation);
        setStatus(editData.status);
      }
    }, [editData]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Modal */}
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 shadow-2xl">
        {/* Header */}
        <h2 className="mb-8 text-lg font-semibold text-gray-800">
          {/* Add Service Type */}
           {editData ? "Edit Service Type" : "Add Service Type"}
        </h2>

        {/* Form */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-8">
          <InputField 
            label="Service Type Name" 
            placeholder="Service Type Name" 
            //required={true} 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          /> 

          <InputField 
            label="Abbreviation" 
            placeholder="Abbreviation" 
            //required={true} 
            required
            value={abbreviation}
            onChange={(e) => setAbbreviation(e.target.value)}
          />
        </div>

         <div className="flex items-center gap-3  mt-4 ">
            <ToggleButton 
              label="Is Active"
              checked={status === 1}
              onChange={(val) => setStatus(val ? 1 : 0)}
            />
          </div>


        {/* Footer */}
        {/* <div className="mt-10 flex items-center justify-center gap-6">
         <Button btnText="Cancel" variant="outline" onClick={onClose} />
            <Button btnText="Save" variant="primary" />
        </div> */}

        <div className="mt-10 flex items-center justify-center gap-6">
          <Button btnText="Cancel" variant="outline" onClick={onClose} />
          <Button
            btnText={loading ? "Saving..." : "Save"}
            variant="primary"
            onClick={handleSave}
            disabled={loading}
          />
        </div>

      </div>
    </div>
  );
}

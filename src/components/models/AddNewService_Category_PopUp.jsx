import Button from "../../components/ui/Button";

import InputField from "../../components/ui/InputField";
import ToggleButton from "../../components/ui/ToggleButton";
import {useEffect, useState } from "react";
import { createServiceCategory, updateServiceCategory } from "../../api/servicesapi";


export default function AddNewService_Category({ onClose ,refreshData ,editData}) {
const[formData,setFormData]=useState({
  name: "",
  color_code: "",
  status:1,
});

useEffect(()=>{
  if(editData){
    setFormData({
      name:editData.name || "",
      color_code:editData.color_code || "",
      status: editData.status ?? 1,
    })
  }
},[editData])

const [loading, setLoading] = useState(false);




const handleChange=(e)=>{
  setFormData({...formData,[e.target.name]:e.target.value});
};

const handleSave = async () => {
  if (!formData.name || !formData.color_code) {
    alert("Category name and color code are required");
    return;
  }

  
  try {
    if(editData){
      await updateServiceCategory(editData.id,{
        name: formData.name,
        color_code: formData.color_code,
        status: formData.status,
      })
    }
    else{
      await createServiceCategory({
        name: formData.name,
        color_code: formData.color_code,
        status: formData.status,
      })
    }
    onClose();
    refreshData();
  } catch (error) {
    console.error(
      "Create category error:",
      error.response?.data || error.message
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/2.5">

      <div className="w-full max-w-lg rounded-2xl bg-white p-10 ">
        {/* Header */}
        <h2 className="mb-8 text-lg font-semibold text-gray-800">
          Add category
        </h2>

        {/* Form */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-8">
          <InputField label="Category Name" name="name" placeholder="Category Name"  value={formData.name} onChange={handleChange} /> 
          <InputField label="Color Code For Button" name="color_code" placeholder="Color Code For Button"  value={formData.color_code} onChange={handleChange} />
        </div>
         <div className="flex items-center gap-3 mt-3">
          <ToggleButton
              label="Is Active"
              checked={formData.status===1}
              onChange={() => {
                setFormData({
                  ...formData,
                  status: formData.status === 1? 0 : 1, 
                });
              }}
            />

          </div>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-center gap-6">
         <Button btnText="Cancel" variant="outline" onClick={onClose} />
            <Button btnText="Save" variant="primary" onClick={handleSave}/>

          
        </div>
      </div>
    </div>
  )
}

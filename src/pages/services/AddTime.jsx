
import { useState } from "react";



const AddTime = ({onClose}) => {
    const[isActive,setisActive]=useState(true);
    
    return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-black/25">
    <div className="bg-white w-full max-w-80 rounded-xl p-8 shadow-lg">
        <div>
            <h2 className="text-left text-lg font-medium text-gray-700 mb-3">Add Time Slot</h2>
        </div>
        <div className="text-left">
            <label className="mb-1 block text-sm font-medium text-gray-700">Time Slot
                <span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="Ex:05PM-06PM" className="text-sm border-2 border-gray-300 rounded-lg px-4 py-2 w-full"></input>
        </div>
        <div className="flex items-center justify-between mt-4">
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={isActive} onChange={() => setisActive(!isActive)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-800 transition-all"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full"></div>
              <span className="mb-1 block text-sm font-medium text-gray-700 ml-1">Is Active?</span>
            </label>
            
          </div>
        <div className="flex justify-center items-center gap-4 mt-4">
            <button className="border-2 border-gray-300 text-sm px-10 py-2 rounded-lg">Cancel</button>
            <button className="bg-blue-800 rounded-lg text-white border-2  border-blue-800  px-10 py-2" onClick={()=>onClose()}>Save</button>
        </div>
    </div>
   

    </div>
    
     </>
    );
}

    export default AddTime;

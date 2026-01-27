import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Login from "./Login";

const options = ["Option One", "Option Two", "Option Three"];
function Dashboard({ labelText }) {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSelect = (option) => {
    setValue(option);
    setOpen(false);
  };

  return (<></>
//     <div className="p-6 bg-gray-300 max-h-screen">
// <div className="p-6 bg-gray-300 min-h-screen flex items-start justify-center">
//       {/* <div className="flex flex-col w-full max-w-md font-sans gap-2">

        // {/* Label */}
        // {/* <label className="text-sm sm:text-base font-medium text-gray-700 flex items-center gap-1">
        //   {labelText} <span className="text-red-600">*</span>
        // </label> */} 

        // {/* Input + Dropdown */}
        // {/* <div className="relative w-full">
        //   <input
        //     type="text"
        //     readOnly
        //     value={value}
        //     placeholder="Select option"
        //     className="w-full h-10 rounded-lg border border-gray-400 px-3 pr-10 text-sm sm:text-base outline-none focus:border-blue-400"
        //   />

        //   <button
        //     type="button"
        //     onClick={() => setOpen(!open)}
        //     className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-600"
        //   >
        //     <RiArrowDropDownLine className="h-6 w-6" />
        //   </button>

        //   {/* Dropdown menu */}
        //   {/* {open && (
        //     <ul className="absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-md">
        //       {options.map((option) => (
        //         <li
        //           key={option}
        //           onClick={() => handleSelect(option)}
        //           className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
        //         >
        //           {option}
        //         </li>
        //       ))}
        //     </ul>
        //   )}
        // </div> */}
        //  {/* </div> */}
        // <Login />

    //   {/* </div>
    // </div>    */}
  );
}

export default Dashboard;

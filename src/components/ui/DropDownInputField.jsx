import { RiArrowDropDownLine } from "react-icons/ri";

const InputWithDropdown = ({ labelText }) => {
  return (
   <div className="p-6 bg-gray-300 min-h-screen flex items-start justify-center">
      <div className="flex flex-col w-full max-w-md font-sans gap-2">
         
        <label className="text-sm sm:text-base font-medium leading-6 text-gray-700 flex items-center gap-1">
         {labelText} <span className="text-red-600">*</span>
        </label>

        
        <div className="relative w-full">
          <input
            type="text"
            className="w-full h-10 rounded-lg border border-gray-400 px-3 pr-10 text-sm sm:text-base outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-300"
            placeholder="Select Options"
          />
          <button
            type="button"
            className="absolute top-1/2 right-2 -translate-y-1/2 p-1 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <RiArrowDropDownLine className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputWithDropdown;

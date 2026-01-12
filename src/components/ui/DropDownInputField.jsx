import { RiArrowDropDownLine } from "react-icons/ri";

const InputWithDropdown = ({ label, placeholder ,required }) => {
  return (
    <div className="flex w-full flex-col gap-2">
      
      <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>

      <div className="relative w-full">
        <input
          type="text"
          placeholder={placeholder}
          className="h-10 w-full rounded-lg border border-gray-400 px-4 pr-10 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-300"
        />

        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
        >
          <RiArrowDropDownLine className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default InputWithDropdown;

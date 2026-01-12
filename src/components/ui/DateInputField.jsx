
const DateInputField = ({ label }) => {
  return (
    <div className="flex flex-col w-full max-w-md font-sans gap-2">
      <label className="text-sm sm:text-base font-medium leading-6 text-gray-700 flex items-center gap-1">
        {label}  <span className="text-red-600">*</span>
      </label>

      <div className="relative w-full">
        <input
          type="date"
          className="w-full h-10 rounded-lg border border-gray-400 px-2 appearance-none pr-10 text-sm sm:text-base outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-300"
          
        />
        
      </div>
    </div>
  );
};

export default DateInputField;

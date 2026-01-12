import React from "react";

export default function InputField({ label, placeholder,required }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
        {label}
       {required && <span className="text-red-600">*</span>}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-gray-400 px-4 py-2 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-300"
      />
    </div>
  );
}

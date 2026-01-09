import React from 'react'

export default function InputField({labelText}) {
  return (
   <div className="flex flex-col gap-2 w-full max-w-xs sm:max-w-sm md:max-w-md">
  <label
    className="flex items-center gap-1 font-sans text-sm sm:text-base font-medium leading-6 text-gray-700"
  >
    {labelText}
    <span className="text-red-600">*</span>
  </label>

  <input
    type="text"
    className="h-10 w-full rounded-lg border border-gray-400 px-3 py-2 sm:px-4 sm:py-2.5 font-sans text-sm sm:text-base outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-300"
  />
</div>


  )
}

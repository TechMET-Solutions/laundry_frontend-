import { useState } from "react";



const EditExpenses = ({onClose}) => {
    return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
    <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-lg">
        <h2 className="text-semibold">Edit Expense</h2>
        <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                Date 
                <span className="text-red-500">*</span>
            </label>
            <input type="date" className="w-full rounded-lg border-gray-300 border-2 px-4 py-2 text-sm text-gray-500"></input>
            </div>
            <div>
                <label className=" mb-1 block text-sm font-medium text-gray-700">Expense Category
                    <span className="text-red-500">*</span>
                </label>
                <select className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-500">
                    <option>Choose Expense Category</option>
                    <option>Dewa Bill </option>
                    <option>Petty Cash </option>
                </select>
            </div>

            <div>
                <label className="mb-1 block text-gray-700 text-sm font-medium ">Expense Amount 
                    <span className="text-red-500">*</span>
                </label>
                <input type="text"  placeholder="120.5" className="border-2 border-gray-300 w-full px-4 py-2 rounded-lg"></input>

            </div>

            <div>
                <label className="text-gray-700 mb-1 block text-sm mb-1 block font-medium">Choose Payment Method
                    <span className="text-red-500">*</span>
                </label>
                <select className="border-2 border-gray-300 w-full px-4 py-2 rounded-lg text-gray-500">
                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Card</option>
                    <option>Cheque</option>
                    <option>Bank Transfer</option>
                </select>
                
            </div>
            
            <div class="md:col-span-2">
        <label class="mb-2 block text-sm font-medium text-gray-700">
          Tax Include<span class="text-red-500">*</span>
        </label>
        <div class="flex items-center gap-10">
          <label class="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name="tax"
              class="h-4 w-4 accent-gray-600"
            />
            Yes
          </label>
          <label class="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name="tax"
              class="h-4 w-4 accent-indigo-600"
            />
            No
          </label>
        </div>
      </div>
      <div>
        <label className="block mb-1 text-gray-700 text-sm font-medium">Notes
            <span className="text-red-500">*</span>
        </label>
        <input type="text" className="w-128 border-2 border-gray-300 px-4 py-2 rounded-lg"></input>
      </div>
      <br></br>
      <div className="ml-40 flex items-center gap-4">
        <button className="border-2 border-gray-300 rounded-lg text-center px-4 py-2">Cancel</button>
        <button className="bg-sky-700 rounded-lg text-white text-semibold px-4 py-2 border2 border-sky-700">Update</button>
      </div>
        </form>
    </div>
    </div>
    </>
    );
}

    export default EditExpenses;

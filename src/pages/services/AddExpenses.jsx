
import { useState } from "react";



const AddExpenses = ({onClose}) => {
    return (
    <>
    <div class="fixed inset-0 flex items-center justify-center bg-black/40">
    <div class="w-full max-w-xl rounded-xl bg-white p-8 shadow-lg">
        <h2>Add Expenses</h2>

        <form className="grid grid-cols-1 gap-6 md:grid-cols-2" >
            <div className="">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Date
                    <span className="text-red-500">*</span>
                </label>
                <input type="date" className="w-full rounded-lg border border-gray-300 border-2 px-4 py-2 text-sm ">
                </input>
            </div>
            <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">
                        Expense Category<span class="text-red-500">*</span>
                    </label> 
                    <select class="w-full rounded-lg border border-gray-300 border-2 px-4 py-2 text-sm text-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                        <option>
                            Dewa Bill
                        </option>
                        <option>
                            Petty Cash
                        </option>
                        </select> 
            </div>

            <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">
                        Expense Amount
                    </label> 
                    <input type="text" class="w-full rounded-lg border border-gray-300 border-2 px-4 py-2 text-sm text-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"></input> 
            </div>
               <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">
                        Choose Payment Method<span class="text-red-500">*</span>
                    </label> 
                    <select class="w-full rounded-lg border border-gray-300 border-2 px-4 py-2 text-sm text-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                        <option>
                            Choose Whatsapp Number
                        </option>
                        <option>
                            Cash
                        </option>
                        <option>
                            UPI
                        </option>
                        <option>
                            Card
                        </option>
                        <option>
                            Cheque
                        </option>
                        <option>
                            Bank Transfer
                        </option>
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
                    <label class="mb-1 block text-sm font-medium text-gray-700">
                        Notes
                    </label> 
                    <input type="text" class="w-130 rounded-lg border border-gray-300 border-2 px-4 py-2 text-sm text-gray-600 "></input> 
            </div>

            <br /><br />

            <div class="flex justify-center items-center gap-6 p-4 ml-60 ">
                <button className="border-gray-300 border-2 p-2 rounded-lg px-5  ">Cancel</button>
                <button className="bg-blue-800 text-white p-2 rounded-lg px-8 ">Save</button>

            </div>

        </form>
    </div>

    </div>
     </>
    );
}

    export default AddExpenses;

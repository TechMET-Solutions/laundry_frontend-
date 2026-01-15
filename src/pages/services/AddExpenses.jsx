import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import { createExpense, updateExpense } from "../../api/expences";

const AddExpenses = ({ mode, onClose, expenseData, setRefresh }) => {
  const isEditMode = mode === "edit";
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    amount: "",
    payment_mode: "",
    tax: "",
    note: "",
  });

  // 🔹 If edit mode → prefill data
  useEffect(() => {
    if (expenseData) {
      setFormData({
        date: expenseData.date?.split("T")[0],
        category: expenseData.category,
        amount: expenseData.amount,
        payment_mode: expenseData.payment_mode,
        tax: expenseData.tax,
        note: expenseData.note || "",
      });
    }
  }, [expenseData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  

 const handleSubmit = async (e) => {
    // debugger
  e.preventDefault();

  try {
    if (mode === "edit") {
        //  console.log(expenseData);
      await updateExpense(expenseData.id, formData);

    } else {
      await createExpense(formData);
    }

    setRefresh(prev => !prev);
    onClose();
  } catch (error) {
    console.error("Expense save error:", error);
  }
};


  return (
    <>
      <div class="fixed inset-0 flex items-center justify-center bg-black/40">
        <div class="w-full max-w-xl rounded-xl bg-white p-8 shadow-lg">
          <h2>Add Expenses</h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <div className="">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Date
                <span className="text-red-500">*</span>
              </label>
              <input
              required
                type="date"
                value={formData.date}
                onChange={handleChange}
                name="date"
                className="w-full rounded-lg border border-gray-300 border-2 px-4 py-2 text-sm "
              ></input>
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">
                Expense Category<span class="text-red-500">*</span>
              </label>
              <select
              required
                class="w-full rounded-lg   border-gray-300 border-2 px-4 py-2 text-sm text-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option disabled>Choose Expense Category</option>
                <option>Item Purchase</option>
                <option>Internet</option>
                <option>Dewa Bill</option>
                <option>Petty Cash</option>
              </select>
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">
                Expense Amount
              </label>
              <input
               pattern="^[0-9]+(\.[0-9]+)?$"
               title="Enter the Valid Amount"
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                class="w-full rounded-lg border border-gray-300 border-2 px-4 py-2 text-sm text-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              ></input>
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">
                Choose Payment Method<span class="text-red-500">*</span>
              </label>
              <select
              required
                name="payment_mode"
                value={formData.payment_mode}
                onChange={handleChange}
                class="w-full rounded-lg border border-gray-300 border-2 px-4 py-2 text-sm text-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option>Choose Whatsapp Number</option>
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
                  required
                    type="radio"
                    name="tax"
                    value="Yes"
                    checked={formData.tax === "Yes"}
                    onChange={handleChange}
                    class="h-4 w-4 accent-gray-600"
                  />
                  Yes
                </label>
                <label class="flex items-center gap-2 text-sm text-gray-700">
                  <input
                  required
                    type="radio"
                    name="tax"
                    value="No"
                    checked={formData.tax === "No"}
                    onChange={handleChange}
                    class="h-4 w-4 accent-indigo-600"
                  />
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">
                {`Enter ${mode==="edit"?"Updated":""} Note`}
              </label>
              <input
                type="text"
                name="note"
                placeholder={`Enter ${mode==="edit"?"Updated":""} Note`}
                value={formData.note}
                onChange={handleChange}
                class="w-130 rounded-lg border border-gray-300 border-2 px-4 py-2 text-sm text-gray-600 "
              />
            </div>

            <br />
            <br />

            <div class="flex justify-center items-center gap-6 p-4 ml-60 ">
              <Button onClick={onClose} btnText="Cancel" variant="outline" />
              <Button
                type="submit"
                btnText={mode === "edit" ? "Update" : "Save"}
                variant="primary"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddExpenses;

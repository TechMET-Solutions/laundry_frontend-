import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { createExpense, updateExpense, getAllExpensesCategories } from "../../api/expences";

const AddExpenses = ({ mode, onClose, expenseData, onSuccess }) => {
  const isEditMode = mode === "edit";
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    amount: "",
    payment_mode: "",
    taxIncluded:"",
    tax: "",
    note: "",
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // 🔹 If edit mode → prefill data
  useEffect(() => {
    if (expenseData) {
      setFormData({
        date: expenseData.date?.split("T")[0],
        category: expenseData.category,
        amount: expenseData.amount,
        payment_mode: expenseData.payment_mode,
        taxIncluded: expenseData.taxIncluded,
        tax: expenseData.tax,
        note: expenseData.note || "",
      });
    }
  }, [expenseData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await getAllExpensesCategories();
      if (response.data.success) {
        setCategories(response.data.data || []);
       
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };                   
  useEffect(() => {
    fetchCategories();
  }, []);

  

 const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.date || !formData.category || !formData.amount || !formData.payment_mode || !formData.taxIncluded) {
      alert("Please fill in all required fields");
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      alert("Expense amount must be greater than 0");
      return;
    }

    if (formData.taxIncluded === "Yes" && (!formData.tax || parseFloat(formData.tax) < 0)) {
      alert("Please enter a valid tax percentage");
      return;
    }

    try {
      if (mode === "edit") {
        await updateExpense(expenseData.id, formData);
      } else {
        await createExpense(formData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Expense save error:", error);
      alert("Failed to save expense. Please try again.");
    }
  };


  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/40">
        <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-lg">
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
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Expense Category<span className="text-red-500">*</span>
              </label>
              <select
              required
                className="w-full rounded-lg   border-gray-300 border-2 px-4 py-2 text-sm text-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={loadingCategories}
              >
                <option value="" disabled>
                  {loadingCategories ? "Loading categories..." : "Choose Expense Category"}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.expense_category}>
                    {category.expense_category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Expense Amount<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                className="w-full rounded-lg border border-gray-300 border-2 px-4 py-2 text-sm text-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Choose Payment Method<span className="text-red-500">*</span>
              </label>
              <select
              required
                name="payment_mode"
                value={formData.payment_mode}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 border-2 px-4 py-2 text-sm text-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                 <option value="" disabled>Choose Payment Mode</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="Cheque">Cheque</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
            <div className="w-full md:col-span-2 flex items-center gap-6">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Tax Include<span className="text-red-500">*</span>
              </label>

              <div className="flex items-center gap-4">
                <label className="flex items-center text-sm text-gray-700">
                  <input
                    required
                    type="radio"
                    name="taxIncluded"
                    value="No"
                    checked={formData.taxIncluded === "No"}
                    onChange={handleChange}
                    className="h-4 w-4 accent-indigo-600 mr-2"
                  />
                  No
                </label>

                <label className="flex items-center text-sm text-gray-700">
                  <input
                    required
                    type="radio"
                    name="taxIncluded"
                    value="Yes"
                    checked={formData.taxIncluded === "Yes"}
                    onChange={handleChange}
                    className="h-4 w-4 accent-indigo-600 mr-2"
                  />
                  Yes
                </label>
              </div>

              {formData.taxIncluded === "Yes" && (
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Tax %<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="tax"
                    value={formData.tax}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    max="100"
                    className="w-full rounded-lg border border-gray-300 border-2 px-4 py-2 text-sm text-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    required={formData.taxIncluded === "Yes"}
                  />
                </div>
              )}
            </div>


            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {`Enter ${mode==="edit"?"Updated":""} Note`}
              </label>
              <input
                type="text"
                name="note"
                placeholder={`Enter ${mode==="edit"?"Updated":""} Note`}
                value={formData.note}
                onChange={handleChange}
                className="w-130 rounded-lg border border-gray-300 border-2 px-4 py-2 text-sm text-gray-600 "
              />
            </div>

            <br />
            <br />

            <div className="flex justify-center items-center gap-6 p-4 ml-60 ">
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

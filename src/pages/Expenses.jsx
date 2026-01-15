import { BiSearchAlt2 } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { TbArrowBackUp } from "react-icons/tb";
import { useEffect, useState } from "react";

import AddExpenses from "./services/AddExpenses";
import DeleteModal from "../components/models/DeleteModal";

import { deleteExpense, getAllExpenses } from "../api/expences";
import { IoReturnUpBackOutline } from "react-icons/io5";

function Expenses() {
  // ---------------- STATES ----------------
  const [expenseModal, setExpenseModal] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedExpense, setSelectedExpense] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [expensesData, setExpensesData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // ---------------- HANDLERS ----------------

  const handleCloseModal = () => {
    setExpenseModal(false);
    setSelectedExpense(null);
  };

  const fetchAllExpenses = async () => {
    try {
      const response = await getAllExpenses();
      setExpensesData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchAllExpenses();
  }, [refresh]);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteExpense(deleteId);
      setDeleteId(null);
      fetchAllExpenses();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <div
           
          className="flex items-center gap-3 "
        >
          <button  onClick={() => navigate(-1)} className="bg-indigo-800 text-white h-8 w-8 flex items-center justify-center cursor-pointer rounded">
            <TbArrowBackUp />
          </button>
          <h2 className="text-xl font-semibold">Expenses</h2>
        </div>

        <button
          className="bg-indigo-800 text-white px-4 py-2 rounded-full text-sm"
          onClick={() => {
            setExpenseModal(true);
            setMode("add");
            setSelectedExpense(null);
          }}
        >
          + Add New Expense
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2 bg-slate-200 px-3 py-2 rounded-lg w-64">
          <BiSearchAlt2 />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full"
          />
        </div>
      </div>

      <div className="bg-[#f4f7fb] rounded-lg overflow-hidden">
        <table className="w-full text-sm border-separate">
          <thead>
            <tr>
              {[
                "Date",
                "Amount",
                "Category",
                "Tax",
                "Payment Mode",
                "Created By",
                "Action",
              ].map((head) => (
                <th
                  key={head}
                  className="bg-[#56CCFF] px-4 py-3 text-left font-medium text-gray-800"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {expensesData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No expenses found
                </td>
              </tr>
            ) : (
              expensesData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">{item.date?.split("T")[0]}</td>
                  <td className="px-4 py-3 font-semibold">₹{item.amount}</td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">{item.tax}</td>
                  <td className="px-4 py-3">{item.payment_mode}</td>
                  <td className="px-4 py-3">Admin</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {/* EDIT */}
                      <button
                        className="bg-indigo-100 text-indigo-700 p-2 rounded-md"
                        onClick={() => {
                          setExpenseModal(true);
                          setMode("edit");
                          setSelectedExpense(item);
                        }}
                      >
                        <FiEdit />
                      </button>

                      {/* DELETE */}
                      <button
                        className="bg-red-100 text-red-700 p-2 rounded-md"
                        onClick={() => {
                          setDeleteId(item.id);
                          setShowDeleteModal(true);
                        }}
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {expenseModal && (
        <AddExpenses
          onClose={handleCloseModal}
          expenseData={selectedExpense}
          mode={mode}
          setRefresh={setRefresh}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
          title="Delete Expense"
          description="Are you sure you want to delete this expense?"
          onCancel={() => {
            setShowDeleteModal(false);
            setDeleteId(null);
          }}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default Expenses;

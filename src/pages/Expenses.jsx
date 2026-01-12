import { BiSearchAlt2 } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { TbArrowBackUp } from "react-icons/tb";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import AddExpenses from "./services/AddExpenses";
import EditExpenses from './services/EditExpenses';
import DeleteExpenses from './services/DeleteExpenses'
import DeleteSuccess from './services/DeleteSuccess'

function Expenses() {
  const [expenseModel, setexpenseModel] = useState(false);
  const [editModal,seteditModal]=useState(false);
  const [deleteModal,setdeleteModal]=useState(false);
  const[successModal,setsuccessModal]=useState(false);

  const data = [
    {
      date: "2025-11-28",
      amount: "120.5",
      towards: "Internet",
      taxInclude: "No",
      paymentMode: "Cash",
      createdBy: "Shop",
    },
    {
      date: "2025-11-28",
      amount: "100",
      towards: "Item purchase",
      taxInclude: "No",
      paymentMode: "UPI",
      createdBy: "Shop",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button className="bg-indigo-800 text-white h-8 w-8 items-center flex justify-center rounded">
            <TbArrowBackUp />
          </button>
          <h2 className="text-xl font-semibold">Expense</h2>
        </div>

        <div className="flex gap-3">
          <button className="bg-indigo-800 text-white px-4 py-2 rounded-full text-sm cursor-pointer">
            Expense Category List
          </button>
          <button className="bg-indigo-800 text-white px-4 py-2 rounded-full text-sm cursor-pointer"
        onClick={() => setexpenseModel(true)}>
            + Add New Expenses
        </button>

        {expenseModel && (
            <AddExpenses onClose={() => setexpenseModel(false)} />
        )}  
        </div>
      </div>

      {/* Search */}
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

      {/* Table */}
      <div className="bg-[#f4f7fb]">
        <table className="w-full text-sm border-separate">

          <thead>
            <tr>
              {[
                "Date",
                "Amount",
                "Towards",
                "Tax Include ?",
                "Payment Mode",
                "Created By",
                "Action",
              ].map((head) => (
                <th
                  key={head}
                  className="bg-[#56CCFF]  px-4 py-3 text-left font-medium text-gray-800"
                  
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-slate-50 transition"
              >
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3 font-semibold">{item.amount}</td>
                <td className="px-4 py-3">{item.towards}</td>
                <td className="px-4 py-3">{item.taxInclude}</td>
                <td className="px-4 py-3">{item.paymentMode}</td>
                <td className="px-4 py-3">{item.createdBy}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="bg-indigo-100 text-indigo-700 p-2 rounded-md "onClick={() => seteditModal(true)}>
                          
                    <FiEdit />
                    </button>
                    
                    {editModal && (
                        <EditExpenses onClose={() => seteditModal(false)} />
                    )} 
                      
                    <button
                      className="bg-red-100 text-red-700 p-2 rounded-md"
                      onClick={() => setdeleteModal(true)}
                    >
                      <MdDeleteOutline />
                    </button>

                    {deleteModal && (
                      <DeleteExpenses
                        onClose={() => setdeleteModal(false)}
                        onDelete={() => {
                          setdeleteModal(false);
                          setsuccessModal(true);
                        }}
                      />
                    )}

                    {successModal && (
                      <DeleteSuccess onClose={() => setsuccessModal(false)} />
                    )}

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Expenses;

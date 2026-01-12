import { BiSearchAlt2 } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { TbArrowBackUp } from "react-icons/tb";
import { IoIosAddCircleOutline } from "react-icons/io";

function TimeSlot(){
    const data = [
        {
          time:"05PM-06PM",
          status:"Active",
        },
        {
           time:"04PM-05PM",
          status:"Active",
        },
         {
           time:"03PM-04PM",
          status:"Active",
        },
      ];
    
      return (
        <div className="min-h-screen bg-slate-100 p-6">
    
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <button className="bg-indigo-800 text-white p-2 rounded-md">
                <TbArrowBackUp />
              </button>
              <h2 className="text-xl font-semibold">Time Slots</h2>
            </div>
    
            <div className="flex gap-3">
              
              <button className="bg-indigo-800 text-white px-4 py-2 rounded-full flex items-center gap-2">
                <IoIosAddCircleOutline size={18} />
                Add Time Slot
              </button>
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
          <div className="w-full text-sm border-separate">
            <table className="w-full text-sm border-separate">
    
              <thead className="text-center align-middle">
                <tr className="text-center align-middle justify-center">
                  {[
                    "Sr No",
                    "Time",
                    "Status",
                    "Action",
                  ].map((head) => (
                    <th
                      key={head}
                      className="bg-[#56CCFF]  px-4 py-3 text-left font-medium text-gray-800 "
                      
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
                    className="hover:bg-slate-50 transition "
                  >
                    <td className="px-4 py-3 w-20 items-center text-center align-middle">{index+1}</td>
                    <td className="px-4 py-3  w-100">{item.time}</td>
                    <td className="px-4 py-3 text-green-600 list-circle pl-6 text-center align-middle"><li className="text-center align-middle list-disc list-inside">{item.status}</li></td>
                    <td className="px-4 py-3 text-center align-middle">
                      
                        <button className="bg-indigo-100 text-indigo-700 p-2 rounded-md">
                          <FiEdit />
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
export default TimeSlot
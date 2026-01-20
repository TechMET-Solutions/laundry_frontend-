import { useState, useEffect} from "react";
import { BiSearchAlt2, BiSolidContact } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { TbArrowBackUp } from "react-icons/tb";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddTime from "./services/AddTime"

import { getAllTimeSlot, deleteTimeSlot } from "../api/timeslot";
import Pagination from "../components/Pagination";

function TimeSlot(){
  //  const[addTimeModal,setaddTimeModal]=useState(false);
  const[slots, setSlots] = useState([]);
  const [addTimeModal, setaddTimeModal] = useState({ open: false, slot: null});
  const [editingSlot, setEditingSlot] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [timeSlots, setTimeSlots] = useState([]);


  const fetchTimeSlot = async (p = page) => {
    try {
      const res = await getAllTimeSlot(p, 10);
      setTimeSlots(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
        console.log(`Error fetching data timeslot ${error}`);
    }
  };

  useEffect(() => {
    fetchTimeSlot(page);
  }, [page]);

  //Statically Created Data :

    // const data = [
    //     {
    //       time:"05PM-06PM",
    //       status:"Active",
    //     },
    //     {
    //        time:"04PM-05PM",
    //       status:"Active",
    //     },
    //      {
    //        time:"03PM-04PM",
    //       status:"Active",
    //     },
    //   ];


    // const fetchTimeSlot = async () => {
    //   try {
    //     const res = await getAllTimeSlot(); //calls backend API
    //     setSlots(res.data.data); //update state with DB data
    //     console.log(res.data.data);
    //   } catch (error) {
    //       console.log(`Error fetching data timeslot ${error}`);
    //   }
    // };

    // useEffect(() => {
    //   fetchTimeSlot();
    // }, []);

    const handleDelete = async (id) => {
      if(window.confirm("Are you sure to delete this timeslot?")) {
        await deleteTimeSlot(id);
        fetchTimeSlot(); //refresh table
      }
    };

    // shows AM-PM
    // const formatTime = (time) => {
    //   if (!time) return "";
    //   const [hour, minute] = time.split(":");
    //   let h = parseInt(hour, 10);
    //   const ampm = h >= 12 ? "PM" : "AM";
    //   h = h % 12 || 12;
    //   return `${h}:${minute} ${ampm}`;
    // };
    
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
              
              <button className="bg-indigo-800 text-white px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer"
              onClick={()=>setaddTimeModal({ open: true, slot: null })}
              >
                <IoIosAddCircleOutline size={18} />
                Add Time Slot
              </button>
              {/* {addTimeModal && (
                <AddTime 
                  onClose={() => setaddTimeModal(false)}
                  onSuccess = {fetchTimeSlot}
                />
              )} */}

                {addTimeModal.open && (
                    <AddTime 
                        onClose={() => setaddTimeModal({ open: false, slot: null })}
                        onSuccess={fetchTimeSlot}
                        slot={addTimeModal.slot} // pass the slot object here
                    />
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

                  {timeSlots.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-500">
                        No time slots found
                      </td>
                    </tr>
                  )}


                {timeSlots.map((item, index) => (
                  <tr key={item.id}
                    className="hover:bg-slate-50 transition ">
                  
                    <td className="px-4 py-3 w-20 items-center text-center align-middle">
                      {index+1}
                    </td>
                    <td className="px-4 py-3  w-100">
                      {item.time_slot}
                    </td>

                  {/* // add AM - PM */}
                      {/* <td className="px-4 py-3 w-100">
                        {(() => {
                          if (!item.time_slot) return "";
                          const [from, to] = item.time_slot.split(" - ");
                          return `${formatTime(from)} - ${formatTime(to)}`;
                        })()} 
                      </td> */}

 

                    {/* <td className="px-4 py-3 text-green-600 list-circle pl-6 text-center align-middle">
                      <li className="text-center align-middle list-disc list-inside">
                        {item.status}
                      </li>
                    </td> */}

                    <td className="px-4 py-3 text-center">
                      {item.status ? (
                        <span className="text-green-600">Active</span>
                      ) : (
                        <span className="text-red-600">Inactive</span>
                      )}
                    </td>

                    {/* <td className="px-4 py-3 text-center align-middle">
                        <button className="bg-indigo-100 text-indigo-700 p-2 rounded-md"
                        onClick={()=>setaddTimeModal(true)}>
                          <FiEdit />
                        </button>
                        {addTimeModal && (
                        <AddTime onClose={() => setaddTimeModal(false)} />
                        )}
                        
                    </td> */}

                    <td className="px-4 py-3 text-center">
                      <button
                        className="bg-indigo-100 text-indigo-700 p-2 rounded-md mr-2 cursor-pointer"
                        //onClick={() => setaddTimeModal(true)
                           onClick={() => {
                            setaddTimeModal({ open: true, slot: item})//pass slot
                             //setEditingSlot(item) //store the slot we want to edit 
                             //setaddTimeModal(true)   // open modal
                        }}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="bg-red-100 text-red-700 p-2 rounded-md cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      >
                        <MdDeleteOutline />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full flex justify-center my-6">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onChange={setPage}
              />
              </div>
            
          </div>
        </div>
      );
    }
export default TimeSlot
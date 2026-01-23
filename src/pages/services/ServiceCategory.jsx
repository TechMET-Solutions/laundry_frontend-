import React, {useEffect, useState } from 'react'
import { FiSearch, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import Setting_img from "../../assets/carbon_settings-services.png";
import AddServices_PopUp from './AddNewServices_PopUp';
import AddNewService_Category from '../../components/models/AddNewService_Category_PopUp';
import { getAllServicesCategory } from '../../api/servicesapi';
import { deleteServiceCategory } from '../../api/servicesapi';
import DeleteModal from '../../components/models/DeleteModal';


const ServiceCategory = () => {
  const [open, setOpen] = useState(false);
  const [categories,setCategories]=useState([]);
  //edit
  const [editData,setEditData]=useState(null);
  
  
  //delete
  const[isDeleteOpen,setIsDeleteOpen]=useState(false);
  const[selectedId,setSelectedId]=useState(null);

  //
  const fetchCategories = async () => {

  try {
    const res = await getAllServicesCategory();
    const sortedData = res.data.data.sort((a, b) => b.id - a.id); // ascending by id
    setCategories(sortedData);
  } catch (err) {
    console.error("Error in fetching", err);
  }
};


  useEffect(()=>{
    fetchCategories();
  },[]);


   const handleDelete = async (id) => {
    if (!id) return;

    try {
      await deleteServiceCategory(id);
      fetchCategories();
      // setIsDeleteOpen(false);
      // setSelectedId(null);
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  // const handleSelect = () => {
  //   setOpen(false);
  // };
  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {/* Left: Back + Title */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded">
            <IoReturnUpBackOutline />
          </div>

          <h1 className="text-xl font-semibold text-gray-800">Categories</h1>
        </div>

        <div className="flex items-center gap-2 cursor-pointer rounded-full bg-indigo-600 px-3 py-2 text-white" onClick={() => setOpen(true)} >
          <img
            src={Setting_img}
            alt="setting"
            className="h-4 w-4 object-contain"
          />

          <span className="text-sm font-medium">Add New Category</span>
        </div>
        {open && (
        <AddNewService_Category onClose={() => setOpen(false)}
        refreshData={fetchCategories}
        />
      )}

      </div>

      <div className="flex justify-end gap-4 mb-6">
        {/* Search */}
        <div className="relative w-64 ">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-2 bg-gray-200 rounded-lg text-sm outline-none "
          />
        </div>

               </div>

       <div className="bg-[#f4f7fb]  ">
        <table className="w-full text-sm border-separate  ">
          <thead>
            <tr>
              {[
                "Sr No", 
                "Categorie Name", 
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
            {/* {[
              {
                id: 1,
                type: "Shoe Cleaning",
                category: "Other",
                status: "Active",
              },
              {
                id: 2,
                service: "Shall",
                type: "Re-wash",
                category: "Ladies",
                status: "Inactive",
              },
              {
                id: 3,
                service: "New one",
                type: "Rewash",
                category: "Kids",
                status: "Active",
              },
              {
                id: 4,
                service: "Viewy Service",
                type: "Pressing",
                category: "Kids",
                status: "Inactive",
              },
              {
                id: 5,
                service: "Ghutra",
                type: "Pressing, Pressing & Washing",
                category: "Gents",
                status: "Active",
              },
              {
                id: 6,
                service: "Shirt",
                type: "Pressing, Pressing & Washing",
                category: "Gents",
                status: "Inactive",
              },] */
              categories.map((item,index) => (
              <tr key={item.id} className="bg-[#f1f5fb] text-center">
                {/* Sr No */}
                <td className="px-4 py-3 font-medium text-gray-700 border-b text-center border-gray-300">
                  {index+1}
                </td>
 
                 

                

                {/* Category */}
                <td className="px-4 py-3 text-gray-700 text-left border-b border-gray-300">
                  {item.name}
                </td>

                {/* Status */}
                <td className="px-4 py-3  border-b text-left border-gray-300">
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                       item.status === 1 ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        item.status === 1
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                         {item.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </span>
                </td>

                {/* Action */}
                <td className="px-4 py-3  border-b text-left border-gray-300">
                  <div className="flex gap-2">
                    <button className="rounded-md bg-indigo-100 p-2 text-indigo-600 cursor-pointer" onClick={()=>{
                      setEditData(item);
                      setOpen(true);
                    }}>
                      <FiEdit />
                      </button>
                         
                        {open && (
                            <AddNewService_Category
                              editData={editData}
                              refreshData={fetchCategories}
                              onClose={() => {
                                setEditData(null);
                                setOpen(false);
                              }}
                            />
                          )}


                    
                    <button className="rounded-md bg-red-100 p-2 text-red-500 cursor-pointer"
                    onClick={()=>{
                      // handleDelete(item.id);
                    
                      setSelectedId(item.id);
                      setIsDeleteOpen(true);
                      }} >
                      <FiTrash2 />
                
                    </button>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <DeleteModal
        isOpen={isDeleteOpen}
        title="Delete Category?"
        description="Are you sure you want to delete this category?"
        onCancel={() => {
          setIsDeleteOpen(false);
          setSelectedId(null);
        }}
        onConfirm={() => handleDelete(selectedId)}
      />

    </div>
  );
};

export default ServiceCategory
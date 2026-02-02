import { useEffect, useState } from 'react';
import { FiEdit, FiSearch, FiTrash2 } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { deleteServiceCategory, getAllServicesCategory } from '../../api/servicesapi';
import Setting_img from "../../assets/carbon_settings-services.png";
import AddNewService_Category from '../../components/models/AddNewService_Category_PopUp';
import DeleteModal from '../../components/models/DeleteModal';
import Pagination from '../../components/Pagination';


const ServiceCategory = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  //edit
  const [editData, setEditData] = useState(null);
  const [search, setSearch]=useState("")

  //pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editCustomer, setEditCustomer] = useState(null);


  //delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  //
  const fetchCategories = async (p = page) => {
  try {
    const res = await getAllServicesCategory(p, 10);
    setCategories(res.data.data || []);
    setTotalPages(res.data.pagination.totalPages);
  } catch (err) {
    console.error("Error in fetching", err);
  }
};


  //reset to page 1 when searching
  


  useEffect(() => {
  fetchCategories(page);
}, [page]);


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
   
  const filteredCategories = categories.filter((item) => {
  const q = search.toLowerCase();

  const nameMatch = item.name?.toLowerCase().includes(q);
  const statusMatch =
    (item.status === 1 ? "active" : "inactive").includes(q);

  return nameMatch || statusMatch;
});

  
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
              placeholder="Search by category name or status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-200 rounded-lg text-sm outline-none"
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
            {
             filteredCategories.length > 0 ? (
              filteredCategories.map((item, index) => (
                <tr key={item.id} className="bg-[#f1f5fb] text-center">
                  {/* Sr No */}
                  <td className="px-4 py-3 font-medium text-gray-700 border-b text-center border-gray-300">
                   {index + 1}

                  </td>





                  {/* Category */}
                  <td className="px-4 py-3 text-gray-700 text-left border-b border-gray-300">
                    {item.name}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3  border-b text-left border-gray-300">
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${item.status === 1 ? "bg-green-500" : "bg-red-500"
                          }`}
                      />
                      <span
                        className={`font-medium ${item.status === 1
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
                      <button className="rounded-md bg-indigo-100 p-2 text-indigo-600 cursor-pointer" onClick={() => {
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
                        onClick={() => {
                          // handleDelete(item.id);

                          setSelectedId(item.id);
                          setIsDeleteOpen(true);
                        }} >
                        <FiTrash2 />

                      </button>

                    </div>
                  </td>
                </tr>
              ))
            ):(
              /* DATA NOT FOUND ROW */
              <tr>
                <td colSpan="4" className="px-4 py-20 text-center bg-white border-b border-gray-300">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="bg-gray-100 p-4 rounded-full">
                      <FiSearch className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-lg font-semibold text-gray-500">No Services Found</p>
                    <p className="text-sm text-gray-400">
                      Try adjusting your search.
                    </p>
                  </div>
                </td>
              </tr>
            ) }
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


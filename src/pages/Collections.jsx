import React, { useEffect, useState } from "react";
import { FiEye, FiTrash2, FiEdit } from "react-icons/fi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import AddCollectionModal from "../components/models/AddCollectionModal";
import ViewCollectionDetails from "../components/models/ViewCollectionDetails";
import { getAllCollections, deleteCollection } from "../api/collection";
import DeleteModal from "../components/models/DeleteModal";
import Pagination from "../components/Pagination";


function Collections() {
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState(null); // add | edit | view
  const [selectedData, setSelectedData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  // const [showModal, setShowModal] = useState(false);
   const [showDeleteCollection, setShowDeleteCollection] = useState(false);
  const [collections, setCollections] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchCollections = async (p = page) => {
     const res = await getAllCollections(p, 10);

     setCollections(res.data.data);
     setTotalPages(res.data.pagination.totalPages);
   };
 
   useEffect(() => {
     fetchCollections(page);
   }, [page]);
 
const handleDelete = async () => {
    if (!deleteId) return;
    await deleteCollection(deleteId);
    // setShowDeleteCollection(false);
    setDeleteId(null);
    fetchCollections();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setMode(null);
    setSelectedData(null);
  };

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded">
            <IoReturnUpBackOutline />
          </div>
          <h1 className="text-xl font-semibold">Collections</h1>
        </div>

        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm"
          onClick={() => {
            setMode("add");
            setSelectedData(null);
            setOpenModal(true);
          }}
        >
          + Add New Collection
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-sky-300 text-left">
              <th className="p-3">Collection ID</th>
              <th className="p-3">Info</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Driver</th>
              <th className="p-3">Type</th>
              <th className="p-3">Created By</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {collections.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">{item.collection_code}</td>
                <td className="p-3 text-xs">
                  {item.pickup_date}
                  <br />
                  {item.time_slot}
                </td>
                <td className="p-3">{item.customer_id}</td>
                <td className="p-3">{item.status}</td>
                <td className="p-3">{item.driver_id}</td>
                <td className="p-3">{item.collection_type}</td>
                <td className="p-3">{item.created_by}</td>
                <td className="p-3 flex gap-2">
                  {/* VIEW */}
                  <button
                    className="p-2 bg-sky-100 text-sky-600 rounded"
                    onClick={() => {
                      setMode("view");
                      setSelectedData(item);
                      setOpenModal(true);
                    }}
                  >
                    <FiEye />
                  </button>

                  {/* EDIT */}
                  <button
                    className="p-2 bg-indigo-100 text-indigo-600 rounded"
                    onClick={() => {
                      setMode("edit");
                      setSelectedData(item);
                      setOpenModal(true);
                    }}
                  >
                    <FiEdit />
                  </button>

                 <button
                   onClick={() => {
                     setDeleteId(item.id);
                    setShowDeleteCollection(true);
                     }}
                     className="p-2 bg-red-100 text-red-600 rounded"
                      >                      <MdDeleteOutline size={20} />
                      
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

      {/* ADD / EDIT MODAL */}
      {openModal &&  (
        <AddCollectionModal
          mode={mode}
          collection={selectedData}
          onClose={handleCloseModal}
          onSuccess={fetchCollections}
        />
      )}

      {/* VIEW MODAL */}
      <ViewCollectionDetails
        isOpen={openModal && mode === "view"}
        onClose={handleCloseModal}
        data={selectedData}
      />

      {showDeleteCollection && (
              <DeleteModal
                isOpen={showDeleteCollection}
                onCancel={() => setShowDeleteCollection(false)}
                onConfirm={handleDelete}
              />
            )}
      
    </div>
  );
}

export default Collections;

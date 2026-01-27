import React, { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { CiClock2 } from "react-icons/ci";
import Pagination from "../../components/Pagination";
import { getAllOrders, hardDeleteOrder, softDeleteOrder } from "../../api/order";
import { FiTrash2 } from "react-icons/fi";
import DeleteModal from "../../components/models/DeleteModal";

function Delete_Order() {
  const [search, setSearch] = useState("");
  const [showRoles, setShowRoles] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [openHardDeleteModal, setOpenHardDeleteModal] = useState(false);
  const [hardDeleteId, setHardDeleteId] = useState(null);

  const [openRevokedModal, setOpenRevokedModal] = useState(false);
  const [revokedId, setRevokedId] = useState(null);

  const fetchOrders = async (p = page) => {
    try {
      const res = await getAllOrders(p, 10);

      setOrders(res.data.data || []);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error("Failed to load orders", err);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const handleSearchFiltration = () => {
    const deletedOrders = orders.filter((order) => order.status === "DELETED");

    if (search) {
      return deletedOrders.filter(
        (order) =>
          order.order_code.toLowerCase().includes(search.toLowerCase()) ||
          order.customer_name.toLowerCase().includes(search.toLowerCase()) ||
          order.driver_name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return deletedOrders;
  };

  const handleDelete = async () => {
    if (!hardDeleteId) return;

    try {
      await hardDeleteOrder(hardDeleteId);
      setHardDeleteId(null);
      fetchOrders();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  const handleRevoke = async () => {
    if (!revokedId) return;

    try {
      await softDeleteOrder(  revokedId, {status:"PENDING"});
      setRevokedId(null);
      fetchOrders();
    } catch (error) {
      console.error("Revoked failed:", error);
    }
  };

  return (
    <div className=" py-6 px-0 bg-[rgb(234,238,246)] ">
      {/* Back Button */}
      <div
        onClick={() => navigate("/orders")}
        className="flex  items-center justify-between gap-6  bg-indigo-800 p-2 w-10 h-10 rounded-sm   cursor-pointer"
      >
        <p>
          <TbArrowBackUp className="w-6 h-6 text-white " />
        </p>
        <p className="  font-[Poppins] text-[16px] font-bold whitespace-nowrap ">
          Deleted Orders
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-4  justify-end mt-6 mb-4 pr-5">
        <div className="   rounded-lg bg-[#E2E8F0] flex items-center px-4  gap-2">
          <CiSearch className=" text-slate-600" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="flex-1   bg-transparent outline-none"
          />
          {search && (
            <IoIosClose
              onClick={() => setSearch("")}
              className="w-6 h-6 font-bold cursor-pointer"
            />
          )}
        </div>

        <div className=" relative ">
          <div className="h-12 bg-[#E2E8F0] rounded-lg px-4 flex items-center justify-between">
            <span>{selectedRole || "All Drivers"}</span>
            <span
              onClick={() => setShowRoles(!showRoles)}
              className="cursor-pointer"
            >
              {showRoles ? (
                <RiArrowDropUpLine size={24} />
              ) : (
                <RiArrowDropDownLine size={24} />
              )}
            </span>
          </div>

          {showRoles && (
            <div className="relative w-full">
              <div className="absolute top-full  w-full bg-white rounded-lg shadow-lg  z-50 overflow-hidden">
                {["All Drivers", "Aswin VD", "Super Man", "Sales Team"].map(
                  (role, i) => (
                    <p
                      key={i}
                      onClick={() => {
                        setSelectedRole(role);
                        setShowRoles(false);
                      }}
                      className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 transition"
                    >
                      {role}
                    </p>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="   flex gap-4  justify-center items-center flex-col rounded-xl p-4">
        <table className="w-full text-[13px]  border-separate ">
          <thead className="  ">
            <tr>
              {[
                "Order Id",
                "Order Info",
                "Customer",
                "Driver",
                "Amount",
                "Status",
                "Payment",
                "Created By",
                "Action",
              ].map((h, i) => (
                <th
                  key={i}
                  className="bg-sky-400   px-3 py-2 text-white font-semibold text-center"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {handleSearchFiltration().map((item) => {
              return (
                <tr key={item.id} className="  text-center">
                  <td className="font-semibold px-3 py-3 border-b border-gray-400">
                    {item.order_code}
                  </td>

                  <td className="text-[12px] text-start leading-5 px-3 py-3 border-b border-gray-400">
                    <p>
                      Order date: <b>{item.order_date.split("T")[0]}</b>
                    </p>
                    <p>
                      Delivery Date: <b>{item.delivery_date.split("T")[0]}</b>
                    </p>
                  </td>

                  <td className="px-3 py-3 border-b border-gray-400">
                    {item.customer_name}
                  </td>
                  <td className="px-3 py-3 border-b border-gray-400">
                    {item.driver_name}
                  </td>
                  <td className="font-semibold px-3 py-3 border-b border-gray-400">
                    {item.total_amount}
                  </td>

                  <td className="text-red-500 font-semibold leading-5 px-3 py-3 border-b border-gray-400">
                    <p>{item.status}</p>
                  </td>

                  <td className="text-[12px] leading-5 px-3 py-3 border-b border-gray-400">
                    <p>
                      Total: <b>{item.total_amount}</b>
                    </p>
                    <p>
                      Paid: <b>{item.paid_amount}</b>
                    </p>
                  </td>

                  <td className="px-3 py-3  border-b border-gray-400">Admin</td>

                  <td className="px-3 py-3 border-b border-gray-400">
                    <div className="flex justify-center gap-2">
                      <button onClick={()=>{
                        setOpenRevokedModal(true)
                        setRevokedId(item.id)
                      }} className=" p-2 bg-sky-300 rounded-md flex items-center justify-center cursor-pointer">
                        <CiClock2 size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setHardDeleteId(item.id);
                          setOpenHardDeleteModal(true);
                        }}
                        className="p-2 bg-[#FFD0C6] text-[#C32300] cursor-pointer rounded"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      </div>

      {openHardDeleteModal && (
        <DeleteModal
          isOpen={openHardDeleteModal}
          onCancel={() => {
            setOpenHardDeleteModal(false);
            setHardDeleteId(null);
          }}
          onConfirm={handleDelete}
        />
      )}
      {
        openRevokedModal && (
          <DeleteModal
            isOpen={openRevokedModal}
            mode="revoke"
            title="Revoke Order Access"
            description="Are you sure you want to revoke access to this order?"
            onCancel={() => {
              setOpenRevokedModal(false);
              setRevokedId(null);
            }}
            onConfirm={ handleRevoke}
          />)}
          
      
    </div>
  );
}

export default Delete_Order;

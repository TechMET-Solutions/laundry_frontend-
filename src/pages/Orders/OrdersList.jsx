import React, { useEffect, useState } from "react";
import { IoReturnUpBackOutline, IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Status_Screen from "../../assets/Status_Screen.svg";
import { GrView } from "react-icons/gr";
import { getAllOrders, getOrderById, updateOrder } from "../../api/order";
import Pagination from "../../components/Pagination";
import DeleteModal from "../../components/models/DeleteModal";

const formatDisplayDate = (value) => {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function Order_List() {
  const navigate = useNavigate();

  const [paymentDropdown, setPaymentDropdown] = useState(false);
  const [driversDropdown, setDriversDropdown] = useState(false);
  const [ordersDropdown, setOrdersDropdown] = useState(false);

  const [paymentSelected, setPaymentSelected] = useState("All Payment");
  const [driverSelected, setDriverSelected] = useState(" All Drivers");
  const [orderSelected, setOrderSelected] = useState("All Orders");
  // const [edit, setEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // const handleDeleteOrder = () => {
  //   // Implement delete order logic here
  //   setDeleteOrder(false);
  // };

  const fetchOrders = async (p = page) => {
    try {
      setLoading(true);
      const res = await getAllOrders(p, 10);

      setOrders(res.data.data || []);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      // Fetch the current order so we send the full payload the API expects
      const response = await getOrderById(deleteId);
      const orderData = response.data.data;
  console.log(orderData);
      await updateOrder(deleteId, {
        order_date: orderData.order_date,
        delivery_date: orderData.delivery_date,
        customer_name: orderData.customer_name,
        driver_name: orderData.driver_name,
        total_amount: orderData.total_amount,
        paid_amount: orderData.paid_amount,
        currency: orderData.currency,
        status:"DELETED",
      });
     
      setShowDeleteModal(false);
      setDeleteId(null);
      console.log();

      fetchOrders(page);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="py-6 bg-[#f4f7fb]  ">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <IoReturnUpBackOutline />
          </div>
          <h2 className="font-semibold text-lg">Order List</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate("/orders/status_screen")}
            className="bg-[#FFD0C6] flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-sm"
          >
            <img src={Status_Screen} alt="Status Screen" />
            Order Status Screen
          </button>

          <button
            onClick={() => navigate("/orders/deleted_orders")}
            className="bg-red-600 text-white flex items-center gap-2 px-4 py-3 rounded-full text-sm"
          >
            <AiOutlineDelete />
            Deleted Orders
          </button>

          <button
            onClick={() => navigate("/pos")}
            className="bg-indigo-600 text-white flex items-center gap-2 px-4 py-3 rounded-full text-sm"
          >
            <IoAddCircleOutline />
            Add New Order
          </button>
        </div>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-wrap justify-end gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 py-2 bg-gray-200 rounded-lg outline-none"
          />
        </div>

        <div className="relative w-full sm:w-56">
          <button
            onClick={() => setPaymentDropdown(!paymentDropdown)}
            className="flex w-full items-center justify-between bg-gray-200 px-4 py-2 rounded-lg"
          >
            {paymentSelected}
            <RiArrowDropDownLine className="h-6 w-6" />
          </button>

          {paymentDropdown && (
            <ul className="absolute z-20 w-full bg-white border rounded-lg shadow-md">
              {["All Payment", "Pending", "Partialy Paid", "Fully Paid"].map(
                (item) => (
                  <li
                    key={item}
                    onClick={() => {
                      setPaymentSelected(item);
                      setPaymentDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {item}
                  </li>
                ),
              )}
            </ul>
          )}
        </div>
        <div className="relative w-full sm:w-56">
          <button
            onClick={() => setDriversDropdown(!driversDropdown)}
            className="flex w-full items-center justify-between bg-gray-200 px-4 py-2 rounded-lg"
          >
            {driverSelected}
            <RiArrowDropDownLine className="h-6 w-6" />
          </button>

          {driversDropdown && (
            <ul className="absolute z-20 w-full bg-white border rounded-lg shadow-md">
              {["All Drivers", "Aswin VD", "Super Man", "Sales Team"].map(
                (item) => (
                  <li
                    key={item}
                    onClick={() => {
                      setDriverSelected(item);
                      setDriversDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {item}
                  </li>
                ),
              )}
            </ul>
          )}
        </div>
        <div className="relative w-full sm:w-56">
          <button
            onClick={() => setOrdersDropdown(!ordersDropdown)}
            className="flex w-full items-center justify-between bg-gray-200 px-4 py-2 rounded-lg"
          >
            {orderSelected}
            <RiArrowDropDownLine className="h-6 w-6" />
          </button>

          {ordersDropdown && (
            <ul className="absolute z-20 w-full bg-white border rounded-lg shadow-md">
              {[
                "All Orders",
                "Order Received",
                "Processing",
                "Ready To Deliver",
                "Out for Delivery",
                "Partial Delivery",
                "Delivered",
                "Returned",
              ].map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setOrderSelected(item);
                    setOrdersDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[1100px] w-full text-sm border-separate">
          <thead>
            <tr>
              {[
                "Order Id",
                "Order Info",
                "Customer",
                "Driver",
                "Amount",
                "Status",
                "PaymentInfo",
                "Created By",
                "Payment",
                "Action",
              ].map((head) => (
                <th
                  key={head}
                  className="bg-[#56CCFF] px-2 py-2 sm:px-3 whitespace-nowrap text-left font-medium text-gray-800"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td className="px-2 py-4 text-center" colSpan={10}>
                  Loading orders...
                </td>
              </tr>
            )}

            {!loading && orders.length === 0 && (
              <tr>
                <td className="px-2 py-4 text-center" colSpan={10}>
                  No orders found.
                </td>
              </tr>
            )}

            {!loading &&
              orders.map((item) => {
                const orderId = item.order_code || "N/A";
                const orderDate = formatDisplayDate(item.order_date);
                const deliveryDate = formatDisplayDate(item.delivery_date);
                const customerName = item.customer_name || "--";
                const driverName = item.driver_name || "--";
                const amount = item.total_amount || "--";
                const status = item.status || "--";
                const totalAmount = item.total_amount || "--";
                const paidAmount = item.paid_amount || "--";
                const createdBy = "Admin";

                return (
                  <tr key={orderId} className="bg-[#f1f5fb] text-[#3A3D51]">
                    <td className="px-2 py-2 sm:px-2 border-b border-gray-400 font-semibold whitespace-nowrap  text-[12px]">
                      {orderId}
                    </td>

                    <td className="px-2 py-2 whitespace-nowrap  text-[12px] sm:px-2 border-b border-gray-400 text-[#3A3D51]">
                      <div className="flex flex-col gap-1 text-sm leading-tight">
                        <span>
                          <span className="font-medium">Order date :</span>{" "}
                          <span className="font-bold">{orderDate}</span>
                        </span>
                        <span>
                          <span className="font-medium">Delivered :</span>{" "}
                          <span className="font-bold">{deliveryDate}</span>
                        </span>
                      </div>
                    </td>

                    <td className=" py-2 font-medium whitespace-nowrap  text-[12px]   border-b border-gray-400  ">
                      {customerName}
                    </td>

                    <td className="hidden md:table-cell font-semibold px-2 py-2 sm:px-2 border-b border-gray-400 whitespace-nowrap  text-[12px]">
                      {driverName}
                    </td>

                    <td className="px-2 py-2 sm:px-2 border-b text-[#3A3D51] border-gray-400 font-semibold whitespace-nowrap  text-[12px]">
                      AED {amount}
                    </td>

                    <td className="px-2 py-2 sm:px-2 border-b border-gray-400 text-[#707070] whitespace-nowrap  text-[12px]">
                      {status}
                    </td>

                    <td className="px-2 py-2 sm:px-2 border-b whitespace-nowrap  text-[12px] border-gray-400">
                      <div className="flex flex-col gap-1 text-[12px] leading-tight whitespace-normal">
                        <span className="font-semibold text-[#3A3D51]">
                          Total Amount:{" "}
                          <span className="font-bold ">
                            {" "}
                            AED {totalAmount}{" "}
                          </span>
                        </span>
                        <span className="font-semibold text-[#3A3D51]">
                          Paid Amount:{" "}
                          <span className="font-bold "> AED {paidAmount} </span>
                        </span>
                      </div>
                    </td>

                    <td className="  md:table-cell whitespace-nowrap text-[#3A3D51]  font-medium  text-[12px] px-2 py-2 sm:px-4 border-b border-gray-400">
                      {createdBy}
                    </td>

                    <td className="px-2 py-2 border-b whitespace-nowrap  text-[12px] border-gray-400">
                      <button className="bg-[#27AE60] px-3 py-1 sm:px-2 sm:py-2 rounded-lg text-white font-bold whitespace-nowrap">
                        Add Payment
                      </button>
                    </td>

                    <td className="px-2 py-6 sm:px-2 border-b whitespace-nowrap  text-[12px] border-gray-400 flex gap-2">
                      <button
                        className="p-2 bg-[#56CCF291] rounded"
                        onClick={() => navigate("/orders/detailed_order")}
                      >
                        <GrView />
                      </button>
                      <button
                        className="p-2 bg-[#FFD0C6] text-[#C32300] rounded"
                        onClick={() => {
                          setShowDeleteModal(true);
                          setDeleteId(item.id);
                        }}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                );
              })}
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
      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
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

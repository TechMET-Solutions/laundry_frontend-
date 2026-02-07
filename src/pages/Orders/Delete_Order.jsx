import React, { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiClock2 } from "react-icons/ci";
import Pagination from "../../components/Pagination";
import { getAllOrders, revokeOrder } from "../../api/order";
import DeleteModal from "../../components/models/DeleteModal";
import { getAllEmployees } from "../../api/employee";

function Delete_Order() {
  const [search, setSearch] = useState("");
  const [driversDropdown, setDriversDropdown] = useState(false);
  const [driverSelected, setDriverSelected] = useState("All Drivers");
  const [driversList, setDriversList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    driver: "",
    orderStatus: "",
    paymentStatus: "",
  });

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [openHardDeleteModal, setOpenHardDeleteModal] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [employees, setEmployees] = useState({});


  const [openRevokedModal, setOpenRevokedModal] = useState(false);
  const [revokedId, setRevokedId] = useState(null);

  const fetchOrders = async (p = page) => {
    try {
      const res = await getAllOrders(p, 10);

      const cancelledOrders = (res.data.data || []).filter(
        order => order.order_status === "Deleted"
      );

      setOrders(cancelledOrders);
      setAllOrders(cancelledOrders);   // ⭐ THIS WAS MISSING
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error("Failed to load orders", err);
    }
  };



  const fetchDrivers = async () => {
    try {
      let collected = [];
      let p = 1;

      while (true) {
        const res = await getAllEmployees(p, 100);
        const data = res.data.data || [];
        const pagination = res.data.pagination;

        collected = collected.concat(data);

        if (!pagination || p >= pagination.totalPages) break;
        p++;
      }

      const drivers = collected.filter(
        (e) => e.role?.toLowerCase() === "driver"
      );

      const map = {};
      drivers.forEach((d) => (map[d.id] = d));

      setDriversList(drivers);
      setEmployees(map);
    } catch (err) {
      console.error("Fetch drivers failed", err);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);



  useEffect(() => {
    let data = [...allOrders];

    if (filters.search) {
      const s = filters.search.toLowerCase();
      data = data.filter((o) => {
        const driver = employees[o.driver_id]
          ? `${employees[o.driver_id].first_name} ${employees[o.driver_id].last_name}`.toLowerCase()
          : "";
        return (
          o.order_code?.toLowerCase().includes(s) ||
          o.customer_name?.toLowerCase().includes(s) ||
          driver.includes(s)
        );
      });
    }

    if (filters.driver) {
      data = data.filter(
        (o) => String(o.driver_id) === String(filters.driver),
      );
    }

    if (filters.orderStatus) {
      data = data.filter(
        (o) =>
          o.order_status?.toLowerCase() ===
          filters.orderStatus.toLowerCase(),
      );
    }

    if (filters.paymentStatus) {
      data = data.filter((o) => {
        if (filters.paymentStatus === "Pending") return o.paid_amount === 0;
        if (filters.paymentStatus === "Partialy Paid")
          return o.paid_amount > 0 && o.pending_amount > 0;
        if (filters.paymentStatus === "Fully Paid")
          return o.pending_amount === 0;
        return true;
      });
    }

    setFilteredOrders(data);
  }, [filters, allOrders, employees]);

  useEffect(() => {
    setFilteredOrders(allOrders);
  }, [allOrders]);

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const handleRevoke = async () => {
    if (!revokedId) return;

    try {
      await revokeOrder(revokedId);
      setRevokedId(null);
      fetchOrders();
    } catch (error) {
      console.error("Revoke failed:", error);
    }
  };

  return (
    <div className=" py-6 px-0 ">
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
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
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

        <div className="relative w-full sm:w-56">
          <button
            onClick={() => setDriversDropdown(!driversDropdown)}
            className="flex w-full items-center justify-between bg-gray-200 px-4 py-2 rounded-lg"
          >
            {driverSelected}
            <RiArrowDropDownLine className="h-6 w-6" />
          </button>

          {driversDropdown && (
            <ul className="absolute z-20 w-full bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto">
              <li
                onClick={() => {
                  setDriverSelected("All Drivers");
                  setFilters({ ...filters, driver: "" });
                  setDriversDropdown(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                All Drivers
              </li>
              {driversList.map((d) => (
                <li
                  key={d.id}
                  onClick={() => {
                    setDriverSelected(`${d.first_name} ${d.last_name}`);
                    setFilters({ ...filters, driver: d.id });
                    setDriversDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {d.first_name} {d.last_name}
                </li>
              ))}
            </ul>
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
            {filteredOrders.map((item) => {
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
                    {/* {item.total_amount} */}
                    AED {Number(item.gross_total).toFixed(2)}
                  </td>

                  <td className="text-red-500 font-semibold leading-5 px-3 py-3 border-b border-gray-400">
                    <p>{item.order_status}</p>
                  </td>

                  <td className="text-[12px] leading-5 px-3 py-3 border-b border-gray-400">
                    <p>
                      Total: <b>AED {Number(item.gross_total).toFixed(2)}</b>
                    </p>
                    <p>
                      Paid: <b>AED {Number(item.paid_amount).toFixed(2)}</b>
                    </p>
                  </td>

                  <td className="px-3 py-3  border-b border-gray-400">{item.created_by}</td>

                  <td className="px-3 py-3 border-b border-gray-400">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => {
                        setOpenRevokedModal(true)
                        setRevokedId(item.id)
                      }} className=" p-2 bg-sky-300 rounded-md flex items-center justify-center cursor-pointer">
                        <CiClock2 size={18} />
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
            onConfirm={handleRevoke}
          />)}


    </div>
  );
}

export default Delete_Order;

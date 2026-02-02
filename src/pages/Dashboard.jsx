import { VscBell } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TbSettingsBolt, TbReport } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiTruck } from "react-icons/fi";
import { PiCubeTransparentFill } from "react-icons/pi";
import piechart from "../assets/piechart.png";
import { useNavigate } from "react-router-dom";
import { getTodaysOrdesrs } from "../api/order";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const STATUS_LIST = [
  { label: "Ready to deliver", color: "bg-green-500" },
  { label: "Returned", color: "bg-red-600" },
  { label: "Delivered", color: "bg-blue-900" },
  { label: "Partial delivery", color: "bg-amber-800" },
  { label: "Processing", color: "bg-orange-400" },
  { label: "Out for delivery", color: "bg-blue-500" },
  { label: "Pending delivery", color: "bg-yellow-400" },
];

const getStatusStyles = (status) => {
  switch (status) {
    case "Pending":
      return {
        border: "border-yellow-400",
        badge: "bg-yellow-100 text-yellow-800",
      };
    case "Delivered":
      return {
        border: "border-green-400",
        badge: "bg-green-100 text-green-800",
      };
    case "Ready to Deliver":
      return { border: "border-blue-400", badge: "bg-blue-100 text-blue-800" };
    default:
      return { border: "border-red-400", badge: "bg-red-100 text-red-800" };
  }
};

function Dashboard() {
  const navigate = useNavigate();
  const [todayOrders, setTodayOrders] = useState([]);

  const fetchTodayOrders = async () => {
    try {
      const response = await getTodaysOrdesrs();
      const allOrders = response.data.data || [];
      // console.log(allOrders);

      // Filter orders for today based on createdAt date

      const today = new Date().toLocaleDateString("en-CA");
      const filteredOrders = allOrders.filter((order) => {
        if (!order?.created_at) return false;
        const orderDate = new Date(order.created_at).toLocaleDateString(
          "en-CA",
        );
        return orderDate === today;
      });
      setTodayOrders(filteredOrders);
    } catch (error) {
      console.error("Error fetching today's orders:", error);
      setTodayOrders([]);
    }
  };

  useEffect(() => {
    fetchTodayOrders();
  }, []);

  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-end mb-6 gap-3 items-center">
        <button
          onClick={() => navigate("/pos")}
          className="bg-white px-4 py-2 rounded-full ring-2 ring-blue-400 text-sm"
        >
          <IoIosAddCircleOutline className="inline mr-1" />
          Add New Order
        </button>

        <button
          onClick={() => navigate("/customers")}
          className="bg-white px-4 py-2 rounded-full ring-2 ring-blue-400 text-sm"
        >
          <IoPersonOutline className="inline mr-1" />
          Manage Customer
        </button>

        <button
          onClick={() => navigate("/services/list")}
          className="bg-white px-4 py-2 rounded-full ring-2 ring-blue-400 text-sm"
        >
          <TbSettingsBolt className="inline mr-1" />
          Add New Services
        </button>

        <VscBell className="h-6 w-6" />
        <CgProfile className="h-6 w-6" />
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <div className="flex gap-6 mb-6">
            <div className="flex-1">
              <StatCard
                title="Pending Orders"
                count="03"
                border="border-yellow-400"
                icon={<TbReport />}
              />
            </div>
            <div className="flex-1">
              <StatCard
                title="Delivered Orders"
                count="88"
                border="border-black"
                icon={<FiTruck />}
              />
            </div>
            <div className="flex-1">
              <StatCard
                title="Ready To Deliver"
                count="23"
                border="border-green-400"
                icon={<PiCubeTransparentFill />}
              />
            </div>
            <div className="flex-1">
              <StatCard
                title="Delete Order"
                count="20"
                border="border-red-400"
                icon={<RiDeleteBin5Line />}
              />
            </div>
          </div>

          <div className="p-6 bg-[#F5F8FF] rounded-lg h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">
                Today’s Delivery
              </h2>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#BEC3E4] gap-2 rounded-xl px-4 py-2 w-[280px] bg-white shadow-sm">
                  <CiSearch className="text-gray-600  " />
                  <input
                    type="text"
                    placeholder="Search Here..."
                    className="w-full outline-none text-sm text-gray-600"
                  />
                </div>

                <select className="border border-[#BEC3E4] rounded-xl px-4 py-2 bg-white shadow-sm text-sm font-medium">
                  <option>All Orders</option>
                  <option>Delivered</option>
                  <option>Processing</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2      flex-1 ">
              {todayOrders.length > 0 ? (
                todayOrders.map((item, index) => {
                  const itemCount = item.item_list?.length || 0;

                  // Service Types
                  const serviceTypes =
                    item.item_list?.map((listItem) => listItem.type) || [];

                  const uniqueTypes = [...new Set(serviceTypes)];
                  const displayTypes = uniqueTypes.slice(0, 2).join(" + ");
                  const hasMore = uniqueTypes.length > 2;

                  const statusStyles = getStatusStyles(item.order_status);

                  return (
                    <div
                      key={index}
                      className={`bg-white text-[#1E293B] flex flex-col gap-4 rounded-xl border-2 ${statusStyles.border} shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 self-start`}
                    >
                      <div className="flex justify-between items-start ">
                        <h3 className="text-lg font-bold text-slate-800">
                          {item.customer_name}
                        </h3>
                        <span
                          className={`px-4 py-1 rounded-full text-xs font-semibold ${statusStyles.badge}`}
                        >
                          {item.order_status}
                        </span>
                      </div>

                      <div className="flex justify-between items-center ">
                        <p className="text-sm text-gray-500">
                          {itemCount} Items {displayTypes}
                          {hasMore ? "..." : ""}
                        </p>
                        <p className="font-bold text-slate-800 text-sm">
                          {item.order_code}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="col-span-2 text-center text-gray-500">
                  No orders found for today
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="w-[380px] flex flex-col gap-6">
          <div className="bg-white rounded-lg shadow-sm px-4 py-3 border-b border-green-400">
            <div>Payment Outstanding</div>
            <div className="text-2xl font-semibold">AED 240.00</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 flex-1 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Overview</h3>

            <img
              src={piechart}
              alt="Pie Chart"
              className="w-75 mb-6 justify-between"
            />

            <div className="border-2 border-white p-4 rounded-lg shadow-sm">
              <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                {STATUS_LIST.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-5 h-5 ${item.color}`} />
                    <span className="text-sm font-semibold text-gray-700">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small reusable stat card */
function StatCard({ title, count, border, icon }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm px-4 py-3 border-b ${border}`}
    >
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold">{count}</span>
        {icon}
      </div>
      <div>{title}</div>
    </div>
  );
}
export default Dashboard;

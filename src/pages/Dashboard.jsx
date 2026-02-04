import { VscBell } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TbSettingsBolt, TbReport } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiTruck } from "react-icons/fi";
import { PiCubeTransparentFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { getTodaysOrdesrs } from "../api/order";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import NavButton from "../components/ui/NavButton";

//------------Pie Chart Data and Settings----------------

import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  { label: "Ready to deliver", value: 4, color: "#10b981" },
  { label: "Returned", value: 3, color: "#dc2626" },
  { label: "Delivered", value: 10, color: "#1e40af" },
  { label: "Partial delivery", value: 2, color: "#b45309" },
  { label: "Processing", value: 33, color: "#f97316" },
  { label: "Out for delivery", value: 7, color: "#3b82f6" },
  { label: "Pending delivery", value: 5, color: "#fbbf24" },
];

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

//---------------------------------------------

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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("all");

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

  // Filter and sort orders
  const filteredAndSortedOrders = todayOrders
    .filter((order) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.customer_name.toLowerCase().includes(searchLower) ||
        order.order_code.toLowerCase().includes(searchLower)
      );
    })
    .filter((order) => {
      if (sortBy === "all") return true;
      const status = (order.order_status || "").toLowerCase();
      if (sortBy === "pending") return status.includes("pending");
      return status === sortBy;
    });

  console.log(filteredAndSortedOrders);
  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-end mb-6 gap-3 items-center">
        <NavButton onClick={() => navigate("/pos")}>
          <IoIosAddCircleOutline className="inline mr-1" />
          Add New Order
        </NavButton>

        <NavButton onClick={() => navigate("/customers")}>
          <IoPersonOutline className="inline mr-1" />
          Manage Customer
        </NavButton>

        <NavButton onClick={() => navigate("/services/list")}>
          <TbSettingsBolt className="inline mr-1" />
          Add New Services
        </NavButton>

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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full outline-none text-sm text-gray-600"
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-[#BEC3E4] rounded-xl px-4 py-2 bg-white shadow-sm text-sm font-medium"
                >
                  <option value="all">All Orders</option>
                  <option value="delivered">Delivered</option>
                  <option value="processing">Processing</option>
                  <option value="ready to deliver">Ready to Deliver</option>
                  <option value="pending">Pending</option>
                  <option value="out for delivery">Out for Delivery</option>
                  <option value="partial delivery">Partial Delivery</option>
                  <option value="returned">Returned</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 items-start auto-rows-min flex-1">
              {filteredAndSortedOrders.length > 0 ? (
                filteredAndSortedOrders.map((item, index) => {
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
                      className={`bg-white  flex flex-col gap-4 rounded-xl border-2  ${statusStyles.border} shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 self-start`}
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

            <div className="flex justify-center mb-6">
              <PieChart
                series={[
                  {
                    innerRadius: 50,
                    outerRadius: 100,
                    data,
                    arcLabel: "value",
                  },
                ]}
                sx={{
                  ".MuiPieArc-root": { stroke: "none", strokeWidth: 0 },
                }}
                {...settings}
              />
            </div>

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

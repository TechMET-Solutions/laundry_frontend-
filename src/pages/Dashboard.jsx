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


const dashitems = [
  { customer_name: "Aswin VD", orderid: "TMS/ORD-01", servicetype: "Wash & Fold", status: "Pending" },
  { customer_name: "John Doe", orderid: "TMS/ORD-02", servicetype: "Dry Cleaning", status: "Delivered"},
  { customer_name: "Jane Smith", orderid: "TMS/ORD-03", servicetype: "Wash & Iron", status: "Ready to Deliver"},
  { customer_name: "Mike Johnson", orderid: "TMS/ORD-04", servicetype: "Wash & Fold", status: "Deleted" },
  { customer_name: "Emily Davis", orderid: "TMS/ORD-05", servicetype: "Dry Cleaning", status: "Pending" },
  { customer_name: "David Wilson", orderid: "TMS/ORD-06", servicetype: "Wash & Iron", status: "Delivered" },
];

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
      return { border: "border-yellow-400", badge: "bg-yellow-100 text-yellow-800" };
    case "Delivered":
      return { border: "border-green-400", badge: "bg-green-100 text-green-800" };
    case "Ready to Deliver":
      return { border: "border-blue-400", badge: "bg-blue-100 text-blue-800" };
    default:
      return { border: "border-red-400", badge: "bg-red-100 text-red-800" };
  }
};

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-[#f4f7fb] min-h-screen">

      {/* HEADER */}
      <div className="flex justify-end mb-6 gap-3 items-center">
        <button 
        onClick={()=> navigate("/pos")}
        className="bg-white px-4 py-2 rounded-full ring-2 ring-blue-400 text-sm">
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

      {/* TOP CARDS */}
      <div className="flex gap-6 mb-8">
        <StatCard title="Pending Orders" count="03" border="border-yellow-400" icon={<TbReport />} />
        <StatCard title="Delivered Orders" count="88" border="border-black" icon={<FiTruck />} />
        <StatCard title="Ready To Deliver" count="23" border="border-green-400" icon={<PiCubeTransparentFill />} />
        <StatCard title="Delete Order" count="20" border="border-red-400" icon={<RiDeleteBin5Line />} />
        <div className="bg-white rounded-lg shadow-sm w-56 px-4 py-3 border-b border-green-400">
          <div>Payment Outstanding</div>
          <div className="text-2xl font-semibold">AED 240.00</div>
        </div>
      </div>

      {/* CUSTOMER + PIE SECTION */}
      <div className="flex gap-6">

        {/* LEFT — CUSTOMER CARDS */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-4">Customer Orders</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashitems.map((item, index) => {
              const styles = getStatusStyles(item.status);

              return (
                <div
                  key={index}
                  className={`h-[153px] border ${styles.border} rounded-md p-4 shadow-sm`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-sm">{item.customer_name}</h3>
                    <span className={`px-3 py-1 text-xs rounded-full ${styles.badge}`}>
                      {item.status}
                    </span>
                  </div>

                  <p className="text-blue-600 text-sm mt-2 font-medium">
                    {item.servicetype}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    Order ID: {item.orderid}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — PIE + LEGEND */}
        <div className="w-[380px] bg-white rounded-lg shadow-sm p-4 h-fit justify-between">
          <h3 className="text-lg font-semibold mb-4">Overview</h3>

          <img src={piechart} alt="Pie Chart" className="w-75 mb-6 justify-between"/>

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
  );
}

/* Small reusable stat card */
function StatCard({ title, count, border, icon }) {
  return (
    <div className={`bg-white rounded-lg shadow-sm w-56 px-4 py-3 border-b ${border}`}>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold">{count}</span>
        {icon}
      </div>
      <div>{title}</div>
    </div>
  );
}
export default Dashboard;

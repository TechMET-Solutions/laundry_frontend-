import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import { getAllOrders } from "../../api/order";

const statusStyles = {
  Pending: "bg-gray-200 text-gray-600",
  Processing: "bg-orange-100 text-orange-600",
  Delivered: "bg-green-100 text-green-600",
};

const OrderCard = ({ item }) => {
  const style = statusStyles[item.order_status] || "bg-gray-100 text-gray-600";

  return (
    <div className="w-[309px] h-[153px] bg-white rounded-md border border-slate-300 p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm">{item.customer_name}</h3>

        <span className={`px-3 py-1 text-xs rounded-full ${style}`}>
          {item.order_status}
        </span>
      </div>
      <div className="flex justify-between">
        <p className="text-blue-600 text-sm mt-2 font-medium">
          {item.item_list.length} Items{" "}
          {item.item_list.map((el) => el.type).join("+")}
        </p>
         <p className="text-blue-600 text-sm mt-2 font-medium">
          {item.order_code}
        </p>
      </div>

      <p className="text-xs py-2 font-bold text-gray-800 mt-2">
        Delivery Date: {item.delivery_date.split("T")[0].split("-").reverse().join("/")}
      </p>

      <p className="text-xs py-2 font-bold text-gray-800">
        Driver: {item.driver_name || "Not Assigned"}
      </p>
    </div>
  );
};

function Order_Status_Screen() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders(1, 50).then((res) => {
      const raw = res?.data?.orders || res?.data?.data || res?.data || [];

      const filtered = raw.filter((o) => o.order_status !== "Cancelled");

      setOrders(filtered);
    });
  }, []);

  const groupedOrders = useMemo(() => {
    // console.log(groupedOrders);
    return orders.reduce((acc, order) => {
      if (!acc[order.order_status]) acc[order.order_status] = [];
      acc[order.order_status].push(order);
      return acc;
    }, {});
  }, [orders]);

  return (
    <>
      <div
        onClick={() => navigate("/orders")}
        className="flex items-center justify-center bg-indigo-800 w-11 h-11 rounded-sm absolute top-[40px] left-[338px] cursor-pointer"
      >
        <TbArrowBackUp className="w-6 h-6 text-white" />
      </div>

      <p className="absolute top-[50px] left-[450px] font-bold text-[16px]">
        Order Status Screen
      </p>

      <div className="flex absolute top-[150px] left-[338px] w-[1000px] gap-6">
        {/* Column 1 - Pending */}
        <div className="flex flex-col gap-4 w-[309px]">
          {(groupedOrders["Pending"] || []).map((item) => (
            <OrderCard key={item.id} item={item} />
          ))}
        </div>
        {/* Column 3 - Ready To Deliver */}
        <div className="flex flex-col gap-4 w-[309px]">
          {(groupedOrders["Delivered"] || []).map((item) => (
            <OrderCard key={item.id} item={item} />
          ))}
        </div>

        {/* Column 2 - Processing */}
        <div className="flex flex-col gap-4 w-[309px]">
          {(groupedOrders["Processing"] || []).map((item) => (
            <OrderCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Order_Status_Screen;

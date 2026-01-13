import Category from "./Category";
import OrderSummary from "./OrderSummary";
import { useState } from "react";

function PosPage() {
  const [orders, setOrders] = useState([]); 

  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4">

      <div className="mt-4 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
        <Category onSaveOrder={addOrder} />
        <OrderSummary orders={orders} />
      </div>
    </div>
  );
}

export default PosPage;

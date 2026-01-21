import { useEffect } from "react";
import { getAllServicesList } from "../../api/servicelist";
import Category from "./Category";
import OrderSummary from "./OrderSummary";
import { useState } from "react";

function PosPage() {
  const [orders, setOrders] = useState([]);
  const [servicesData, setServicesData] = useState([]);

  const fetchAllServices = async () => {
    try {
      const reponse = await getAllServicesList();
      setServicesData(reponse.data.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  const increaseQuantity = (index) => {
    setOrders((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (index) => {
    setOrders((prev) =>
      prev.map((item, i) =>
        i === index && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const removeItem = (index) => {
    setOrders((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="  bg-slate-100 p-4">
      <div className="mt-4 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
        <Category onSaveOrder={addOrder} servicesData={servicesData} />
        <OrderSummary
          orders={orders}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeItem={removeItem}
        />
      </div>
    </div>
  );
}

export default PosPage;

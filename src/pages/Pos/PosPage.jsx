import Header from "./Header";
import Category from "./Category";
import OrderSummary from "./OrderSummary";

function PosPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <Header />

      <div className="mt-4 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
        <Category />
        <OrderSummary />
      </div>
    </div>
  );
}

export default PosPage;

import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ServiceList from "./pages/services/ServiceList";
import ServiceType from "./pages/services/ServiceType";
import ServiceCategory from "./pages/services/ServiceCategory";
import Addon from "./pages/services/Addon";
import Emirates from "./pages/Location_management/Emirates.jsx";
import Area from "./pages/Location_management/Area.jsx";
import Collections from "./pages/Collections.jsx";
import DailyReports from "./pages/Reports/DailyReports.jsx";
import ClothWiseReport from "./pages/Reports/ClothWiseReport.jsx";
import Outstanding_reports from "./pages/Reports/Outstanding_report.jsx";
import SalesReport from "./pages/Reports/SalesReport.jsx";
import OrderReports from "./pages/Reports/OrderReports.jsx";
import Ledger_report from "./pages/Reports/Ledger_report.jsx";
import CustomerOutstandingReport from "./pages/Reports/CustomerOutstandingReport.jsx";
import ExpensesReport from "./pages/Reports/ExpensesReport.jsx";
import TaxReport from "./pages/Reports/TaxReport.jsx";
import Customer from "./pages/Customer.jsx";
import Expenses from "./pages/Expenses.jsx";
import TimeSlot from "./pages/TimeSlot.jsx";
import Employee from "./pages/Employee.jsx";
import Order_List from "./pages/Orders/OrdersList.jsx";
import Order_Status_Screen from "./pages/Orders/Order_Status_Screen.jsx";
import Delete_Order from "./pages/Orders/Delete_Order.jsx";
import DetailedOrderPage from "./pages/Orders/Detailed_Order.jsx";
import Payment from "./pages/Payment_Receipt.jsx";
import CustomerD from "./pages/CustomerD.jsx";
import Login from "./pages/Login.jsx";
import ExpenseCategories from "./pages/Expense_categories.jsx";
import POS from "./pages/POS.jsx";
import AttendanceReport from "./pages/Reports/AttendanceReport.jsx";

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="pos" element={<POS />} />
        <Route path="services/list" element={<ServiceList />} />
        <Route path="services/type" element={<ServiceType />} />
        <Route path="services/category" element={<ServiceCategory />} />
        <Route path="services/addon" element={<Addon />} />
        <Route path="location_management/emirates" element={<Emirates />} />
        <Route path="location_management/areas" element={<Area />} />
        <Route path="collection" element={<Collections />} />

        {/* Reports */}
        <Route path="reports/daily" element={<DailyReports />} />
        <Route path="reports/outstanding" element={<Outstanding_reports />} />
        <Route path="reports/sales" element={<SalesReport />} />
        <Route path="reports/order" element={<OrderReports />} />
        <Route path="reports/ledger" element={<Ledger_report />} />
        <Route path="reports/customer-outstanding" element={<CustomerOutstandingReport />} />
        <Route path="reports/cloth-wise" element={<ClothWiseReport />} />
        <Route path="reports/expenses" element={<ExpensesReport />} />
        <Route path="reports/tax" element={<TaxReport />} />
        <Route path="reports/attendance" element={<AttendanceReport />} />

        {/* Other */}
        <Route path="expenses" element={<Expenses />} />
        <Route path="expense_categories" element={<ExpenseCategories />} />
        <Route path="time-slots" element={<TimeSlot />} />
        <Route path="customers" element={<Customer />} />
        <Route path="customers/:id/details" element={<CustomerD />} />
        <Route path="employees" element={<Employee />} />

        {/* Orders */}
        <Route path="orders" element={<Order_List />} />
        <Route path="orders/status_screen" element={<Order_Status_Screen />} />
        <Route path="orders/deleted_orders" element={<Delete_Order />} />
        <Route path="orders/detailed_order" element={<DetailedOrderPage />} />
        <Route path="orders/:id" element={<DetailedOrderPage />} />

        {/* Payments */}
        <Route path="payments" element={<Payment />} />
      </Route>
    </Routes>
  );
}

export default App;

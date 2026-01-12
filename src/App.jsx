import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import Pos from "./pages/Pos"
import ServiceList from "./pages/services/ServiceList";
import ServiceType from "./pages/services/ServiceType";
import ServiceCategory from "./pages/services/ServiceCategory";
import Addon from "./pages/services/Addon";
import Emirates from "./pages/Location_management/Emirates.jsx";
import Area from "./pages/Location_management/Area.jsx";
import Collections from "./pages/Collections.jsx";
 
import Daily_reports from "./pages/Reports/Daily_reports.jsx";  
import Cloth_wise_reports from "./pages/Reports/Cloth_wise_report.jsx";
import Outstanding_reports from "./pages/Reports/Outstanding_report.jsx";
import Sales_report from "./pages/Reports/Sales_report.jsx";
import Order_reports from "./pages/Reports/Order_reports.jsx";
import Ledger_report from "./pages/Reports/Ledger_report.jsx";
import Customer_outstanding_report from "./pages/Reports/Customer_outstanding_report.jsx";
import Expenses_report from "./pages/Reports/Expenses_report.jsx";
import Tax_report from "./pages/Reports/Tax_report.jsx";
import Customer from "./pages/Customer.jsx";

import Expenses from "./pages/Expenses.jsx";
import TimeSlot from "./pages/TimeSlot.jsx";

import Employee from "./pages/Employee.jsx"


function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route index element={<Dashboard />} />
        <Route path="pos" element={<Pos />} />
       <Route path="services/list" element={<ServiceList />} />
        <Route path="services/type" element={<ServiceType />} />
        <Route path="services/category" element={<ServiceCategory />} />
        <Route path="services/addon" element={<Addon />} />
        <Route path="location_management/emirates" element={<Emirates />} />
        <Route path="location_management/areas" element={<Area />} />
        <Route path="collection" element={<Collections />} />
 
 
        <Route path="reports" element={<Daily_reports />} />
        <Route path="reports/daily_reports" element={<Daily_reports />} />
        <Route path="reports/outstanding_reports" element={<Outstanding_reports />} />
        <Route path="reports/sales_reports" element={<Sales_report />} />
        <Route path="reports/order_reports" element={<Order_reports />} />
        <Route path="reports/ledger_reports" element={<Ledger_report />} />
        <Route path="reports/customer_outstanding_reports" element={<Customer_outstanding_report />} />
        <Route path="reports/cloth_wise_reports" element={<Cloth_wise_reports />} />

        <Route path="reports/expenses_reports" element={<Expenses_report />} />
        <Route path="reports/tax_reports" element={<Tax_report />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="time-slots" element={<TimeSlot />} />
        <Route path="customers" element= {<Customer/>}/>

        <Route path="/employees" element={<Employee></Employee>}></Route>



      </Route>

    </Routes>
  );
}

export default App;

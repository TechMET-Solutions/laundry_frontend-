import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import Pos from "./pages/Pos"
import ServiceList from "./pages/services/ServiceList";
import ServiceType from "./pages/services/ServiceType";
import ServiceCategory from "./pages/services/ServiceCategory";
import Addon from "./pages/services/Addon";
import Emirates from "./pages/Location_management.jsx/Emirates";
import Area from "./pages/Location_management.jsx/Area";



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

      </Route>

    </Routes>
  );
}

export default App;

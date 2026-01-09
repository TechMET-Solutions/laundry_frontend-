import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import Pos from "./pages/Pos"


function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route index element={<Dashboard />} />
        <Route path="pos" element={<Pos />} />
      </Route>

    </Routes>
  );
}

export default App;

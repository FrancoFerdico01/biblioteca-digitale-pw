import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import PublicLayout from "./layouts/publicLayout/PublicLayout";
import AuthLayout from "./layouts/authLayout/AuthLayout";
import AdminLayout from "./layouts/adminLayout/AdminLayout";
import Home from "./pages/home/Home";
import Catalog from "./pages/catalog/Catalog";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Events from "./pages/events/Events";
import Community from "./pages/community/Community";

function App() {
  return (
    <div>
      <main>
        <Routes>
          {/* layout per le pagine pubbliche */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* layout per le pagine del login o registrazione */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* layot per l'area amministrativa*/}
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/events" element={<Events />} />
            <Route path="/dashboard/catalog" element={<Catalog />} />
            <Route path="/dashboard/community" element={<Community />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;

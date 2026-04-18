import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/NavBar.jsx";

import Menu from "./pages/Menu";
import Hoy from "./pages/Hoy";
import Crear from "./pages/CrearActividad";
import ActividadDetalle from "./pages/ActividadDetalle";
import Register from "./pages/Register";
import LandingLogin from "./pages/landing/LandingLogin.jsx";
import Calendario from "./pages/Calendario";

function Layout() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" &&
        location.pathname !== "/register" && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LandingLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/hoy" element={<Hoy />} />
        <Route path="/crear" element={<Crear />} />
        <Route path="/actividad/:id" element={<ActividadDetalle />} />
        <Route path="/calendario" element={<Calendario />} />
      </Routes>
    </>
  );
}

export default function App() {
  return <Layout />;
}
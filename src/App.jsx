import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/NavBar.jsx";

import Menu from "./pages/Menu";
import Hoy from "./pages/Hoy";
import Crear from "./pages/CrearActividad";
import Actividad from "./pages/Actividad";
import Register from "./pages/Register";
import LandingLogin from "./pages/landing/LandingLogin.jsx";

function Layout() {

  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LandingLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/hoy" element={<Hoy />} />
        <Route path="/crear" element={<Crear />} />
        <Route path="/actividad/:id" element={<Actividad />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hoy from "../pages/Hoy";
import CrearActividad from "../pages/CrearActividad";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import PruebaCrearActividad from "./PruebaCrearActividad";



function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/hoy" element={<Hoy />} />
        <Route path="/crear" element={<CrearActividad />} />
        <Route path="/prueba" element={<PruebaCrearActividad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
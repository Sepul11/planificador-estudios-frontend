import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hoy from "../pages/Hoy";
import CrearActividad from "../pages/CrearActividad";
import Login from "../pages/Login";
import Menu from "../pages/Menu";



function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/hoy" element={<Hoy />} />
        <Route path="/crear" element={<CrearActividad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
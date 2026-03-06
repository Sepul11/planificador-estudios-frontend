import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar.jsx";

import Menu from "./pages/Menu";
import Hoy from "./pages/Hoy";
import Crear from "./pages/CrearActividad";
import Login from "./pages/Login";
import Actividad from "./pages/Actividad";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/hoy" element={<Hoy />} />
        <Route path="/crear" element={<Crear />} />
        <Route path="/login" element={<Login />} />
        <Route path="/actividad/:id" element={<Actividad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
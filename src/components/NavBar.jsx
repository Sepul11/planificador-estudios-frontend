import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Planificador de estudios</h2>

      <div className="nav-links">
        <Link to="/menu">Menu</Link>
        <Link to="/hoy">Hoy</Link>
        <Link to="/crear">Crear</Link>
        <Link to="/login">Cerrar sesion</Link>
      </div>
    </nav>
  );
}

export default Navbar;
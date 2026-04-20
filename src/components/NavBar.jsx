import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPerfil } from "../services/perfilService";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    async function cargarPerfil() {
      try {
      const data = await getPerfil();
       setUser(data);
      } catch (e) {
        console.log(e);
      }
    }
    cargarPerfil();
  }, []);

  // cerrar dropdown al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Planificador de estudios</h2>

      <div className="nav-links">
        <Link to="/menu">Menu</Link>
        <Link to="/hoy">Hoy</Link>
        <Link to="/crear">Crear</Link>
        <Link to="/actividades">Actividades</Link>
        <Link to="/calendario">Calendario</Link>

        {/* Perfil */}
        <div className="profile-container" ref={ref}>
          <div
            className="nav-link profile-btn"
            onClick={() => setOpen(!open)}
          >
            👤 {user?.first_name} • {user?.limite_diario}h
          </div>

          {open && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                {user?.email}
              </div>

              <Link to="/perfil" className="dropdown-item">
                Ver perfil
              </Link>

              <div
                className="dropdown-item logout"
                onClick={handleLogout}
              >
                Cerrar sesión
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
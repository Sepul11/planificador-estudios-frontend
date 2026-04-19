import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // cargar usuario desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // logout real
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
        <div className="profile-container">
          <button 
            className="profile-btn"
            onClick={() => setOpen(!open)}
          >
            👤 {user ? user.email : "Invitado"}
          </button>

          {open && user && (
            <div className="profile-dropdown">
              <p><strong>{user.email}</strong></p>

              <hr />

              <Link to="/perfil">Ver perfil</Link>
              <Link 
                to="/login" 
                className="dropdown-item"
                onClick={handleLogout}
              >
                Cerrar sesión
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
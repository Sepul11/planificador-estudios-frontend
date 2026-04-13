import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const [open, setOpen] = useState(false);

  const user = {
    username: "Cristian",
    email: "cristian@email.com"
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Planificador de estudios</h2>

      <div className="nav-links">
        <Link to="/menu">Menu</Link>
        <Link to="/hoy">Hoy</Link>
        <Link to="/crear">Crear</Link>

        {/* Perfil */}
        <div className="profile-container">
          <button 
            className="profile-btn"
            onClick={() => setOpen(!open)}
          >
            👤 {user.username}
          </button>

          {open && (
            <div className="profile-dropdown">
              <p><strong>{user.username}</strong></p>
              <p>{user.email}</p>

              <hr />

              <Link to="/perfil">Ver perfil</Link>
              <Link to="/login">Cerrar sesión</Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPerfil } from "../services/perfilService";
import "./Navbar.css";
import logo from "../assets/logo.png";

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
      <div className="logo">
        <img src={logo} alt="logo" style={{ height: "60px", width: "auto"}}/>
        Planificador de estudios
      </div>

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
            style={profileBtn}
          >
            <div style={avatarSmall}>
              {user?.first_name?.charAt(0).toUpperCase()}
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span style={nameText}>{user?.first_name}</span>
              <span style={subText}>{user?.limite_diario}h/día</span>
            </div>
          </div>

          {open && (
            <div style={dropdown}>
              
              <div style={dropdownHeader}>
                <div style={avatarBig}>
                  {user?.first_name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <strong>{user?.first_name}</strong>
                  <p style={emailText}>{user?.email}</p>
                </div>
              </div>

              <Link to="/perfil" style={item}>
                Ver perfil
              </Link>

              <div style={item} onClick={handleLogout}>
                Cerrar sesión
              </div>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const profileBtn = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer"
};

const avatarSmall = {
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  backgroundColor: "#d4a373",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold"
};

const avatarBig = {
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  backgroundColor: "#d4a373",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold"
};

const nameText = {
  fontSize: "14px",
  fontWeight: "600"
};

const subText = {
  fontSize: "12px",
  color: "#d4a373"
};

const dropdown = {
  position: "absolute",
  top: "60px",
  right: "0",
  background: "white",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  padding: "10px",
  minWidth: "200px",
  zIndex: 100
};

const dropdownHeader = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  paddingBottom: "10px",
  borderBottom: "1px solid #eee",
  marginBottom: "10px"
};

const emailText = {
  fontSize: "12px",
  color: "gray",
  margin: 0
};

const item = {
  display: "block",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer",
  textDecoration: "none",
  color: "black"
};

export default Navbar;
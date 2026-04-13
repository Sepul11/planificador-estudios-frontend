import "./LandingNavbar.css";
import logo from "../../assets/logo.png";
function Navbar() {
  return (
    <nav className="landing-navbar">
      
      <div className="landing-logo">
      <img src={logo} alt="logo" style={{  height: "20px", width: "auto"}} />
      Planificador de Estudios
      </div>

      <div className="landing-links">
        <a href="#features">¿Qué es?</a>
        <a href="#benefits">Ventajas</a>
        <a href="#login">Iniciar sesión</a>
      </div>
    </nav>
  );
}

export default Navbar;
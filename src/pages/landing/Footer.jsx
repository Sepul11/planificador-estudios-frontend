import "./Footer.css";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src={logo} alt="logo" />
          <h3>Planificador de Estudios</h3>
          <p>
            Organiza tu tiempo, mejora tu rendimiento y alcanza tus metas
            académicas con una herramienta diseñada para estudiantes.
          </p>
        </div>

        <div className="footer-links">
          <h4>Navegación</h4>
          <a href="#features">¿Qué es?</a>
          <a href="#benefits">Ventajas</a>
          <a href="#login">Iniciar sesión</a>
        </div>

        <div className="footer-dev">
          <h4>Desarrolladores</h4>
          <p>Juan Serna</p>
          <p>Simon Sepulveda</p>
          <p>Cristian Ospina</p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Planificador de Estudios — Todos los derechos reservados
      </div>
    </footer>
  );
}

export default Footer;
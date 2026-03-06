import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // react-icons

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={title}>Planificador de Estudios</h1>

        <div style={form}>
          {/* Usuario */}
          <div style={inputWrapper}>
            <FaUserAlt style={icon} />
            <input style={input} placeholder="Usuario" />
          </div>

          {/* Contraseña */}
          <div style={inputWrapper}>
            <FaLock style={icon} />
            <input
              style={input}
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
            />
            {showPassword ? (
              <FaEyeSlash
                style={eyeIcon}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye style={eyeIcon} onClick={() => setShowPassword(true)} />
            )}
          </div>

          <p>
            ¿No tienes cuenta? <a href="/register">Regístrate</a>
          </p>

          <button style={button} onClick={() => navigate("/menu")}>
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== PALETA ===== */
const colors = {
  dark: "#472825",
  medium: "#96786F",
  accent: "#D3AB80",
  light: "#FDE4BC",
  base: "#FFF4E2",
};

/* ===== STYLES ===== */

const container = {
  minHeight: "100vh",
  background: colors.base,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  background: "#FFFFFF",
  padding: "2.5rem",
  borderRadius: "20px",
  boxShadow: "0 12px 30px rgba(71,40,37,0.15)",
};

const title = {
  color: colors.dark,
  textAlign: "center",
  marginBottom: "1.5rem",
};

const form = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
};

const inputWrapper = {
  position: "relative",
  width: "260px",
};

const icon = {
  position: "absolute",
  left: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  color: colors.medium,
};

const eyeIcon = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  color: colors.medium,
  cursor: "pointer",
};

const input = {
  padding: "0.75rem 2.5rem", 
  width: "100%",             
  maxWidth: "260px",         
  boxSizing: "border-box",   
  borderRadius: "10px",
  border: `1px solid ${colors.light}`,
  fontSize: "0.95rem",
};

const button = {
  marginTop: "0.8rem",
  padding: "0.85rem",
  width: "260px",
  borderRadius: "12px",
  border: "none",
  background: colors.accent,
  color: colors.dark,
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
};

export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import {
  Typography
} from "@mui/material";
import logo from "../assets/logo.png";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 const handleLogin = async (e) => {
      e.preventDefault();

      if (!username || !password) {
        toast.error("Debes completar todos los campos");
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          "https://planificador-estudios-backend-80p8.onrender.com/auth/login/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.error || "Error al iniciar sesión");
          return;
        }

        localStorage.setItem("token", data.token);

        toast.success("Inicio de sesión exitoso");

        setTimeout(() => {
          navigate("/menu");
        }, 1200);

      } catch (error) {
        console.error(error);
        toast.error("Error de conexión con el servidor");
      } finally {
        setLoading(false);
      }
    };

return (
  <div style={layout}>
    <Toaster position="top-center" />

    {/* ===== LADO IZQUIERDO (BRANDING) ===== */}
    <div style={leftSide}>
      <img src={logo} alt="POS System" style={{ width: 200 }} />
      <h1 style={brandTitle}>Planificador de Estudios</h1>
      <p style={brandText}>
        Organiza tus materias, gestiona tu tiempo y mejora tu rendimiento
        académico con una herramienta diseñada para estudiantes.
      </p>
    </div>

    {/* ===== LADO DERECHO (LOGIN) ===== */}
    <div style={rightSide}>
      <div style={card}>
        <h2 style={title}>Iniciar Sesión</h2>

        <form style={form} onSubmit={handleLogin}>
          {/* Usuario */}
          <div style={inputWrapper}>
            <FaUserAlt style={icon} />
            <input
              style={input}
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Contraseña */}
          <div style={inputWrapper}>
            <FaLock style={icon} />
            <input
              style={input}
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FaEyeSlash style={eyeIcon} onClick={() => setShowPassword(false)} />
            ) : (
              <FaEye style={eyeIcon} onClick={() => setShowPassword(true)} />
            )}
          </div>

          <p style={{ fontSize: "0.9rem" }}>
            ¿No tienes cuenta? <a href="/register">Regístrate</a>
          </p>

          <button style={button}>
            Iniciar sesión
          </button>
        </form>
        {/* Footer */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 4, color: "#777" }}
        >
          © 2026 Planificador Estudios — Desarrollado por: 
          Juan Serna | Simon Sepulveda | Cristian Ospina
        </Typography>
      </div>
    </div>
  </div>
);
}

/* ===== PALETA ===== */
const colors = {
  dark: "#402E29",
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

const spinner = {
  width: "20px",
  height: "20px",
  border: "4px solid #D3AB80",
  borderTop: "4px solid #472825",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};
const layout = {
  display: "flex",
  height: "100vh",
  background: colors.base,
};

/* ===== IZQUIERDA ===== */
const leftSide = {
  flex: 1,
  background: colors.dark,
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "4rem",
};

const brandTitle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: "1.5rem",
  textAlign: "center",
};

const brandText = {
  fontSize: "1.1rem",
  textAlign: "center",
  maxWidth: "400px",
  opacity: 0.9,
  lineHeight: 1.6,
};

/* ===== DERECHA ===== */
const rightSide = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

/* ===== CARD MÁS GRANDE ===== */
const card = {
  background: "#FFFFFF",
  padding: "3rem",
  borderRadius: "24px",
  boxShadow: "0 20px 50px rgba(71,40,37,0.15)",
  width: "380px",
};

export default Login;
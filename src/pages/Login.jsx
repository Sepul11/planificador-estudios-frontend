import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

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
    <div style={container}>
      <Toaster position="top-center" />

      <div style={card}>
        <h1 style={title}>Planificador de Estudios</h1>

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
              <FaEyeSlash
                style={eyeIcon}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye
                style={eyeIcon}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          <p>
            ¿No tienes cuenta? <a href="/register">Regístrate</a>
          </p>

          <button style={button} disabled={loading}>
            {loading ? (
              <div style={{ ...spinner, width: "20px", height: "20px", borderWidth: "3px" }}></div>
            ) : (
              "Iniciar sesión"
            )}
          </button>

        </form>
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

const spinner = {
  width: "20px",
  height: "20px",
  border: "4px solid #D3AB80",
  borderTop: "4px solid #472825",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

export default Login;
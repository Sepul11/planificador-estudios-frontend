import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={title}>Planificador de Estudios</h1>

        <div style={form}>
          <input style={input} placeholder="Usuario" />
          <input style={input} type="password" placeholder="Contraseña" />

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
  alignItems: "center", // 🔥 CLAVE
  gap: "1rem",
};

const input = {
  padding: "0.75rem",
  width: "260px",
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
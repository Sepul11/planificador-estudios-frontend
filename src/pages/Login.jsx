import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      <h1>Planificador de Estudios</h1>

      <input style={input} placeholder="Usuario" />
      <input style={input} type="password" placeholder="Contraseña" />

      <button style={button} onClick={() => navigate("/menu")}>
        Iniciar sesión
      </button>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
};

const input = {
  padding: "0.7rem",
  width: "250px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const button = {
  padding: "0.8rem",
  width: "260px",
  borderRadius: "8px",
  border: "none",
  background: "#646cff",
  color: "white",
  cursor: "pointer",
};

export default Login;
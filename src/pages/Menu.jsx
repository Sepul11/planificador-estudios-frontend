import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      <h1 style={title}>Planificador de Estudios</h1>
      <p style={subtitle}>¿Qué deseas hacer hoy?</p>

      <div style={cardsContainer}>
        <div style={card} onClick={() => navigate("/hoy")}>
          <h2>📅 Hoy</h2>
          <p>Ver tus actividades del día</p>
        </div>

        <div style={card} onClick={() => navigate("/crear")}>
          <h2>➕ Crear actividad</h2>
          <p>Agrega una nueva actividad</p>
        </div>
      </div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "#f4f6fb",
};

const title = {
  marginBottom: "0.3rem",
};

const subtitle = {
  marginBottom: "2rem",
  color: "#555",
};

const cardsContainer = {
  display: "flex",
  gap: "1.5rem",
};

const card = {
  background: "white",
  padding: "2rem",
  borderRadius: "14px",
  width: "220px",
  textAlign: "center",
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  transition: "transform 0.2s",
};

export default Menu;
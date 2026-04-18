import { useNavigate } from "react-router-dom";
import img from "../assets/fondomenu.png";

function Menu() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      <h1 style={title}>Planificador de Estudios</h1>
      <p style={subtitle}>¿Qué deseas hacer hoy?</p>
      <div style={imglogo}>
        <img src={img}  alt="Logo" style={{ width: "100%", height: "auto" }}/>
      </div>

      <div style={cardsContainer}>
        <div style={card} onClick={() => navigate("/hoy")}>
          <h2>📌 Hoy</h2>
          <p>Ver tus actividades del día</p>
        </div>

        <div style={card} onClick={() => navigate("/crear")}>
          <h2>➕ Crear actividad</h2>
          <p>Agrega una nueva actividad</p>
        </div>

        <div style={card} onClick={() => navigate("/calendario")}>
          <h2>📅 Calendario</h2>
          <p>Planifica tu mes</p>
        </div>
      </div>
    </div>
  );
}

const container = {
  height: "calc(100vh - 18px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "#FFF4E2",
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

const imglogo = {
  width: "100%",
  maxWidth: "380px",
  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))", 
  transition: "transform 0.3s ease",
};
export default Menu;
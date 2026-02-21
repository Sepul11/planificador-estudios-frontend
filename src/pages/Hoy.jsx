import { useNavigate } from "react-router-dom";

function Hoy() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      <header style={header}>
        <h1>Hoy</h1>
        <p style={date}>Miércoles, 21 de febrero</p>
      </header>

      <div style={list}>
        <div style={card}>
          <div>
            <h3>Estudiar matemáticas</h3>
            <p style={time}>08:00 - 10:00</p>
          </div>
          <span style={badgePending}>Pendiente</span>
        </div>

        <div style={card}>
          <div>
            <h3>Proyecto integrador</h3>
            <p style={time}>14:00 - 16:00</p>
          </div>
          <span style={badgeProgress}>En progreso</span>
        </div>
      </div>

      <button style={fab} onClick={() => navigate("/crear")}>
        ➕
      </button>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  background: "#f4f6fb",
  padding: "2rem",
  position: "relative",
};

const header = {
  marginBottom: "2rem",
};

const date = {
  color: "#666",
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const card = {
  background: "white",
  padding: "1.2rem",
  borderRadius: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
};

const time = {
  color: "#777",
};

const badgePending = {
  background: "#fff3cd",
  color: "#856404",
  padding: "0.4rem 0.8rem",
  borderRadius: "20px",
  fontSize: "0.8rem",
};

const badgeProgress = {
  background: "#d4edda",
  color: "#155724",
  padding: "0.4rem 0.8rem",
  borderRadius: "20px",
  fontSize: "0.8rem",
};

const fab = {
  position: "fixed",
  bottom: "2rem",
  right: "2rem",
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  border: "none",
  background: "#646cff",
  color: "white",
  fontSize: "1.5rem",
  cursor: "pointer",
};

export default Hoy;
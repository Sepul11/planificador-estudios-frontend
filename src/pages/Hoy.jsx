import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Hoy() {
  const navigate = useNavigate();
  const [actividades, setActividades] = useState([]);
  useEffect(() => {
      fetch("https://planificador-estudios-backend-80p8.onrender.com/actividades/")
        .then((res) => res.json())
        .then((data) => {
          setActividades(data);
          console.log(data);
        })
        .catch((error) => console.error("Error:", error));
    }, []);

    const hoy = new Date().toISOString().split("T")[0];
    const vencidas = actividades.filter(
      (a) => a.fecha < hoy
    );

    const paraHoy = actividades.filter(
      (a) => a.fecha === hoy
    );

    const proximas = actividades.filter(
      (a) => a.fecha > hoy
    );

  return (
    <div style={container}>
      {/* Header */}
      <header style={header}>
        <h1>Hoy</h1>
        <p style={date}>Actividades del Dia</p>
      </header>

      {/* Alerta de sobrecarga */}
      <div style={alert}>
        ⚠️ Tienes varias tareas críticas hoy. Prioriza las vencidas.
      </div>

      {/* VENCIDAS */}
      <section style={section}>
        <h2 style={sectionTitle}>🔴 Vencidas</h2>

        {vencidas.map((actividad) => (
          <div key={actividad.id} style={card}>
            <div>
              <h3>{actividad.titulo}</h3>
              <p style={time}>{actividad.fecha}</p>
            </div>
            <button style={action}>Ir a resolver</button>
          </div>
        ))}
      </section>

      {/* HOY */}
      <section style={section}>
        <h2 style={sectionTitle}>🟠 Para hoy</h2>

        {paraHoy.map((actividad) => (
          <div key={actividad.id} style={card}>
            <div>
              <h3>{actividad.titulo}</h3>
              <p style={time}>
                {actividad.hora_inicio} - {actividad.hora_fin}
              </p>
            </div>
            <button style={action}>Ver</button>
          </div>
        ))}
      </section>

      {/* PRÓXIMAS */}
      <section style={section}>
        <h2 style={sectionTitle}>🟢 Próximas</h2>

        {proximas.map((actividad) => (
          <div key={actividad.id} style={card}>
            <div>
              <h3>{actividad.titulo}</h3>
              <p style={time}>{actividad.fecha}</p>
            </div>
            <button style={action}>Ver</button>
          </div>
        ))}
      </section>
      {/* Resumen */}
      <section style={summary}>
        ⏱️ <strong>Resumen del día:</strong> 4 horas estimadas
      </section>

      {/* FAB */}
      <button style={fab} onClick={() => navigate("/crear")}>
        ➕ Agregar
      </button>
    </div>
  );
}

/* ===== STYLES ===== */

const container = {
  minHeight: "100vh",
  background: "#FFF4E2",
  padding: "2rem",
  position: "relative",
};

const header = {
  marginBottom: "1rem",
  color: "#472825",
};

const date = {
  color: "#96786F",
};

const alert = {
  background: "#FDE4BC",
  color: "#472825",
  padding: "1rem",
  borderRadius: "12px",
  marginBottom: "1.5rem",
};

const section = {
  marginBottom: "2rem",
};

const sectionTitle = {
  marginBottom: "0.8rem",
};

const card = {
  background: "#FFFFFF",
  padding: "1.2rem",
  borderRadius: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 6px 16px rgba(71,40,37,0.12)",
  marginBottom: "0.8rem",
};

const time = {
  color: "#777",
};

const action = {
  background: "#D3AB80",
  color: "#472825",
  border: "none",
  borderRadius: "10px",
  padding: "0.6rem 1rem",
  fontWeight: "600",
  cursor: "pointer",
};

const actionSecondary = {
  background: "#e0e0e0",
  color: "#333",
  border: "none",
  borderRadius: "8px",
  padding: "0.6rem 1rem",
  cursor: "pointer",
};

const summary = {
  background: "#e7f1ff",
  padding: "1rem",
  borderRadius: "10px",
  marginBottom: "4rem",
};

const fab = {
  position: "fixed",
  bottom: "2rem",
  right: "2rem",
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  border: "none",
  background: "#472825",
  color: "#FFF4E2",
  fontSize: "1.5rem",
  cursor: "pointer",
};

export default Hoy;
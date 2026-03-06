import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Hoy() {
  const navigate = useNavigate();

  const [actividades, setActividades] = useState([]);
  const [filtro, setFiltro] = useState("todas");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://planificador-estudios-backend-80p8.onrender.com/actividades/")
      .then((res) => res.json())
      .then((data) => {
        setActividades(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar las actividades");
        setLoading(false);
      });
  }, []);

  // Fecha de hoy (local)
  const hoy = new Date();
  hoy.setHours(0,0,0,0);

  // Clasificación de actividades
  const vencidas = [];
  const paraHoy = [];
  const proximas = [];

  actividades.forEach((a) => {
    if (!a.fecha) return;

    const fechaActividad = new Date(a.fecha);
    fechaActividad.setHours(0,0,0,0);

    if (fechaActividad < hoy) {
      vencidas.push(a);
    } else if (fechaActividad.getTime() === hoy.getTime()) {
      paraHoy.push(a);
    } else {
      proximas.push(a);
    }
  });

  // Cálculo horas del día
  const horasHoy = paraHoy.reduce((total, a) => {

    if (!a.hora_inicio || !a.hora_fin) return total;

    const inicio = Number(a.hora_inicio.split(":")[0]);
    const fin = Number(a.hora_fin.split(":")[0]);

    return total + (fin - inicio);

  }, 0);

  if (loading) {
    return (
      <div style={loadingContainer}>
        <div style={spinner}></div>
        <p>Cargando actividades...</p>
      </div>
    );
  }

  if (error) {
    return <p style={{padding:"20px"}}>{error}</p>;
  }

  return (
    <div style={container}>

      <header style={header}>
        <h1>Hoy</h1>
        <p style={date}>Actividades del día</p>
      </header>

      {vencidas.length > 0 && (
        <div style={alert}>
          ⚠️ Tienes {vencidas.length} tareas vencidas. Priorízalas.
        </div>
      )}

      <section style={summary}>
        ⏱️ <strong>Resumen del día:</strong> {horasHoy} horas planificadas
      </section>

      <div style={filters}>

        <button
          style={filtro === "todas" ? filterActive : filterBtn}
          onClick={() => setFiltro("todas")}
        >
          Todas
        </button>

        <button
          style={filtro === "vencidas" ? filterActive : filterBtn}
          onClick={() => setFiltro("vencidas")}
        >
          🔴 Vencidas
        </button>

        <button
          style={filtro === "hoy" ? filterActive : filterBtn}
          onClick={() => setFiltro("hoy")}
        >
          🟠 Hoy
        </button>

        <button
          style={filtro === "proximas" ? filterActive : filterBtn}
          onClick={() => setFiltro("proximas")}
        >
          🟢 Próximas
        </button>

      </div>

      {(filtro === "todas" || filtro === "vencidas") && vencidas.length > 0 && (
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
      )}

      {(filtro === "todas" || filtro === "hoy") && (
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
              <button
                style={action}
                onClick={() => navigate(`/actividad/${actividad.id}`)}
              >
                Ver
              </button>
            </div>
          ))}

          {paraHoy.length === 0 && (
            <p style={empty}>No tienes actividades para hoy 🎉</p>
          )}

        </section>
      )}

      {(filtro === "todas" || filtro === "proximas") && (
        <section style={section}>
          <h2 style={sectionTitle}>🟢 Próximas</h2>

          {proximas.map((actividad) => (
            <div key={actividad.id} style={card}>
              <div>
                <h3>{actividad.titulo}</h3>
                <p style={time}>{actividad.fecha}</p>
              </div>
              <button
                style={action}
                onClick={() => navigate(`/actividad/${actividad.id}`)}
              >
                Ver
              </button>
            </div>
          ))}

        </section>
      )}

      <button style={fab} onClick={() => navigate("/crear")}>
        ➕
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

const filters = {
  display: "flex",
  gap: "0.6rem",
  marginBottom: "1.5rem",
  flexWrap: "wrap"
};

const filterBtn = {
  background: "#FFFFFF",
  border: "1px solid #D3AB80",
  borderRadius: "20px",
  padding: "0.4rem 0.9rem",
  cursor: "pointer",
};

const filterActive = {
  background: "#472825",
  color: "white",
  border: "none",
  borderRadius: "20px",
  padding: "0.4rem 0.9rem",
  cursor: "pointer",
};

const cardTitle = {
  margin: 0,
  fontSize: "1.1rem",
};

const course = {
  fontSize: "0.8rem",
  color: "#96786F",
};

const subInfo = {
  fontSize: "0.75rem",
  color: "#888",
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

const empty = {
  color: "#777",
  textAlign: "center",
  marginTop: "1rem"
};

const loadingContainer = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#472825",
};

const spinner = {
  width: "40px",
  height: "40px",
  border: "4px solid #D3AB80",
  borderTop: "4px solid #472825",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

export default Hoy;
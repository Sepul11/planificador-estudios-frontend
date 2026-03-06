import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Actividad() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [actividad, setActividad] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(`https://planificador-estudios-backend-80p8.onrender.com/actividades/${id}/`)
      .then((res) => {

        if (!res.ok) {
          throw new Error("Actividad no encontrada");
        }

        return res.json();
      })
      .then((data) => {

        setActividad(data);
        setLoading(false);

      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });

  }, [id]);

  if (loading) {
    return (
      <div style={container}>
        <p>Cargando actividad...</p>
      </div>
    );
  }

  if (!actividad) {
    return (
      <div style={container}>
        <p>Actividad no encontrada</p>
        <button style={backBtn} onClick={() => navigate("/hoy")}>
          Volver
        </button>
      </div>
    );
  }

  return (
    <div style={container}>

      <button style={backBtn} onClick={() => navigate("/hoy")}>
        ← Volver
      </button>

      <div style={card}>

        <h1 style={title}>{actividad.titulo}</h1>

        <p style={date}>
          📅 {actividad.fecha?.split(" ")[0]}
        </p>

        <p style={time}>
          ⏰ {actividad.hora_inicio} - {actividad.hora_fin}
        </p>

        <p style={desc}>
          {actividad.descripcion || "Sin descripción"}
        </p>

      </div>

      <div style={section}>
        <h2>Subtareas</h2>

        <p style={empty}>
          Aún no hay subtareas.
        </p>

      </div>

    </div>
  );
}

/* ===== STYLES ===== */

const container = {
  minHeight: "100vh",
  background: "#FFF4E2",
  padding: "2rem",
};

const backBtn = {
  background: "none",
  border: "none",
  color: "#472825",
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: "1rem"
};

const card = {
  background: "#FFFFFF",
  padding: "2rem",
  borderRadius: "16px",
  boxShadow: "0 6px 16px rgba(71,40,37,0.12)",
  marginBottom: "2rem"
};

const title = {
  marginBottom: "0.6rem",
  color: "#472825"
};

const date = {
  color: "#777"
};

const time = {
  color: "#777"
};

const desc = {
  marginTop: "1rem",
  color: "#444"
};

const section = {
  background: "#FFFFFF",
  padding: "1.5rem",
  borderRadius: "16px",
};

const empty = {
  color: "#888"
};

export default Actividad;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CrearActividad() {
  const navigate = useNavigate();
  const [subtarea, setSubtarea] = useState("");
  const [subtareas, setSubtareas] = useState([]);

  const agregarSubtarea = () => {
    if (subtarea.trim() === "") return;
    setSubtareas([...subtareas, subtarea]);
    setSubtarea("");
  };

  return (
    <div style={container}>
      <h1>Crear actividad</h1>

      <div style={form}>
        <input style={input} placeholder="Nombre de la actividad" />
        <input style={input} type="time" />
        <input style={input} type="time" />

        {/* Subtareas */}
        <div style={subSection}>
          <h3>Subtareas</h3>

          <div style={subInputRow}>
            <input
              style={{ ...input, marginBottom: 0 }}
              placeholder="Nueva subtarea"
              value={subtarea}
              onChange={(e) => setSubtarea(e.target.value)}
            />
            <button style={addBtn} onClick={agregarSubtarea}>
              +
            </button>
          </div>

          {subtareas.map((s, i) => (
            <div key={i} style={subItem}>
              {s}
            </div>
          ))}
        </div>

        <button
          style={saveBtn}
          onClick={() => {
            console.log("Actividad creada (mock)");
            navigate("/hoy");
          }}
        >
          Guardar actividad
        </button>
      </div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  background: "#f4f6fb",
  padding: "2rem",
};

const form = {
  background: "white",
  padding: "2rem",
  borderRadius: "14px",
  maxWidth: "400px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
};

const input = {
  padding: "0.7rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const subSection = {
  marginTop: "1rem",
};

const subInputRow = {
  display: "flex",
  gap: "0.5rem",
};

const addBtn = {
  width: "40px",
  borderRadius: "8px",
  border: "none",
  background: "#646cff",
  color: "white",
  fontSize: "1.2rem",
  cursor: "pointer",
};

const subItem = {
  background: "#eef1ff",
  padding: "0.5rem",
  borderRadius: "6px",
  marginTop: "0.5rem",
};

const saveBtn = {
  marginTop: "1.5rem",
  padding: "0.9rem",
  borderRadius: "10px",
  border: "none",
  background: "#1e1e1e",
  color: "white",
  cursor: "pointer",
};

export default CrearActividad;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CrearActividad() {
  const navigate = useNavigate();

  // Actividad
  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  // Subtareas
  const [subtareas, setSubtareas] = useState([]);
  const [subTitulo, setSubTitulo] = useState("");
  const [subFecha, setSubFecha] = useState("");
  const [subHoras, setSubHoras] = useState("");

  function agregarSubtarea() {
    if (!subTitulo || !subHoras) return;

    const nueva = {
      id: Date.now(),
      titulo: subTitulo,
      fecha: subFecha || fecha,
      horas: subHoras,
    };

    setSubtareas([...subtareas, nueva]);
    setSubTitulo("");
    setSubFecha("");
    setSubHoras("");
  }

  function eliminarSubtarea(id) {
    setSubtareas(subtareas.filter((s) => s.id !== id));
  }

  function guardarActividad() {
    console.log({
      titulo,
      fecha,
      horaInicio,
      horaFin,
      subtareas,
    });

    navigate("/hoy");
  }

  return (
    <div style={container}>
      <h1 style={title}>Crear actividad</h1>

      <div style={card}>
        {/* Actividad */}
        <input
          style={input}
          placeholder="Nombre de la actividad"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <input
          style={input}
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <div style={row}>
          <input
            style={input}
            type="time"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
          />
          <input
            style={input}
            type="time"
            value={horaFin}
            onChange={(e) => setHoraFin(e.target.value)}
          />
        </div>

        {/* Subtareas */}
        <h3 style={sectionTitle}>Divide tu trabajo en subtareas</h3>

        <div style={subRow}>
          <input
            style={input}
            placeholder="Subtarea"
            value={subTitulo}
            onChange={(e) => setSubTitulo(e.target.value)}
          />
          <input
            style={input}
            type="date"
            value={subFecha}
            onChange={(e) => setSubFecha(e.target.value)}
          />
          <input
            style={input}
            type="number"
            placeholder="Horas"
            value={subHoras}
            onChange={(e) => setSubHoras(e.target.value)}
          />
          <button style={addBtn} onClick={agregarSubtarea}>
            +
          </button>
        </div>

        {subtareas.map((s) => (
          <div key={s.id} style={subItem}>
            <span>
              {s.titulo} · {s.fecha} · {s.horas}h
            </span>
            <button onClick={() => eliminarSubtarea(s.id)} style={removeBtn}>
              ❌
            </button>
          </div>
        ))}

        <button style={saveBtn} onClick={guardarActividad}>
          Guardar actividad
        </button>
      </div>
    </div>
  );
}


const container = {
  minHeight: "100vh",
  background: "#FFF4E2",
  padding: "2rem",
};

const title = {
  textAlign: "center",
  marginBottom: "2rem",
  color: "#472825",
};

const card = {
  background: "white",
  maxWidth: "700px",   
  width: "100%",      
  margin: "0 auto",
  padding: "2.5rem",
  borderRadius: "18px",
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
  boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
};

const input = {
  padding: "0.7rem",
  borderRadius: "10px",
  border: "1px solid #D3AB80",
};

const row = {
  display: "flex",
  gap: "0.8rem",
};

const sectionTitle = {
  marginTop: "1rem",
  color: "#472825",
};

const subRow = {
  display: "grid",
  gridTemplateColumns: "2fr 1.2fr 1fr auto",
  gap: "0.5rem",
};

const addBtn = {
  background: "#D3AB80",
  border: "none",
  borderRadius: "8px",
  padding: "0 12px",
  cursor: "pointer",
  fontSize: "1.2rem",
};

const subItem = {
  background: "#FFF4E2",
  padding: "0.6rem",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const removeBtn = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
};

const saveBtn = {
  marginTop: "1.5rem",
  padding: "0.9rem",
  borderRadius: "12px",
  border: "none",
  background: "#472825",
  color: "white",
  cursor: "pointer",
};

export default CrearActividad;
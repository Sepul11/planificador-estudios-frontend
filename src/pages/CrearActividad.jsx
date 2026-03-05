import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CrearActividad() {

  const navigate = useNavigate();

  // errores
  const [errores, setErrores] = useState({});
  const [erroresSub, setErroresSub] = useState({});

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
    let nuevosErroresSub = {};
    if (!subTitulo) nuevosErroresSub.subTitulo = "El título es obligatorio";
    if (!subHoras) nuevosErroresSub.subHoras = "Las horas son obligatorias";

    setErroresSub(nuevosErroresSub);

    if (Object.keys(nuevosErroresSub).length > 0) return;

    const nueva = {
      id: Date.now(),
      titulo: subTitulo,
      fecha: subFecha || fecha,
      horas: subHoras
    };

    setSubtareas([...subtareas, nueva]);

    // limpiar campos
    setSubTitulo("");
    setSubFecha("");
    setSubHoras("");
    setErroresSub({});
  }

  function eliminarSubtarea(id) {
    setSubtareas(subtareas.filter((s) => s.id !== id));
  }

  function handleGuardarActividad() {
    let nuevosErrores = {};

    if (!titulo) nuevosErrores.titulo = "El título es obligatorio";
    if (!fecha) nuevosErrores.fecha = "Debes seleccionar una fecha";
    if (!horaInicio) nuevosErrores.horaInicio = "Debes seleccionar hora de inicio";
    if (!horaFin) nuevosErrores.horaFin = "Debes seleccionar hora de fin";

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      const actividad = { titulo, fecha, horaInicio, horaFin, subtareas };
      console.log("Actividad creada:", actividad);
      navigate("/hoy");
    }
  }

  return (
    <div style={container}>
      <h1 style={title}>Crear actividad</h1>

      <div style={card}>

        {/* TITULO */}
        <div style={inputContainer}>
          <input
            style={{ ...input, ...(errores.titulo ? inputError : {}) }}
            placeholder="Nombre de la actividad"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          {errores.titulo && (
            <p style={errorText}>⚠ {errores.titulo}</p>
          )}
        </div>

        {/* FECHA */}
        <div style={inputContainer}>
          <input
            style={{ ...input, ...(errores.fecha ? inputError : {}) }}
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
          {errores.fecha && (
            <p style={errorText}>⚠ {errores.fecha}</p>
          )}
        </div>

        {/* HORAS */}
        <div style={row}>
          <div style={inputContainer}>
            <input
              style={{ ...input, ...(errores.horaInicio ? inputError : {}) }}
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
            />
            {errores.horaInicio && (
              <p style={errorText}>⚠ {errores.horaInicio}</p>
            )}
          </div>

          <div style={inputContainer}>
            <input
              style={{ ...input, ...(errores.horaFin ? inputError : {}) }}
              type="time"
              value={horaFin}
              onChange={(e) => setHoraFin(e.target.value)}
            />
            {errores.horaFin && (
              <p style={errorText}>⚠ {errores.horaFin}</p>
            )}
          </div>
        </div>

        {/* SUBTAREAS */}
        <h3 style={sectionTitle}>Divide tu trabajo en subtareas</h3>

        <div style={subRow}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              style={{ ...input, ...(erroresSub.subTitulo ? inputError : {}) }}
              placeholder="Subtarea"
              value={subTitulo}
              onChange={(e) => setSubTitulo(e.target.value)}
            />
            {erroresSub.subTitulo && <p style={errorText}>⚠ {erroresSub.subTitulo}</p>}
          </div>

          <input
            style={input}
            type="date"
            value={subFecha}
            onChange={(e) => setSubFecha(e.target.value)}
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              style={{ ...input, ...(erroresSub.subHoras ? inputError : {}) }}
              type="number"
              placeholder="Horas"
              value={subHoras}
              onChange={(e) => setSubHoras(e.target.value)}
            />
            {erroresSub.subHoras && <p style={errorText}>⚠ {erroresSub.subHoras}</p>}
          </div>

          <button style={addBtn} onClick={agregarSubtarea}>
            +
          </button>
        </div>

        {subtareas.map((s) => (
          <div key={s.id} style={subItem}>
            <span>
              {s.titulo} · {s.fecha} · {s.horas}h
            </span>
            <button
              onClick={() => eliminarSubtarea(s.id)}
              style={removeBtn}
            >
              ❌
            </button>
          </div>
        ))}

        <button style={saveBtn} onClick={handleGuardarActividad}>
          Guardar actividad
        </button>
      </div>
    </div>
  );
}

// --- ESTILOS ---

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

const inputContainer = {
  display: "flex",
  flexDirection: "column",
};

const input = {
  padding: "0.5rem",
  borderRadius: "10px",
  border: "1px solid #D3AB80",
};

const inputError = {
  borderColor: "red",
};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "0.5rem",
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

const errorText = {
  color: "red",
  fontSize: "0.85rem",
  marginTop: "4px",
  display: "flex",
  alignItems: "center",
  gap: "4px",
};

export default CrearActividad;
import { useState } from "react";

export default function FormActividad() {
  const [titulo, setTitulo] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");

  // 👇 NUEVO: lista de subtareas
  const [subtareas, setSubtareas] = useState([]);

  // Estados temporales para crear subtarea
  const [subTitulo, setSubTitulo] = useState("");
  const [subFecha, setSubFecha] = useState("");
  const [subHoras, setSubHoras] = useState("");

  function agregarSubtarea() {
    if (!subTitulo || !subFecha || !subHoras) return;

    const nuevaSubtarea = {
      id: Date.now(),
      titulo: subTitulo,
      fecha: subFecha,
      horas: subHoras,
    };

    setSubtareas([...subtareas, nuevaSubtarea]);

    // limpiar inputs
    setSubTitulo("");
    setSubFecha("");
    setSubHoras("");
  }

  function eliminarSubtarea(id) {
    setSubtareas(subtareas.filter((s) => s.id !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log({
      titulo,
      fechaLimite,
      subtareas,
    });
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Actividad</h2>

      <div style={styles.field}>
        <label>Nombre de la actividad</label>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.field}>
        <label>Fecha límite</label>
        <input
          type="date"
          value={fechaLimite}
          onChange={(e) => setFechaLimite(e.target.value)}
          style={styles.input}
          required
        />
      </div>

      <hr />

      <h2>Plan de trabajo (subtareas)</h2>

      <div style={styles.subGrid}>
        <input
          placeholder="Subtarea"
          value={subTitulo}
          onChange={(e) => setSubTitulo(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          value={subFecha}
          onChange={(e) => setSubFecha(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Horas"
          value={subHoras}
          onChange={(e) => setSubHoras(e.target.value)}
          style={styles.input}
        />
        <button type="button" onClick={agregarSubtarea} style={styles.addBtn}>
          Agregar
        </button>
      </div>

      {subtareas.length === 0 && (
        <p style={{ fontStyle: "italic" }}>No hay subtareas agregadas</p>
      )}

      {subtareas.map((s) => (
        <div key={s.id} style={styles.subItem}>
          <span>
            {s.titulo} – {s.fecha} – {s.horas}h
          </span>
          <button type="button" onClick={() => eliminarSubtarea(s.id)}>
            ❌
          </button>
        </div>
      ))}

      <button type="submit" style={styles.saveBtn}>
        Guardar actividad
      </button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: "600px",
    margin: "30px auto",
    padding: "24px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  field: { marginBottom: "16px", display: "flex", flexDirection: "column" },
  input: { padding: "8px" },
  subGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr auto",
    gap: "8px",
    marginBottom: "12px",
  },
  subItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px",
    background: "#f9f9f9",
    padding: "6px",
  },
  addBtn: {
    background: "#10b981",
    color: "white",
    border: "none",
    padding: "6px",
  },
  saveBtn: {
    marginTop: "16px",
    width: "100%",
    padding: "12px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
};
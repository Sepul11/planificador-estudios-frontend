import { useEffect, useState } from "react";
import { getPerfil, updatePerfil } from "../services/perfilService";

function Perfil() {
  const [perfil, setPerfil] = useState(null);
  const [horas, setHoras] = useState(6);
  const [objetivo, setObjetivo] = useState(20);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    async function cargar() {
      const data = await getPerfil();
      setPerfil(data);
      setHoras(data.limite_diario);
    }
    cargar();
  }, []);

  const guardar = async () => {
    await updatePerfil({ limite_diario: horas });
    alert("Perfil actualizado");
  };

  if (!perfil) return <p style={{ padding: "120px", textAlign: "center" }}>Cargando...</p>;

  return (
    <div style={container}>

      {/* HEADER */}
      <div style={header}>
        <div style={avatar}>
          {perfil.first_name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 style={{ margin: 0 }}>{perfil.first_name}</h2>
          <p style={email}>{perfil.email}</p>
        </div>
      </div>

      {/* CONFIG */}
      <div style={card}>
        <h3>Configuración de estudio</h3>

        <label>Horas por día</label>
        <input
          type="range"
          min="1"
          max="16"
          value={horas}
          onChange={(e) => setHoras(e.target.value)}
          style={slider}
        />
        <span style={value}>{horas} horas</span>
      </div>

      {/* OBJETIVO */}
      <div style={card}>
        <h3>Objetivo semanal</h3>

        <input
          type="number"
          value={objetivo}
          onChange={(e) => setObjetivo(e.target.value)}
          style={input}
        />
        <p style={hint}>Horas por semana</p>
      </div>

      {/* PREFERENCIAS */}
      <div style={card}>
        <h3>Preferencias</h3>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span>Modo oscuro</span>
        </div>
      </div>

      <button style={button} onClick={guardar}>
        Guardar cambios
      </button>
    </div>
  );
}

export default Perfil;

const container = {
  maxWidth: "500px",
  margin: "100px auto",
  padding: "20px",
  fontFamily: "sans-serif"
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginBottom: "30px"
};

const avatar = {
  width: "55px",
  height: "55px",
  borderRadius: "50%",
  backgroundColor: "#d4a373",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "22px",
  fontWeight: "bold"
};

const email = {
  color: "gray",
  fontSize: "0.9rem",
  margin: 0
};

const card = {
  background: "white",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "14px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.05)"
};

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginTop: "10px"
};

const slider = {
  width: "100%",
  marginTop: "10px"
};

const value = {
  display: "block",
  marginTop: "5px",
  fontWeight: "bold"
};

const hint = {
  fontSize: "0.85rem",
  color: "gray"
};

const button = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#d4a373",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};
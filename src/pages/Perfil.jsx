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
    <div style={page}>

      <div style={mainCard}>

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

        <button style={button} onClick={guardar}>
          Guardar cambios
        </button>

      </div>
    </div>
  );
}

export default Perfil;

const page = {
  background: "#FFF4E2",
  minHeight: "94vh",
  display: "flex",
  justifyContent: "center", 
  alignItems: "center", 
  padding: "20px"
};
const mainCard = {
  width: "100%",
  maxWidth: "520px",
  maxHeight: "53vh",
  background: "#ffffff",
  padding: "25px",
  borderRadius: "18px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.1)"
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
  background: "#FFF",
  padding: "18px",
  marginBottom: "18px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
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
  display: "block",
  marginTop: "5px",
  fontWeight: "bold"
};

const button = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  backgroundColor: "#D3AB80",
  color: "#472825",
  fontWeight: "600",
  cursor: "pointer",
  transition: "0.2s"
};
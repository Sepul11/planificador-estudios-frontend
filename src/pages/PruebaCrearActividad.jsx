import { useState, useEffect } from "react";

function PruebaCrearActividad() {
  const [titulo, setTitulo] = useState("");
  const [actividades, setActividades] = useState([]);

  const API_URL = "http://127.0.0.1:8000/actividades/";

  // 🔹 GET
  const obtenerActividades = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setActividades(data);
  };

  // 🔹 POST
  const crearActividad = async (e) => {
    e.preventDefault();

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titulo }),
    });

    setTitulo("");
    obtenerActividades(); // refresca lista
  };

  useEffect(() => {
    obtenerActividades();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Prueba Crear Actividad</h2>

      <form onSubmit={crearActividad}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <button type="submit">Crear</button>
      </form>

      <h3>Lista de Actividades</h3>
      <ul>
        {actividades.map((act) => (
          <li key={act.id}>{act.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default PruebaCrearActividad;
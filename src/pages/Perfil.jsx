import { useEffect, useState } from "react";
import { getPerfil, updatePerfil } from "../services/perfilService";

function Perfil() {
  const [perfil, setPerfil] = useState(null);
  const [horas, setHoras] = useState(6);

  useEffect(() => {
    async function cargar() {
      const data  = await getPerfil();
      setPerfil(data);
      setHoras(data.limite_diario);
    }
    cargar();
  }, []);

  const guardar = async () => {
    await updatePerfil({ limite_diario: horas });
    alert("Perfil actualizado");
  };

  if (!perfil) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "120px 2rem" }}>
      <h2>Mi Perfil</h2>

      <p><strong>Nombre:</strong> {perfil.first_name}</p>
      <p><strong>Correo:</strong> {perfil.email}</p>

      <label>Horas límite por día</label>
      <input
        type="number"
        value={horas}
        onChange={(e) => setHoras(e.target.value)}
        min="1"
        max="16"
      />

      <button onClick={guardar}>Guardar cambios</button>
    </div>
  );
}

export default Perfil;
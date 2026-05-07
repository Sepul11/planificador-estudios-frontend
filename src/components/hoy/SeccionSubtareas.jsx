import { Typography } from "@mui/material";
import GrupoActividad from "./GrupoActividad";

const agruparPorActividad = (subtareas) =>
  subtareas.reduce((acc, t) => {
    const key = t.actividad;
    if (!acc[key]) {
      acc[key] = {
        actividad: t.actividad,
        actividad_titulo: t.actividad_titulo,
        curso: t.curso,
        items: [],
      };
    }
    acc[key].items.push(t);
    return acc;
  }, {});

export default function SeccionSubtareas({
  titulo, tipo, data, color,
  visible, navigate, abrirAvance,
}) {
  if (!visible) return null;

  const grupos = agruparPorActividad(data);

  return (
    <section style={{ marginBottom: "2rem" }}>
      <Typography variant="h5" sx={{ mb: 2, color }}>
        {titulo}
      </Typography>

      {Object.keys(grupos).length === 0 ? (
        <Typography color="text.secondary">
          No hay subtareas aquí
        </Typography>
      ) : (
        Object.values(grupos).map((grupo) => (
          <GrupoActividad
            key={grupo.actividad}
            grupo={grupo}
            tipo={tipo}
            navigate={navigate}
            abrirAvance={abrirAvance}
          />
        ))
      )}
    </section>
  );
}
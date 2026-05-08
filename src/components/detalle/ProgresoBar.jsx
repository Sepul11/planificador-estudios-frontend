import { detalleStyles as s } from "../../styles/detalleStyles.js";

export default function ProgresoBar({ progreso }) {
  return (
    <>
      <p style={s.progressText}>
        {progreso === 100
          ? "🔥 Completado"
          : progreso === 0
          ? "Empieza ahora"
          : `Progreso: ${progreso}%`}
      </p>
      <div style={s.progressContainer}>
        <div style={s.progressBar(progreso)} />
      </div>
    </>
  );
}
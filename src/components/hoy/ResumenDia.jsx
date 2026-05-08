import { Alert, Typography } from "@mui/material";
import { hoyStyles as s } from "../../styles/hoyStyles.js";

export default function ResumenDia({ resumen, navigate, subtareasHoy }) {
  if (!resumen || resumen.horas_hoy === 0) return null;

  const handleReprogramar = () => {
    if (subtareasHoy?.length > 0) {
      const pesada = subtareasHoy.reduce((prev, curr) =>
        prev.horas > curr.horas ? prev : curr
      );
      if (pesada.actividad) {
        navigate(`/actividad/${pesada.actividad}`);
        return;
      }
    }
    navigate("/actividades");
  };

  return (
    <Alert
      severity={resumen.sobrecarga ? "error" : "success"}
      sx={{ mb: 3 }}
    >
      <Typography variant="subtitle1">
        Hoy tienes <strong>{resumen.horas_hoy} horas</strong> planificadas
      </Typography>

      <Typography variant="body2">
        Límite diario: {resumen.limite}h
      </Typography>

      {resumen.sobrecarga && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          ⚠️ Estás sobrecargado hoy. Considera{" "}
          <span style={s.reprogramarLink} onClick={handleReprogramar}>
            reprogramar
          </span>
        </Typography>
      )}
    </Alert>
  );
}
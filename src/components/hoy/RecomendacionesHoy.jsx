import { useState } from "react";
import { Box, Typography, Collapse, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const CONFIG = {
  urgente: {
    emoji: "🔴",
    color: "#fdecea",
    border: "#f44336",
    accion: "Ver vencidas",
    navegar: (_, navigate) => navigate("/hoy", { state: { filtro: "vencidas" } }),
  },
  sobrecarga: {
    emoji: "🟠",
    color: "#fff3e0",
    border: "#ff9800",
    accion: "Reprogramar",
    navegar: (_, navigate) => navigate("/actividades"),
  },
  actividad_pesada: {
    emoji: "🟡",
    color: "#fffde7",
    border: "#fbc02d",
    accion: "Ver actividad",
    navegar: (rec, navigate) =>
      navigate(`/actividad/${rec.actividad_id}`),
  },
  espacio_libre: {
    emoji: "🟢",
    color: "#f1f8e9",
    border: "#66bb6a",
    accion: null, // solo informativo
    navegar: null,
  },
};

const construirMensaje = (rec) => {
  switch (rec.tipo) {
    case "urgente":
      return `Tienes ${rec.cantidad} subtareas vencidas. Sugerido: ${rec.dia_sugerido ?? "revisar hoy"}.`;

    case "sobrecarga":
      return `Hoy tienes ${rec.exceso}h de sobrecarga. Puedes mover "${rec.candidata_mover?.titulo}" al ${rec.candidata_mover?.fecha_sugerida ?? "próximo día libre"}.`;

    case "actividad_pesada":
      return `La actividad "${rec.actividad_titulo}" tiene ${rec.horas_total}h pendientes y supera tu límite diario (${rec.limite}h).`;

    case "espacio_libre":
      return `Tienes días con buen espacio libre: ${rec.dias
        .map((d) => d.fecha)
        .join(", ")}.`;

    default:
      return "";
  }
};

export default function RecomendacionesHoy({ recomendaciones = [] }) {
  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();
  const recomendacionesValidas = recomendaciones.filter((rec) => {
    if (rec.tipo === "urgente") return rec.subtareas?.length > 0;
    if (rec.tipo === "sobrecarga") return !!rec.candidata_mover;
    if (rec.tipo === "actividad_pesada") return true;
    if (rec.tipo === "espacio_libre") return rec.dias?.length > 0;
    return false;
  });

  if (recomendacionesValidas.length === 0) {
    return (
      <Box
        sx={{
          mb: 2,
          background: "#f9f9f9",
          border: "1px dashed #ccc",
          borderRadius: "12px",
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <LightbulbIcon sx={{ color: "#bbb" }} />
        <Typography fontSize="0.9rem" color="#666">
          No tienes recomendaciones por ahora. Tu planificación está en equilibrio 👍
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 2 }}>
      {/* Trigger */}
      <Button
        onClick={() => setAbierto((prev) => !prev)}
        startIcon={<LightbulbIcon sx={{ color: "#D3AB80" }} />}
        endIcon={abierto ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        sx={{
          textTransform: "none",
          color: "#472825",
          fontWeight: 600,
          background: "white",
          borderRadius: "12px",
          px: 2,
          py: 1,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          mb: 1,
        }}
      >
        {recomendacionesValidas.length} recomendación
        {recomendaciones.length > 1 ? "es" : ""}
      </Button>

      {/* Panel */}
      <Collapse in={abierto}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {recomendacionesValidas.map((rec, i) => {
            const cfg = CONFIG[rec.tipo] ?? CONFIG.espacio_libre;

            return (
              <Box
                key={i}
                sx={{
                  background: cfg.color,
                  border: `1px solid ${cfg.border}`,
                  borderRadius: "12px",
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography sx={{ fontSize: "0.9rem" }}>
                  {cfg.emoji} {construirMensaje(rec)}
                </Typography>

                {cfg.accion && (
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => cfg.navegar(rec, navigate)}
                    sx={{
                      whiteSpace: "nowrap",
                      borderRadius: "8px",
                      textTransform: "none",
                      borderColor: cfg.border,
                      color: cfg.border,
                      flexShrink: 0,
                      "&:hover": {
                        background: cfg.color,
                        borderColor: cfg.border,
                      },
                    }}
                  >
                    {cfg.accion}
                  </Button>
                )}
              </Box>
            );
          })}
        </Box>
      </Collapse>
    </Box>
  );
}
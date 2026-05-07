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

export default function RecomendacionesHoy({ recomendaciones = [] }) {
  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();

  if (recomendaciones.length === 0) return null;

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
        {recomendaciones.length} recomendación
        {recomendaciones.length > 1 ? "es" : ""}
      </Button>

      {/* Panel */}
      <Collapse in={abierto}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {recomendaciones.map((rec, i) => {
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
                  {cfg.emoji} {rec.mensaje}
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
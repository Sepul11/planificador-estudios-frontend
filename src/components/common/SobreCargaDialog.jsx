import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, Typography, Chip, CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updatePerfil } from "../../services/perfilService.js";
import { formatFecha, formatHoras } from "../../utils/formatters.js";
import EventIcon from "@mui/icons-material/Event";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import BuildIcon from "@mui/icons-material/Build";
import InsightsIcon from "@mui/icons-material/Insights";

const CONFIG = {
  mover_a_otro_dia: {
    icon: <EventIcon fontSize="small" />,
    color: "#e8f5e9",
    border: "#66bb6a",
    titulo: (rec) =>
      `Mover esta subtarea al ${formatFecha(rec.fecha_sugerida, true)}`,
    renderDetalle: (rec) =>
      `Ese día tienes ${formatHoras(rec.horas_libres)} disponibles en tu agenda.`,
  },

  dividir_en_dos_dias: {
    icon: <CallSplitIcon fontSize="small" />,
    color: "#f3e5f5",
    border: "#ab47bc",
    titulo: (rec) =>
      `Dividir el estudio en dos días`,
    renderDetalle: (rec) =>
      `${formatHoras(rec.parte_1.horas)} hoy + ${formatHoras(
        rec.parte_2.horas
      )} el ${formatFecha(rec.parte_2.fecha, true)}.`,
  },

  reducir_horas: {
    icon: <ContentCutIcon fontSize="small" />,
    color: "#fff3e0",
    border: "#ffa726",
    titulo: (rec) =>
      `Reducir las horas para que quepa hoy`,
    renderDetalle: (rec) =>
      `Bajar de ${formatHoras(rec.horas_actuales)} a ${formatHoras(
        rec.sugerir_horas
      )} permite cumplir tu límite diario.`,
  },

  aumentar_limite: {
    icon: <BuildIcon fontSize="small" />,
    color: "#e3f2fd",
    border: "#42a5f5",
    titulo: (rec) =>
      `Aumentar tu límite diario`,
    renderDetalle: (rec) =>
      `Subir tu límite a ${formatHoras(
        rec.sugerir_limite
      )} resolvería este conflicto automáticamente.`,
  },

  vista_semana: {
    icon: <InsightsIcon fontSize="small" />,
    color: "#fafafa",
    border: "#bdbdbd",
    titulo: () => `Próximos días con espacio disponible`,
    renderDetalle: () => null,
  },
};

export default function SobrecargaDialog({ sobrecarga, onClose, onLimiteActualizado, onAplicarRecomendacion }) {
  const navigate = useNavigate();
  const [loadingLimite, setLoadingLimite] = useState(false);

  if (!sobrecarga) return null;

  const { exceso, limite, horas_actuales, recomendaciones = [] } = sobrecarga;
  const handleIrAResolver = (rec) => {
    onClose();

    if (rec.tipo === "aumentar_limite") {
      navigate("/perfil");
      return;
    }

    // todas las demás implican editar la subtarea
    navigate(`/actividad/${rec.actividad_id}`);
  };

  return (
    <Dialog open={!!sobrecarga} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: "#472825", fontWeight: "bold" }}>
        ⚠️ Límite diario superado
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
          <Chip label={`Exceso: ${exceso}`}          sx={{ background: "#fdecea", color: "#c62828" }} />
          <Chip label={`Límite: ${limite}`}           sx={{ background: "#fff3e0", color: "#e65100" }} />
          <Chip label={`Actuales: ${horas_actuales}`} sx={{ background: "#e8f5e9", color: "#2e7d32" }} />
        </Box>

        <Typography fontWeight="bold" mb={1}>💡 Qué puedes hacer:</Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {recomendaciones.map((rec, i) => {
            const cfg = CONFIG[rec.tipo];
            if (!cfg) return null;

            return (
              <Box
                key={i}
                sx={{
                  background: cfg.color,
                  border: `1px solid ${cfg.border}`,
                  borderRadius: "10px",
                  padding: "12px 16px",
                }}
              >
                {/* Botón aplicar recomendación */}
                {rec.tipo !== "vista_semana" && rec.tipo !== "aumentar_limite" &&(
                  <Button
                    size="small"
                    sx={{ mt: 1, textTransform: "none" }}
                    onClick={() => handleIrAResolver(rec)}
                  >
                    Ir a resolver →
                  </Button>
                )}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {cfg.icon}
                  <Typography fontWeight="bold" fontSize="0.9rem">
                    {cfg.titulo(rec)}
                  </Typography>
                </Box>

                {/* Detalle estándar */}
                {cfg.renderDetalle(rec) && (
                  <Typography fontSize="0.85rem" color="#555" mt={0.5}>
                    {cfg.renderDetalle(rec)}
                  </Typography>
                )}

                {/* Vista semana — render especial */}
                {rec.tipo === "vista_semana" && (
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                    {rec.dias.map((dia, j) => (
                      <Chip
                        key={j}
                        size="small"
                        label={`${formatFecha(dia.fecha, true)} · ${formatHoras(dia.horas_libres)}`}
                        sx={{
                          background: dia.cabe_completa ? "#e8f5e9" : "#fff8e1",
                          border: `1px solid ${dia.cabe_completa ? "#66bb6a" : "#ffca28"}`,
                          fontSize: "0.75rem",
                        }}
                      />
                    ))}
                  </Box>
                )}

                {/* Aumentar límite — acción directa */}
                {rec.tipo === "aumentar_limite" && (
                  <Button
                    size="small"
                    sx={{ mt: 1, textTransform: "none" }}
                    onClick={() => handleIrAResolver(rec)}
                  >
                    Ir a mi perfil →
                  </Button>
                )}
              </Box>
            );
          })}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{ background: "#472825", borderRadius: "10px" }}
        >
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
  );
}
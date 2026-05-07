import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, Typography, Chip, CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updatePerfil } from "../../services/perfilService";

// Formatea "2026-05-10" → "dom 10 may"
function formatFecha(fechaStr) {
  if (!fechaStr) return "";
  const d = new Date(fechaStr + "T12:00:00"); // evita desfase UTC
  return d.toLocaleDateString("es-CO", {
    weekday: "short", day: "numeric", month: "short",
  });
}

const CONFIG = {
  mover_a_otro_dia: {
    emoji: "📅",
    color: "#e8f5e9",
    border: "#66bb6a",
    renderDetalle: (rec) =>
      `${formatFecha(rec.fecha_sugerida)} tiene ${rec.horas_libres}h libres`,
  },
  dividir_en_dos_dias: {
    emoji: "✂️📅",
    color: "#f3e5f5",
    border: "#ab47bc",
    renderDetalle: (rec) =>
      `${rec.parte_1.horas}h hoy + ${rec.parte_2.horas}h el ${formatFecha(rec.parte_2.fecha)}`,
  },
  reducir_horas: {
    emoji: "✂️",
    color: "#fff3e0",
    border: "#ffa726",
    renderDetalle: (rec) =>
      `"${rec.titulo}" — bajar de ${rec.horas_actuales}h a ${rec.sugerir_horas}h`,
  },
  aumentar_limite: {
    emoji: "🔧",
    color: "#e3f2fd",
    border: "#42a5f5",
    renderDetalle: (rec) =>
      `Subir tu límite diario a ${rec.sugerir_limite}h resolvería el conflicto`,
  },
  vista_semana: {
    emoji: "📊",
    color: "#fafafa",
    border: "#bdbdbd",
    renderDetalle: () => null, // tiene render propio abajo
  },
};

export default function SobrecargaDialog({ sobrecarga, onClose, onLimiteActualizado, onAplicarRecomendacion }) {
  const navigate = useNavigate();
  const [loadingLimite, setLoadingLimite] = useState(false);

  if (!sobrecarga) return null;

  const { exceso, limite, horas_actuales, recomendaciones = [] } = sobrecarga;

  const handleAumentarLimite = async (nuevoLimite) => {
    setLoadingLimite(true);
    try {
      await updatePerfil({ limite_diario: nuevoLimite });
      onLimiteActualizado?.();
      onClose();
    } catch {
      // si falla, manda al perfil
      navigate("/perfil");
    } finally {
      setLoadingLimite(false);
    }
  };
const handleAplicar = (rec) => {
    onAplicarRecomendacion?.(rec);
  };

  return (
    <Dialog open={!!sobrecarga} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: "#472825", fontWeight: "bold" }}>
        ⚠️ Límite diario superado
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
          <Chip label={`Exceso: ${exceso}h`}          sx={{ background: "#fdecea", color: "#c62828" }} />
          <Chip label={`Límite: ${limite}h`}           sx={{ background: "#fff3e0", color: "#e65100" }} />
          <Chip label={`Actuales: ${horas_actuales}h`} sx={{ background: "#e8f5e9", color: "#2e7d32" }} />
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
                {rec.tipo !== "vista_semana" && rec.tipo !== "aumentar_limite" && (
                  <Button
                    size="small"
                    sx={{ mt: 1, textTransform: "none" }}
                    onClick={() => handleAplicar(rec)}
                  >
                    Aplicar esta recomendación →
                  </Button>
                )}
                <Typography fontWeight="bold" fontSize="0.9rem">
                  {cfg.emoji} {rec.razon}
                </Typography>

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
                        label={`${formatFecha(dia.fecha)} · ${dia.horas_libres}h`}
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
                    disabled={loadingLimite}
                    sx={{ mt: 1, textTransform: "none" }}
                    onClick={() => handleAumentarLimite(rec.sugerir_limite)}
                    startIcon={loadingLimite ? <CircularProgress size={14} /> : null}
                  >
                    {loadingLimite ? "Guardando..." : `Aplicar límite de ${rec.sugerir_limite}h →`}
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
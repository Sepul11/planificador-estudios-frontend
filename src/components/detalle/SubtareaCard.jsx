import {
  Box, Button, Card, CardContent,
  IconButton, Stack, TextField, Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { detalleStyles as s } from "../../styles/detalleStyles.js";
import { formatFecha, formatHoras } from "../../utils/formatters.js";

const colorAvance = {
  hecho:     "#2E7D32",
  pospuesto: "#ED6C02",
  deshacer:  "#D32F2F",
};

export default function SubtareaCard({
  subtarea,
  modoEdicion,
  actividadEdit,
  onCambio,
  onDelete,
  onAvance,
  onHistorial,
}) {
  const t = subtarea;
  const editData = actividadEdit?.subtareas?.find((s) => s.id === t.id);

  return (
    <Card sx={{ mb: 1, opacity: t.completada ? 0.6 : 1 }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>

        {/* IZQUIERDA */}
        <Box sx={{ flex: 1 }}>
          {modoEdicion ? (
            <TextField
              fullWidth size="small"
              value={editData?.titulo || ""}
              onChange={(e) => onCambio(t.id, "titulo", e.target.value)}
            />
          ) : (
            <Typography sx={{ textDecoration: t.completada ? "line-through" : "none", fontWeight: 500 }}>
              {t.titulo}
            </Typography>
          )}

          {/* Último avance */}
          {t.avances?.length > 0 && (() => {
            const ultimo = t.avances[t.avances.length - 1];
            return (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" sx={{ display: "block", color: colorAvance[ultimo.estado], fontWeight: 500 }}>
                  {ultimo.estado} — {ultimo.nota || "sin nota"}
                </Typography>
                <Button size="small" onClick={() => onHistorial(t)}>
                  Ver historial
                </Button>
              </Box>
            );
          })()}

          {/* Fecha y horas */}
          <Stack direction="row" spacing={2} mt={1}>
            {modoEdicion ? (
              <>
                <TextField
                  type="date" size="small"
                  value={editData?.fecha_objetivo || ""}
                  onChange={(e) => onCambio(t.id, "fecha_objetivo", e.target.value)}
                />
                <TextField
                  type="number" size="small" label="Horas"
                  value={editData?.horas || ""}
                  onChange={(e) => onCambio(t.id, "horas", parseFloat(e.target.value))}
                />
              </>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Typography sx={s.chipFecha}>
                  {formatFecha(t.fecha_objetivo)}
                </Typography>
                <Box sx={s.hoursBox}>
                  ⏱ {formatHoras(t.horas)}
                </Box>
              </Box>
            )}
          </Stack>
        </Box>

        {/* DERECHA */}
        <Stack direction="row" spacing={2}>
          {!modoEdicion && (
            <Button
              size="small" variant="contained" color="success"
              onClick={() => onAvance(t, t.completada ? "deshacer" : "hecho")}
            >
              {t.completada ? "Deshacer" : "Completar"}
            </Button>
          )}
          {modoEdicion && (
            <IconButton size="small" color="error" onClick={() => onDelete(t.id)}>
              <DeleteIcon />
            </IconButton>
          )}
        </Stack>

      </CardContent>
    </Card>
  );
}
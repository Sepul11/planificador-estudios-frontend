import { Stack, TextField, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import CategoryIcon from "@mui/icons-material/Category";
import { detalleStyles as s } from "../../styles/detalleStyles.js";
import { formatFecha } from "../../utils/formatters.js";
import ProgresoBar from "./ProgresoBar.jsx";

export default function ActividadInfo({
  actividad,
  actividadEdit,
  setActividadEdit,
  modoEdicion,
  progreso,
}) {
  const datos = modoEdicion ? actividadEdit : actividad;

  const handleChange = (field, value) =>
    setActividadEdit((prev) => ({ ...prev, [field]: value }));

  return (
    <div style={s.infoCard}>
      {modoEdicion ? (
        <TextField
          fullWidth
          size="small"
          value={actividadEdit.titulo}
          onChange={(e) => handleChange("titulo", e.target.value)}
        />
      ) : (
        <h1>{actividad.titulo}</h1>
      )}

      {modoEdicion ? (
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Descripción"
          value={actividadEdit.descripcion || ""}
          onChange={(e) => handleChange("descripcion", e.target.value)}
          sx={{ mt: 2 }}
        />
      ) : (
        actividad.descripcion && (
          <Typography sx={{ mt: 2, color: "#555" }}>
            {actividad.descripcion}
          </Typography>
        )
      )}

      <Stack spacing={1} mt={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <SchoolIcon fontSize="small" />
          {modoEdicion ? (
            <TextField
              label="Curso" size="small"
              value={actividadEdit.curso}
              onChange={(e) => handleChange("curso", e.target.value)}
            />
          ) : (
            <Typography><b>Curso:</b> {actividad.curso}</Typography>
          )}
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <CategoryIcon fontSize="small" />
          {modoEdicion ? (
            <TextField
              label="Tipo" size="small"
              value={actividadEdit.tipo}
              onChange={(e) => handleChange("tipo", e.target.value)}
            />
          ) : (
            <Typography><b>Tipo:</b> {actividad.tipo}</Typography>
          )}
        </Stack>
      </Stack>

      <Stack direction="row" spacing={3} mt={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <EventIcon fontSize="small" />
          {modoEdicion ? (
            <TextField
              label="Fecha" type="date" size="small"
              value={actividadEdit.fecha}
              onChange={(e) => handleChange("fecha", e.target.value)}
            />
          ) : (
            <Typography><b>Fecha:</b> {formatFecha(actividad.fecha)}</Typography>
          )}
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <AccessTimeIcon fontSize="small" />
          {modoEdicion ? (
            <TextField
              label="Hora inicio" type="time" size="small"
              value={actividadEdit.hora_inicio}
              onChange={(e) => handleChange("hora_inicio", e.target.value)}
            />
          ) : (
            <Typography><b>Inicio:</b> {actividad.hora_inicio.slice(0, 5)}</Typography>
          )}
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <AccessTimeIcon fontSize="small" />
          {modoEdicion ? (
            <TextField
              label="Hora fin" type="time" size="small"
              value={actividadEdit.hora_fin}
              onChange={(e) => handleChange("hora_fin", e.target.value)}
            />
          ) : (
            <Typography><b>Fin:</b> {actividad.hora_fin.slice(0, 5)}</Typography>
          )}
        </Stack>
      </Stack>

      <Typography variant="caption" color="text.secondary">
        Creada el {formatFecha(actividad.fecha_creacion)}
      </Typography>

      <ProgresoBar progreso={progreso} />
    </div>
  );
}
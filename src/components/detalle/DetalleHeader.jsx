import { Stack, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EventIcon from "@mui/icons-material/Event";
import { detalleStyles as s } from "../../styles/detalleStyles";
import logo from "../../assets/logo.png";

export default function DetalleHeader({
  modoEdicion,
  loadingPosponer,
  onToggleEdicion,
  onGuardar,
  onPosponer,
  onReprogramar,
  onEliminar,
}) {
  return (
    <div style={s.header}>
      <div style={s.headerTop}>
        <img src={logo} alt="logo" style={s.logoStyle} />
        <h1 style={s.title}>Información de tu actividad</h1>

        <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", justifyContent: "flex-end" }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={onToggleEdicion}
          >
            {modoEdicion ? "Salir edición" : "Editar"}
          </Button>

          {modoEdicion && (
            <Button
              size="small"
              variant="contained"
              color="success"
              startIcon={<SaveIcon />}
              onClick={onGuardar}
            >
              Guardar cambios
            </Button>
          )}

          <Button
            size="small"
            variant="contained"
            color="warning"
            startIcon={<ScheduleIcon />}
            disabled={loadingPosponer}
            onClick={onPosponer}
          >
            {loadingPosponer ? "Posponiendo..." : "Posponer actividad"}
          </Button>

          <Button
            size="small"
            variant="contained"
            color="info"
            startIcon={<EventIcon />}
            onClick={onReprogramar}
          >
            Reprogramar manual
          </Button>

          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={onEliminar}
          >
            Borrar actividad
          </Button>
        </Stack>
      </div>
    </div>
  );
}
import { Box, Button, Chip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { actividadStyles } from "../../styles/actividadStyles.js";
const {
  chip,
  subItem,
  btnDelete,
} =actividadStyles;

import {
  formatFecha,
  formatHoras,
} from "../../utils/formatters";

export default function SubtareaItem({
  subtarea,
  eliminarSubtarea,
}) {
  return (
    <Box sx={subItem}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography fontWeight="bold">
          {subtarea.titulo}
        </Typography>

        <Chip
          label={`📅 ${formatFecha(subtarea.fecha)}`}
          size="small"
          sx={chip}
        />

        <Chip
          label={`⏱️ ${formatHoras(subtarea.horas)}`}
          size="small"
          sx={chip}
        />
      </Box>

      <Button
        onClick={() =>
          eliminarSubtarea(subtarea.id)
        }
        startIcon={<DeleteIcon />}
        sx={btnDelete}
      >
        Quitar
      </Button>
    </Box>
  );
}
import { Box, Button, Typography } from "@mui/material";
import { hoyStyles as s } from "../../styles/hoyStyles";
import { formatFecha, formatHoras } from "../../utils/formatters";

export default function SubtareaHoyItem({ subtarea, abrirAvance }) {
  return (
    <Box sx={s.subtaskBox}>
      <Box>
        <Typography sx={{ fontWeight: 500 }}>
          {subtarea.titulo}
        </Typography>
        <Typography sx={{ fontSize: "0.8rem", color: "#777" }}>
          {formatFecha(subtarea.fecha_objetivo)}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Box sx={s.hoursBox}>
          ⏱ {formatHoras(subtarea.horas)}
        </Box>

        <Button
          variant="contained"
          size="small"
          sx={s.completeBtn}
          onClick={() => abrirAvance(subtarea, "hecho")}
        >
          Completar
        </Button>
      </Box>
    </Box>
  );
}
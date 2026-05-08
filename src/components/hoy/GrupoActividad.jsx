import { Box, Card, CardContent, Chip, Stack, Typography, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { hoyStyles as s } from "../../styles/hoyStyles.js";
import { formatFecha } from "../../utils/formatters.js";
import SubtareaHoyItem from "./SubtareaHoyItem.jsx";

export default function GrupoActividad({ grupo, tipo, navigate, abrirAvance }) {
  return (
    <Card sx={s.cardStyle}>
      <CardContent sx={s.cardContentStyle}>

        <Stack spacing={1.2} sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#3A2E2A" }}>
            {grupo.actividad_titulo}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip label={grupo.curso}                              size="small" sx={s.chipCurso} />
            <Chip label={grupo.items[0].tipo}                      size="small" sx={s.chipTipo} />
            <Chip icon={<ScheduleIcon />}
                  label={formatFecha(grupo.items[0].fecha_actividad)}
                  size="small" sx={s.chipFecha} />
            <Box sx={s.tipoTag(tipo)}>
              {tipo.toUpperCase()}
            </Box>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            sx={s.verBtn}
            startIcon={<VisibilityIcon />}
            onClick={() => navigate(`/actividad/${grupo.actividad}`)}
          >
            Ver actividad
          </Button>
        </Stack>

        {grupo.items.map((subtarea) => (
          <SubtareaHoyItem
            key={subtarea.id}
            subtarea={subtarea}
            abrirAvance={abrirAvance}
          />
        ))}

      </CardContent>
    </Card>
  );
}
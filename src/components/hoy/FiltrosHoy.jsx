import { Box } from "@mui/material";
import { hoyStyles as s } from "../../styles/hoyStyles";

const FILTROS = [
  { key: "todas",    label: "Todas",    color: "#3A2E2A" },
  { key: "vencidas", label: "Vencidas", color: "#E76F51" },
  { key: "hoy",      label: "Hoy",      color: "#3A86FF" },
  { key: "proximas", label: "Próximas", color: "#2A9D8F" },
];

export default function FiltrosHoy({ filtro, setFiltro, buscar, setBuscar }) {
  return (
    <Box sx={s.filtersRow}>
      {FILTROS.map((f) => (
        <button
          key={f.key}
          onClick={() => setFiltro(f.key)}
          style={s.filtroBtn(filtro === f.key, f.color)}
        >
          {f.label}
        </button>
      ))}

      <input
        placeholder="Buscar por actividad, subtarea, curso..."
        value={buscar}
        onChange={(e) => setBuscar(e.target.value)}
        style={s.searchInput}
      />
    </Box>
  );
}
import { Box, Alert, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import imgvacio from "../assets/imgvacio.png";

import { useHoy } from "../hooks/useHoy.js";
import { hoyStyles as s } from "../styles/hoyStyles.js";

import HoyHeader        from "../components/hoy/HoyHeader.jsx";
import ResumenDia       from "../components/hoy/ResumenDia.jsx";
import FiltrosHoy       from "../components/hoy/FiltrosHoy.jsx";
import SeccionSubtareas from "../components/hoy/SeccionSubtareas.jsx";
import AvanceDialog     from "../components/hoy/AvanceDialog.jsx";
import RecomendacionesHoy from "../components/hoy/RecomendacionesHoy.jsx";

const SECCIONES = [
  { key: "vencidas", titulo: "Vencidas",   color: "#E76F51" },
  { key: "hoy",      titulo: "Para hoy",   color: "#3A86FF" },
  { key: "proximas", titulo: "Próximas",   color: "#2A9D8F" },
];

export default function Hoy() {
  const navigate = useNavigate();
  const {
    data, loading, error,
    buscar, setBuscar,
    filtro, setFiltro,
    fetchData, sinDatosFiltrados,
    openAvance, tipoAvance, notaAvance, setNotaAvance,
    abrirAvance, cerrarAvance, confirmarAvance, recomendaciones,
  } = useHoy();

  if (loading) {
    return (
      <div style={s.loadingContainer}>
        <div style={s.spinner} />
        <p>Cargando tu planificación...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={s.emptyContainer}>
        <h2>Error al cargar</h2>
        <button style={s.emptyBtn} onClick={fetchData}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div style={s.container}>
      <HoyHeader />

      <Alert severity="info" sx={{ mb: 2 }}>
        {data.regla}
      </Alert>

      <ResumenDia
        resumen={data.resumen}
        navigate={navigate}
        subtareasHoy={data.hoy}
      />

      <RecomendacionesHoy recomendaciones={recomendaciones} />

      <FiltrosHoy
        filtro={filtro}
        setFiltro={setFiltro}
        buscar={buscar}
        setBuscar={setBuscar}
      />

      {sinDatosFiltrados && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <img src={imgvacio} alt="vacío" style={s.emptyImg} />
          <h3>No hay resultados</h3>
          <p>Intenta cambiar el filtro o crear una actividad</p>
        </div>
      )}

      <Box sx={s.columnsContainer}>
        {SECCIONES.map(({ key, titulo, color }) => (
          <Box key={key} sx={s.column}>
            <SeccionSubtareas
              titulo={titulo}
              tipo={key}
              data={data[key]}
              color={color}
              visible={filtro === "todas" || filtro === key}
              navigate={navigate}
              abrirAvance={abrirAvance}
            />
          </Box>
        ))}
      </Box>

      <AvanceDialog
        open={openAvance}
        tipoAvance={tipoAvance}
        notaAvance={notaAvance}
        setNotaAvance={setNotaAvance}
        onClose={cerrarAvance}
        onConfirm={confirmarAvance}
      />

      <button style={s.fab} onClick={() => navigate("/crear")}>
        ＋ Crear actividad
      </button>
    </div>
  );
}
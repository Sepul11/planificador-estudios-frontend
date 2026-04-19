import { useEffect, useState } from "react";
import { getHoy } from "../services/actividadService";
import { useNavigate } from "react-router-dom";
import { completarSubtarea } from "../services/actividadService";
import {
  Card, CardContent, Typography, Chip,
  Button, Alert, Stack, ToggleButton, ToggleButtonGroup,
  TextField, Box
} from "@mui/material";
import imgvacio from "../assets/imgvacio.png";
import logo from "../assets/logo.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ScheduleIcon from "@mui/icons-material/Schedule";

function Hoy() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [buscar, setBuscar] = useState("");
  const [filtro, setFiltro] = useState("todas");


  const navigate = useNavigate();

const fetchData = () => {
  setLoading(true);
  setError(false);

  getHoy(buscar)
    .then((res) => setData(res.data))
    .catch(() => setError(true))
    .finally(() => setLoading(false));
};

useEffect(() => {
  const delay = setTimeout(fetchData, 400);
  return () => clearTimeout(delay);
}, [buscar]);

  // 🟡 Loading (tu estilo)
  if (loading) {
    return (
      <div style={loadingContainer}>
        <div style={spinner}></div>
        <p>Cargando tu planificación...</p>
      </div>
    );
  }

  // 🔴 Error
  if (error || !data) {
    return (
      <div style={emptyContainer}>
        <h2>Error al cargar</h2>
        <button style={emptyBtn} onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    );
  }

  // ⚪ Empty
const sinDatosFiltrados =
  (filtro === "todas" &&
    data.vencidas.length === 0 &&
    data.hoy.length === 0 &&
    data.proximas.length === 0) ||
  (filtro === "vencidas" && data.vencidas.length === 0) ||
  (filtro === "hoy" && data.hoy.length === 0) ||
  (filtro === "proximas" && data.proximas.length === 0);

const getTag = (tipo) => {
  if (tipo === "hoy") return <span style={tagHoy}>HOY</span>;
  if (tipo === "vencidas") return <span style={tagVencida}>VENCIDA</span>;
  if (tipo === "proximas") return <span style={tagProxima}>PRÓXIMA</span>;
};


  return (
    <div style={container}>
      {/* HEADER */}
      <header style={header}>
        <img src={logo} alt="logo" style={logoStyle} />

        <div>
          <h1 style={title}>Tu día de estudio</h1>
          <p style={subtitle}>Organiza, prioriza y avanza</p>
        </div>
      </header>

      {/* REGLA (US-04) */}
      <Alert severity="info" sx={{ mb: 2 }}>
        {data.regla}
      </Alert>
      {data.resumen.horas_hoy > 0 && (
        <Alert
          severity={data.resumen.sobrecarga ? "error" : "success"}
          sx={{ mb: 3 }}
        >
          <Typography variant="subtitle1">
            Hoy tienes <strong>{data.resumen.horas_hoy} horas</strong> planificadas
          </Typography>

          <Typography variant="body2">
            Límite diario: {data.resumen.limite}h
          </Typography>

          {data.resumen.sobrecarga && (
            <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
              ⚠️ Estás sobrecargado hoy. Considera reprogramar.
            </Typography>
          )}
        </Alert>
      )}

      {/* FILTRO (US-05) */}
        <Box sx={filtersRow}>
          {[
            { key: "todas", label: "Todas", color: "#3A2E2A" },
            { key: "vencidas", label: "Vencidas", color: "#E76F51" },
            { key: "hoy", label: "Hoy", color: "#3A86FF" },  // azul
            { key: "proximas", label: "Próximas", color: "#2A9D8F" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFiltro(f.key)}
              style={filtroBtn(filtro === f.key, f.color)}
            >
              {f.label}
            </button>
          ))}

          <input
            placeholder="Buscar por actvidad, subatrea, curso..."
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            style={searchInputStyle}
          />
        </Box>

      {sinDatosFiltrados && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <img src={imgvacio} alt="vacío" style={emptyImg} />
          <h3>No hay resultados</h3>
          <p>Intenta cambiar el filtro o crear una actividad</p>
        </div>
      )}

      {/* SECCIONES */}
      <Seccion
        titulo="Vencidas"
        tipo="vencidas"
        data={data.vencidas}
        color="#E76F51"
        navigate={navigate}
        visible={filtro === "todas" || filtro === "vencidas"}
        refresh={fetchData}
        getTag={getTag}
      />

      <Seccion
        titulo="Para hoy"
        tipo="hoy"
        data={data.hoy}
        color="#3A86FF"
        navigate={navigate}
        visible={filtro === "todas" || filtro === "hoy"}
        refresh={fetchData}
        getTag={getTag}
      />

      <Seccion
        titulo="Próximas"
        tipo="proximas"
        data={data.proximas}
        color="#2A9D8F"
        navigate={navigate}
        visible={filtro === "todas" || filtro === "proximas"}
        refresh={fetchData}
        getTag={getTag}
      />

      {/* FAB */}
      <button style={fab} onClick={() => navigate("/crear")}>
        ＋ Crear actividad
      </button>
    </div>
  );
}

const agruparPorActividad = (subtareas) => {
  return subtareas.reduce((acc, t) => {
    const key = t.actividad;

    if (!acc[key]) {
      acc[key] = {
        actividad: t.actividad,
        actividad_titulo: t.actividad_titulo,
        curso: t.curso,
        items: [],
      };
    }

    acc[key].items.push(t);
    return acc;
  }, {});
};

function Seccion({ titulo, tipo, data, navigate, color, visible, refresh }) {
  if (!visible) return null;

  const grupos = agruparPorActividad(data);

  return (
    <section style={{ marginBottom: "2rem" }}>
      <Typography variant="h5" sx={{ mb: 2, color }}>
        {titulo}
      </Typography>

      {Object.keys(grupos).length === 0 ? (
        <Typography color="text.secondary">
          No hay subtareas aquí
        </Typography>
      ) : (
        Object.values(grupos).map((grupo) => (
          <Card key={grupo.actividad} sx={cardStyle}>
            <CardContent sx={cardContentStyle}>

            {/* HEADER ACTIVIDAD PRO */}
            <Stack spacing={1.2} sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#3A2E2A" }}>
                {grupo.actividad_titulo}
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip
                  label={grupo.curso}
                  size="small"
                  sx={chipCurso}
                />

                <Chip
                  label={grupo.items[0].tipo}
                  size="small"
                  sx={chipTipo}
                />

                <Chip
                  icon={<ScheduleIcon />}
                  label={formatFecha(grupo.items[0].fecha_actividad)}
                  size="small"
                  sx={chipFecha}
                />

                <Box sx={tipoTag(tipo)}>
                  {tipo.toUpperCase()}
                </Box>
              </Stack>
            </Stack>

                {/* DERECHA (BOTONES) */}
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    sx={verBtn}
                    startIcon={<VisibilityIcon />}
                    onClick={() => navigate(`/actividad/${grupo.actividad}`)}
                  >
                    Ver
                  </Button>
                </Stack>

              {/* SUBTAREAS */}
              {grupo.items.map((t) => (
                <Box sx={subtaskBox}>
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>{t.titulo}</Typography>
                    <Typography sx={{ fontSize: "0.8rem", color: "#777" }}>
                      {formatFecha(t.fecha_objetivo)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <Box sx={hoursBox}>
                      ⏱ {formatHoras(t.horas)}
                    </Box>

                    <Button
                      variant="contained"
                      size="small"
                      sx={completeBtn}
                      onClick={async () => {
                        await completarSubtarea(t.id);
                        refresh();
                      }}
                    >
                      Completar
                    </Button>
                  </Box>
                </Box>
              ))}

            </CardContent>
          </Card>
        ))
      )}
    </section>
  );
}

export default Hoy;

//
// 🎨 ESTILOS (reciclados y ajustados)
//
const formatFecha = (fechaStr) => {
  const [year, month, day] = fechaStr.split("-");
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
  });
};

const formatHoras = (h) => {
  if (h === 1) return "1 hora";
  return `${h} horas`;
};

const container = {
  paddingTop: "100px",
  paddingRight: "2rem",
  paddingBottom: "2rem",
  paddingLeft: "2rem",
  background: "#FFF4E2",
  minHeight: "100vh",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "2rem",
};

const logoStyle = {
  width: "100px",
};

const title = { margin: 0, color: "#3A2E2A" };
const subtitle = { margin: 0, color: "#8D6E63" };


const fab = {
  position: "fixed",
  bottom: "2rem",
  right: "2rem",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 18px",
  borderRadius: "30px",
  background: "#3A2E2A",
  color: "white",
  fontSize: "1rem",
  border: "none",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
};

const loadingContainer = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const spinner = {
  width: "40px",
  height: "40px",
  border: "4px solid #ddd",
  borderTop: "4px solid #3A2E2A",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const emptyContainer = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
};

const emptyImg = {
  width: "200px",
};

const emptyBtn = {
  padding: "0.8rem 1.5rem",
  borderRadius: "12px",
  border: "none",
  background: "#3A2E2A",
  color: "white",
};

const cardStyle = {
  borderRadius: "14px",
  mb: 2,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  overflow: "hidden",
};

const cardContentStyle = {
  padding: "20px 24px !important",
};

const subtaskBox = {
  marginTop: "14px",
  padding: "14px 18px",
  borderRadius: "12px",
  background: "#fafafa",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const completeBtn = {
  borderRadius: "10px",
  background: "#2A9D8F",   // VERDE BONITO
  color: "white",
  fontWeight: 500,
  "&:hover": {
    background: "#23867a",
  },
};

const hoursBox = {
  background: "#E8F6F3",
  color: "#2A9D8F",
  padding: "6px 10px",
  borderRadius: "10px",
  fontSize: "0.8rem",
  fontWeight: "bold",
};

const tipoTag = (tipo) => ({
  marginTop: "8px",
  fontSize: "0.75rem",
  fontWeight: "bold",
  padding: "4px 12px",
  borderRadius: "12px",
  color: "white",
  width: "fit-content",
  background:
    tipo === "vencidas"
      ? "#E76F51"
      : tipo === "hoy"
      ? "#3A86FF" 
      : "#2A9D8F",
});

const verBtn = {
  textTransform: "none",
  borderRadius: "8px",
  border: "1px solid #ddd",
  color: "#555",
  fontSize: "0.8rem",
  padding: "4px 10px",
};

const filtersRow = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  alignItems: "center",
  marginBottom: "2rem",
};

const filtroBtn = (active, color) => ({
  padding: "8px 14px",
  borderRadius: "20px",
  border: "none",
  cursor: "pointer",
  background: active ? color : "white",
  color: active ? "white" : "#444",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  fontWeight: 500,
});

const searchInputStyle = {
  padding: "8px 14px",
  borderRadius: "20px",
  border: "1px solid #ddd",
};

const chipCurso = {
  background: "#FFF3E0",
  color: "#E65100",
  fontWeight: 600,
};

const chipTipo = {
  background: "#E3F2FD",
  color: "#1565C0",
  fontWeight: 600,
};

const chipFecha = {
  background: "#E8F5E9",
  color: "#2E7D32",
  fontWeight: 600,
};
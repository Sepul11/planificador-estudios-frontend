import { useEffect, useState } from "react";
import { getActividades } from "../services/actividadservice";
import { useNavigate } from "react-router-dom";
import {
  Card, CardContent, Typography, Chip,
  Button, Stack, Box, Divider
} from "@mui/material";
import imgvacio from "../assets/imgvacio.png";
import logo from "../assets/logo.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ScheduleIcon from "@mui/icons-material/Schedule";

function Actividades() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buscar, setBuscar] = useState("");
  const [fecha, setFecha] = useState("");

  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    getActividades({ buscar, fecha })
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const delay = setTimeout(fetchData, 400);
    return () => clearTimeout(delay);
  }, [buscar, fecha]);

  if (loading) {
    return (
      <div style={loadingContainer}>
        <div style={spinner}></div>
        <p>Cargando actividades...</p>
      </div>
    );
  }

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

  return (
    <div style={container}>
      {/* HEADER IGUAL A HOY */}
      <header style={header}>
        <img src={logo} alt="logo" style={logoStyle} />
        <div>
          <h1 style={title}>Tus actividades</h1>
          <p style={subtitle}>Vista general de tu planificación</p>
        </div>
      </header>

      {/* FILTROS */}
      <Box sx={filtersRow}>
        <input
          placeholder="Buscar por título, curso o tipo..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          style={searchInputStyle}
        />

        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          style={searchInputStyle}
        />
      </Box>

      {/* EMPTY */}
      {data.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <img src={imgvacio} alt="vacío" style={emptyImg} />
          <h3>No tienes actividades</h3>
        </div>
      )}

      {/* CARDS GRANDES ESTILO HOY */}
      {data.map((act) => (
        <Card key={act.id} sx={cardStyle}>
          <CardContent sx={cardContentStyle}>
            <Stack spacing={1.2} sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#3A2E2A" }}>
                {act.titulo}
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label={act.curso} size="small" sx={chipCurso} />
                <Chip label={act.tipo} size="small" sx={chipTipo} />
                <Chip
                  icon={<ScheduleIcon />}
                  label={formatFecha(act.fecha)}
                  size="small"
                  sx={chipFecha}
                />
              </Stack>

              <Stack direction="row" justifyContent="flex-end">
                <Button
                  size="small"
                  sx={verBtn}
                  startIcon={<VisibilityIcon />}
                  onClick={() => navigate(`/actividad/${act.id}`)}
                >
                  Ver actividad
                </Button>
              </Stack>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {/* SUBTAREAS COMPLETAS */}
            {act.subtareas.map((t) => (
              <Box key={t.id} sx={subtaskBox}>
                <Box>
                  <Typography sx={{ fontWeight: 500 }}>
                    {t.titulo}
                  </Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: "#777" }}>
                    {formatFecha(t.fecha_objetivo)}
                  </Typography>
                </Box>

                <Box sx={hoursBox}>
                  ⏱ {formatHoras(t.horas)}
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* FAB IGUAL A HOY */}
      <button style={fab} onClick={() => navigate("/crear")}>
        ＋ Crear actividad
      </button>
    </div>
  );
}

export default Actividades;


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


const emptyImg = {
  width: "200px",
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


const hoursBox = {
  background: "#E8F6F3",
  color: "#2A9D8F",
  padding: "6px 10px",
  borderRadius: "10px",
  fontSize: "0.8rem",
  fontWeight: "bold",
};

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
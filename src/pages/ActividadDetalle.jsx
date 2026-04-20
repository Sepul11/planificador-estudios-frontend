import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  toggleSubtarea,
  getActividadDetalle,
  eliminarSubtarea,
  editarSubtarea,
  crearSubtarea,
  posponerActividad,
  editarActividad,
  eliminarActividad,
  reprogramarActividad
} from "../services/actividadService";
import EditIcon from "@mui/icons-material/Edit";
import ScheduleIcon from "@mui/icons-material/Schedule";
import {
  Card, CardContent, Typography,
  TextField, Stack, Box, Button, IconButton
} from "@mui/material";

import {
  Snackbar, Alert, Dialog, DialogTitle,
  DialogContent, DialogActions
} from "@mui/material";

import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import CategoryIcon from "@mui/icons-material/Category";

import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import logo from "../assets/logo.png";
import imgvacio from "../assets/imgvacio.png";

function ActividadDetalle() {
  const { id } = useParams();
  const [actividad, setActividad] = useState(null);
  const [actividadEdit, setActividadEdit] = useState(null);
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [nuevasHoras, setNuevasHoras] = useState("");
  const [loadingPosponer, setLoadingPosponer] = useState(false);
  const [openReprogramar, setOpenReprogramar] = useState(false);
  const [nuevaFechaRepro, setNuevaFechaRepro] = useState("");
  const [conflictoRepro, setConflictoRepro] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [cambios, setCambios] = useState({});
  const [errores, setErrores] = useState({});
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    idSub: null,
  });

  const [confirmDeleteActividad, setConfirmDeleteActividad] = useState(false);

  const showSnack = (message, severity = "success") => {
    setSnack({ open: true, message, severity });
  };

  const fetchActividad = async () => {
    try {
      const res = await getActividadDetalle(id);
      setActividad(res.data);
      setActividadEdit(JSON.parse(JSON.stringify(res.data)));
    } catch {
      alert("Error cargando actividad");
    }
  };

  useEffect(() => {
    fetchActividad();
  }, []);

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "";

    const date = new Date(fechaStr);

    if (isNaN(date)) return "";

    return date.toLocaleDateString("es-CO", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const formatHoras = (h) => {
  if (h === 1) return "1 hora";
  return `${h} horas`;
};

  const handleToggle = async (t) => {
      const prev = actividad;

    setActividad((prevAct) => ({
      ...prevAct,
      subtareas: prevAct.subtareas.map((s) =>
        s.id === t.id ? { ...s, completada: !s.completada } : s
      ),
    }));

    try {
      await toggleSubtarea(t.id, !t.completada);
      showSnack("Estado actualizado");
    } catch {
      setActividad(prev);
      showSnack("Error actualizando estado", "error");
    }
  };

  const handleDelete = (idSub) => {
    setConfirmDelete({ open: true, idSub });
  };

  const confirmarDeleteSubtarea = async () => {
    try {
      await eliminarSubtarea(confirmDelete.idSub);
      showSnack("Subtarea eliminada correctamente");
      fetchActividad();
    } catch {
      showSnack("Error eliminando subtarea", "error");
    } finally {
      setConfirmDelete({ open: false, idSub: null });
    }
  };


  const handleCreate = async () => {
    const nuevosErrores = {};

    if (!nuevoTitulo.trim()) nuevosErrores.titulo = "El título es obligatorio";
    if (!nuevaFecha) nuevosErrores.fecha = "La fecha es obligatoria";
    if (!nuevasHoras || parseFloat(nuevasHoras) <= 0)
      nuevosErrores.horas = "Las horas deben ser mayores a 0";

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    try {
      await crearSubtarea({
        titulo: nuevoTitulo,
        actividad: id,
        fecha_objetivo: nuevaFecha,
        horas: parseFloat(nuevasHoras),
      });

      setNuevoTitulo("");
      setNuevaFecha("");
      setNuevasHoras("");
      setErrores({});
      fetchActividad();
      showSnack("Subtarea creada correctamente");
    } catch {
      showSnack("Error al crear subtarea", "error");
    }
  };

  const ejecutarReprogramacion = async () => {
    try {
      const res = await reprogramarActividad(id, nuevaFechaRepro);

      if (res.data.conflicto) {
        setConflictoRepro(res.data);
      } else {
        setOpenReprogramar(false);
        setNuevaFechaRepro("");
        await fetchActividad();

        showSnack(
          `Actividad movida al ${formatFecha(nuevaFechaRepro)} correctamente`
        );
      }
    } catch (error) {
      showSnack("Error al reprogramar", "error");
    }
  };

  if (!actividad) {
  return (
      <div style={loadingContainer}>
        <div style={spinner}></div>
        <p>Cargando actividad...</p>
      </div>
    );
  }

  const progreso = actividad.subtareas.length
    ? Math.round(
        (actividad.subtareas.filter((t) => t.completada).length /
          actividad.subtareas.length) *
          100
      )
    : 0;
  
  const confirmarDeleteActividad = async () => {
    try {
      await eliminarActividad(id); // crea este service si no existe
      showSnack("Actividad eliminada correctamente");
      window.history.back();
    } catch {
      showSnack("Error eliminando actividad", "error");
    }
  };


  return (
    <div style={pageWrapper}>
    <div style={container}>
      {/* HEADER */}
      <div style={header}>
        <div style={headerTop}>
          <img src={logo} alt="logo" style={logoStyle} />
          <h1 style={title}>Informacion de tu actividad</h1>
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", justifyContent: "flex-end" }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => {
                if (!modoEdicion) {
                  setActividadEdit(JSON.parse(JSON.stringify(actividad)));
                }
                setModoEdicion(!modoEdicion);
              }}
            >
              {modoEdicion ? "Salir edición" : "Editar"}
            </Button>

            {modoEdicion && (
              <Button
                size="small"
                variant="contained"
                color="success"
                startIcon={<SaveIcon />}
                onClick={async () => {
                try {
                  // guardar subtareas correctamente
                  for (const idSub in cambios) {
                    await editarSubtarea(idSub, cambios[idSub]);
                  }

                  // guardar actividad
                  await editarActividad(id, actividadEdit);
                  setActividad(actividadEdit);
                  setCambios({});
                  setModoEdicion(false);
                  await fetchActividad();
                  showSnack("Cambios guardados correctamente");

                } catch (error) {
                  showSnack("Error guardando cambios", "error");
                }
              }}
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
              onClick={async () => {
                try {
                    setLoadingPosponer(true);
                    const res = await posponerActividad(id);
                    await fetchActividad();

                    const fechaNueva = formatFecha(res.data.nueva_fecha);

                    showSnack(
                      `Se movió automáticamente al ${fechaNueva} porque los días anteriores superaban tu límite diario`
                    );
                  } catch {
                    showSnack("Error al posponer", "error");
                  } finally {
                    setLoadingPosponer(false);
                  }
              }}
            >
              {loadingPosponer ? "Posponiendo..." : "Posponer actividad"}
            </Button>
            <Button
              size="small"
              variant="contained"
              color="info"
              startIcon={<EventIcon />}
              onClick={() => setOpenReprogramar(true)}
            >
              Reprogramar manual
            </Button>
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={() => setConfirmDeleteActividad(true)}
            >
              Borrar actividad
            </Button>
          </Stack>
        </div>


          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: 4,
              alignItems: "start",
              mt: 3,
            }}
          >
          <Box sx={{
            background: "white",
            padding: "2rem",
            borderRadius: "14px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          }}>
          {modoEdicion ? (
            <TextField
              fullWidth
              size="small"
              value={actividadEdit.titulo}
              onChange={(e) =>
                setActividadEdit({ ...actividadEdit, titulo: e.target.value })
              }
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
                onChange={(e) =>
                  setActividadEdit({ ...actividadEdit, descripcion: e.target.value })
                }
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
                  label="Curso"
                  size="small"
                  value={actividadEdit.curso}
                  onChange={(e) =>
                    setActividadEdit({ ...actividadEdit, curso: e.target.value })
                  }
                />
              ) : (
                <Typography><b>Curso:</b> {actividad.curso}</Typography>
              )}
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <CategoryIcon fontSize="small" />
              {modoEdicion ? (
                <TextField
                  label="Tipo"
                  size="small"
                  value={actividadEdit.tipo}
                  onChange={(e) =>
                    setActividadEdit({ ...actividadEdit, tipo: e.target.value })
                  }
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
                label="Fecha"
                type="date"
                size="small"
                value={actividadEdit.fecha}
                onChange={(e) =>
                  setActividadEdit({ ...actividadEdit, fecha: e.target.value })
                }
              />
            ) : (
              <Typography><b>Fecha:</b> {formatFecha(actividad.fecha)}</Typography>
            )}
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeIcon fontSize="small" />
            {modoEdicion ? (
              <TextField
                label="Hora inicio"
                type="time"
                size="small"
                value={actividadEdit.hora_inicio}
                onChange={(e) =>
                  setActividadEdit({ ...actividadEdit, hora_inicio: e.target.value })
                }
              />
            ) : (
              <Typography><b>Inicio:</b> {actividad.hora_inicio.slice(0,5)}</Typography>
            )}
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeIcon fontSize="small" />
            {modoEdicion ? (
              <TextField
                label="Hora fin"
                type="time"
                size="small"
                value={actividadEdit.hora_fin}
                onChange={(e) =>
                  setActividadEdit({ ...actividadEdit, hora_fin: e.target.value })
                }
              />
            ) : (
              <Typography><b>Fin:</b> {actividad.hora_fin.slice(0,5)}</Typography>
            )}
          </Stack>
        </Stack>

        <Typography variant="caption" color="text.secondary">
          Creada el {formatFecha(actividad.fecha_creacion)}
        </Typography>
          <Box>
          </Box>
            {/* PROGRESO */}
            <p style={progressText}>
              {progreso === 100
                ? "🔥 Completado"
                : progreso === 0
                ? "Empieza ahora"
                : `Progreso: ${progreso}%`}
            </p>
          <div style={progressContainer}>
            <div style={{ ...progressBar, width: `${progreso}%` }} />
          </div>
          </Box>
          <Box sx={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "14px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            }}>
            {(modoEdicion ? actividadEdit.subtareas : actividad.subtareas).length === 0 ? (

                  <div style={emptyState}>
                    <img src={imgvacio} alt="vacío" style={emptyImg} />
                    <Typography variant="h6" mt={2}>
                      No hay subtareas aún
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Agrega tu primera subtarea arriba 👆
                    </Typography>
                  </div>

                ) : (

            (modoEdicion ? actividadEdit.subtareas : actividad.subtareas).map((t) => (
                <Card key={t.id} sx={{ mb: 1, opacity: t.completada ? 0.6 : 1 }}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              {/* IZQUIERDA */}
              <Box sx={{ flex: 1 }}>
                {modoEdicion ? (
                  <TextField
                    fullWidth
                    size="small"
                    value={
                        actividadEdit.subtareas.find(s => s.id === t.id)?.titulo || ""
                      }
                    onChange={(e) => {
                      const value = e.target.value;

                      setActividadEdit((prev) => ({
                        ...prev,
                        subtareas: prev.subtareas.map((s) =>
                          s.id === t.id ? { ...s, titulo: value } : s
                        ),
                      }));

                      setCambios((prev) => ({
                        ...prev,
                        [t.id]: { ...prev[t.id], titulo: value },
                      }));
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      textDecoration: t.completada ? "line-through" : "none",
                      fontWeight: 500,
                    }}
                  >
                    {t.titulo}
                  </Typography>
                )}

                <Stack direction="row" spacing={2} mt={1}>
                  {modoEdicion ? (
                    <>
                      <TextField
                        key={t.id + "fecha"}
                        type="date"
                        size="small"
                        value={
                          actividadEdit.subtareas.find(s => s.id === t.id)?.fecha_objetivo || ""
                        }
                        onChange={(e) => {
                          const value = e.target.value;

                          setActividadEdit((prev) => ({
                            ...prev,
                            subtareas: prev.subtareas.map((s) =>
                              s.id === t.id ? { ...s, fecha_objetivo: value } : s
                            ),
                          }));

                          setCambios((prev) => ({
                            ...prev,
                            [t.id]: { ...prev[t.id], fecha_objetivo: value },
                          }));
                        }}
                      />
                      <TextField
                        key={t.id + "horas"}
                        type="number"
                        size="small"
                        label="Horas"
                        value={
                          actividadEdit.subtareas.find(s => s.id === t.id)?.horas || ""
                        }
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);

                          setActividadEdit((prev) => ({
                            ...prev,
                            subtareas: prev.subtareas.map((s) =>
                              s.id === t.id ? { ...s, horas: value } : s
                            ),
                          }));

                          setCambios((prev) => ({
                            ...prev,
                            [t.id]: { ...prev[t.id], horas: value },
                          }));
                        }}
                      />
                    </>
                  ) : (
                      <Box sx={{display: "flex", alignItems: "center", gap: "10px"}}>
                            <Typography  sx={chipFecha}>
                              {formatFecha(t.fecha_objetivo)}
                            </Typography>
                          <Box sx={hoursBox}>
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
                    size="small"
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleToggle(t)}
                  >
                    {t.completada ? "Deshacer" : "Completar"}
                  </Button>
                )}

                {modoEdicion && (
                  <>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(t.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
          )))}
          <Box>
             <Card sx={{ p: 2, mb: 2 }}>
        <div style={createBox}>
          <TextField
            label="Título"
            size="small"
            value={nuevoTitulo}
            error={!!errores.titulo}
            helperText={errores.titulo}
            onChange={(e) => {
              setNuevoTitulo(e.target.value);
              setErrores((prev) => ({ ...prev, titulo: "" }));
            }}
          />

          <TextField
            type="date"
            size="small"
            value={nuevaFecha}
            error={!!errores.fecha}
            helperText={errores.fecha}
            onChange={(e) => {
              setNuevaFecha(e.target.value);
              setErrores((prev) => ({ ...prev, fecha: "" }));
            }}
          />

          <TextField
            type="number"
            label="Horas"
            size="small"
            value={nuevasHoras}
            error={!!errores.horas}
            helperText={errores.horas}
            onChange={(e) => {
              setNuevasHoras(e.target.value);
              setErrores((prev) => ({ ...prev, horas: "" }));
            }}
          />

          <Button variant="contained" onClick={handleCreate}>
            ＋ Agregar
          </Button>
        </div>
      </Card>
        </Box>
      </Box>
      </Box>
      </div>

<Snackbar
  open={snack.open}
  autoHideDuration={3000}
  onClose={() => setSnack({ ...snack, open: false })}
>
  <Alert severity={snack.severity} variant="filled">
    {snack.message}
  </Alert>
</Snackbar>
<Dialog open={confirmDelete.open}>
  <DialogTitle>¿Eliminar subtarea?</DialogTitle>
  <DialogActions>
    <Button onClick={() => setConfirmDelete({ open: false })}>
      Cancelar
    </Button>
    <Button color="error" onClick={confirmarDeleteSubtarea}>
      Eliminar
    </Button>
  </DialogActions>
</Dialog>
<Dialog open={confirmDeleteActividad}>
  <DialogTitle>¿Eliminar actividad completa?</DialogTitle>
  <DialogContent>
    Esto eliminará todas sus subtareas.
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setConfirmDeleteActividad(false)}>
      Cancelar
    </Button>
    <Button color="error" onClick={confirmarDeleteActividad}>
      Eliminar todo
    </Button>
  </DialogActions>
</Dialog>
<Dialog open={openReprogramar} maxWidth="sm" fullWidth>
  <DialogTitle>Reprogramar actividad</DialogTitle>
  <DialogContent>
    <TextField
      fullWidth
      type="date"
      margin="normal"
      value={nuevaFechaRepro}
      onChange={(e) => setNuevaFechaRepro(e.target.value)}
    />

    {conflictoRepro && (
      <Alert severity="warning" sx={{ mt: 2 }}>
        <b>{conflictoRepro.mensaje}</b>
        <br />
        Horas actuales del día: {conflictoRepro.horas_actuales_dia}h
        <br />
        Horas a mover: {conflictoRepro.horas_a_mover}h
        <br />
        Límite diario: {conflictoRepro.limite}h
        <br />
        Exceso: {conflictoRepro.exceso}h
        <br />
        <br />
        Opciones sugeridas:
        <ul>
          {conflictoRepro.opciones.map((op, i) => (
            <li key={i}>{op}</li>
          ))}
        </ul>
      </Alert>
    )}
  </DialogContent>
  <DialogActions>
    <Button
      onClick={() => {
        setOpenReprogramar(false);
        setConflictoRepro(null);
      }}
    >
      Cancelar
    </Button>
    <Button
      variant="contained"
      onClick={ejecutarReprogramacion}
      disabled={!nuevaFechaRepro}
    >
      Confirmar
    </Button>
  </DialogActions>
</Dialog>
    </div>
  </div>
);
}
      
export default ActividadDetalle;

//
// 🎨 ESTILOS
//

const pageWrapper = {
  background: "#FFF4E2", // El color ahora va aquí
  minHeight: "100vh",    // Asegura que llegue hasta abajo
  width: "100%",
};

const container = {
  padding: "100px 2rem 2rem 2rem",
  width: "100%",
};

const header = {
  marginBottom: "2rem",
  background: "white",
  padding: "1rem",
  borderRadius: "14px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const curso = { color: "#777" };
const descripcion = { marginBottom: "1rem" };

const infoRow = {
  fontSize: "0.9rem",
  color: "#555",
};

const progressContainer = {
  width: "100%",
  height: "8px",
  background: "#eee",
  borderRadius: "10px",
  margin: "6px 0 16px 0",
  overflow: "hidden", // 🔥 CLAVE
};

const progressBar = {
  height: "100%",
  background: "#2A9D8F",
  borderRadius: "10px",
  transition: "0.3s",
};

const progressText = {
  fontSize: "0.8rem",
  color: "#777",
};


const subInfo = {
  fontSize: "0.75rem",
  color: "#777",
};

const btn = {
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "8px",
  cursor: "pointer",
};

const createBox = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr auto",
  gap: "10px",
  marginBottom: "1.5rem",
  background: "white",
  padding: "10px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const inputCreate = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "0.9rem",
};
const inputEdit = {
  width: "100%",
  padding: "6px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const btnPrimary = {
  background: "#3A2E2A",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "10px",
  cursor: "pointer",
};

const tituloSubtarea = {
  cursor: "pointer",
  fontWeight: "500",
};

const actions = {
  display: "flex",
  gap: "6px",
};

const btnAction = {
  border: "none",
  color: "white",
  padding: "6px 10px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "0.8rem",
};

const subtaskCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px",
  borderBottom: "1px solid #eee",
  transition: "all 0.2s ease",
  borderRadius: "8px",
};

const headerTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
};

const logoStyle = {
  width: "80px",
};

const title = {
  textAlign: "center",
  marginBottom: "2rem",
  color: "#472825",
};

const btnPosponer = {
  background: "#E9C46A",
  color: "#3A2E2A",
  border: "none",
  borderRadius: "10px",
  padding: "8px 14px",
  cursor: "pointer",
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  gap: "5px",
};

const emptyState = {
  textAlign: "center",
  marginTop: "2rem",
};

const emptyImg = {
  width: "180px",
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

const toast = {
  background: "#2A9D8F",
  color: "white",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "10px",
  textAlign: "center",
  fontSize: "0.9rem",
};

const chipFecha = {
  background: "#E8F5E9",
  color: "#2E7D32",
  padding: "6px 10px",
  borderRadius: "10px",
  fontSize: "0.8rem",
  fontWeight: "bold",
};

const hoursBox = {
  background: "#E8F6F3",
  color: "#2A9D8F",
  padding: "6px 10px",
  borderRadius: "10px",
  fontSize: "0.8rem",
  fontWeight: "bold",
};

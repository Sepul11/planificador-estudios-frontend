import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getActividadDetalle,
  toggleSubtarea,
  eliminarSubtarea,
  editarSubtarea,
  crearSubtarea,
  autoReprogramarActividad,
  editarActividad,
  eliminarActividad,
  reprogramarActividad,
  registrarAvance,
  getRecomendaciones,
} from "../services/actividadservice";
import { useSnackbar } from "../context/SnackbarContext";
import { detectarSobrecarga, mensajeError } from "../utils/parsearErrores";


export const useActividadDetalle = () => {
  const { id } = useParams();
  const { showSnackbar } = useSnackbar();

  // ── Actividad ──────────────────────────────
  const [actividad, setActividad] = useState(null);
  const [actividadEdit, setActividadEdit] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [cambios, setCambios] = useState({});
  const [errores, setErrores] = useState({});

  // ── Nueva subtarea ─────────────────────────
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [nuevasHoras, setNuevasHoras] = useState("");

  // ── Reprogramar ────────────────────────────
  const [openReprogramar, setOpenReprogramar] = useState(false);
  const [nuevaFechaRepro, setNuevaFechaRepro] = useState("");
  const [sobrecargaRepro, setSobrecargaRepro] = useState(null);
  const [loadingPosponer, setLoadingPosponer] = useState(false);

  // ── Avance ─────────────────────────────────
  const [openAvance, setOpenAvance] = useState(false);
  const [subtareaSeleccionada, setSubtareaSeleccionada] = useState(null);
  const [tipoAvance, setTipoAvance] = useState("hecho");
  const [notaAvance, setNotaAvance] = useState("");

  // ── Historial ──────────────────────────────
  const [openHistorial, setOpenHistorial] = useState(false);

  // ── Confirms ───────────────────────────────
  const [confirmDeleteSub, setConfirmDeleteSub] = useState({ open: false, idSub: null });
  const [confirmDeleteActividad, setConfirmDeleteActividad] = useState(false);

  // ── Recomendaciones ────────────────────────
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [sobrecarga, setSobrecarga] = useState(null); 

  // ═══════════════════════════════════════════
  // FETCH
  // ═══════════════════════════════════════════

  const fetchActividad = async () => {
    try {
      const res = await getActividadDetalle(id);
      setActividad(res.data);
      setActividadEdit(JSON.parse(JSON.stringify(res.data)));
    } catch {
      showSnackbar("Error cargando actividad", "error");
    }
  };

  const fetchRecomendaciones = async () => {
    try {
      const res = await getRecomendaciones();
      setRecomendaciones(res.data);
    } catch {
      // silencioso
    }
  };

  useEffect(() => {
    fetchActividad();
    fetchRecomendaciones();
  }, []);

  // ═══════════════════════════════════════════
  // PROGRESO
  // ═══════════════════════════════════════════

  const progreso = actividad?.subtareas?.length
    ? Math.round(
        (actividad.subtareas.filter((t) => t.completada).length /
          actividad.subtareas.length) * 100
      )
    : 0;

  // ═══════════════════════════════════════════
  // TOGGLE SUBTAREA
  // ═══════════════════════════════════════════

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
      showSnackbar("Estado actualizado");
    } catch {
      setActividad(prev);
      showSnackbar("Error actualizando estado", "error");
    }
  };

  // ═══════════════════════════════════════════
  // CREAR SUBTAREA
  // ═══════════════════════════════════════════

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

      await fetchActividad();
      await fetchRecomendaciones();

      showSnackbar("Subtarea creada correctamente", "success");
    } catch (error) {
        if (error.response?.data) {
            const data = error.response.data;
            const errorSobrecarga = detectarSobrecarga(data);

            if (errorSobrecarga) {
            setSobrecarga(errorSobrecarga);
            showSnackbar("Superarías tu límite diario de horas", "warning");
            } else {
            showSnackbar(mensajeError(data) || "Error en los datos enviados", "error");
            }
        } else {
            showSnackbar("Error conectando con el servidor", "error");
        }
        }
  };

  // ═══════════════════════════════════════════
  // GUARDAR EDICIÓN
  // ═══════════════════════════════════════════

  const guardarEdicion = async () => {
    try {
      for (const idSub in cambios) {
        try {
          await editarSubtarea(idSub, cambios[idSub]);
            const { subtareas, ...actividadSinSubtareas } = actividadEdit;
            await editarActividad(id, actividadSinSubtareas);

            setCambios({});
            setModoEdicion(false);
            await fetchActividad();
            await fetchRecomendaciones();
            showSnackbar("Cambios guardados correctamente", "success");
        } catch (error) {
            const data = error.response?.data;
            if (!data) { showSnackbar("Error editando subtarea", "error"); return; }

            const errorSobrecarga = detectarSobrecarga(data);

            if (errorSobrecarga) {
                setSobrecarga(errorSobrecarga); 
                showSnackbar("Superarías tu límite diario al editar esa subtarea", "warning");
            } else {
                showSnackbar(mensajeError(data) || "Error editando subtarea", "error");
            }
            return;
            }
      }

      await editarActividad(id, actividadEdit);
      setCambios({});
      setModoEdicion(false);
      await fetchActividad();
      await fetchRecomendaciones();
      showSnackbar("Cambios guardados correctamente", "success");
    } catch (error) {
      if (error.response?.data) {
        const msg = Object.values(error.response.data).flat().join(" ");
        showSnackbar(msg, "error");
      } else {
        showSnackbar("Error guardando cambios", "error");
      }
    }
  };

  // ═══════════════════════════════════════════
  // ELIMINAR SUBTAREA
  // ═══════════════════════════════════════════

  const confirmarDeleteSubtarea = async () => {
    try {
      await eliminarSubtarea(confirmDeleteSub.idSub);
      showSnackbar("Subtarea eliminada correctamente");
      fetchActividad();
    } catch {
      showSnackbar("Error eliminando subtarea", "error");
    } finally {
      setConfirmDeleteSub({ open: false, idSub: null });
    }
  };

  // ═══════════════════════════════════════════
  // ELIMINAR ACTIVIDAD
  // ═══════════════════════════════════════════

  const handleEliminarActividad = async () => {
    try {
      await eliminarActividad(id);
      showSnackbar("Actividad eliminada correctamente");
      window.history.back();
    } catch {
      showSnackbar("Error eliminando actividad", "error");
    }
  };

  // ═══════════════════════════════════════════
  // POSPONER (auto)
  // ═══════════════════════════════════════════

  const handlePosponer = async () => {
    try {
      setLoadingPosponer(true);
      const res = await autoReprogramarActividad(id);
      await fetchActividad();
      await fetchRecomendaciones();
      showSnackbar(`Movido al ${res.data.nueva_fecha} automáticamente`);
    } catch {
      showSnackbar("Error al posponer", "error");
    } finally {
      setLoadingPosponer(false);
    }
  };

  // ═══════════════════════════════════════════
  // REPROGRAMAR MANUAL
  // ═══════════════════════════════════════════

  const ejecutarReprogramacion = async () => {
    try {
      const res = await reprogramarActividad(id, nuevaFechaRepro);

      if (res.data.conflicto) {
        setSobrecargaRepro(res.data);
      } else {
        setOpenReprogramar(false);
        setNuevaFechaRepro("");
        setSobrecargaRepro(null);
        await fetchActividad();
        await fetchRecomendaciones();
        showSnackbar(`Actividad reprogramada correctamente`);
      }
    } catch {
      showSnackbar("Error al reprogramar", "error");
    }
  };

  // ═══════════════════════════════════════════
  // AVANCE
  // ═══════════════════════════════════════════

  const abrirAvance = (subtarea, tipo) => {
    setSubtareaSeleccionada(subtarea);
    setTipoAvance(tipo);
    setOpenAvance(true);
  };

  const confirmarAvance = async () => {
    try {
      await registrarAvance(subtareaSeleccionada.id, {
        estado: tipoAvance,
        nota: notaAvance,
      });
      setOpenAvance(false);
      setNotaAvance("");
      await fetchActividad();
      showSnackbar("Avance registrado");
    } catch {
      showSnackbar("Error registrando avance", "error");
    }
  };

  // ═══════════════════════════════════════════
  // CAMBIOS EN EDICIÓN
  // ═══════════════════════════════════════════

  const handleCambioSubtarea = (idSub, field, value) => {
    setActividadEdit((prev) => ({
      ...prev,
      subtareas: prev.subtareas.map((s) =>
        s.id === idSub ? { ...s, [field]: value } : s
      ),
    }));

    setCambios((prev) => ({
      ...prev,
      [idSub]: { ...prev[idSub], [field]: value },
    }));
  };

  return {
    actividad,
    actividadEdit, setActividadEdit,
    modoEdicion, setModoEdicion,
    errores, setErrores,
    progreso,

    nuevoTitulo, setNuevoTitulo,
    nuevaFecha, setNuevaFecha,
    nuevasHoras, setNuevasHoras,

    openReprogramar, setOpenReprogramar,
    nuevaFechaRepro, setNuevaFechaRepro,
    sobrecargaRepro,
    loadingPosponer,

    openAvance, setOpenAvance,
    subtareaSeleccionada, setSubtareaSeleccionada,
    tipoAvance,
    notaAvance, setNotaAvance,

    openHistorial, setOpenHistorial,

    confirmDeleteSub, setConfirmDeleteSub,
    confirmDeleteActividad, setConfirmDeleteActividad,

    recomendaciones,
    sobrecarga,
    setSobrecarga,

    handleToggle,
    handleCreate,
    guardarEdicion,
    confirmarDeleteSubtarea,
    handleEliminarActividad,
    handlePosponer,
    ejecutarReprogramacion,
    abrirAvance,
    confirmarAvance,
    handleCambioSubtarea,
  };
};
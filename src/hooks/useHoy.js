import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getHoy, registrarAvance, getRecomendaciones } from "../services/actividadservice";

export const useHoy = () => {
  const location = useLocation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [buscar, setBuscar] = useState("");
  const [filtro, setFiltro] = useState("todas");

  // Dialog avance
  const [openAvance, setOpenAvance] = useState(false);
  const [subtareaSeleccionada, setSubtareaSeleccionada] = useState(null);
  const [tipoAvance, setTipoAvance] = useState("hecho");
  const [notaAvance, setNotaAvance] = useState("");
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [panelAbierto, setPanelAbierto] = useState(false);

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

  useEffect(() => {
    if (location.state?.filtro === "hoy") {
      setFiltro("hoy");
    }
  }, [location.state]);

  useEffect(() => {
    getRecomendaciones()
        .then((res) => setRecomendaciones(res.data))
        .catch(() => {}); // silencioso, no bloquea la vista
    }, []);

  const abrirAvance = (subtarea, tipo = "hecho") => {
    setSubtareaSeleccionada(subtarea);
    setTipoAvance(tipo);
    setOpenAvance(true);
  };

  const cerrarAvance = () => {
    setOpenAvance(false);
    setNotaAvance("");
  };

  const confirmarAvance = async () => {
    await registrarAvance(subtareaSeleccionada.id, {
      estado: tipoAvance,
      nota: notaAvance,
    });
    cerrarAvance();
    fetchData();
  };

  const sinDatosFiltrados =
    (filtro === "todas" &&
      data?.vencidas.length === 0 &&
      data?.hoy.length === 0 &&
      data?.proximas.length === 0) ||
    (filtro === "vencidas" && data?.vencidas.length === 0) ||
    (filtro === "hoy" && data?.hoy.length === 0) ||
    (filtro === "proximas" && data?.proximas.length === 0);

  return {
    data,
    loading,
    error,
    buscar,
    setBuscar,
    filtro,
    setFiltro,
    fetchData,
    sinDatosFiltrados,

    openAvance,
    subtareaSeleccionada,
    tipoAvance,
    notaAvance,
    setNotaAvance,

    abrirAvance,
    cerrarAvance,
    confirmarAvance,

    recomendaciones,
    panelAbierto,
    setPanelAbierto,
  };
};
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { crearActividad } from "../services/actividadservice";

import { validarActividad } from "../utils/validators";

import { useSnackbar } from "./useSnackbar";

import { detectarSobrecarga, mensajeError } from "../utils/parsearErrores";

export const useActividadForm = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [sobrecarga, setSobrecarga] = useState(null);
  

  // =========================
  // ACTIVIDAD
  // =========================

  const [actividad, setActividad] = useState({
    titulo: "",
    curso: "",
    tipo: "",
    descripcion: "",
    fecha: "",
    horaInicio: "",
    horaFin: "",
  });

  // =========================
  // SUBTAREA TEMP
  // =========================

  const [subForm, setSubForm] = useState({
    titulo: "",
    fecha: "",
    horas: "",
  });

  // =========================
  // SUBTAREAS
  // =========================

  const [subtareas, setSubtareas] = useState([]);

  // =========================
  // ERRORES
  // =========================

  const [errores, setErrores] = useState({});
  const [errorSub, setErrorSub] = useState({});

  // =========================
  // LOADING
  // =========================

  const [loading, setLoading] = useState(false);

  // =====================================================
  // CHANGE ACTIVIDAD
  // =====================================================

  const handleChange = (field, value) => {
    setActividad((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // =====================================================
  // CHANGE SUBTAREA
  // =====================================================

  const handleSubChange = (field, value) => {
    setSubForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrorSub((prev) => ({
      ...prev,
      [field]: null,
    }));
  };

  // =====================================================
  // AGREGAR SUBTAREA
  // =====================================================

  const agregarSubtarea = () => {
    const nuevosErrores = {};

    if (!subForm.titulo.trim()) {
      nuevosErrores.titulo = "La subtarea necesita nombre";
    }

    if (!subForm.horas || subForm.horas <= 0) {
      nuevosErrores.horas = "Las horas deben ser mayores a 0";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrorSub(nuevosErrores);
      return;
    }

    const nueva = {
      id: Date.now(),
      titulo: subForm.titulo,
      fecha: subForm.fecha || actividad.fecha,
      horas: subForm.horas,
    };

    setSubtareas((prev) => [...prev, nueva]);

    setSubForm({
      titulo: "",
      fecha: "",
      horas: "",
    });

    setErrorSub({});
  };

  // =====================================================
  // ELIMINAR SUBTAREA
  // =====================================================

  const eliminarSubtarea = (id) => {
    setSubtareas((prev) =>
      prev.filter((s) => s.id !== id)
    );
  };

  // =====================================================
  // GUARDAR
  // =====================================================

  const guardarActividad = async () => {

    const erroresValidados = validarActividad(actividad);

    setErrores(erroresValidados);

    if (Object.keys(erroresValidados).length > 0) {
      showSnackbar(
        "Revisa los campos obligatorios",
        "error"
      );
      return;
    }

    if (
      subForm.titulo ||
      subForm.fecha ||
      subForm.horas
    ) {
      showSnackbar(
        "Debes agregar la subtarea antes de guardar",
        "warning"
      );
      return;
    }

    const payload = {
      titulo: actividad.titulo,
      curso: actividad.curso,
      tipo: actividad.tipo || null,
      descripcion: actividad.descripcion,
      fecha: actividad.fecha,
      hora_inicio: actividad.horaInicio + ":00",
      hora_fin: actividad.horaFin + ":00",

      subtareas: subtareas.map((s) => ({
        titulo: s.titulo,
        fecha_objetivo: s.fecha,
        horas: parseInt(s.horas),
      })),
    };

    try {
      setLoading(true);

      const res = await crearActividad(payload);

      showSnackbar(
        "Actividad creada correctamente",
        "success"
      );

      navigate(`/actividad/${res.data.id}`);
        } catch (error) {
        if (error.response?.data) {
            const data = error.response.data;
            const errorSobrecarga = detectarSobrecarga(data);

            if (errorSobrecarga) {
            setSobrecarga(errorSobrecarga);
            return;
            }

            showSnackbar(mensajeError(data) || "Error en los datos enviados", "error");
            setErrores(data);
        } else {
            showSnackbar("Error conectando con el servidor", "error");
            console.error(error);
        }
        } finally {
        setLoading(false);
        }
  };

const aplicarRecomendacion = (rec) => {
  if (rec.tipo === "dividir_en_dos_dias") {
    setSubtareas((prev) => [
      ...prev,
      {
        id: Date.now(),
        titulo: rec.titulo_parte_1,
        fecha: rec.fecha_1,
        horas: rec.horas_1,
      },
      {
        id: Date.now() + 1,
        titulo: rec.titulo_parte_2,
        fecha: rec.fecha_2,
        horas: rec.horas_2,
      },
    ]);
  }

  if (rec.tipo === "mover_a_otro_dia") {
    setSubtareas((prev) => [
      ...prev,
      {
        id: Date.now(),
        titulo: rec.titulo,
        fecha: rec.nueva_fecha,
        horas: rec.horas,
      },
    ]);
  }

  if (rec.tipo === "reducir_horas") {
    setSubtareas((prev) => [
      ...prev,
      {
        id: Date.now(),
        titulo: rec.titulo,
        fecha: rec.fecha,
        horas: rec.horas_sugeridas,
      },
    ]);
  }

  setSobrecarga(null);
};

return {
  actividad,
  setActividad,

  subForm,
  setSubForm,

  subtareas,

  errores,
  errorSub,

  loading,

  handleChange,
  handleSubChange,

  agregarSubtarea,
  eliminarSubtarea,
  sobrecarga,
  setSobrecarga,

  guardarActividad,
  aplicarRecomendacion,
};
};
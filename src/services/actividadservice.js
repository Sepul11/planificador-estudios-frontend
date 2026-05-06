// src/services/actividadService.js
const handleError = (err) => {
  const error = err.response?.data;

  if (error?.sobrecarga) {
    throw {
      tipo: "sobrecarga",
      data: error,
    };
  }

  throw err;
};

import api from "../api/axios";

export const getActividades = (params) => api.get("api/actividades/", { params });

export const crearActividad = async (data) => {
  try {
    return await api.post("/api/actividades/", data);
  } catch (err) {
    handleError(err);
  }
};

export const editarActividad = async (id, data) => {
  try {
    return await api.patch(`/api/actividades/${id}/`, data);
  } catch (err) {
    handleError(err);
  }
};

export const eliminarActividad = (id) =>
  api.delete(`/api/actividades/${id}/`);

export const getActividadDetalle = (id) =>
  api.get(`/api/actividades/${id}/`);

export const reprogramarActividad = (id, fecha, modo="subtareas") =>
  api.patch(`/api/actividades/${id}/reprogramar/`, {
    fecha,
    modo
  });

export const getHoy = (buscar = "") =>
  api.get(`api/actividades/hoy/`, {
    params: { buscar }
  });

export const getEventosCalendario = () =>
  api.get("api/actividades/calendario/");

export const posponerActividad = (id) =>
  api.patch(`/api/actividades/${id}/auto_reprogramar/`);

// ✅ Subtareas
export const completarSubtarea = (id) =>
  api.patch(`/api/subtareas/${id}/`, { completada: true });

export const eliminarSubtarea = (id) =>
  api.delete(`/api/subtareas/${id}/`);

export const crearSubtarea = async (data) => {
  try {
    return await api.post(`/api/subtareas/`, data);
  } catch (err) {
    handleError(err);
  }
};

export const editarSubtarea = async (id, data) => {
  try {
    return await api.patch(`/api/subtareas/${id}/`, data);
  } catch (err) {
    handleError(err);
  }
};

export const toggleSubtarea = (id, completada) =>
  api.patch(`/api/subtareas/${id}/`, { completada });

export const registrarAvance = (idSubtarea, data) => {
  return fetch(
    `https://planificador-estudios-backend-80p8.onrender.com/api/subtareas/${idSubtarea}/avance/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    }
  ).then(res => res.json());
};
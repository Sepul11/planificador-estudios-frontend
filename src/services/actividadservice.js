// src/services/actividadService.js

import api from "../api/axios";

// =========================
// ACTIVIDADES
// =========================

export const getActividades = (params) =>
  api.get("/api/actividades/", { params });

export const getActividadDetalle = (id) =>
  api.get(`/api/actividades/${id}/`);

export const crearActividad = (data) =>
  api.post("/api/actividades/", data);

export const editarActividad = (id, data) =>
  api.patch(`/api/actividades/${id}/`, data);

export const eliminarActividad = (id) =>
  api.delete(`/api/actividades/${id}/`);


// =========================
// PLANIFICACIÓN
// =========================

export const getHoy = (buscar = "") =>
  api.get("/api/actividades/hoy/", {
    params: { buscar }
  });

export const getEventosCalendario = () =>
  api.get("/api/actividades/calendario/");

export const reprogramarActividad = (
  id,
  fecha,
  modo = "subtareas"
) =>
  api.patch(`/api/actividades/${id}/reprogramar/`, {
    fecha,
    modo
  });

export const autoReprogramarActividad = (id) =>
  api.patch(`/api/actividades/${id}/auto_reprogramar/`);

export const getRecomendaciones = () =>
  api.get("/api/actividades/recomendaciones/");


// =========================
// SUBTAREAS
// =========================

export const crearSubtarea = (data) =>
  api.post("/api/subtareas/", data);

export const editarSubtarea = (id, data) =>
  api.patch(`/api/subtareas/${id}/`, data);

export const eliminarSubtarea = (id) =>
  api.delete(`/api/subtareas/${id}/`);

export const toggleSubtarea = (id, completada) =>
  api.patch(`/api/subtareas/${id}/`, {
    completada
  });
  


// =========================
// AVANCES
// =========================

export const registrarAvance = (idSubtarea, data) =>
  api.post(
    `/api/subtareas/${idSubtarea}/avance/`,
    data
  );
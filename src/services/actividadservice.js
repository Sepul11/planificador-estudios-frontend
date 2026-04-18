// src/services/actividadService.js
import api from "../api/axios";

export const getActividades = () => api.get("/api/actividades/");

export const crearActividad = (data) => api.post("/api/actividades/", data);

export const editarActividad = (id, data) =>
  api.patch(`/api/actividades/${id}/`, data);

export const eliminarActividad = (id) =>
  api.delete(`/api/actividades/${id}/`);

export const getActividadDetalle = (id) =>
  api.get(`/api/actividades/${id}/`);

export const getActividadesFiltradas = (params) =>
  api.get("/api/actividades/", { params });

export const getHoy = (curso = "") =>
  api.get(`api/actividades/hoy/`, {
    params: { curso }
  });
export const posponerActividad = (id) =>
  api.patch(`/api/actividades/${id}/auto_reprogramar/`);

// ✅ Subtareas
export const completarSubtarea = (id) =>
  api.patch(`/api/subtareas/${id}/`, { completada: true });

export const eliminarSubtarea = (id) =>
  api.delete(`/api/subtareas/${id}/`);

export const crearSubtarea = (data) =>
  api.post(`/api/subtareas/`, data);

export const editarSubtarea = (id, data) =>
  api.patch(`/api/subtareas/${id}/`, data);

export const toggleSubtarea = (id, completada) =>
  api.patch(`/api/subtareas/${id}/`, { completada });

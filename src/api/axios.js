// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://planificador-estudios-backend-80p8.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;
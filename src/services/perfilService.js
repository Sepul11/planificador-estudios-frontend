import api from "../api/axios";

export const getPerfil = async () => {
  const res = await api.get("api/perfil/limite");
  return res.data;
};

export const updatePerfil = async (data) => {
  const res = await api.patch("api/perfil/limite", data);
  return res.data;
};
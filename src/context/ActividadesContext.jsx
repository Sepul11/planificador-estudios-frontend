import { createContext, useContext, useEffect, useState } from "react";
import { getActividades } from "../services/actividadservice.js";

const ActividadesContext = createContext();

export const ActividadesProvider = ({ children }) => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarActividades = async () => {
    try {
      setLoading(true);
      const res = await getActividades();
      setActividades(res.data);
    } catch (error) {
      console.error("Error cargando actividades", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarActividades();
  }, []);

  return (
    <ActividadesContext.Provider
      value={{
        actividades,
        loading,
        recargar: cargarActividades,
      }}
    >
      {children}
    </ActividadesContext.Provider>
  );
};

export const useActividades = () => useContext(ActividadesContext);
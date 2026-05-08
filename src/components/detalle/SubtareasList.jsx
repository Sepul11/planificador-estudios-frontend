import { Typography } from "@mui/material";
import imgvacio from "../../assets/imgvacio.png";
import { detalleStyles as s } from "../../styles/detalleStyles.js";
import SubtareaCard from "./SubtareaCard.jsx";
import CrearSubtareaForm from "./CrearSubtareaForm.jsx";

export default function SubtareasList({
  actividad, actividadEdit, modoEdicion,
  nuevoTitulo, setNuevoTitulo,
  nuevaFecha, setNuevaFecha,
  nuevasHoras, setNuevasHoras,
  errores, setErrores,
  onCreate, onCambio, onDelete, onAvance, onHistorial,
}) {
  const lista = modoEdicion
    ? actividadEdit?.subtareas
    : actividad?.subtareas;

  return (
    <div style={s.subtareasCard}>
      {lista?.length === 0 ? (
        <div style={s.emptyState}>
          <img src={imgvacio} alt="vacío" style={s.emptyImg} />
          <Typography variant="h6" mt={2}>No hay subtareas aún</Typography>
          <Typography variant="body2" color="text.secondary">
            Agrega tu primera subtarea abajo 👇
          </Typography>
        </div>
      ) : (
        lista?.map((t) => (
          <SubtareaCard
            key={t.id}
            subtarea={t}
            modoEdicion={modoEdicion}
            actividadEdit={actividadEdit}
            onCambio={onCambio}
            onDelete={onDelete}
            onAvance={onAvance}
            onHistorial={onHistorial}
          />
        ))
      )}

      <CrearSubtareaForm
        nuevoTitulo={nuevoTitulo} setNuevoTitulo={setNuevoTitulo}
        nuevaFecha={nuevaFecha} setNuevaFecha={setNuevaFecha}
        nuevasHoras={nuevasHoras} setNuevasHoras={setNuevasHoras}
        errores={errores} setErrores={setErrores}
        onCreate={onCreate}
      />
    </div>
  );
}
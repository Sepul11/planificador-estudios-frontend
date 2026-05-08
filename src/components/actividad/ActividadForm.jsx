import { actividadStyles } from "../../styles/actividadStyles.js";

import ActividadFields from "./ActividadFields.jsx";
import SubtareaForm from "./SubtareaForm.jsx";
import SubtareaList from "./SubtareaList.jsx";

const {
  card,
  saveBtn,
  sectionTitle,
} = actividadStyles;


export default function ActividadForm({
  actividad,
  errores,

  subForm,
  errorSub,

  subtareas,

  handleChange,
  handleSubChange,

  agregarSubtarea,
  eliminarSubtarea,

  guardarActividad,
  loading,
}) {
  return (
    <div style={card}>

      <ActividadFields
        actividad={actividad}
        errores={errores}
        handleChange={handleChange}
      />

      <h3 style={sectionTitle}>
        Divide tu trabajo en subtareas
      </h3>

      <SubtareaForm
        subForm={subForm}
        erroresSub={errorSub}
        handleSubChange={handleSubChange}
        agregarSubtarea={agregarSubtarea}
      />

      <SubtareaList
        subtareas={subtareas}
        eliminarSubtarea={eliminarSubtarea}
      />

      <button
        style={saveBtn}
        disabled={loading}
        onClick={guardarActividad}
      >
        {loading
          ? "Guardando..."
          : "Guardar actividad"}
      </button>

    </div>
  );
}
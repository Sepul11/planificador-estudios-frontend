import { useActividadForm } from "../hooks/useActividadForm.js";
import ActividadForm from "../components/actividad/ActividadForm.jsx";
import LoadingActividad from "../components/actividad/LoadingActividad.jsx";
import SobrecargaDialog from "../components/common/SobreCargaDialog.jsx";
import { actividadStyles as styles } from "../styles/actividadStyles.js";

function CrearActividad() {
  const form = useActividadForm();

  if (form.loading) {
    return <LoadingActividad />;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Crear actividad</h1>

      <SobrecargaDialog
        sobrecarga={form.sobrecarga}
        onClose={() => form.setSobrecarga(null)}
        onAplicarRecomendacion={form.aplicarRecomendacion}
      />

      <ActividadForm
        actividad={form.actividad}
        errores={form.errores}
        subForm={form.subForm}
        errorSub={form.errorSub}
        subtareas={form.subtareas}
        handleChange={form.handleChange}
        handleSubChange={form.handleSubChange}
        agregarSubtarea={form.agregarSubtarea}
        eliminarSubtarea={form.eliminarSubtarea}
        guardarActividad={form.guardarActividad}
        loading={form.loading}
      />
    </div>
  );
}

export default CrearActividad;
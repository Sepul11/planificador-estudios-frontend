import { actividadStyles } from "../../styles/actividadStyles";
const {
  loadingContainer,
  spinner,
} = actividadStyles;

export default function LoadingActividad() {
  return (
    <div style={loadingContainer}>
      <div style={spinner}></div>

      <p>Creando actividad...</p>
    </div>
  );
}
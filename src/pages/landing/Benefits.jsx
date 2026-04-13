import "./Benefits.css";
import img1 from "../../assets/imgbeneficio1.png";
import img2 from "../../assets/imgbeneficio2.png";
import img3 from "../../assets/imgbeneficio3.png";

function Benefits() {
  return (
    <section className="benefits" id="benefits">
      <div className="benefits-container">
        <h2 className="benefits-title">¿Por qué usar el Planificador?</h2>

        <div className="benefit-row">
          <div className="benefit-text">
            <h3>Evita la acumulación de tareas</h3>
            <p>
              Visualiza claramente tus pendientes y organiza tus actividades
              antes de que se conviertan en estrés académico.
            </p>
          </div>
          <div className="benefit-visual">
            <img src={img1} alt="Organización de tareas" />
          </div>
        </div>

        <div className="benefit-row reverse">
          <div className="benefit-text">
            <h3>Mejora tu disciplina y constancia</h3>
            <p>
              Crear el hábito de planificar tus estudios aumenta tu
              responsabilidad y mejora tus resultados.
            </p>
          </div>
          <div className="benefit-visual">
            <img src={img2} alt="Disciplina académica" />
          </div>
        </div>

        <div className="benefit-row">
          <div className="benefit-text">
            <h3>Ten claridad sobre tu progreso</h3>
            <p>
              Lleva un seguimiento de tus tareas completadas y mantén el control
              de tu avance académico.
            </p>
          </div>
          <div className="benefit-visual">
            <img src={img3} alt="Seguimiento de progreso" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benefits;
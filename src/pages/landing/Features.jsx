import "./Features.css";
function Features() {
  return (
    <section className="features" id="features">
      <h2 className="features-title">¿Qué es el Planificador de Estudios?</h2>

      <div className="features-grid">
        <div className="feature-card">
          <div className="icon">📚</div>
          <h3>Organiza tus actividades</h3>
          <p>
            Registra tus tareas y ten control total sobre tus actividades
            académicas en un solo lugar.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">⏰</div>
          <h3>Gestiona tu tiempo</h3>
          <p>
            Planea tu día, semana y mes para evitar acumulación de tareas y
            mejorar tu productividad.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">📈</div>
          <h3>Mejora tu rendimiento</h3>
          <p>
            Lleva un seguimiento claro de tus actividades y alcanza tus metas
            académicas con mayor facilidad.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;
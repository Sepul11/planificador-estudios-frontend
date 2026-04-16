import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Calendario() {
  const [eventos, setEventos] = useState([]);
  const calendarRef = useRef(null);

  const today = new Date();
  const fechaHoy = today.toISOString().split("T")[0];

  const navigate = useNavigate();

  // 🔥 datos simulados
  useEffect(() => {
    const actividades = [
      { id: 1, nombre: "Examen Matemáticas", fecha_entrega: "2026-04-22" },
      { id: 2, nombre: "Tarea Física", fecha_entrega: fechaHoy },
    ];

    const eventosFormateados = actividades.map((act) => ({
      title: act.nombre,
      date: act.fecha_entrega,
    }));

    setEventos(eventosFormateados);
  }, []);

  // 🔥 ir a hoy
  const irHoy = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
  };

  return (
    <div style={{ ...layout, paddingTop: "110px" }}>
      
      {/* 🔵 PANEL IZQUIERDO */}
      <div style={sidePanel}>
        <h1 style={dayNumber}>{today.getDate()}</h1>
        <p style={dayText}>
          {today.toLocaleDateString("es-CO", {
            weekday: "long",
            month: "long",
          })}
        </p>

        <button style={btnHoy} onClick={() => navigate("/hoy")}>
          Ver actividades de hoy
        </button>
      </div>

      {/* 🟡 CALENDARIO */}
      <div style={calendarContainer}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={eventos}
          height="75vh"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "today",
          }}
        />
      </div>
    </div>
  );
}

const colors = {
  dark: "#472825",
  medium: "#96786F",
  accent: "#D3AB80",
  light: "#FDE4BC",
  base: "#FFF4E2",
};

const layout = {
  display: "flex",
  gap: "20px",
  padding: "20px",
  background: colors.base,
  minHeight: "84vh",
};

const sidePanel = {
  width: "250px",
  background: colors.dark,
  color: "white",
  borderRadius: "20px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const dayNumber = {
  fontSize: "8rem",
  fontWeight: "bold",
};

const dayText = {
  textAlign: "center",
  marginBottom: "20px",
  textTransform: "capitalize",
};

const btnHoy = {
  padding: "10px 15px",
  borderRadius: "12px",
  border: "none",
  background: "#D3AB80",
  color: "#472825",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
  transition: "0.2s",
};

const calendarContainer = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
};
export default Calendario;
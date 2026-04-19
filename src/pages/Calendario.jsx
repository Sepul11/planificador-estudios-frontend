import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEventosCalendario } from "../services/actividadservice";

function Calendario() {
  const [eventos, setEventos] = useState([]);
  const calendarRef = useRef(null);

  const today = new Date();
  const fechaHoy = today.toISOString().split("T")[0];

  const navigate = useNavigate();

  useEffect(() => {
    getEventosCalendario().then((res) => {
      setEventos(res.data);
    });
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
        <button style={btnHoy} onClick={() => navigate("/actividades")}>
          Ver todas las actividades
        </button>
      </div>

      {/* 🟡 CALENDARIO */}
      <div style={calendarContainer}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={eventos}
          eventContent={(arg) => {
            const tipo = arg.event.extendedProps.tipo;

            const esActividad = tipo === "actividad";

            return (
              <div
                style={{
                  background: esActividad ? "#3A86FF" : "#2A9D8F",
                  color: "white",
                  borderRadius: "8px",
                  padding: "4px 6px",
                  fontSize: "0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                }}
              >
                <strong style={{ fontSize: "0.65rem", opacity: 0.9 }}>
                  {esActividad ? "ACTIVIDAD" : "SUBTAREA"}
                </strong>

                <span>{arg.event.title}</span>
              </div>
            );
          }}
          eventClick={(info) => {
            const id = info.event.id;

            if (id.startsWith("A")) {
              navigate(`/actividad/${id.replace("A", "")}`);
            }
            if (id.startsWith("S")) {
              // también lleva a la actividad
              navigate(`/actividad/${info.event.id.replace("S", "")}`);
            }
          }}
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
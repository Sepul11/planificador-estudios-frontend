import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, Divider, Chip, TextField, Typography, Snackbar, Alert 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import logo from "../assets/logo.png";
import { crearActividad } from "../services/actividadService";

function CrearActividad() {
  const navigate = useNavigate();

  // Actividad
  const [titulo, setTitulo] = useState("");
  const [curso, setCurso] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  // Subtareas
  const [subtareas, setSubtareas] = useState([]);
  const [subTitulo, setSubTitulo] = useState("");
  const [subFecha, setSubFecha] = useState("");
  const [subHoras, setSubHoras] = useState("");

  //Errores
  const [errores, setErrores] = useState({});
  const [errorSub, setErrorSub] = useState({});
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "error", // error | success | warning | info
  });

  function agregarSubtarea() {

    const erroresSub = {};


    if (!subTitulo.trim()) {
      erroresSub.subTitulo = "La subtarea necesita un nombre";
    }
    if (!subHoras || subHoras <= 0) {
      erroresSub.subHoras = "Las horas deben ser mayores a 0";
    }

    if (subFecha && fecha && subFecha < fecha) {
      erroresSub.subFecha = "No puede ser antes de la actividad";
    }

    if (Object.keys(erroresSub).length > 0) {
      setErrorSub(erroresSub);
      return;
    }

    const nueva = {
      id: Date.now(),
      titulo: subTitulo,
      fecha: subFecha || fecha,
      horas: subHoras,
    };

    setSubtareas([...subtareas, nueva]);

    setSubTitulo("");
    setSubFecha("");
    setSubHoras("");

    setErrorSub({});
  }

  function eliminarSubtarea(id) {
    setSubtareas(subtareas.filter((s) => s.id !== id));
  }

  function validarFormulario() {
      const nuevosErrores = {};

      if (!titulo.trim()) {
        nuevosErrores.titulo = "El título es obligatorio";
      } else if (titulo.length < 3) {
        nuevosErrores.titulo = "Debe tener al menos 3 caracteres";
      }

      if (!fecha) {
        nuevosErrores.fecha = "Selecciona una fecha";
      }

      if (!horaInicio) {
        nuevosErrores.horaInicio = "Selecciona hora de inicio";
      }

      if (!horaFin) {
        nuevosErrores.horaFin = "Selecciona hora de fin";
      }

      if (horaInicio && horaFin && horaInicio >= horaFin) {
        nuevosErrores.horaFin = "La hora de fin debe ser mayor que la de inicio";
      }

      setErrores(nuevosErrores);

      return Object.keys(nuevosErrores).length === 0;
    }


  function showSnack(message, severity = "error") {
    setSnack({
      open: true,
      message,
      severity,
    });
  }

  async function guardarActividad() {
    if (!validarFormulario()) {
      showSnack("Revisa los campos obligatorios");
      return;
    }
    if (subTitulo || subFecha || subHoras) {
      showSnack("Debes agregar la subtarea antes de guardar");
      return;
    }

    const actividadData = {
      titulo,
      curso,
      tipo: tipo || null,
      descripcion,
      fecha,
      hora_inicio: horaInicio + ":00",
      hora_fin: horaFin + ":00",
      subtareas: subtareas.map((s) => ({
        titulo: s.titulo,
        fecha_objetivo: s.fecha,
        horas: parseInt(s.horas),
      })),
    };
    try {
        setLoading(true);
        const res = await crearActividad(actividadData);
        navigate(`/actividad/${res.data.id}`, {
          state: { mensaje: "Actividad creada con éxito ✅" }
        });
      } catch (error) {
          console.error(error);

          if (error.response?.data) {
            const errores = Object.values(error.response.data).flat().join(" ");
            showSnack(errores);
          } else {
            showSnack("Error conectando con el servidor");
          }
        }finally {
        setLoading(false);
      }

  }
  if (loading) {
    return (
      <div style={loadingContainer}>
        <div style={spinner}></div>
        <p>Creando Actividad...</p>
      </div>
    );
  }

  const formatFecha = (fechaStr) => {
  const [year, month, day] = fechaStr.split("-");
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
  });
};

const formatHoras = (h) => {
  if (h === 1) return "1 hora";
  return `${h} horas`;
};


  return (
    <div style={{ ...container, paddingTop: "70px" }}>
      
      <h1 style={title}>Crear actividad</h1>

      <div style={card}>
        {/* Actividad */}
          <TextField
            label="Título"
            fullWidth
            value={titulo}
            onChange={e=>setTitulo(e.target.value)}
            error={!!errores.titulo}
            helperText={errores.titulo}
            sx={muiInputSx}
          />
          <TextField
            label="Curso"
            fullWidth
            value={curso}
            onChange={e=>setCurso(e.target.value)}
            sx={muiInputSx}
          />
          <TextField
            label="Tipo"
            fullWidth
            value={tipo}
            onChange={e=>setTipo(e.target.value)}
            sx={muiInputSx}
          />
          <TextField
            label="Descripción"
            multiline
            rows={3}
            fullWidth
            value={descripcion}
            onChange={e=>setDescripcion(e.target.value)}
            sx={muiInputSx}
          />

        <div style={timeGroup}>
        <label style={label}>Fecha</label>
        <input
          style={{...input, border: errores.fecha ? "1px solid #ff6b6b" : input.border}}
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        </div>
        {errores.fecha && <span style={error}>{errores.fecha}</span>}

        <div style={row}>
          <div style={timeGroup}>
            <label style={label}>Hora inicio</label>
            <input
              style={{...input, border: errores.horaInicio ? "1px solid #ff6b6b" : input.border}}
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
            />
            <div>{errores.horaInicio && <span style={error}>{errores.horaInicio}</span>}</div>
          </div>

          <div style={timeGroup}>
            <label style={label}>Hora fin</label>
            <input
              style={{...input, border: errores.horaFin ? "1px solid #ff6b6b" : input.border}}
              type="time"
              value={horaFin}
              onChange={(e) => setHoraFin(e.target.value)}
            />
            <div>{errores.horaFin && <span style={error}>{errores.horaFin}</span>}</div>
          </div>
        </div>

        {/* Subtareas */}
        <h3 style={sectionTitle}>Divide tu trabajo en subtareas</h3>

       <div style={subRow}>

      <div style={fieldColumn}>
        <input
          style={{
            ...input,
            border: errorSub.subTitulo ? "1px solid #ff6b6b" : input.border
          }}
          placeholder="Subtarea"
          value={subTitulo}
          onChange={(e) => {
            setSubTitulo(e.target.value);
            setErrorSub({ ...errorSub, subTitulo: null });
          }}
        />
        <div>{errorSub.subTitulo && <span style={error}>{errorSub.subTitulo}</span>}</div>
      </div>
      

      <div style={fieldColumn}>
        <input
          style={{
            ...input,
            border: errorSub.subFecha ? "1px solid #ff6b6b" : input.border
          }}
          type="date"
          value={subFecha}
          onChange={(e) => {
            setSubFecha(e.target.value);
            setErrorSub({ ...errorSub, subFecha: null });
          }}
        />
        <div>{errorSub.subFecha && <span style={error}>{errorSub.subFecha}</span>}</div>
      </div>
      

      <div style={fieldColumn}>
        <input
          style={{
            ...input,
            border: errorSub.subHoras ? "1px solid #ff6b6b" : input.border
          }}
          type="number"
          placeholder="Horas"
          min="1"
          max="24"
          value={subHoras}
          onChange={(e) => {
            setSubHoras(e.target.value);
            setErrorSub({ ...errorSub, subHoras: null });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") agregarSubtarea();
          }}
        />
        <div>{errorSub.subHoras && <span style={error}>{errorSub.subHoras}</span>}</div>
      </div>
      
      <button style={addBtn} onClick={agregarSubtarea}>
        ➕
      </button>

    </div>

    {subtareas.map((s) => (
        <Box key={s.id} sx={subItem}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography fontWeight="bold">{s.titulo}</Typography>

          <Chip
            label={`📅 ${formatFecha(s.fecha)}`}
            size="small"
            sx={chip}
          />

          <Chip
            label={`⏱️ ${formatHoras(s.horas)}`}
            size="small"
            sx={chip}
          />
        </Box>

        <Button
          onClick={() => eliminarSubtarea(s.id)}
          startIcon={<DeleteIcon />}
          sx={btnDelete}
        >
          Quitar
        </Button>
      </Box>
    ))}

        <button style={saveBtn} disabled={loading} onClick={guardarActividad}>
          {loading ? "Guardando..." : "Guardar actividad"}
        </button>
        
      </div>
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snack.severity}
          sx={{
            background: "#472825",
            color: "white",
            fontWeight: "bold",
            borderRadius: "12px",
          }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

const container = {
  paddingTop: "120px",
  paddingRight: "2rem",
  paddingBottom: "2rem",
  paddingLeft: "2rem",
  background: "#FFF4E2",
  minHeight: "100vh",
};

const title = {
  textAlign: "center",
  marginBottom: "2rem",
  color: "#472825",
};

const card = {
  background: "white",
  maxWidth: "700px",   
  width: "100%",      
  margin: "0 auto",
  padding: "2.5rem",
  borderRadius: "18px",
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
  boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
};

const input = {
  padding: "0.75rem",
  borderRadius: "10px",
  border: "1px solid #D3AB80",
  outline: "none",
  fontSize: "0.95rem",
};

const row = {
  display: "flex",
  gap: "0.8rem",
};

const sectionTitle = {
  marginTop: "1rem",
  color: "#472825",
};

const subRow = {
  display: "grid",
  gridTemplateColumns: "2fr 1.2fr 1fr auto",
  gap: "0.5rem",
};

const addBtn = {
  background: "#D3AB80",
  border: "none",
  borderRadius: "8px",
  padding: "0 14px",
  cursor: "pointer",
  fontSize: "0.9rem",
  fontWeight: "500",
  whiteSpace: "nowrap"
};

const btnDelete = {
  color: "#ff6b6b",
};


const subItem = {
  background: "#FFF4E2",
  padding: "0.6rem",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const removeBtn = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
};

const saveBtn = {
  marginTop: "1.5rem",
  padding: "0.9rem",
  borderRadius: "12px",
  border: "none",
  background: "#472825",
  color: "white",
  cursor: "pointer",
};

const error = {
  color: "#ff6b6b",
  fontSize: "0.8rem",
  marginTop: "-0.6rem",
};

const timeGroup = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

const label = {
  fontSize: "0.8rem",
  color: "#472825",
  marginBottom: "3px",
};

const fieldColumn = {
  display: "flex",
  flexDirection: "column",
  gap: "2px"
};

const loadingContainer = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#472825",
};

const spinner = {
  width: "40px",
  height: "40px",
  border: "4px solid #D3AB80",
  borderTop: "4px solid #472825",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const subItemPro = {
  background: "#FFF4E2",
  padding: "10px 14px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "8px",
};

const chip = {
  background: "#ffffff",
  border: "1px solid #D3AB80",
  padding: "4px 8px",
  borderRadius: "20px",
  fontSize: "0.8rem",
  color: "#472825",
  fontWeight: "500",
};

const muiInputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    "& fieldset": {
      borderColor: "#D3AB80",
    },
    "&:hover fieldset": {
      borderColor: "#c49a6c",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#472825",
    },
  },
};

export default CrearActividad;
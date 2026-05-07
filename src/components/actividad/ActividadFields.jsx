import { TextField } from "@mui/material";
import { actividadStyles } from "../../styles/actividadStyles";
const {
  muiInputSx,
  row,
  timeGroup,
  input,
  label,
  error,
} = actividadStyles;


export default function ActividadFields({
  actividad,
  errores,
  handleChange,
}) {
  return (
    <>
      <TextField
        label="Título"
        fullWidth
        value={actividad.titulo}
        onChange={(e) =>
           handleChange("titulo", e.target.value)
        }
        error={!!errores.titulo}
        helperText={errores.titulo}
        sx={muiInputSx}
      />

      <TextField
        label="Curso"
        fullWidth
        value={actividad.curso}
        onChange={(e) =>
          handleChange("curso", e.target.value)
        }
        sx={muiInputSx}
      />

      <TextField
        label="Tipo"
        fullWidth
        value={actividad.tipo}
        onChange={(e) =>
          handleChange("tipo", e.target.value)
        }
        sx={muiInputSx}
      />

      <TextField
        label="Descripción"
        multiline
        rows={3}
        fullWidth
        value={actividad.descripcion}
        onChange={(e) =>
          handleChange("descripcion", e.target.value)
        }
        sx={muiInputSx}
      />

      <div style={timeGroup}>
        <label style={label}>Fecha</label>

        <input
          type="date"
          value={actividad.fecha}
          onChange={(e) =>
            handleChange("fecha", e.target.value)
          }
          style={{
            ...input,
            border: errores.fecha
              ? "1px solid #ff6b6b"
              : input.border,
          }}
        />

        {errores.fecha && (
          <span style={error}>{errores.fecha}</span>
        )}
      </div>

      <div style={row}>
        <div style={timeGroup}>
          <label style={label}>Hora inicio</label>

          <input
            type="time"
            value={actividad.horaInicio}
            onChange={(e) =>
                handleChange("horaInicio", e.target.value)
            }
            style={{
              ...input,
              border: errores.horaInicio
                ? "1px solid #ff6b6b"
                : input.border,
            }}
          />

          {errores.horaInicio && (
            <span style={error}>
              {errores.horaInicio}
            </span>
          )}
        </div>

        <div style={timeGroup}>
          <label style={label}>Hora fin</label>

          <input
            type="time"
            value={actividad.horaFin}
            onChange={(e) =>
                handleChange("horaFin", e.target.value)
            }
            style={{
              ...input,
              border: errores.horaFin
                ? "1px solid #ff6b6b"
                : input.border,
            }}
          />

          {errores.horaFin && (
            <span style={error}>
              {errores.horaFin}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
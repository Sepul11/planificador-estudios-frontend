import { actividadStyles } from "../../styles/actividadStyles.js";
const {
  subRow,
  fieldColumn,
  input,
  error,
  addBtn,
} = actividadStyles;

export default function SubtareaForm({
  subForm,
  handleSubChange,
  agregarSubtarea,
  erroresSub,
}) {
  return (
    <div style={subRow}>
      <div style={fieldColumn}>
        <input
          placeholder="Subtarea"
          value={subForm.titulo}
          onChange={(e) =>
            handleSubChange("titulo", e.target.value)
          }
          style={{
            ...input,
            border: erroresSub.titulo
              ? "1px solid #ff6b6b"
              : input.border,
          }}
        />

        {erroresSub.titulo && (
          <span style={error}>
            {erroresSub.titulo}
          </span>
        )}
      </div>

      <div style={fieldColumn}>
        <input
          type="date"
          value={subForm.fecha}
          onChange={(e) =>
            handleSubChange("fecha", e.target.value)
          }
          style={input}
        />
      </div>

      <div style={fieldColumn}>
        <input
          type="number"
          min="1"
          max="24"
          placeholder="Horas"
          value={subForm.horas}
          onChange={(e) =>
            handleSubChange("horas", e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              agregarSubtarea();
            }
          }}
          style={{
            ...input,
            border: erroresSub.horas
              ? "1px solid #ff6b6b"
              : input.border,
          }}
        />

        {erroresSub.horas && (
          <span style={error}>
            {erroresSub.horas}
          </span>
        )}
      </div>

      <button
        type="button"
        style={addBtn}
        onClick={agregarSubtarea}
      >
        ➕
      </button>
    </div>
  );
}
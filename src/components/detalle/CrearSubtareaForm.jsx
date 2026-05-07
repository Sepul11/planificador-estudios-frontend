import { Button, Card, TextField } from "@mui/material";
import { detalleStyles as s } from "../../styles/detalleStyles";

export default function CrearSubtareaForm({
  nuevoTitulo, setNuevoTitulo,
  nuevaFecha, setNuevaFecha,
  nuevasHoras, setNuevasHoras,
  errores, setErrores,
  onCreate,
}) {
  return (
    <Card sx={{ p: 2, mb: 2 }}>
      <div style={s.createBox}>
        <TextField
          label="Título" size="small"
          value={nuevoTitulo}
          error={!!errores.titulo}
          helperText={errores.titulo}
          onChange={(e) => {
            setNuevoTitulo(e.target.value);
            setErrores((prev) => ({ ...prev, titulo: "" }));
          }}
        />
        <TextField
          type="date" size="small"
          value={nuevaFecha}
          error={!!errores.fecha}
          helperText={errores.fecha}
          onChange={(e) => {
            setNuevaFecha(e.target.value);
            setErrores((prev) => ({ ...prev, fecha: "" }));
          }}
        />
        <TextField
          type="number" label="Horas" size="small"
          value={nuevasHoras}
          error={!!errores.horas}
          helperText={errores.horas}
          onChange={(e) => {
            setNuevasHoras(e.target.value);
            setErrores((prev) => ({ ...prev, horas: "" }));
          }}
        />
        <Button variant="contained" onClick={onCreate}>
          ＋ Agregar
        </Button>
      </div>
    </Card>
  );
}
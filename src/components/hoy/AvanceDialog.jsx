import {
  Button, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField,
} from "@mui/material";

export default function AvanceDialog({
  open, tipoAvance, notaAvance,
  setNotaAvance, onClose, onConfirm,
}) {
  const titulos = {
    hecho:     "Marcar como completado",
    pospuesto: "Posponer subtarea",
    deshacer:  "Deshacer",
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{titulos[tipoAvance]}</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Nota (opcional)"
          value={notaAvance}
          onChange={(e) => setNotaAvance(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={onConfirm}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

const titulos = {
  hecho: "Marcar como completado",
  pospuesto: "Posponer subtarea",
  deshacer: "Deshacer",
};

export default function AvanceDetalleDialog({
  open, tipoAvance, notaAvance,
  setNotaAvance, onClose, onConfirm,
}) {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>{titulos[tipoAvance]}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth multiline rows={3}
          label="Nota (opcional)"
          value={notaAvance}
          placeholder="Ej: avancé hasta la mitad..."
          onChange={(e) => setNotaAvance(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={onConfirm}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}
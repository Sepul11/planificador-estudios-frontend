import {
  Button, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField
} from "@mui/material";

export default function ReprogramarDialog({
  open,
  nuevaFechaRepro,
  setNuevaFechaRepro,
  onClose,
  onConfirm,
}) {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Reprogramar actividad manualmente</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          type="date"
          margin="normal"
          value={nuevaFechaRepro}
          onChange={(e) => setNuevaFechaRepro(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={!nuevaFechaRepro}
        >
          Intentar reprogramar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
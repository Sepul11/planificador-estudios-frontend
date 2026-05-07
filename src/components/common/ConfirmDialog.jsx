import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        {message}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancelar
        </Button>

        <Button
          color="error"
          onClick={onConfirm}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
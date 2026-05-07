import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

export default function HistorialDialog({ open, subtarea, onClose }) {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Historial de avances</DialogTitle>
      <DialogContent>
        {subtarea?.avances?.length > 0 ? (
          subtarea.avances.map((a, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {a.estado.toUpperCase()}
              </Typography>
              <Typography variant="body2">{a.nota || "Sin nota"}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(a.fecha).toLocaleString()}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography>No hay avances aún</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
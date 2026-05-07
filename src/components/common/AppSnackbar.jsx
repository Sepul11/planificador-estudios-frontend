import { Snackbar, Alert } from "@mui/material";

export default function AppSnackbar({
  open,
  message,
  severity,
  onClose,
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Alert severity={severity} sx={{ background: "#472825", color: "white", fontWeight: "bold", borderRadius: "12px" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
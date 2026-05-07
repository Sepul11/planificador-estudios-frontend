import { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export const SnackbarContext = createContext();

export function SnackbarProvider({ children }) {

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  function showSnackbar(message, severity = "info") {
    setSnack({
      open: true,
      message,
      severity,
    });
  }

  function closeSnackbar() {
    setSnack(prev => ({
      ...prev,
      open: false,
    }));
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity={snack.severity}
          sx={{
            borderRadius: "12px",
            fontWeight: "bold",
          }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  return useContext(SnackbarContext);
}
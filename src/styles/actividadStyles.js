// src/styles/actividadStyles.js

export const actividadStyles = {

  // =========================
  // PAGE
  // =========================

  container: {
    paddingTop: "120px",
    paddingRight: "2rem",
    paddingBottom: "2rem",
    paddingLeft: "2rem",
    background: "#FFF4E2",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#472825",
  },

  // =========================
  // CARD
  // =========================

  card: {
    background: "white",
    maxWidth: "700px",
    width: "100%",
    margin: "0 auto",
    padding: "2.5rem",
    borderRadius: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
  },

  // =========================
  // INPUTS
  // =========================

  input: {
    padding: "0.75rem",
    borderRadius: "10px",
    border: "1px solid #D3AB80",
    outline: "none",
    fontSize: "0.95rem",
  },

  row: {
    display: "flex",
    gap: "0.8rem",
  },

  timeGroup: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },

  label: {
    fontSize: "0.8rem",
    color: "#472825",
    marginBottom: "3px",
  },

  fieldColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },

  error: {
    color: "#ff6b6b",
    fontSize: "0.8rem",
    marginTop: "-0.6rem",
  },

  // =========================
  // MUI INPUTS
  // =========================

  muiInputSx: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",

      "& fieldset": {
        borderColor: "#D3AB80",
      },

      "&:hover fieldset": {
        borderColor: "#c49a6c",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#472825",
      },
    },
  },

  // =========================
  // SUBTAREAS
  // =========================

  sectionTitle: {
    marginTop: "1rem",
    color: "#472825",
  },

  subRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1.2fr 1fr auto",
    gap: "0.5rem",
  },

  addBtn: {
    background: "#D3AB80",
    border: "none",
    borderRadius: "8px",
    padding: "0 14px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
    whiteSpace: "nowrap",
  },

  subItem: {
    background: "#FFF4E2",
    padding: "0.6rem",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  subItemPro: {
    background: "#FFF4E2",
    padding: "10px 14px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px",
  },

  chip: {
    background: "#ffffff",
    border: "1px solid #D3AB80",
    padding: "4px 8px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    color: "#472825",
    fontWeight: "500",
  },

  btnDelete: {
    color: "#ff6b6b",
  },

  removeBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },

  // =========================
  // BUTTONS
  // =========================

  saveBtn: {
    marginTop: "1.5rem",
    padding: "0.9rem",
    borderRadius: "12px",
    border: "none",
    background: "#472825",
    color: "white",
    cursor: "pointer",
  },

  // =========================
  // LOADING
  // =========================

  loadingContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#472825",
  },

  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #D3AB80",
    borderTop: "4px solid #472825",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};
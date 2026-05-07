export const hoyStyles = {

  container: {
    paddingTop: "100px",
    paddingRight: "2rem",
    paddingBottom: "2rem",
    paddingLeft: "2rem",
    background: "#FFF4E2",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "2rem",
  },

  logoStyle: { width: "100px" },
  title: { margin: 0, color: "#3A2E2A" },
  subtitle: { margin: 0, color: "#8D6E63" },

  fab: {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 18px",
    borderRadius: "30px",
    background: "#3A2E2A",
    color: "white",
    fontSize: "1rem",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },

  loadingContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #ddd",
    borderTop: "4px solid #3A2E2A",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  emptyContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },

  emptyImg: { width: "200px" },

  emptyBtn: {
    padding: "0.8rem 1.5rem",
    borderRadius: "12px",
    border: "none",
    background: "#3A2E2A",
    color: "white",
  },

  // Filtros
  filtersRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: "2rem",
  },

  filtroBtn: (active, color) => ({
    padding: "8px 14px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    background: active ? color : "white",
    color: active ? "white" : "#444",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    fontWeight: 500,
  }),

  searchInput: {
    padding: "8px 14px",
    borderRadius: "20px",
    border: "1px solid #ddd",
  },

  // Cards
  cardStyle: {
    borderRadius: "14px",
    mb: 2,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },

  cardContentStyle: {
    padding: "20px 24px !important",
  },

  // Subtarea item
  subtaskBox: {
    marginTop: "14px",
    padding: "14px 18px",
    borderRadius: "12px",
    background: "#fafafa",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  hoursBox: {
    background: "#E8F6F3",
    color: "#2A9D8F",
    padding: "6px 10px",
    borderRadius: "10px",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },

  completeBtn: {
    borderRadius: "10px",
    background: "#2A9D8F",
    color: "white",
    fontWeight: 500,
    "&:hover": { background: "#23867a" },
  },

  verBtn: {
    textTransform: "none",
    borderRadius: "8px",
    border: "1px solid #ddd",
    color: "#555",
    fontSize: "0.8rem",
    padding: "4px 10px",
  },

  // Chips
  chipCurso: {
    background: "#FFF3E0",
    color: "#E65100",
    fontWeight: 600,
  },

  chipTipo: {
    background: "#E3F2FD",
    color: "#1565C0",
    fontWeight: 600,
  },

  chipFecha: {
    background: "#E8F5E9",
    color: "#2E7D32",
    fontWeight: 600,
  },

  tipoTag: (tipo) => ({
    marginTop: "8px",
    fontSize: "0.75rem",
    fontWeight: "bold",
    padding: "4px 12px",
    borderRadius: "12px",
    color: "white",
    width: "fit-content",
    background:
      tipo === "vencidas" ? "#E76F51"
      : tipo === "hoy"     ? "#3A86FF"
      :                      "#2A9D8F",
  }),

  // Layout columnas
  columnsContainer: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
  },

  column: {
    flex: 1,
    minWidth: "300px",
  },

  // Enlace reprogramar
  reprogramarLink: {
    color: "#D3AB80",
    cursor: "pointer",
    textDecoration: "underline",
    fontWeight: "bold",
  },
};
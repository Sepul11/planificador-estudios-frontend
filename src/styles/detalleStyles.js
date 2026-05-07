export const detalleStyles = {

  pageWrapper: {
    background: "#FFF4E2",
    minHeight: "100vh",
    overflowX: "hidden",
  },

  container: {
    maxWidth: "2300px",
    margin: "100px auto",
    padding: "20px",
    width: "100%",
    boxSizing: "border-box",
  },

  header: {
    marginBottom: "2rem",
    background: "white",
    padding: "1rem",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  logoStyle: { width: "80px" },

  title: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#472825",
  },

  infoCard: {
    background: "white",
    padding: "2rem",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  },

  subtareasCard: {
    background: "white",
    padding: "1.5rem",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  },

  gridLayout: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: 4,
    alignItems: "start",
    mt: 3,
    width: "100%",
  },

  progressContainer: {
    width: "100%",
    height: "8px",
    background: "#eee",
    borderRadius: "10px",
    margin: "6px 0 16px 0",
    overflow: "hidden",
  },

  progressBar: (progreso) => ({
    height: "100%",
    width: `${progreso}%`,
    background: "#2A9D8F",
    borderRadius: "10px",
    transition: "0.3s",
  }),

  progressText: {
    fontSize: "0.8rem",
    color: "#777",
  },

  createBox: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr auto",
    gap: "10px",
    marginBottom: "1.5rem",
    background: "white",
    padding: "10px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },

  chipFecha: {
    background: "#E8F5E9",
    color: "#2E7D32",
    padding: "6px 10px",
    borderRadius: "10px",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },

  hoursBox: {
    background: "#E8F6F3",
    color: "#2A9D8F",
    padding: "6px 10px",
    borderRadius: "10px",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },

  emptyState: {
    textAlign: "center",
    marginTop: "2rem",
  },

  emptyImg: { width: "180px" },

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
};
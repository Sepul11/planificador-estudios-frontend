import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverLay";
import logo from "../assets/logo.png";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  setLoading(true);
  setLoadingMessage("Creando usuario...");

  try {
    const response = await fetch(
      "https://planificador-estudios-backend-80p8.onrender.com/auth/register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          first_name: form.nombre,
          last_name: "",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setLoading(false);
      alert(data.error || "Error al registrar usuario");
      return;
    }

    // 👇 CAMBIAMOS EL MENSAJE SIN QUITAR EL LOADING
    setLoadingMessage("Usuario creado correctamente 🎉");

    // 👇 Espera 2 segundos para que el usuario vea el mensaje
    setTimeout(() => {
      navigate("/login");
    }, 2000);

  } catch (error) {
    console.error(error);
    setLoading(false);
    alert("Error conectando con el servidor");
  }
};

return (
  <>
    {loading && <LoadingOverlay message={loadingMessage} />}

    <div style={layout}>
      {/* ===== IZQUIERDA (MENSAJE) ===== */}
      <div style={leftSide} className="hide-mobile">
        <img src={logo} alt="logo" style={{ width: 200 }} />
        <h1 style={brandTitle}>Crea tu cuenta</h1>
        <p style={brandText}>
          Empieza hoy a organizar tus materias, tus horarios y tus metas.
          Tu rendimiento académico mejora cuando tu tiempo está bien planificado.
        </p>
      </div>

      {/* ===== DERECHA (FORMULARIO) ===== */}
      <div style={rightSide}>
        <div style={card}>
          <h2 style={title}>Registro de Usuario</h2>

          <form style={formStyle} onSubmit={handleSubmit}>
            {/* inputs iguales a los tuyos */}
          {/* Nombre */}
          <TextField
            label="Nombre completo"
            variant="outlined"
            fullWidth
            value={form.nombre}
            onChange={handleChange}
            name="nombre"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Email */}
        <TextField
          label="Correo electrónico"
          type="email"
          variant="outlined"
          fullWidth
          value={form.email}
          onChange={handleChange}
          name="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />

          {/* Contraseña */}
          <TextField
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={form.password}
            onChange={handleChange}
            name="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Confirmar contraseña */}
          <TextField
            label="Confirmar contraseña"
            type={showConfirm ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={form.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

            <button style={button} type="submit">
              Crear Cuenta
            </button>
          </form>

          <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  </>
);
}

/* ===== PALETA (igual que login) ===== */
const colors = {
  dark: "#472825",
  medium: "#96786F",
  accent: "#D3AB80",
  light: "#FDE4BC",
  base: "#FFF4E2",
};

/* ===== STYLES ===== */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: colors.base,
};

const title = {
  color: colors.dark,
  textAlign: "center",
  marginBottom: "1.5rem",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};


const button = {
  marginTop: "0.8rem",
  padding: "0.85rem",
  width: "100%",
  borderRadius: "12px",
  border: "none",
  background: colors.accent,
  color: colors.dark,
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
};

const layout = {
  display: "flex",
  height: "100vh",
  background: colors.base,
};

const leftSide = {
  flex: 1,
  background: colors.dark,
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "4rem",
};

const brandTitle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: "1.5rem",
  textAlign: "center",
};

const brandText = {
  fontSize: "1.1rem",
  textAlign: "center",
  maxWidth: "420px",
  opacity: 0.9,
  lineHeight: 1.6,
};

const rightSide = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  background: "#FFFFFF",
  padding: "3rem",
  borderRadius: "24px",
  boxShadow: "0 20px 50px rgba(71,40,37,0.15)",
  width: "400px",
};

export default Register;
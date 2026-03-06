import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    usuario: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    console.log("Registro:", form);
    navigate("/login");
  };

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={title}>Crear Cuenta</h1>
        <form style={formStyle} onSubmit={handleSubmit}>
          {/* Nombre */}
          <div style={inputWrapper}>
            <FaUserAlt style={icon} />
            <input
              style={input}
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Usuario */}
          <div style={inputWrapper}>
            <FaUserAlt style={icon} />
            <input
              style={input}
              type="text"
              name="usuario"
              placeholder="Usuario"
              value={form.usuario}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div style={inputWrapper}>
            <FaUserAlt style={icon} />
            <input
              style={input}
              type="email"
              name="email"
              placeholder="Correo"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contraseña */}
          <div style={inputWrapper}>
            <FaLock style={icon} />
            <input
              style={input}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
            {showPassword ? (
              <FaEyeSlash
                style={eyeIcon}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye style={eyeIcon} onClick={() => setShowPassword(true)} />
            )}
          </div>

          {/* Confirmar contraseña */}
          <div style={inputWrapper}>
            <FaLock style={icon} />
            <input
              style={input}
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            {showConfirm ? (
              <FaEyeSlash
                style={eyeIcon}
                onClick={() => setShowConfirm(false)}
              />
            ) : (
              <FaEye style={eyeIcon} onClick={() => setShowConfirm(true)} />
            )}
          </div>

          <button style={button} type="submit">
            Crear cuenta
          </button>
        </form>

        <p>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
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

const card = {
  background: "#FFFFFF",
  padding: "2.5rem",
  borderRadius: "20px",
  boxShadow: "0 12px 30px rgba(71,40,37,0.15)",
  textAlign: "center",
  width: "350px",
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

const inputWrapper = {
  position: "relative",
  width: "100%",
};

const icon = {
  position: "absolute",
  left: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  color: colors.medium,
};

const eyeIcon = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  color: colors.medium,
  cursor: "pointer",
};

const input = {
  padding: "0.75rem 2.5rem",
  width: "100%",
  maxWidth: "100%",
  borderRadius: "10px",
  border: `1px solid ${colors.light}`,
  fontSize: "0.95rem",
  boxSizing: "border-box",
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

export default Register;
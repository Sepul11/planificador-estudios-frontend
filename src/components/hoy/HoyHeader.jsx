import { hoyStyles as s } from "../../styles/hoyStyles";
import logo from "../../assets/logo.png";

export default function HoyHeader() {
  return (
    <header style={s.header}>
      <img src={logo} alt="logo" style={s.logoStyle} />
      <div>
        <h1 style={s.title}>Tu día de estudio</h1>
        <p style={s.subtitle}>Organiza, prioriza y avanza</p>
      </div>
    </header>
  );
}
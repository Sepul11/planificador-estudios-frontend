import LoginCard from "../../components/Login/LoginCard";
import bg from "../../assets/backgroundHero.png";

function Hero() {
  return (
    <section style={hero} id="login">
      {/* IZQUIERDA con background */}
      <div style={left}>
          <h1 style={title}>¡Planifica tu éxito académico!</h1>
          <p style={text}>
            Organiza tus materias, controla tu tiempo y mejora tu rendimiento
            académico.
          </p>
      </div>

      {/* DERECHA blanca */}
      <div style={right}>
        <LoginCard />
      </div>
    </section>
  );
}

const hero = {
  display: "flex",
  minHeight: "100vh",
  marginTop: "70px", 
  backgroundImage: `url(${bg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",       
};

const left = {
  flex: 1,
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "6rem",
};

const overlay = {
  position: "absolute",
  inset: 0,
  backdropFilter: "blur(6px)",
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "6rem",
};

const right = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const title = {
  fontSize: "3.2rem",
  fontWeight: 700,
  textShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)'
};

const text = {
  fontSize: "1.3rem",
  maxWidth: "500px",
  lineHeight: 1.6,
  textShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)'
};

export default Hero;
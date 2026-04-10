// LoadingOverlay.jsx
import React from "react";

const LoadingOverlay = ({ message }) => {
  return (
    <div style={overlay}>
      <div style={box}>
        <div style={spinner}></div>
        <p style={text}>{message}</p>
      </div>
    </div>
  );
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  backdropFilter: "blur(3px)",
};

const box = {
  background: "#FFF",
  padding: "2rem 3rem",
  borderRadius: "16px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const spinner = {
  width: "50px",
  height: "50px",
  border: "5px solid #D3AB80",
  borderTop: "5px solid #472825",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  margin: "0 auto 1rem",
};

const text = {
  fontSize: "1.1rem",
  fontWeight: "600",
  color: "#472825",
};

export default LoadingOverlay;
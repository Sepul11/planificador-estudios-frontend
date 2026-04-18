import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ActividadesProvider } from "./context/ActividadesContext";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ActividadesProvider>
      <App />
    </ActividadesProvider>
  </BrowserRouter>
);

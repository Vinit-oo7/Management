import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Lenis from "lenis";
import { BrowserRouter } from "react-router-dom";
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

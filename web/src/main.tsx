import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
/* Display ≈ Feature Deck; sans ≈ PP Neue Montreal. Swap @font-face when licensed files arrive. */
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource-variable/inter/wght.css";
import "lenis/dist/lenis.css";
import "./styles/base.css";
import "./styles/sections.css";
import "./styles/form.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

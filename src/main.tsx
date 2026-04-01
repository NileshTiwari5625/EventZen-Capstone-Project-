import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const removeVeepnOverlay = () => {
  document.querySelectorAll("veepn-lock-screen").forEach(node => node.remove());
};

removeVeepnOverlay();

const observer = new MutationObserver(() => {
  removeVeepnOverlay();
});

observer.observe(document.documentElement, { childList: true, subtree: true });

createRoot(document.getElementById("root")!).render(<App />);

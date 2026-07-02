import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";
import { initPwaInstall } from "./lib/pwa-install";

// Remove o bloco de conteúdo SSG (pré-renderizado para Google/crawlers)
// antes de montar o React, evitando FOUC. O conteúdo já foi entregue no
// HTML inicial e indexado pelos crawlers antes do JS executar.
const rootEl = document.getElementById("root")!;
const ssg = rootEl.querySelector("#ssg-content");
if (ssg) ssg.remove();

createRoot(rootEl).render(<App />);

initPwaInstall();

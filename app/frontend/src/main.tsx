import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UseLayers } from "./contexts/UseLayers.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
        <UseLayers>
          <App />
        </UseLayers>
    </BrowserRouter>
  </React.StrictMode>,
);

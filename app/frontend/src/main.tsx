import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SizeProvider } from "./contexts/SizeContext.tsx";
import { UseLayers } from "./contexts/UseLayers.tsx";

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SizeProvider>
        <UseLayers>
          <App />
        </UseLayers>
      </SizeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

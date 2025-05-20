import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ShoppingCartProvider } from "./context";
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShoppingCartProvider>
      <BrowserRouter> {/* Agrega BrowserRouter */}
        <App />
      </BrowserRouter>
    </ShoppingCartProvider>
  </StrictMode>
);

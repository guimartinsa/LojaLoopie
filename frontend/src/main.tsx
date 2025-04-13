import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CarrinhoProvider } from './services/CarrinhoContext'; // ajuste o caminho se precisar


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CarrinhoProvider>
      <App />
    </CarrinhoProvider>
  </React.StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'sonner';
import App from "./App.tsx";
import "./index.css";

// 创建根元素并渲染应用
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster 
        position="top-right"
        toastOptions={{
          className: "bg-white border border-silk-gray rounded-lg shadow-md",
          success: {
            className: "bg-bamboo-green/10 border-bamboo-green text-bamboo-green",
          },
          error: {
            className: "bg-crabapple-red/10 border-crabapple-red text-crabapple-red",
          },
          info: {
            className: "bg-glass-blue/10 border-glass-blue text-glass-blue",
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);

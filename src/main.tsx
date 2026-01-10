import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import './i18n'; // Initialize i18n before App
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  }>
    <App />
  </Suspense>
);

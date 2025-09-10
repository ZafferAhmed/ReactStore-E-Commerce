import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FilteredProvider } from "./components/FilterContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FilteredProvider>
      <App />
    </FilteredProvider>
  </StrictMode>
);

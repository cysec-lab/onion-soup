import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { DarkModeProvider } from "./context/DarkModeContext";
import App from "./App";
import "./index.css";

const container = document.getElementById("root") as HTMLElement;

const root = createRoot(container);
root.render(
  <ChakraProvider>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </ChakraProvider>,
);

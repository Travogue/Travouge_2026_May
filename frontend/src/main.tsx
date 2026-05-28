import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { store } from "./store";
import "./style.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0d47a1" },
    secondary: { main: "#ff6f00" },
  },
});

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

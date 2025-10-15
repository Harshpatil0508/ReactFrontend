import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx"; // CRUD Dashboard
import LandingPage from "./LandingPage.jsx"; // New landing page
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const pinkTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#e91e63" },
    secondary: { main: "#f06292" },
    background: {
      default: "#fff0f6",
      paper: "#ffe6f0",
    },
  },
  typography: { fontFamily: "'Poppins', sans-serif" },
  shape: { borderRadius: 16 },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={pinkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

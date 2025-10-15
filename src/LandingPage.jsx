import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #ffe6f0, #fff0f6)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 3,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 700, color: "#e91e63", mb: 2 }}>
        Welcome to CRUD Project
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, color: "#ad1457", maxWidth: 600 }}>
        This is a simple user management dashboard where you can add, update, and delete users. 
      </Typography>
      <Button
        variant="contained"
        sx={{
          px: 5,
          py: 1.5,
          background: "linear-gradient(45deg, #ec407a, #f48fb1)",
          color: "#fff",
          fontWeight: "bold",
          boxShadow: "0 4px 10px rgba(236,64,122,0.3)",
          "&:hover": {
            boxShadow: "0 6px 14px rgba(236,64,122,0.4)",
          },
        }}
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard 💻
      </Button>
    </Box>
  );
}

export default LandingPage;

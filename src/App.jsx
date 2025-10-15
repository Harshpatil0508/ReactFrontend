import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Snackbar,
  Alert,
  Box,
  CssBaseline,
  Tooltip,
  Grid,
} from "@mui/material";
import { Edit, Delete, DarkMode, LightMode, People, CalendarToday } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", email: "", age: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  const apiUrl = "http://localhost:8080/api/users";

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: darkMode ? "#f48fb1" : "#ec407a" },
          secondary: { main: darkMode ? "#f06292" : "#f8bbd0" },
          background: {
            default: darkMode ? "#121212" : "#fff0f6",
            paper: darkMode ? "#1f1f1f" : "#ffffff",
          },
        },
        typography: {
          fontFamily: "'Poppins', 'Roboto', sans-serif",
          h5: { fontWeight: 700 },
          h6: { fontWeight: 600 },
          button: { textTransform: "none", fontWeight: 600 },
        },
        shape: { borderRadius: 16 },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                transition: "0.3s ease",
              },
            },
          },
        },
      }),
    [darkMode]
  );

  // Fetch users
  const fetchUsers = async () => {
    const res = await axios.get(apiUrl);
    setUsers(res.data);
  };

  // CRUD actions
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${apiUrl}/${form.id}`, form);
        setSnack({ open: true, message: "User updated successfully!", severity: "success" });
      } else {
        await axios.post(apiUrl, form);
        setSnack({ open: true, message: "User added successfully!", severity: "success" });
      }
      setForm({ id: null, name: "", email: "", age: "" });
      setIsEditing(false);
      fetchUsers();
    } catch {
      setSnack({ open: true, message: "Error saving user", severity: "error" });
    }
  };

  const handleEdit = (user) => {
    setForm(user);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    fetchUsers();
    setSnack({ open: true, message: "User deleted successfully!", severity: "info" });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtered users based on search
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Stats
  const totalUsers = users.length;
  const avgAge = users.length ? Math.round(users.reduce((a, b) => a + Number(b.age), 0) / users.length) : 0;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          background: darkMode
            ? "linear-gradient(45deg, #ad1457, #880e4f)"
            : "linear-gradient(45deg, #ec407a, #f48fb1)",
        }}
      >
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Isha Project Dashboard
          </Typography>
          <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5, mb: 5 }}>
        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 1, display: "flex", alignItems: "center", gap: 2 }}>
              <People sx={{ fontSize: 35, color: "primary.main" }} />
              <Box>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h5">{totalUsers}</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 1, display: "flex", alignItems: "center", gap: 2 }}>
              <CalendarToday sx={{ fontSize: 35, color: "primary.main" }} />
              <Box>
                <Typography variant="h6">Average Age</Typography>
                <Typography variant="h5">{avgAge}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Form */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "primary.main", fontWeight: "bold", mb: 2 }}
          >
            {isEditing ? "Update User Details ✏️" : "Add a New User 💁‍♀️"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
          >
            <TextField
              label="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Age"
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" sx={{ px: 5, py: 1.2 }}>
              {isEditing ? "Update ✨" : "Add 👩‍💻"}
            </Button>
          </Box>
        </Paper>

        {/* Users List */}
        <Paper sx={{ p: 3 }}>
          <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
            <Typography variant="h6" sx={{ color: "primary.main", fontWeight: "bold" }}>
              👩‍💻 Users List
            </Typography>
            <TextField
              label="Search users..."
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ maxWidth: 250 }}
            />
          </Box>

          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: darkMode ? "#31102e" : "#fce4ec" }}>
              <TableRow>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Age</b></TableCell>
                <TableCell align="center"><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{
                    backgroundColor: index % 2 === 0 ? (darkMode ? "#1b1b1b" : "#fff0f6") : "transparent",
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: darkMode ? "#2a1b28" : "#ffe4f1",
                    },
                  }}
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit User">
                      <IconButton color="primary" onClick={() => handleEdit(user)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User">
                      <IconButton color="error" onClick={() => handleDelete(user.id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack({ ...snack, open: false })}
          severity={snack.severity}
          variant="filled"
          sx={{
            background:
              snack.severity === "success"
                ? "linear-gradient(45deg, #f48fb1, #ec407a)"
                : undefined,
          }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;

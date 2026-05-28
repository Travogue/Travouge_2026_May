import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { loginThunk, type AppDispatch, type RootState } from "../store";

export default function AdminLoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginThunk({ email, password })).unwrap();
      if (result.user.role !== "admin") throw new Error("Admin access required");
      navigate("/admin/dashboard");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Paper sx={{ maxWidth: 420, mx: "auto", p: 3, mt: 6 }}>
      <Helmet>
        <title>Admin Login | Travouge</title>
      </Helmet>
      <Typography variant="h5" gutterBottom>
        Admin Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={onSubmit} sx={{ display: "grid", gap: 2, mt: 2 }}>
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" disabled={loading}>
          Login
        </Button>
      </Box>
    </Paper>
  );
}

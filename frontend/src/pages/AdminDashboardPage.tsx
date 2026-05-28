import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { api } from "../api";
import type { ContentType } from "../types";
import type { RootState } from "../store";

const contentTypes: ContentType[] = ["package", "visa", "desk", "cms", "gallery", "testimonial"];

export default function AdminDashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [type, setType] = useState<ContentType>("package");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);
    await api.post(`/content/admin/${type}`, formData);
    setMessage("Content added successfully");
    setTitle("");
    setDescription("");
    setImage(null);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Helmet>
        <title>Admin Dashboard | Travouge</title>
      </Helmet>
      <Typography variant="h5" gutterBottom>
        Welcome, {user?.name}
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Manage packages, visa services, travel desk, CMS pages, gallery and testimonials.
      </Typography>
      {message && <Alert severity="success">{message}</Alert>}
      <Box component="form" onSubmit={onSubmit} sx={{ display: "grid", gap: 2, mt: 2 }}>
        <TextField select label="Module" value={type} onChange={(e) => setType(e.target.value as ContentType)}>
          {contentTypes.map((ct) => (
            <MenuItem key={ct} value={ct}>
              {ct}
            </MenuItem>
          ))}
        </TextField>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <TextField
          multiline
          minRows={4}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="outlined" component="label">
          Upload Image
          <input hidden type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        </Button>
        <Button type="submit" variant="contained">
          Save Content
        </Button>
      </Box>
    </Paper>
  );
}

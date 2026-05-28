import { FormEvent, useState } from "react";
import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { api } from "../api";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    await api.post("/content/contact", { title: name, email, description: message });
    setOk("Thanks, our team will contact you shortly.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Paper sx={{ maxWidth: 700, mx: "auto", p: 3 }}>
      <Helmet>
        <title>Contact | Travouge</title>
        <meta name="description" content="Contact Travouge travel consultants." />
      </Helmet>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      {ok && <Alert severity="success">{ok}</Alert>}
      <Box component="form" onSubmit={submit} sx={{ display: "grid", gap: 2, mt: 2 }}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField
          multiline
          minRows={4}
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">
          Send
        </Button>
      </Box>
    </Paper>
  );
}

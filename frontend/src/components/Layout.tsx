import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/packages", label: "Packages" },
  { to: "/visa-services", label: "Visa" },
  { to: "/travel-desk", label: "Travel Desk" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar sx={{ gap: 1, flexWrap: "wrap" }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Travouge
          </Typography>
          {navItems.map((item) => (
            <Button key={item.to} color="inherit" component={Link} to={item.to}>
              {item.label}
            </Button>
          ))}
          <Button color="inherit" component={Link} to="/login">
            User Login
          </Button>
          <Button color="inherit" component={Link} to="/admin/login">
            Admin
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}

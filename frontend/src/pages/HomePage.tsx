import { Box, Button, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Box sx={{ textAlign: "center", py: 8 }}>
      <Helmet>
        <title>Travouge | Complete Travel Agency</title>
        <meta name="description" content="Packages, visa services, travel desk and more." />
      </Helmet>
      <Typography variant="h3" gutterBottom>
        Plan your next journey with confidence
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Explore curated packages, visa guidance, and full travel support.
      </Typography>
      <Button component={Link} to="/packages" variant="contained" sx={{ mt: 2 }}>
        Explore Packages
      </Button>
    </Box>
  );
}

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { fetchContentThunk, type AppDispatch, type RootState } from "../store";
import type { ContentType } from "../types";

type Props = { type: ContentType; title: string };

export default function ContentPage({ type, title }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.content[type]);

  useEffect(() => {
    dispatch(fetchContentThunk(type));
  }, [dispatch, type]);

  return (
    <Box>
      <Helmet>
        <title>{title} | Travouge</title>
        <meta name="description" content={`${title} by Travouge travel agency`} />
      </Helmet>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid key={item._id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              {item.image && (
                <CardMedia
                  component="img"
                  height={180}
                  image={(import.meta.env.VITE_ASSET_URL || "http://localhost:5000") + item.image}
                  alt={item.title}
                />
              )}
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description || item.body}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

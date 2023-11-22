import axios from "axios";
import { useEffect, useState } from "react";
import { Category } from "../interfaces/category";
import { Card, CardActionArea, CardContent, CardMedia, Grid, Link, Typography } from "@mui/material";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.get("http://localhost:3000/api/categories");
        const { data } = resp;
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Grid container spacing={2}>
    {Array.isArray(categories) && categories.map((cat: Category) => (
      <Grid item xs={12} sm={6} md={4} key={cat._id}>
        <Card
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <CardActionArea sx={{ flexGrow: 1 }}>
            <Link
              href={`/products`}
              sx={{
                textDecoration: 'none',
                // color: (theme) => theme.palette.text.primary,
              }}
            >
              <CardMedia
                component="img"
                sx={{ maxHeight: 210, objectFit: '' }}
                image={cat.image}
                alt={cat.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h3">
                  {cat.name}
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </Grid>
    ))}
  </Grid>
  );
};

export default Home;

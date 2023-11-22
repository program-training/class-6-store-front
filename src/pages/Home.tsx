import axios from "axios";
import { useEffect, useState } from "react";
import { Category } from "../interfaces/category";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.get("https://store-back-3.onrender.com/api/categories");
        const { data } = resp;
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{
          fontFamily: "Fira Sans, sans-serif",
          fontWeight: "bold",
          color: "whitesmoke",
          marginBottom: "3rem",
        }}
      >
        Categories
      </Typography>
      <Grid container spacing={2}>
        {Array.isArray(categories) &&
          categories.map((cat: Category) => (
            <Grid item xs={12} sm={6} md={4} key={cat._id}>
              <Card
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                  WebkitBoxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                }}
              >
                <CardActionArea sx={{ flexGrow: 1 }}>
                  <Link
                    href={`/products/${cat.name}`}
                    sx={{
                      textDecoration: "none",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ maxHeight: 210, objectFit: "" }}
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
    </>
  );
};

export default Home;

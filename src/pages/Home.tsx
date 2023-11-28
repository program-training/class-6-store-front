import axios from "axios";
import { useEffect, useState } from "react";
import { Category } from "../interfaces/category";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../rtk/hooks";
import { render } from "../rtk/cartSlice";
import { useNavigate } from "react-router-dom";
import HomeSkeleton from "../components/HomeSkeleton";
import { cardCategory, pHello } from "../style/home";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_SERVER_API;

  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.get(`${baseURL}/api/categories`);
        const { data } = resp;
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [baseURL]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.get(`${baseURL}/api/banners`);
        const { data } = resp;
        setBanners(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [baseURL]);
  console.log(banners);

  useEffect(() => {
    dispatch(render());
  }, [dispatch]);

  const clickToCard = (cat: string) => {
    navigate(`/products/${cat}`);
  };

  return (
    <>
      <Typography variant="h1" align="center" gutterBottom style={pHello}>
        Hello
      </Typography>
      <Grid container spacing={2}>
        {loading ? (
          <HomeSkeleton />
        ) : (
          Array.isArray(categories) &&
          categories.map((cat: Category) => (
            <Grid item xs={12} sm={6} md={4} key={cat._id}>
              <Card sx={cardCategory}>
                <CardActionArea sx={{ flexGrow: 1 }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h2"
                      component="h3"
                      fontFamily="Fira Sans, sans-serif"
                      fontWeight="bold"
                      color="rgb(33,47,58)"
                    >
                      {cat.name}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    sx={{ maxHeight: 210, objectFit: "" }}
                    image={cat.image}
                    alt={cat.name}
                    onClick={() => clickToCard(cat.name)}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default Home;

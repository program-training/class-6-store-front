import "./home.css"
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
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { render } from "../rtk/cartSlice";
import { useNavigate } from "react-router-dom";
import HomeSkeleton from "../components/HomeSkeleton";
import { cardCategory, pHello } from "../style/home";
interface Banner {
  author: string;
  category: string;
  createdAt: string;
  id: number;
  image: {
    alt: string;
    url: string;
  };
  productID: number;
  rating: number;
  sale: number;
  text: string;
  _id: string;
}

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState<Banner[]>([]);
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
        const resp = await axios.get(
          `https://serverbanners.onrender.com/api/banners`
        );
        const { data } = resp;
        console.log(resp);

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
  const handleClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const userName = useAppSelector((state) => state.userName.userName)

 
 

  return (
    <>
       {userName && <Typography variant="h1" align="center" gutterBottom style={pHello}>
        Hello {userName}
      </Typography>}
      {banners && banners.length > 0 && (
        <>
         

          <div
            className="hide-scrollbar"
            style={{
              display: "flex",
              overflowX: "auto",
              backgroundColor: "#E0E0E0",
              border: "2px solid #B3B3B3",
              padding: "1.2rem",
              marginBottom: "2rem",
              boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div
              className="scrolling-container"
              style={{
                display: "flex",
                flexWrap: "nowrap",
              }}
            >
              {banners.map((banner, index) => (
                <div
                  key={index}
                  style={{
                    minWidth: "300px",
                    flexShrink: 0,
                    margin: "5px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <img
                    className="banner-image"
                    src={banner.image.url}
                    alt={banner.image.alt}
                    onClick={() => handleClick(banner.productID.toString())}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

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

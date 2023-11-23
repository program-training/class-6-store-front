import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Stack, useTheme, Box, Slider, CardActionArea } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { themeSettings } from "../palette/theme";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate, useParams } from "react-router-dom";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { filterProducts } from './function';
import { addProductToCart } from "../rtk/cartSlice"
import { useAppDispatch } from "../rtk/hooks";
import {  getUniqueAttributes } from './function';
export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  clickCount: number;
  quantity: number;
  attributes: Attributes[];
}
export interface Attributes {
  key: string;
  value: number | string;
}

interface Prices {
  minPrice: number;
  maxPrice: number;
}


const Products = () => {
  const { palette } = useTheme()
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[] | null>()
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null | undefined>(null);
  const [attributes, setAttributes] = useState<Record<string, (string | number)[]>>({});
  const {category} = useParams()
  const dispatch = useAppDispatch()


  function connectToData() {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://store-back-3.onrender.com/api/products?category=${category}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }
  
  useEffect(() => {
    connectToData()
  }, [])
  useEffect(() => {
    if (products) {
      setAttributes(getUniqueAttributes(products));
      setFilteredProducts(products);
    }
  }, [products])
  const handleClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };
  const { minPrice, maxPrice }: Prices = products?.reduce(
    (acc, product) => ({
      minPrice: Math.min(acc.minPrice, product.price),
      maxPrice: Math.max(acc.maxPrice, product.price),
    }),
    { minPrice: Infinity, maxPrice: -Infinity }
  ) ?? { minPrice: 0, maxPrice: 0 };
  const [value, setValue] = useState<number | null>(null);
  const [activeFilters, setActiveFilters] = useState<{ [name: string]: string | number }>({});
  const handleAttributeToggle = (name: string, value: string | number) => {
    if(products) {
    const newFilteredProducts = filterProducts(name, value, products, activeFilters, setValue);
    setFilteredProducts(newFilteredProducts);
    }
  };
  const addToCart = (id:number) => {
    dispatch(addProductToCart({ productId: id, quantity: 1 }));
};
  return (
    <Stack spacing={2} direction="row">
      <Box width={"15em"}>
      <Box sx={{ width: "15em" }}>
        <Slider
          aria-label="Default"
          value={value ? value : maxPrice}
          min={minPrice}
          max={maxPrice}
          onChange={(_e, value) => handleAttributeToggle("price", value as number)}
          aria-labelledby="dynamic-range-slider"
          valueLabelDisplay="auto"
        />
      </Box>
      <Box
        // direction="column"
        justifyContent="flex-end"
        alignItems="flex-start"
        >
        {Object.entries(attributes).map(([key, value]) => (
          <Grid item sx={{ border: "black solid 2px" }}>
            <Typography variant="subtitle1">{key}</Typography>
            {value.map((item) => (
              <FormGroup key={item}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={item}
                  onChange={() => handleAttributeToggle(key, item)}
                  />
              </FormGroup>
))}
          </Grid>
        ))}
        </Box>
        </Box>
      <Box sx={{  display: "flex", flexWrap: "wrap", height: ""}}>
        {filteredProducts?.map((product) => (
          <Grid key={product.id} direction={"row"} >
            <Card
              sx={{
                margin: "0.5em",
                width: "15em",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                transition: "box-shadow 0.3s, transform 0.3s",
                ":hover": {
                  boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.2)",
                  transform: "translateY(-10px)",
                },
              }}
              >
              <CardActionArea onClick={() => handleClick(product.id.toString())}
              >
              <CardMedia
                component="img"
                height="180em"
                sx={{position: ""}}
                image={product.image}
                alt={product.title}
                />
              <CardContent>
                <Typography
                  variant="h2"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: "1.5em",
                    color: themeSettings.palette.grey[800],
                  }}
                >
                  {product.category}
                </Typography>
                <Typography
                  variant="h3"
                  color={palette.grey[800]}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: "3.5em",
                  }}
                >
                  {product.title}
                </Typography>
              </CardContent>
              </CardActionArea>
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  padding: "0.5em",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: "1.1em",
                    color: themeSettings.palette.teal[700],
                  }}
                >
                  ${product.price}
                </Typography>
                <IconButton onClick={()=>addToCart(product.id)}
                  sx={{
                    color: themeSettings.palette.teal[800],
                    justifySelf: "top",
                    "&:hover": {
                      backgroundColor: themeSettings.palette.teal[800],
                      color: themeSettings.palette.teal[100],
                    },
                  }}
                  >
                  <AddShoppingCartIcon />
                </IconButton>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Box>
    </Stack>
  )
}
export default Products;
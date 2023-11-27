import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Stack,
  useTheme,
  Box,
  Slider,
  CardActionArea,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState, useReducer } from "react";
import { themeSettings } from "../palette/theme";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate, useParams } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { filterProducts } from "../function";
import { addProductToCart } from "../rtk/cartSlice";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { getUniqueAttributes } from "../function";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import ProductSkeleton from "../components/ProductSkeleton";
import { Product } from "../interfaces/product";

type State = Record<string, boolean>;
type Action = { type: "toggle"; name: string | number};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "toggle":
      return { ...state, [action.name]: !state[action.name] };
    default:
      throw new Error();
  }
}

interface Prices {
  minPrice: number;
  maxPrice: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[] | null>();
  const [filteredProducts, setFilteredProducts] = useState<
    Product[] | null | undefined
  >(null);
  const [attributes, setAttributes] = useState<
    Record<string, (string | number)[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [state, localDispatch] = useReducer(reducer, {});
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { palette } = useTheme();

  function connectToData() {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://store-back-3.onrender.com/api/products?category=${category}`
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }

  useEffect(() => {
    connectToData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (products) {
      setAttributes(getUniqueAttributes(products));
      setFilteredProducts(products);
    }
  }, [products]);

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
  const [activeFilters, setActiveFilters] = useState<{
    [name: string]: string | number;
  }>({});
  console.log(setActiveFilters);

  const handleAttributeToggle = (name: string, value: string | number) => {
    if (products) {
      const newFilteredProducts = filterProducts(
        name,
        value,
        products,
        activeFilters,
        setValue
      );
      setFilteredProducts(newFilteredProducts);
    }
  };
  const addToCart = (product: Product) => {
    dispatch(
      addProductToCart({
        name: product.id,
        quantity: 1,
        price: product.price,
        description: product.description,
      })
    );
  };
  const productInCart = useAppSelector((state) => state.cart.products);
  return (
    <Stack spacing={2} direction="row">
      <Box width={"15em"}>
        <Box sx={{ width: "15em" }}>
          <Slider
            aria-label="Default"
            value={value ? value : maxPrice}
            min={minPrice}
            max={maxPrice}
            onChange={(_e, value) =>
              handleAttributeToggle("price", value as number)
            }
            aria-labelledby="dynamic-range-slider"
            valueLabelDisplay="auto"
          />
        </Box>
        <Box
          key={Date.now() * Math.random()}
          justifyContent="flex-end"
          alignItems="flex-start"
        >
          {Object.entries(attributes).map(([key, value]) => (
            <Grid item key={Date.now() * Math.random()}>
              <Typography variant="subtitle1">{key}</Typography>
              {value.map((item) => (
                <FormGroup key={Date.now() * Math.random()}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state[item] || false}
                        onChange={() => {
                          localDispatch({ type: "toggle", name: item });
                          handleAttributeToggle(key, item);
                        }}
                      />
                    }
                    label={item}
                  />
                </FormGroup>
              ))}
            </Grid>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", height: "" }}>
        {loading ? (
          <ProductSkeleton />
        ) : (
          filteredProducts?.map((product) => {
            let addedToCart = false;
            for (const item of productInCart) {
              if (item.name === product.id) {
                addedToCart = true;
              }
            }
            return (
              <Grid key={product.id} direction={"row"}>
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
                  <CardActionArea
                    onClick={() => handleClick(product.id.toString())}
                  >
                    <CardMedia
                      component="img"
                      height="180em"
                      sx={{ position: "" }}
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
                    <IconButton
                      onClick={() => addToCart(product)}
                      sx={{
                        color: themeSettings.palette.teal[800],
                        justifySelf: "top",
                        "&:hover": {
                          backgroundColor: themeSettings.palette.teal[800],
                          color: themeSettings.palette.teal[100],
                        },
                      }}
                    >
                      {!addedToCart && <AddShoppingCartIcon />}
                      {addedToCart && <PlusOneIcon />}
                    </IconButton>
                  </Stack>
                </Card>
              </Grid>
            );
          })
        )}
      </Box>
    </Stack>
  );
};
export default Products;

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
import { useEffect, useState, useReducer } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate, useParams } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { filterProducts } from "../function";
import { addProductToCart, render } from "../rtk/cartSlice";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { getUniqueAttributes } from "../function";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import ProductSkeleton from "../components/ProductSkeleton";
import { Product, Prices } from "../interfaces/product";
import { connectToData } from "../function";
import { buttonAddToCart, cardStyle, stackBottom, typographyH2Style, typographyH3PriceStyle, typographyH3Style } from "../style/products";

type State = Record<string, boolean>;
type Action = { type: "toggle"; name: string | number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "toggle":
      return { ...state, [action.name]: !state[action.name] };
    default:
      throw new Error();
  }
}

const Products = () => {
  const [products, setProducts] = useState<Product[] | null>();
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null | undefined>(null);
  const [attributes, setAttributes] = useState<Record<string, (string | number)[]>>({});
  const [value, setValue] = useState<number | null>(null);
  const [activeFilters, setActiveFilters] = useState<{[name: string]: string | number }>({});
  const [loading, setLoading] = useState(true);
  const [state, localDispatch] = useReducer(reducer, {});
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { palette } = useTheme();  

  useEffect(() => {
    connectToData(category, setLoading, setProducts);
  }, [category]);
  
  useEffect(() => {
    if (products) {
      setAttributes(getUniqueAttributes(products));
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    dispatch(render())
  }, []);

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
            <Grid item>
              <Typography variant="subtitle1">{key}</Typography>
              {value.map((item) => (
                <FormGroup key={item}>
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
            const addedToCart =
              Array.isArray(productInCart) &&
              productInCart.some((item) => item.name === product.id);
            return (
              <Grid key={product.id}>
                <Card
                  sx={cardStyle}
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
                        sx={typographyH2Style}
                      >
                        {product.category}
                      </Typography>
                      <Typography
                        variant="h3"
                        color={palette.grey[800]}
                        sx={typographyH3Style}
                      >
                        {product.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={stackBottom}
                  >
                    <Typography
                      variant="h3"
                      sx={typographyH3PriceStyle}
                    >
                      ${product.price}
                    </Typography>
                    <IconButton
                      onClick={() => addToCart(product)}
                      sx={buttonAddToCart}
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
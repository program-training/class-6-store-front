import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Tooltip, IconButton, Stack, Paper, Link, useTheme, Box, Slider } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { themeSettings } from "../palette/theme";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { filterProducts } from './function';
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



  function connectToData() {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/products?category=tops"
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
  // useEffect(() => {
  //   const handleUniqueAttributes = () => {
  //     const groupedAttributes: Record<string, (string | number)[]> = {};

  //     products?.forEach((product) => {
  //       product.attributes.forEach((attribute) => {
  //         const { key, value } = attribute;

  //         if (!groupedAttributes[key]) {
  //           groupedAttributes[key] = [];
  //         }

  //         if (!groupedAttributes[key].includes(value)) {
  //           groupedAttributes[key].push(value);
  //         }
  //       });
  //     });

  //     setAttributes(groupedAttributes);
  //   };

  //   handleUniqueAttributes();
  //   setFilteredProducts(products);
  // }, [products]);

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

  // const handleAttributeToggle = (name: string, value: string | number) => {
  //   setValue(value ? +value : null);
  //   console.log(name, value);
  //   let filterByPrice = products
  //   if (name === "price") {
  //     filterByPrice = products?.filter(product => {
  //       return product.price < +value
  //     })
  //     setFilteredProducts(filterByPrice)
  //   }

  //   if (name !== "price") {
  //     const filterKey = `${name}_${value}`;
  //     if (activeFilters[filterKey]) {
  //       delete activeFilters[filterKey];
  //     } else {
  //       activeFilters[filterKey] = filterKey;
  //     }
  //   }

  //   const newFilteredProducts = filterByPrice?.filter(product => {
  //     return Object.keys(activeFilters).every(filter => {
  //       const [filterName, filterValue] = filter.split('_');
  //       return product.attributes.some(attribute => {
  //         return attribute.key === filterName && attribute.value === filterValue;
  //       });
  //     });
  //   });
  //   setFilteredProducts(newFilteredProducts.length > 0 ? newFilteredProducts : null);
  // };

  const handleAttributeToggle = (name: string, value: string | number) => {
    if(products) {
    const newFilteredProducts = filterProducts(name, value, products, activeFilters, setValue);
    setFilteredProducts(newFilteredProducts);
    }
  };


  return (
    <Grid container spacing={2} direction="row">
      <Box sx={{ width: 300 }}>
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
      <Grid item spacing={2}
        direction="column"
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
      </Grid>
      <Grid spacing={2} direction="row" >

        {filteredProducts?.map((product) => (
          <Grid item key={product.id}>
            <Card onClick={() => handleClick(product.id.toString())}
              sx={{
                margin: "1em",
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
              <CardMedia
                component="img"
                height="150em"
                image={product.image}
                alt={product.title}
              />

              <CardContent>
                <Typography
                  variant="h2"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: "2em",
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
                    height: "2em",
                  }}
                >
                  {product.title}
                </Typography>
              </CardContent>
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
                    height: "1em",
                    color: themeSettings.palette.teal[700],
                  }}
                >
                  ${product.price}
                </Typography>
                <IconButton
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
      </Grid>
    </Grid>
  )
}

export default Products

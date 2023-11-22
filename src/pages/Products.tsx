import { AddShoppingCart } from "@mui/icons-material"
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Tooltip, IconButton, Stack, Paper, Link } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Product } from "../interfaces/product"


const Products = () => {


  const [products, setProducts] = useState([])

  useEffect(()=> {
    (async()=> {
      try {
        const resp = await axios.get("https://store-back-3.onrender.com/api/products")
        const {data} = resp
        setProducts(data ? data: [])
      } catch (error) {
        console.log(error);
        
      }
    })()
  })
  // function imgURL() {
  //   throw new Error("Function not implemented.")
  // }

  // function formatEUR(): import("react").ReactNode {
  //   throw new Error("Function not implemented.")
  // }

  // const sortedProducts: unknown = [1,2,3,4,5,6,7,8,9]
  const sortedProducts = products || [1,2,3,4,5,6,7,8,9]

  return (
    <Grid container spacing={2}>
    {Array.isArray(sortedProducts) && sortedProducts.map((product: Product) => (
      <Grid item xs={12} sm={6} md={4} key={product.id}>
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
              href={`/product/${product}`}
              sx={{
                textDecoration: 'none',
                // color: (theme) => theme.palette.text.primary,
              }}
            >
              <CardMedia
                component="img"
                sx={{ maxHeight: 210, objectFit: 'contain' }}
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h3">
                  {product?.title}
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
          <CardActions sx={{ justifyContent: 'space-between' }}>
            <Tooltip title="Add to Cart">
              <IconButton color="primary">
                <AddShoppingCart />
              </IconButton>
            </Tooltip>
            <Stack spacing={1} direction="row">
              {/* {product.oldPrice && product.oldPrice > product.price && ( */}
                <>
                  <Typography
                    sx={{
                      textDecoration: 'line-through',
                      opacity: 0.5,
                    }}
                  >
                    {/* {formatEUR(product.oldPrice)} */}
                    15
                  </Typography>
                  <Paper
                    sx={{
                      bgcolor: 'red',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography color="white">Sale</Typography>
                  </Paper>
                </>
              {/* )} */}
              <Typography color="primary">
                {/* {formatEUR(product.price)} */}
                15
              </Typography>
            </Stack>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
  )
}

export default Products

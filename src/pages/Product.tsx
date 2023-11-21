import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Grid, Stack, useTheme } from '@mui/material';
import { themeSettings } from '../palette/theme';
import { useNavigate } from 'react-router-dom';

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

export default function RecipeReviewCard(product: Product) {
  const { palette } = useTheme()
  const navigate = useNavigate();

  const handleClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  // const handleCartClick = (productId: string) => {

  // }

  return (
    <Grid>
    <Card onClick={() => handleClick(product.id.toString())}
      sx={{
        margin: "1em",
        width: "15em",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        transition: "box-shadow 0.3s, transform 0.3s",
        ":hover": {
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
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
  );
}


import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../rtk/hooks";
import {
  CartProduct,
  decrement,
  increment,
  removeProduct,
  removeCart,
} from "../rtk/cartSlice";
import { Product } from "../rtk/interface";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useEffect } from "react";
import React from "react";
import Payment from "./Payment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CartTable() {
  const [productForCart, setProductForCart] = React.useState<CartProduct[]>([]);
  const [productsCartFromData, setProductsCartFromData] = React.useState<
    Product[]
  >([]);
  const [totalPrice, setTotalPrice] = React.useState<number | null>(null);

  const dispatch = useAppDispatch();
  const dataProduct = useAppSelector((state) => state.products.products);

  const flag = useAppSelector((state) => state.userName.flag);
  const productFromRtk: CartProduct[] = useAppSelector(
    (state) => state.cart.products
  );

  useEffect(() => {
    setProductForCart(productFromRtk);
  }, [flag, productFromRtk]);

  const comparison = () => {
    if (productForCart.length) {
      const products = productForCart.flatMap((item) => {
        const product = dataProduct.find((product) => product.id === item.name);
        return product ? [product] : [];
      });
      if (products.length) {
        setProductsCartFromData(products);
      }
    } else setProductsCartFromData([]);
  };

  useEffect(() => {
    comparison();
  }, [productForCart]);

  useEffect(() => {
    let total = 0;
    for (const product of productsCartFromData) {
      const quantity: CartProduct | undefined = productForCart.find(
        (item) => item.name === product.id
      );
      if (quantity && quantity.quantity) {
        total += product.price * quantity.quantity;
      }
    }
    setTotalPrice(total);
  }, [productsCartFromData, productForCart]);

  const payCart = () => {
    dispatch(removeCart());
  };

  const incrementQuantity = (product: Product) => {
    dispatch(increment(product.id));
  };
  const decrementQuantity = (product: Product) => {
    dispatch(decrement(product.id));
  };
  const removeProductFromCart = (product: Product) => {
    dispatch(removeProduct(product.id));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ITEMS</StyledTableCell>
            <StyledTableCell align="center">QUANTITY</StyledTableCell>
            <StyledTableCell align="center">AVAILABILITY</StyledTableCell>
            <StyledTableCell align="right">TOTAL PRICE</StyledTableCell>
            <StyledTableCell align="right">ADDITIONAL ACTIONS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsCartFromData.map((product) => {
            const quantity: CartProduct | undefined = productForCart.find(
              (item) => item.name === product.id
            );
            return (
              <StyledTableRow key={product.id}>
                <StyledTableCell component="th" scope="row">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CardMedia
                      sx={{ maxWidth: "12rem", minWidth: "12rem" }}
                      component="img"
                      height="75em"
                      image={product.image}
                      alt={product.title}
                    />
                    <Box sx={{ width: "1em" }}></Box>
                    <Typography variant="body1">{product.title}</Typography>
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {quantity?.quantity}
                </StyledTableCell>
                <StyledTableCell align="center">{}</StyledTableCell>
                <StyledTableCell align="center">
                  <StyledTableCell align="center">
                    {quantity && quantity.quantity
                      ? product.price * quantity.quantity + "$"
                      : null}
                  </StyledTableCell>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => removeProductFromCart(product)}>
                    <DeleteTwoToneIcon />
                  </Button>
                  <Button onClick={() => incrementQuantity(product)}>
                    <PlusOneIcon />
                  </Button>
                  <Button onClick={() => decrementQuantity(product)}>
                    <RemoveIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
      {productsCartFromData.length ? (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Typography variant="h3" style={{ color: "#333" }}>
            TOTAL PRICE: {totalPrice}$
          </Typography>
          {/* <Button
            variant="contained"
            onClick={payCart}
            sx={{ color: "white", backgroundColor: "#37474f" }}
          >
            to make an order
          </Button> */}
          <Payment total={totalPrice}/>
        </div>
      ) : null}
    </TableContainer>
  );
}

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
} from "../rtk/cartSlice";
import { Product } from "../rtk/interface";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import axios from "axios";
import { useEffect } from "react";
import React from "react";

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

  const dispatch = useAppDispatch();

  const getCartFromServer = async () => {
    try {
      const response = await axios.get(
        `https://store-back-3.onrender.com/api/cart/`
      );
      if (response.data) {
        return response.data;
      }
    } catch (err) {
      console.log(err);
    }
    return [];
  };

  

  const flag = useAppSelector((state) => state.userName.flag);
  const productFromRtk: CartProduct[] = useAppSelector(
    (state) => state.cart.products
  );
  useEffect(() => {
    if (flag) {
      getCartFromServer().then((productsFromServer) => {
        if (productsFromServer) setProductForCart(productsFromServer);
        else setProductForCart(productFromRtk);
      });
    }
  }, [flag, productFromRtk]);



  const incrementQuantity = (product: Product) => {
    dispatch(increment(product));
  };
  const decrementQuantity = (product: Product) => {
    dispatch(decrement(product));
  };
  const removeProductFromCart = (product: Product) => {
    dispatch(removeProduct(product));
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ITEMS</StyledTableCell>
            <StyledTableCell align="center">QUANTITY</StyledTableCell>
            <StyledTableCell align="center">זמינות</StyledTableCell>
            <StyledTableCell align="right">TOTAL PRICE</StyledTableCell>
            <StyledTableCell align="right">פעולות נוספות</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productForCart.map((row) => (
            <StyledTableRow key={row.product.id}>
              <StyledTableCell component="th" scope="row">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CardMedia
                    sx={{ maxWidth: "12rem", minWidth: "12rem" }}
                    component="img"
                    height="75em"
                    image={row.product.image}
                    alt={row.product.title}
                  />
                  <Box sx={{ width: "1em" }}></Box>
                  <Typography variant="body1">{row.product.title}</Typography>
                </Box>
              </StyledTableCell>
              <StyledTableCell align="center">{row.quantity}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">
                {row.product.price * row.quantity}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={() => removeProductFromCart(row.product)}>
                  <DeleteTwoToneIcon />
                </Button>
                <Button onClick={() => incrementQuantity(row.product)}>
                  <PlusOneIcon />
                </Button>
                <Button onClick={() => decrementQuantity(row.product)}>
                  <RemoveIcon />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

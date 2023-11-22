import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

///////
import { useAppDispatch } from "../rtk/hooks";
import axios from "axios";
import { setProducts } from "../rtk/productsSlice";
import {
  addProductToCart,
  decrement,
  removeProduct,
  increment,
} from "../rtk/cartSlice";
import CartTable from "./CartTable";

//////////

const Cart = () => {
  const [open, setOpen] = React.useState(false);

  //////
  const dispatch = useAppDispatch();

  const products = [
    {
      id: 9,
      title: "Infinix INBOOK",
      image: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
      price: 1099,
      description:
        "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
      category: "laptops",
      clickCount: 4.54,
      quantity: 96,
      attributes: [
        {
          key: "Processor",
          value: "Intel Core i3",
        },
        {
          key: "RAM",
          value: "8GB",
        },
        {
          key: "Storage",
          value: "256GB SSD",
        },
        {
          key: "Warranty",
          value: "1 Year",
        },
      ],
    },
    {
      id: 10,
      title: "Infinix",
      image: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
      price: 1099,
      description:
        "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
      category: "laptops",
      clickCount: 4.54,
      quantity: 96,
      attributes: [
        {
          key: "Processor",
          value: "Intel Core i3",
        },
        {
          key: "RAM",
          value: "8GB",
        },
        {
          key: "Storage",
          value: "256GB SSD",
        },
        {
          key: "Warranty",
          value: "1 Year",
        },
      ],
    },
    {
      id: 11,
      title: "INBOOK",
      image: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
      price: 1099,
      description:
        "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
      category: "laptops",
      clickCount: 4.54,
      quantity: 96,
      attributes: [
        {
          key: "Processor",
          value: "Intel Core i3",
        },
        {
          key: "RAM",
          value: "8GB",
        },
        {
          key: "Storage",
          value: "256GB SSD",
        },
        {
          key: "Warranty",
          value: "1 Year",
        },
      ],
    },
  ];

  function connectToData() {
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8181/api/products"
          );
          dispatch(setProducts(response.data));
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);
  }
  connectToData();


  const addToCart = () => {
    products.map((product) => {
      dispatch(addProductToCart({ product: product, quantity: 1 }));
    });
  };

  const addQuantity = () => {
    products.map((product) => {
      dispatch(increment(product));
    });
  };

  const decrementFromCart = () => {
    products.map((product) => {
      dispatch(decrement(product));
    });
  };

  const removeFromCart = () => {
    products.map((product) => {
      dispatch(removeProduct(product));
    });
  };

  return (
    <div>
      <Button onClick={addToCart}>add To Cart</Button>
      <Button onClick={decrementFromCart}>decrement To Cart</Button>
      <Button onClick={removeFromCart}>remove To Cart</Button>
      <Button onClick={addQuantity}>add quantity</Button>
      <React.Fragment key={"cart"}>
        <Button onClick={() => setOpen(true)}>show cart</Button>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <CartTable  />
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default Cart;
